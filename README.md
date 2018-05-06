# NextPR

Create exercises, add a new personal record, update when you accomlish a new goal!

## About

My goal for this project, from a development standpoint, was to create a full CRUD application with user authentication using Node.js/Express.  Check out the [guide](#guide) for more information.

If you want a checklist of what a basic Node.js/Express application needs, I created a Trello board that can be viewed [here](https://trello.com/b/SzUcXD08/node-express-app-checklist)  

Although this project is not unique, it was a great learning experience for myself and serve as a reference for me and others trying to accomplish similar goals that I had.

## Features

* User Authentication - Uses MongoDB to store user credentials, adhering to best security practices such as hashed passwords, minimum length passwords, and preventing multiple entries using the same email

* CRUD
  * Create -  Add new exercises and personal records
  * Read - Get exercises and personal records from the MongoDB
  * Update - Select a PR and update.  If it's a new PR, it will be saved
  * Delete - Remove exercises and its associate personal records

## Guide

This isn't going to be a comprehensive tutorial because there are many better ones out there (which I'll link to below).  I will try to outline the most important parts of how I went about creating this application.  As mentioned in the **About** section, I created an outline for a basic Node/Express application, which can be found [here](https://trello.com/b/SzUcXD08/node-express-app-checklist)

### Resources

The following tutorials are what I used as my guide as I was creating this application, which both offer different perspectives on how to create a Node/Express application:

| Tutorial | Notes |
| -------- | ---- |
| [MDN Express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) | I recommend going through this tutorial before attemping your own Express app and adhering to the MVC pattern presented in the tutorial in your own projects |
| [Traversy Node.js Course](https://www.udemy.com/nodejs-express-mongodb-dev-to-deployment/) | This is a paid Udemy course, but it's worth it in my opinion.  It is a more beginner friendly course and offers a different perspective for creating Node/Express applications |

### Dependencies

There are several depencies that this application uses.  Below is an outline and links to their NPM/GitHub pages for more information:

| Dependency | Notes |
| ---------- | ----- |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Used to hash passwords before storing in database |
| [connect-flash](https://github.com/jaredhanson/connect-flash) | Display flash messages |
| [express](https://www.npmjs.com/package/express) | Node.js Framework |
| [express-handlebars](https://github.com/ericf/express-handlebars) | Handlebars view engine for Express |
| [express-session](https://github.com/expressjs/session) | Session middleware for Express |
| [mongoose](https://github.com/Automattic/mongoose) | Used to interact with MongoDB |
| [passport](https://github.com/jaredhanson/passport) | Authentication for Node.js |
| [passport-local](https://github.com/jaredhanson/passport-local) | Authentication strategy for Passport and Node |


