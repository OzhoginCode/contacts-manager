install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix

build:
	npm run build

re-start:
	rm -r dist/
	docker stop client
	docker rmi client
	npm run build
	docker build -t client .
	docker run -p 80:80 --name client -d --rm client

start:
	docker build -t client .
	docker run -p 80:80 --name client -d --rm client

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest