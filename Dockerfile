# From latest nodejs
FROM node:latest

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app (temp using dev env)
CMD ["yarn", "start"]
