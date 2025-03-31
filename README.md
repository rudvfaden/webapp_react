# Railway Deployment Guide

This application is configured to be deployed on Railway.app with both frontend and backend in a single service, using SQLite for the database.

## Pre-Deployment Setup

Before deploying to Railway, ensure you have:

1. A [Railway account](https://railway.app/)
2. [Railway CLI](https://docs.railway.app/develop/cli) installed (optional, but useful)
3. Your code pushed to a Git repository (GitHub, GitLab, etc.)

## Deployment Steps

### Option 1: Deploy via GitHub Integration

1. Log in to [Railway.app](https://railway.app/)
2. Click "New Project" > "Deploy from GitHub repo"
3. Select your repository
4. Railway will automatically detect the Dockerfile and deploy your application
5. Once deployment is complete, Railway will provide a URL for your application

### Option 2: Deploy via Railway CLI

1. Login to Railway CLI:
   ```
   railway login
   ```

2. Link your local project to Railway:
   ```
   railway link
   ```

3. Deploy your application:
   ```
   railway up
   ```

## Configuration

The application is configured to work on Railway with the following:

- **Frontend**: Built with Vite and served via Nginx
- **Backend**: FastAPI running on port 8000
- **Database**: SQLite stored in a Railway volume at `/app/database`
- **Proxy**: Nginx proxies API requests from `/api` to the backend

## Persistent SQLite Database

The Railway configuration includes a volume mount to ensure your SQLite database persists between deployments:

```toml
[volumes.database]
path = "/app/database"
mountPath = "/app/database"
```

## Troubleshooting

### CORS Issues

If you encounter CORS issues, ensure that your Railway domain is properly added to:

1. `frontend/vite.config.ts` in the `allowedHosts` array
2. `backend/main.py` in the `origins` array

### Database Access Issues

If you encounter database access issues, check the Railway logs to ensure the volume is properly mounted and the application has write permissions to the database directory.

### Frontend Not Loading

If the frontend loads but can't connect to the backend, ensure that the API URL in `frontend/src/api.ts` is correctly configured to use the same origin with the `/api` path when on Railway.
