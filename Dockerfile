# First we are using a temporal container to install node_modules and have them cached (LAYER1)
FROM node:18-alpine AS installer
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i --production

# We send the node_modules from the first temporal container to the second temporal container to do the build
FROM node:18-alpine AS builder 
WORKDIR /app
COPY . .
COPY --from=installer /app ./
RUN npm i -g pnpm
RUN pnpm run build


# Now we get the built .next/standalone to provide the final docker image
FROM node:18-alpine
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
