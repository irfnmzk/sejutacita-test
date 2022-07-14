# User Crud API

This repository contains User Crud Api for SejutaCita technical/coding test

## Technical Stack

- [x] NestJs for web framework
- [x] Mongoose for ORM
- [x] Kubernetes deployment
- [x] MongoDB for data persistance
- [x] Swagger for API documentation

## Accessing the API and swagger docs

- Once you launch the API it will be accessible on port 3000.
- Swagger docs for the API will be accessible locally via URI "**<http://localhost:3000/docs/>**"

## Admin credentials

```sh
  username : admin@example.com
  password : password
```

## Working with this Project

### Development

For development purpose it is possible to deploy all service using docker compose, when you make changes to code, the services will automatically restarted

```sh
# start
docker compose up --build

# stop
docker compose down
```

### Production with kubernetes

To deploy the whole app to the cluster, run the following commands.

```sh
kubectl apply -f k8s/
```

To see the status of the deployment, run the following command:

```sh
kubectl get deployments
```

now you can access the api from http://\<clusterHost\>:3000 if you're using minikube you can access it with

```sh
# start minikube tunnel
minikube tunnel

# you can access it from http://localhost:3000
```

### Remove Services

After deploying the app to the cluster, you can remove the services by running the following commands:

```sh
kubectl delete -f k8s/
```
