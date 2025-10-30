FROM node:20-bullseye-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
# Run migrations at container start then start the server
CMD ["sh", "-c", "node src/db/migrate.js && node src/server.js"]
