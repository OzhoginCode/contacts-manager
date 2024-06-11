install:
	npm ci

start:
	docker build -t server .
	docker run -p 3000:3000 --name server -d --rm server