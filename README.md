<<<<<<< HEAD
# 🐰 Burrow - Festival Group App

De konijnenburcht voor festivalgroepen. Communiceer, deel locaties, beheer onkosten en plan je festival ervaring samen.

## 🚀 Features

- **Groepscommunicatie**: Chat, ping en deel locaties met je festivalgroep
- **Locatie delen**: Vind elkaar makkelijk op het festivalterrein
- **Onkosten beheer**: Houd bij wat iedereen betaalt en split later
- **Tent-indeling**: Organiseer wie waar slaapt
- **Vervoer planning**: Deel auto's en plan ritten
- **Festival planning**: Plan welke artiesten je wilt zien
- **PWA Support**: Installeer als app op je mobiel

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL met Prisma ORM
- **Authentication**: NextAuth.js
- **Real-time**: Socket.io
- **Deployment**: Docker, Docker Compose
- **Reverse Proxy**: Nginx

## 📱 PWA Features

- Installeerbaar op iOS en Android
- Offline functionaliteit
- Push notificaties
- App-achtige ervaring

## 🚀 Deployment op Proxmox

### Optie 1: Docker Container (Aanbevolen)

#### Vereisten
- Ubuntu VM met Docker en Docker Compose
- Minimaal 2GB RAM, 10GB storage
- Poort 80 en 443 beschikbaar

#### Stap 1: VM Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
```

#### Stap 2: App Deployment
```bash
# Clone repository
git clone <your-repo-url> burrow-app
cd burrow-app

# Create environment file
cp .env.example .env
# Edit .env with your settings

# Create SSL certificates (self-signed for testing)
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem

# Deploy
chmod +x deploy.sh
./deploy.sh deploy
```

#### Stap 3: Automatische Updates
```bash
# Setup cron job voor automatische backups
crontab -e
# Add: 0 2 * * * /path/to/burrow-app/deploy.sh backup

# Setup watchtower voor automatische updates
# Already included in docker-compose.yml
```

### Optie 2: Directe Installatie

#### Vereisten
- Ubuntu 22.04 LTS
- Node.js 18+
- PostgreSQL 15+
- Nginx

#### Installatie
```bash
# Install dependencies
sudo apt update
sudo apt install -y nodejs npm postgresql postgresql-contrib nginx

# Setup database
sudo -u postgres createdb burrow
sudo -u postgres createuser burrow_user
sudo -u postgres psql -c "ALTER USER burrow_user WITH PASSWORD 'your_password';"

# Deploy app
git clone <your-repo-url> /var/www/burrow
cd /var/www/burrow
npm install
npm run build

# Setup systemd service
sudo cp burrow.service /etc/systemd/system/
sudo systemctl enable burrow
sudo systemctl start burrow
```

## 🔧 Development Setup

### Lokale Ontwikkeling
```bash
# Clone repository
git clone <your-repo-url> burrow-app
cd burrow-app

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your local settings

# Setup database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/burrow"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Redis (optional)
REDIS_URL="redis://localhost:6379"
```

## 📊 Database Schema

De app gebruikt PostgreSQL met de volgende hoofdmodellen:

- **Users**: Gebruikers en authenticatie
- **Groups**: Festivalgroepen
- **Festivals**: Festival informatie
- **Artists**: Artiesten en optredens
- **Expenses**: Onkosten en splitsing
- **Vehicles**: Vervoer planning
- **Tents**: Tent indeling
- **Locations**: Locatie sharing
- **Messages**: Groepscommunicatie

## 🔒 Security

- HTTPS met SSL/TLS
- Rate limiting op API endpoints
- Input validatie en sanitization
- SQL injection protection via Prisma
- XSS protection headers
- CSRF protection

## 📱 Mobile Optimizations

- Responsive design voor alle schermformaten
- Touch-friendly interfaces
- PWA installatie mogelijkheden
- Offline functionaliteit
- Push notificaties
- Geolocation API integratie

## 🎯 Festival Integratie

### Down the Rabbit Hole 2024
- Timetable integratie
- Artiest voorkeuren
- Groepsplanning
- Locatie sharing op festivalterrein
- Real-time updates

## 🚀 Deployment Commands

```bash
# Deploy/update app
./deploy.sh deploy

# Rollback naar vorige versie
./deploy.sh rollback

# Database backup
./deploy.sh backup

# Database restore
./deploy.sh restore backup_file.sql

# Bekijk logs
./deploy.sh logs

# Status check
./deploy.sh status

# Cleanup oude backups
./deploy.sh cleanup

# Health check
./deploy.sh health
```

## 📈 Monitoring

- Container health checks
- Database backups
- Log monitoring
- Performance metrics
- Error tracking

## 🔄 CI/CD

Voor automatische deployments:

1. **GitHub Actions**: Automatische builds en tests
2. **Docker Registry**: Image versioning
3. **Watchtower**: Automatische container updates
4. **Backup Automation**: Dagelijkse database backups

## 🆘 Troubleshooting

### Veelvoorkomende Problemen

1. **Database connectie fout**
   ```bash
   # Check database status
   docker exec burrow-db pg_isready
   
   # Restart database
   docker-compose restart postgres
   ```

2. **App niet bereikbaar**
   ```bash
   # Check container status
   docker-compose ps
   
   # Bekijk logs
   docker-compose logs app
   ```

3. **SSL certificaat problemen**
   ```bash
   # Regenerate certificates
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem
   
   # Restart nginx
   docker-compose restart nginx
   ```

## 📞 Support

Voor vragen of problemen:
- GitHub Issues
- Email: support@burrow-app.com
- Discord: [Burrow Community](https://discord.gg/burrow)

## 📄 License

MIT License - zie LICENSE bestand voor details.

---

**Burrow** - Maak je festival ervaring onvergetelijk met je groep! 🐰🎵
=======
# burrow
>>>>>>> c5f49bf25167459628df3362471a681f85742fcf
