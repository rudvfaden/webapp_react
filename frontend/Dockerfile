# Use Node 18 as base image
FROM node:18

# Install wget for healthcheck
RUN apt-get update && apt-get install -y wget

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Expose port 3001
EXPOSE 3001

# Start the frontend development server
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port 3001"]
