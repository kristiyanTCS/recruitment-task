FROM node:12-alpine

WORKDIR /home/app

# Copy contents over
COPY ./package*.json ./
COPY ./src ./src
COPY ./public ./public

# Install and build
RUN npm install
RUN npm run build-react

# Expose the default app port
EXPOSE 8080

# Serve the optimised production build
CMD [ "npx", "http-server", "build" ]
