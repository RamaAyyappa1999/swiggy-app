# Stage 1: builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies (no lockfile, so use install)
RUN npm install

# Copy source code
COPY . .

# Optional build step
RUN npm run build || true

# Stage 2: final runtime image
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package.json
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy app source
COPY --from=builder /app/src ./src

USER appuser
EXPOSE 3000
CMD ["node", "src/index.js"]
