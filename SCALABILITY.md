# Scalability & Architecture Strategy

## 1. Horizontal Scaling

- **Load Balancing:** We can use Nginx or AWS Elastic Load Balancer (ELB) to distribute incoming traffic across multiple instances of this Node.js backend.
- **Statelessness:** The authentication uses JWT (JSON Web Tokens), which is stateless. This allows any server instance to verify a request without needing shared session memory.

## 2. Database Optimization

- **Indexing:** All frequently queried fields (email, userId) are indexed in MongoDB to ensure O(1) lookup times.
- **Caching:** For the "Get Tasks" endpoint, we can implement Redis caching. Since tasks don't change every second, caching read requests for 60 seconds would significantly reduce database load.

## 3. Microservices Transition

- Currently, this is a Monolithic architecture for simplicity.
- **Future Split:** As traffic grows, we can split the `Auth` logic and `Task` logic into two separate microservices (e.g., `auth-service` and `task-service`) communicating via a message queue like RabbitMQ or Kafka.