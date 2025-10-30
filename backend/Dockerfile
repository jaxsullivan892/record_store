FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
# Install dependencies (including node-pg-migrate) in builder
RUN npm ci
COPY . .

# Final image: install only production deps to reduce size, but node-pg-migrate is in dependencies
FROM node:20-bullseye-slim
WORKDIR /app
# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy app sources from builder stage
COPY --from=builder /app .

ENV NODE_ENV=production
EXPOSE 3000
# Run migrations at container start then start the server
CMD ["sh", "-c", "npm run migrate && node src/server.js"]
