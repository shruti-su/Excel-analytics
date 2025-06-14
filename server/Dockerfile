FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Ensure environment variable is available
ENV NODE_ENV=production

CMD ["node", "index.js"]
