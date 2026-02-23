# Use multi-stage build
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.11-slim
WORKDIR /app

# Copy built frontend files
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Copy backend files
COPY backend/ /app/backend/

# Install Python dependencies
RUN cd backend && pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Start the application - with correct path to app module
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]