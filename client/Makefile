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
	docker stop js
	docker rmi js-app:02
	npm run build
	docker build -t js-app:02 . 
	docker run -p 80:80 --name js -d --rm js-app:02

start:
	npm run build
	docker build -t js-app:02 . 
	docker run -p 80:80 --name js -d --rm js-app:02

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
	
