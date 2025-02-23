# Welcome to Tmis project (a platform for raising capital with stablecoins USDT, USDC, BUSD, DAI, deployed on the Polygon-MAINET blockchain) this is a web 3 application built entirely with aws serverless services, making the development of this MVP not costly but completely ready to receive users.

## The project architecture was designed to be completely serverless and scalable, that is why thinking about the best resources for the application I chose the following:

## 1 - Amazon DynamoDB on-demand capacity mode

### **What is Amazon DynamoDB?**

Amazon DynamoDB is a **fully managed serverless NoSQL database** designed for high performance, scalability, and reliability. It is optimized for applications that require low-latency responses and can handle unpredictable traffic with ease.

---

### **Advantages of DynamoDB:**

1. **Serverless Architecture**:

   - DynamoDB eliminates the need for infrastructure management. It automatically scales up or down based on traffic, making it perfect for MVPs and unpredictable workloads.
   - You only pay for what you use, either by **on-demand pricing** (ideal for low-traffic projects) or **provisioned capacity**.

2. **Scalability**:

   - DynamoDB can handle millions of requests per second. For a MVP, it ensures it can start small and scale seamlessly if the project grows.

3. **Low Latency**:

   - Provides single-digit millisecond latency for read and write operations, ensuring fast responses for API Gateway and Lambda.

4. **Integration with Lambda**:

   - DynamoDB integrates natively with AWS Lambda through **DynamoDB Streams**, allowing for event-driven architectures (e.g., updating the frontend when the database changes).

5. **Highly Available and Reliable**:

   - Data is automatically replicated across multiple availability zones, ensuring durability and fault tolerance.

6. **Cost-Effective**:

   - With **on-demand mode**, you only pay for the read/write requests you actually make, making it extremely cost-efficient for an MVP with low traffic.
   - Storage costs are low, and there are no maintenance overheads.

7. **Ease of Use**:
   - Being schema-less, it allows flexibility in storing JSON-like key-value or document data, which is great for early-stage development.

---

### **Why DynamoDB over other databases?**

1. **Compared to RDS (Relational Database Service)**:

   - RDS is not serverless (except Aurora Serverless), and even the smallest RDS instance has a baseline cost, which isn't ideal for a very low-cost MVP.
   - RDS requires some maintenance, like managing scaling and connections.

2. **Compared to Aurora Serverless**:

   - While Aurora Serverless provides serverless relational database capabilities, it is costlier than DynamoDB for low traffic and requires more configuration.

3. **Compared to Amazon S3 for Data Storage**:

   - S3 is object storage and not ideal for structured query capabilities like indexing or filtering. DynamoDB supports query and scan operations, making it better for storing and retrieving data efficiently.

4. **Compared to Amazon Timestream or Neptune**:
   - These databases are designed for specific use cases (time-series data or graph databases), which may not align with the generic needs of an MVP.

---

### **Why Choose DynamoDB for This MVP?**

- **Fits the Architecture**: The project uses **API Gateway** and **Lambda**, which integrate seamlessly with DynamoDB. The serverless, event-driven nature of DynamoDB complements Lambda perfectly.
- **Low Cost**: For MVPs with low requests, the **on-demand mode** ensures minimal expenses without pre-allocating resources.
- **Scalability**: DynamoDB can effortlessly scale if MVP attracts significant traffic, providing future-proofing without upfront investment.

---

### Acording to [aws dynamodb](https://aws.amazon.com/dynamodb/pricing/?nc1=h_ls) website on-demand mode is recommended in most scenarios including if the project:

1. Have new or existing workloads and you do not want to manage capacity
2. **Want a serverless database that automatically scales**
3. **Prefer the ease of paying for only what you use**

## This setup ensures a highly **cost-efficient**, **scalable**, and **serverless** solution for MVP web application.
