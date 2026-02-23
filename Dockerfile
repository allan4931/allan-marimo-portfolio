# Stage 1: Build Frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy all frontend source files and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend and Serve Everything
FROM python:3.12-slim
WORKDIR /app

# Copy built frontend files from stage 1
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Copy backend requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY backend/app/ ./app/

# Set Python path to find modules correctly
ENV PYTHONPATH=/app:/app/app

# Expose the port FastAPI will run on
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]