#!/bin/bash

# Burrow App Deployment Script
# This script handles automatic deployment and updates

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="burrow"
DOCKER_COMPOSE_FILE="docker-compose.yml"
BACKUP_DIR="./backups"
LOG_FILE="./deploy.log"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" | tee -a $LOG_FILE
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}" | tee -a $LOG_FILE
}

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Function to backup database
backup_database() {
    log "Creating database backup..."
    BACKUP_FILE="$BACKUP_DIR/burrow_db_$(date +%Y%m%d_%H%M%S).sql"
    docker exec burrow-db pg_dump -U burrow_user burrow > $BACKUP_FILE
    log "Database backup created: $BACKUP_FILE"
}

# Function to restore database
restore_database() {
    if [ -z "$1" ]; then
        error "No backup file specified for restore"
        exit 1
    fi
    log "Restoring database from: $1"
    docker exec -i burrow-db psql -U burrow_user burrow < $1
    log "Database restored successfully"
}

# Function to check if containers are healthy
check_health() {
    log "Checking container health..."
    if docker ps --filter "name=burrow" --filter "status=running" --format "table {{.Names}}\t{{.Status}}" | grep -q "burrow"; then
        log "All containers are running"
        return 0
    else
        error "Some containers are not running"
        return 1
    fi
}

# Function to deploy/update the application
deploy() {
    log "Starting deployment..."
    
    # Pull latest changes if git repository
    if [ -d ".git" ]; then
        log "Pulling latest changes from git..."
        git pull origin main
    fi
    
    # Backup database before deployment
    backup_database
    
    # Build and start containers
    log "Building and starting containers..."
    docker-compose -f $DOCKER_COMPOSE_FILE down
    docker-compose -f $DOCKER_COMPOSE_FILE build --no-cache
    docker-compose -f $DOCKER_COMPOSE_FILE up -d
    
    # Wait for containers to be ready
    log "Waiting for containers to be ready..."
    sleep 30
    
    # Run database migrations
    log "Running database migrations..."
    docker exec burrow-app npx prisma migrate deploy
    
    # Check health
    if check_health; then
        log "Deployment completed successfully!"
    else
        error "Deployment failed - containers are not healthy"
        exit 1
    fi
}

# Function to rollback to previous version
rollback() {
    log "Starting rollback..."
    
    # Stop current containers
    docker-compose -f $DOCKER_COMPOSE_FILE down
    
    # Restore from latest backup
    LATEST_BACKUP=$(ls -t $BACKUP_DIR/*.sql | head -1)
    if [ -n "$LATEST_BACKUP" ]; then
        restore_database $LATEST_BACKUP
    fi
    
    # Restart containers
    docker-compose -f $DOCKER_COMPOSE_FILE up -d
    
    log "Rollback completed"
}

# Function to show logs
show_logs() {
    docker-compose -f $DOCKER_COMPOSE_FILE logs -f
}

# Function to show status
show_status() {
    log "Container status:"
    docker-compose -f $DOCKER_COMPOSE_FILE ps
    
    log "Resource usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
}

# Function to clean up old backups
cleanup_backups() {
    log "Cleaning up old backups (keeping last 7 days)..."
    find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
    log "Cleanup completed"
}

# Main script logic
case "$1" in
    "deploy")
        deploy
        ;;
    "rollback")
        rollback
        ;;
    "backup")
        backup_database
        ;;
    "restore")
        restore_database $2
        ;;
    "logs")
        show_logs
        ;;
    "status")
        show_status
        ;;
    "cleanup")
        cleanup_backups
        ;;
    "health")
        check_health
        ;;
    *)
        echo "Usage: $0 {deploy|rollback|backup|restore <file>|logs|status|cleanup|health}"
        echo ""
        echo "Commands:"
        echo "  deploy    - Deploy/update the application"
        echo "  rollback  - Rollback to previous version"
        echo "  backup    - Create database backup"
        echo "  restore   - Restore database from backup file"
        echo "  logs      - Show application logs"
        echo "  status    - Show container status and resource usage"
        echo "  cleanup   - Clean up old backups"
        echo "  health    - Check container health"
        exit 1
        ;;
esac 