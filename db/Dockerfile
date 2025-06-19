FROM postgres:17

# Set environment variables (optional: change POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD as needed)
ENV POSTGRES_DB=NewsDB
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Copy the initialization script into the Docker image
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432