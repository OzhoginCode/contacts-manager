start-apps:
	docker-compose build
	docker-compose up

drop-database:
	docker-compose down -v
