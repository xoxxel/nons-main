# Multi-stage Dockerfile for a dynamic Next.js app
# - Build stage: installs dev deps and runs `next build`
# - Production stage: installs only production deps, copies built artifacts and public files

FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --ignore-scripts --no-audit --no-fund; else npm install; fi

# Copy source and build
COPY . .
RUN npm run build


FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Install a minimal set of packages (wget used for healthcheck)
RUN apk add --no-cache --update bash wget

# Copy only what we need to run the built app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev --no-audit --no-fund; else npm install --production; fi

# Copy built Next.js output and public files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/app ./app

# Create non-root user and set ownership
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
RUN chown -R nextjs:nextjs /app
USER nextjs

EXPOSE 3000

# Simple healthcheck uses wget to probe root
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -q -O- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["npm", "start"]
