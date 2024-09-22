FROM node:20-alpine

COPY package.json ./
COPY src ./src
COPY prisma ./prisma
COPY tsconfig.json ./tsconfig.json
COPY public ./public

RUN npm install
RUN npm run build
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384

CMD [ "npm", "run", "start" ]