start-apps:
	docker-compose build
	docker-compose up

drop-database:
	docker-compose down -v

dev:
	docker-compose build
	docker-compose up db server
	cd client && npm start
