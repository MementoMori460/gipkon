FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
# We only copy the standalone folder and static assets
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static
COPY --chown=nextjs:nodejs public ./public

# Set permissions for data directory (if it exists in the build)
# or ensure it can be created/written to
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
