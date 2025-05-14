import { useEffect, useRef, useState } from "react";
import { Item } from "@/types";
import handleRealtimeEvent from "@/lib/handle-realtime-event";

export type RealtimeStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "error"
  | "closed";

export interface RealtimeOptions {
  model?: string;
  voice?: string;
  backendSessionEndpoint?: string; // defaults to /session
}

export interface RealtimeSession {
  start: () => Promise<void>;
  stop: () => void;
  status: RealtimeStatus;
  items: Item[];
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  updateSession: (sessionConfig: Record<string, any>) => void;
}

/**
 * Hook that encapsulates initialization and lifecycle of an OpenAI Realtime API
 * session using WebRTC — the recommended approach for browser audio streaming.
 */
export default function useRealtimeSession(
  opts: RealtimeOptions = {},
): RealtimeSession {
  const {
    model = "gpt-4o-realtime-preview-2024-12-17",
    voice = "alloy",
    backendSessionEndpoint = "http://localhost:8080/session",
  } = opts;

  const [status, setStatus] = useState<RealtimeStatus>("idle");
  const [items, setItems] = useState<Item[]>([]);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  /** Cleans up all resources */
  const cleanup = () => {
    dataChannelRef.current?.close();
    pcRef.current?.close();
    micStreamRef.current?.getTracks().forEach((t) => t.stop());

    dataChannelRef.current = null;
    pcRef.current = null;
    micStreamRef.current = null;
    setStatus("closed");
  };

  /**
   * Starts a new session: mints an ephemeral key, creates WebRTC connection, and
   * hooks into the data channel for Realtime events.
   */
  const start = async () => {
    if (status === "connecting" || status === "connected") return;
    try {
      setStatus("connecting");

      // 1) Create an ephemeral key via backend
      const resp = await fetch(backendSessionEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, voice }),
      });

      if (!resp.ok) {
        throw new Error(`Failed to create session: ${await resp.text()}`);
      }
      const data = await resp.json();
      const EPHEMERAL_KEY = data.client_secret?.value || data.client_secret;

      // 2) Prepare WebRTC
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Remote audio track (assistant)
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.autoplay = true;
      }
      pc.ontrack = (e) => {
        if (audioRef.current) audioRef.current.srcObject = e.streams[0];
      };

      // Local mic audio
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = micStream;
      const micTrack = micStream.getAudioTracks()[0];
      pc.addTrack(micTrack, micStream);

      // Data channel for events
      const dc = pc.createDataChannel("oai-events");
      dataChannelRef.current = dc;
      dc.addEventListener("message", (e) => {
        try {
          const payload = JSON.parse(e.data);
          handleRealtimeEvent(payload, setItems);
        } catch (err) {
          console.error("Invalid Realtime event", err);
        }
      });

      // 3) WebRTC SDP exchange
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResp = await fetch(`https://api.openai.com/v1/realtime?model=${model}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp",
        },
        body: offer.sdp,
      });
      if (!sdpResp.ok) {
        throw new Error(`Failed to post SDP: ${await sdpResp.text()}`);
      }
      const answer = {
        type: "answer" as const,
        sdp: await sdpResp.text(),
      };
      await pc.setRemoteDescription(answer);

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") setStatus("connected");
        else if (pc.connectionState === "failed" || pc.connectionState === "closed") cleanup();
      };
    } catch (err) {
      console.error(err);
      cleanup();
      setStatus("error");
    }
  };

  const stop = () => {
    cleanup();
  };

  /** Send a session.update event with custom session config */
  const updateSession = (sessionConfig: Record<string, any>) => {
    const dc = dataChannelRef.current;
    if (dc && dc.readyState === "open") {
      dc.send(JSON.stringify({ type: "session.update", session: sessionConfig }));
    } else {
      console.warn("Data channel not open: cannot send session.update");
    }
  };

  // Clean up on unmount
  useEffect(() => () => cleanup(), []);

  return { start, stop, status, items, audioRef, updateSession } as const;
}