# Use a base image with Node.js and Yarn
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies without devDependencies
RUN yarn install 

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port that your application will run on
EXPOSE 5173

# Command to run the application
CMD ["yarn", "run", "start"]
