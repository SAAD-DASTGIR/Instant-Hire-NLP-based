# Use the official Node.js image as the base image
FROM node:14-alpine AS node_base

# Set the working directory for Node.js
WORKDIR /RAPID-HIRE-MASTER

# Copy package.json and package-lock.json files
COPY ./package.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the Node.js application code
COPY . .

# Stage for building the Python environment
FROM python:3.8-slim AS python_base

# Set the working directory for Python
WORKDIR /usr/src/app

# Install necessary system packages for Python
RUN apt-get update && apt-get install -y \
    build-essential \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Create a Python virtual environment
RUN python3 -m venv /venv

# Set the PATH to include the virtual environment
ENV PATH="/venv/bin:$PATH"

# Activate the virtual environment and update setuptools and pip
RUN /venv/bin/pip install --upgrade pip setuptools

# Copy the requirements.txt file
COPY requirements.txt ./

# Install Python dependencies inside the virtual environment
RUN /venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy the rest of the Python application code
COPY . .

# Download the spaCy model
RUN /venv/bin/python -m spacy download en_core_web_sm

# Final stage for combining Node.js and Python environments
FROM node_base AS final

# Set the working directory for the final stage
WORKDIR /RAPID-HIRE-MASTER

# Copy the built Python environment
COPY --from=python_base /usr/src/app /usr/src/app

# Set the environment variable for the Python script
ENV PYTHONPATH=/usr/src/app

# Expose port 5000
EXPOSE 5000

# Define the command to run the Node.js application
CMD ["npm", "run", "start"]
