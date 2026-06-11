# OctoFit Frontend

This presentation tier uses React 19, Vite, Bootstrap, and react-router-dom.

## Environment setup

Define VITE_CODESPACE_NAME for Codespaces API access.

Example .env.local:

VITE_CODESPACE_NAME=your-codespace-name

When VITE_CODESPACE_NAME is set, API calls use:

https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

If VITE_CODESPACE_NAME is unset, the app safely falls back to localhost:

http://localhost:8000/api/[component]/
