# AI Interviewer

This monorepo contains both the backend server and frontend application for the AI Interviewer platform.

## Project Structure

- `backend-server/` - Backend API server
- `virtu-voice-interviewer/` - Frontend application

## Development

### Prerequisites

- Node.js (v16+)
- npm (v7+)

### Setup

Install dependencies for all workspaces:

```bash
npm install
```

### Running Development Servers

To run both backend and frontend simultaneously:

```bash
npm run dev
```

Or individually:

```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

### Building for Production

```bash
npm run build
``` 