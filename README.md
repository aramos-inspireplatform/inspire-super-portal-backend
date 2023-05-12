# Running the Containers

## Test Database

```bash
cd .docker/

docker compose -f docker-compose.test.yml up --build -d
```

## Dev Database

```bash
cd .docker/

docker compose up --build -d
```

# Stoping the Containers

```bash
cd .docker/

docker compose -f docker-compose.test.yml down
docker compose down
```

# Runnig the project

```bash
nvm install
nvm use
npm i
cp .env.example .env # and fill the variables
npm migration-dev:run # For production use `npm migration:run`
```
