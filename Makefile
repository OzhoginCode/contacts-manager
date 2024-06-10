# All services

start-apps:
	docker-compose build
	docker-compose up 

restart-apps:
	docker rm js-app py-app
	docker rmi docker-project-py-app docker-project-js-app
	docker-compose build
	docker-compose up
