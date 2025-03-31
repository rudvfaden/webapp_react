# Use a Node.js 18 base image
FROM node:18-alpine

# Install Python and required packages with build dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    sqlite \
    gcc \
    python3-dev \
    musl-dev \
    linux-headers \
    build-base

# Set working directory for the application
WORKDIR /app

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ ./

# Set working directory back to main app directory
WORKDIR /app

# Set up Python virtual environment and dependencies
COPY backend/requirements.txt ./backend/
RUN python3 -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"
RUN . /app/venv/bin/activate && pip install -r backend/requirements.txt

# Copy backend code and database directory
COPY backend/ ./backend/
COPY database/ ./database/

# Create a directory for the SQLite database if it doesn't exist
RUN mkdir -p /app/database

# Expose ports for frontend and backend
EXPOSE 3001 8000

# Start both frontend and backend services
CMD ["sh", "-c", "cd /app/frontend && npm run dev -- --host 0.0.0.0 --port 3001 & cd /app/backend && . /app/venv/bin/activate && python main.py"]
