# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY .env .env

# Copy dependency definitions
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client and build the application
# Set dummy database URL for build time (Prisma requirement)
ENV DATABASE_URL="mysql://root:rootpassword@localhost:3306/dynacloud"

RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Copy dependency definitions to install only production dependencies
COPY --from=builder /app/.env ./
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 4000

# Start command
CMD ["npm", "run", "start:prod"]
