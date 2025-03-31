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
    build-base \
    nginx

# Set working directory for the application
WORKDIR /app

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ ./

# Build the frontend for production
RUN npm run build

# Set up nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

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

# Expose port for nginx
EXPOSE 8080

# Start both nginx and backend service
CMD ["sh", "-c", "nginx && cd /app/backend && . /app/venv/bin/activate && python main.py"]
