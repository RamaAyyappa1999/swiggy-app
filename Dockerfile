# Stage 1: builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build || true   # (no build step, just placeholder)

# Stage 2: final runtime image
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
RUN npm ci --production
USER appuser
EXPOSE 3000
CMD ["node", "src/index.js"]
