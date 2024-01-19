install:
	npm ci

lint:
	make -C frontend lint

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build

start:
	make start-backend & make start-frontend

build:
	npm run build
	