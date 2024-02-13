# RapidNodeInit

RapidNodeInit is a lightweight and fast Node.js backend starter kit that provides a quick setup for your backend development projects. It is designed to give you a solid foundation so you can focus on building your application.

## Features

- 🚀 Quick and easy setup
- ⚙️ Minimalistic configuration
- 🌐 Express.js for a robust web server
- 📦 Node.js for backend JavaScript
- 🔄 Git-friendly with a simple .gitignore

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

To kickstart your backend development with RapidNodeInit, follow these steps:

1. Open your terminal and run the following command to install RapidNodeInit globally:

   ```bash
   npm i rapidnodeinit 

This will create the backend folder structure for your project.

2. After installation, just run the following command:
   ```bash
   npx rapidnode init
* If you want to add the files in a custom folder just add the folder path in the argument of the above command. For example: 
    ```bash
    npx rapidnode init exampleFolder
3. Create a `.env` file in the 'backend' directory with the following content:
    ```env
    PORT_NUM=<your desired port number>
    MONGODB_CONNECTION_STRING=<your MongoDB connection string>
    JWT_SECRET_KEY=<your JWT secret key>

Make sure to replace `<your desired port number>`, `<your MongoDB connection string>`, and `<your JWT secret key>` with your actual preferences.

4. Additionally, it is advisable to create a `.gitignore` file in the 'backend' directory with the following content:
    ```plaintext
    node_modules
    .env
    *.DS_Store
    package-lock.json
    
This will ensure that sensitive information and unnecessary files are excluded from version control.

Now, you're all set! You can start building your application on top of this lightweight and fast Node.js backend foundation.
