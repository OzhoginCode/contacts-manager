start-apps:
	docker-compose build
	docker-compose up 

restart-apps:
	docker rm client server
	docker rmi client server
	docker-compose build
	docker-compose up
