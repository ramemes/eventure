# Project Name

[![Deployment](https://img.shields.io/badge/Deployed-Live-green)](https://eventure-three.vercel.app/)

This project is a web application built using **Convex Dev** for backend infrastructure and **Clerk** for user authentication. It allows staff members to create events, users to join/book events, and integrates with Google Calendar to add events.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Demo Accounts](#demo-accounts)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contact](#contact)

## Project Overview

This app provides the following functionalities:
- **Staff members** can create and manage events.
- **Users** can book or join events.
- Add events to google calendar
  
## Demo Accounts

To help you test the application without needing to sign up, we have provided the following test accounts:

- **User Account**:
  - Email: `user+clerk_test@example.com`
  - Password: `ThisIsATestAccount123!`
  
- **Staff Account**:
  - Email: `admin+clerk_test@example.com`
  - Password: `ThisIsATestAccount123!`


## Technologies Used
- **Next.js** (Frontend)
- **Convex Dev** (Backend/Database)
- **Clerk** (Authentication)

## Getting Started

### Running Locally

To run the application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ramemes/eventure.git
   cd eventure
   
2. **Install Dependencies and Initialise Convex**:
   ```bash
   npm i
   npx convex dev
  You will be asked to name your new project and create a convex account.
  This will initialise convex and add Convex environment variables automatically (.env.local)

3. **Setting up Authentication**:
  - Head over to Clerk (https://dashboard.clerk.com/), create an account, and set up a new project.

  - In the project configuration page, find your API keys in the API Keys section. Add these to your .env.local file
    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_********* 
    CLERK_SECRET_KEY=sk_test_*********
    ```
  In your project settings, create a new JWT template and select the Convex option.
  Copy the Issuer URL from your newly created Convex JWT template.

  Navigate to convex/auth.config.ts in your local project.
  Replace the existing domain URL with the Issuer URL you copied from your Convex JWT template.


Run the Application:

npm run dev
npx convex dev
The app should now be running at http://localhost:3000.