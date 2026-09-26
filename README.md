# Advanced Node.js + AWS Production Architecture

Scalable Document Processing & Monitoring Platform

A production-style Node.js application deployed on AWS with secure document uploads, monitoring, auto scaling, and high availability.

---

## Project Overview

This project demonstrates a production-ready architecture where users can upload documents securely to Amazon S3, receive SNS notifications, monitor the application using CloudWatch, and maintain high availability using an Application Load Balancer and Auto Scaling Group.

### Features

* User Registration & Login (JWT Authentication)
* Secure PDF/JPG/JPEG/PNG Upload (Max 10MB)
* Amazon S3 Private Storage
* Pre-Signed Download URLs
* Document Metadata Storage (MySQL)
* Amazon SNS Email Notification
* CloudWatch Logs
* Custom CloudWatch Metrics
* CloudWatch Dashboard
* CloudWatch Alarms
* Application Load Balancer
* Auto Scaling Group
* High Availability Architecture

---

## Architecture

`Internet → ALB → Auto Scaling Group → EC2 (Node.js) → MySQL + S3 → SNS → CloudWatch`

---

## AWS Services Used

| Service         | Purpose                          |
| --------------- | -------------------------------- |
| EC2             | Node.js Application Hosting      |
| S3              | Secure Document Storage          |
| SNS             | Email Notifications              |
| CloudWatch      | Logs, Metrics, Dashboard, Alarms |
| ALB             | Traffic Distribution             |
| Auto Scaling    | Automatic Scaling                |
| IAM Role        | Secure AWS Access                |
| Security Groups | Network Security                 |

---

## Project Structure

```text
project/
├── server.js
├── package.json
├── .env
├── controllers/
├── routes/
├── middleware/
├── models/
├── uploads/
└── utils/
```

---

## Prerequisites

* Node.js
* npm
* MySQL
* AWS Account
* EC2 Instance
* S3 Bucket
* SNS Topic
* IAM Role

---

## Local Setup

### Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create `.env`

```env
PORT=5000

DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME

AWS_REGION=ap-south-1
S3_BUCKET=YOUR_BUCKET_NAME
SNS_TOPIC_ARN=YOUR_SNS_TOPIC
JWT_SECRET=YOUR_SECRET
```

### Start Application

```bash
npm start
```

---

## EC2 Deployment

### Connect EC2

```bash
ssh -i "myServerKey.pem" ec2-user@PUBLIC_IP
```

### Install Node.js

```bash
sudo dnf update -y
sudo dnf install nodejs git -y
```

### Install PM2

```bash
sudo npm install -g pm2
pm2 start server.js --name node-app
pm2 save
pm2 startup
```

---

## API Endpoints

| Method | Endpoint                      |
| ------ | ----------------------------- |
| POST   | `/api/auth/register`          |
| POST   | `/api/auth/login`             |
| POST   | `/api/documents/upload`       |
| GET    | `/api/documents`              |
| GET    | `/api/documents/:id/download` |
| DELETE | `/api/documents/:id`          |
| GET    | `/api/health`                 |
| GET    | `/api/ready`                  |

---

## S3 Security

* Block Public Access Enabled
* Private Bucket
* Server-Side Encryption Enabled
* User-specific Object Prefixes
* Pre-Signed Download URLs

---

## Monitoring

### CloudWatch Logs

Structured JSON logs contain:

* timestamp
* level
* requestId
* route
* statusCode
* duration

### Custom Metrics

* UploadSuccessCount
* UploadFailureCount
* SNSPublishFailureCount
* S3OperationFailureCount

---

## CloudWatch Dashboard

Dashboard includes:

* ALB Request Count
* Target Response Time
* HTTP 4XX
* HTTP 5XX
* EC2 CPU Utilization
* Network In
* Network Out
* Upload Success
* Upload Failure
* SNS Failure

---

## CloudWatch Alarms

| Alarm          | Threshold            |
| -------------- | -------------------- |
| EC2 CPU        | >70%                 |
| ALB 5XX        | Above Threshold      |
| High Latency   | Target Response Time |
| Upload Failure | Above Threshold      |

SNS Email notifications are configured for all alarms.

---

## Load Balancer

* Internet-facing Application Load Balancer
* HTTP Listener
* Target Group Health Check

```text
/api/health
```

---

## Auto Scaling

| Setting | Value |
| ------- | ----- |
| Minimum | 2     |
| Desired | 2     |
| Maximum | 4     |

Scaling Policy:

* Target Tracking
* Average CPU Utilization: 70%

---

## Security

* IAM Role for EC2
* Least Privilege Access
* Private S3 Bucket
* JWT Authentication
* File Validation
* Security Groups
* No AWS Access Keys Stored

---

## Load Testing

Tool used:

* k6

Run:

```bash
k6 run loadtest.js
```

Observed:

* Request Count Increased
* CPU Utilization Changed
* Dashboard Updated
* No Application Downtime

---

## Cost Optimization

* t2.micro EC2
* Auto Scaling
* Private S3 Storage
* CloudWatch Log Retention
* Minimal AWS Resources

---

## Failure Recovery

| Scenario         | Recovery                           |
| ---------------- | ---------------------------------- |
| EC2 Failure      | Auto Scaling launches new instance |
| Unhealthy Target | ALB removes traffic                |
| Upload Failure   | CloudWatch Alarm + SNS             |
| High CPU         | Scale Out                          |

---

## Testing Checklist

* User Registration
* User Login
* Document Upload
* Document Download
* Document Delete
* Health Endpoint
* ALB Access
* Auto Scaling Test
* CloudWatch Dashboard
* Alarm Notification
* Load Testing

---

## Project Deliverables

* Complete Node.js Source Code
* AWS Deployment
* S3 Configuration
* SNS Configuration
* CloudWatch Dashboard
* CloudWatch Alarms
* ALB & Target Group
* Auto Scaling Group
* Load Test Report
* Cost Estimate
* Architecture Diagram

---

## Author

**Satyam Patel**

Advanced Node.js + AWS Production Architecture Assignment
