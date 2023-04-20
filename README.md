# Introduction
Welcome to Hardware Allocation System, a system for managing different types of hardware and projects. Through this management system, you could create different projects, join and leave projects, and check out or check in a certain amount of hardware from the system for your projects. This user document will help you get started with using our Hardware Allocation System.
# Install
To use Hardware Allocation System, you will need to install and run the client and server of this system first. 
* To run the server, use “cd server” and get into the server directory, and then run “npm start”.
* To run the client, use “cd client” and “npm install” to install it first, and then run “npm start”.
When the server and client start running, the Hardware Allocation System can be reached through localhost. 
For questions met during getting started, read the FAQs part for more information.
# Features
The Hardware Allocation System supports different kinds of features:
## Login/Sign Up
Please use the Sign Up page to sign up for your own account, and then use the sign-in page to login into your account before being able to use our Hardware Allocation system.

## Hardware Information Board
After Login, on the main page, you could see a hardware information board in the top-right part of the website. It represents the amount of hardware that is still available in the system, which changes with checking in or checking out the operation.
## Managing Project
On the left part of the website, you could see different projects that already exist. Join the project before doing any check-in or check-out. Through the project board, you could also learn about the amount of hardware that is already assigned to the project.
## Create New Project
On the bottom-right part of the website, you’ll see a form to create a new project. Fill out the form and submit it. Then you create a new project and manage it immediately!
# FAQs
Q: See the warning about React's version when using “npm install” to install the client?

A: Try running “npm install --force” instead.

Q: See the warning about port such as "address already in use :::5000”?

A: Run "export PORT=3001" and also replace all '5000' with '3001'.

Q: Security problem when using a Mac running the project?

A:  See https://www.lifewire.com/fix-developer-cannot-be-verified-error-5183898 for more information about solving this issue.

Q: See the following error during installation?

A: Run " export NODE_OPTIONS=--openssl-legacy-provider".
