# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy source code
COPY src/ ./src/

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Switch to non-root user
USER appuser

EXPOSE 5000

CMD ["node", "src/index.js"]