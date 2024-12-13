# Use the official Node.js image as the base image
FROM node:18.17.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies including TypeScript and @types packages
RUN npm install

RUN npm install -g typescript tsc-alias

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 4001

# Command to run the app
CMD ["node", "dist/server.js"]
