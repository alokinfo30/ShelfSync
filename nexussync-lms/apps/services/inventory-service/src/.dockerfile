# Base Node.js image
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder Stage (if needed, simplified here)
FROM base AS builder
COPY . .
RUN pnpm build # Run TypeScript compilation

# Production Stage
FROM node:20-alpine AS runner
WORKDIR /app
# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist 
EXPOSE 3001
CMD ["node", "dist/index.js"]