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

## Notes

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

### Models

For this project there are three models:  User, Pr, and Exercise. Keep in mind that every document created in a MongoDB database has a unique *_id* property to identify it.

#### Exercise Model

When first developing this application, I didn't connect exercises with users because I was intending it to just be a general database of exercises, but after testing I discovered this was the wrong approach.

Every user should have its own exercises they want added.  With my previous approach, if a user created an exercise like "Bench Press" and another user created an exercise with the same name, a flash message would appear stating that the "exercise already exist" and it wouldn't register/save for that user.

After refactoring, the Exercise Model looks like this:

```js
name: { type: String, required: true },
group: { type: String, required: true },
user_id: { type: Schema.ObjectId, ref: 'users', required: true }
```

As shown above, every exercise created will have an associated user with it and, when getting a users personal records, their associated exercises are also retrieved based on the user_id.

#### Pr Model

```js
reps: { type: Number, required: true },
weight: { type: Number, required: true },
exercise_id: { type: Schema.ObjectId, ref: 'exercises' },
user_id: { type: Schema.ObjectId, ref: 'users', required: true }
```

Every Pr record is associated with a user and an exercise, which are both retrieved based on their unique ObjectId.

#### User Model

The User Model is a basic model with a username, email and password

```js
username: { type: String, required: true },
email: { type: String, required: true },
password: { type: String, required: true }
```

---

### Views

Views for this project are initially set up in the *app.js* file by first requiring the **express-handlebars** package then set up the view engine middleware:

```js
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
```

More information for setting up handlebars with express can be found at the [express-handlebars](https://github.com/ericf/express-handlebars) GitHub page.

#### Note about using external CSS and JavaScript with Views

This project uses the [Materialize CSS](https://materializecss.com/) Framework, which can either be downloaded or imported or, in the case of this application, an external CDN link is used to import the CSS and JavaScript.

This project also uses some jQuery to utilize some of the JavaScript interactions that Materialize CSS relies on.  These jQuery methods have to be defined in a separate file for custom JavaScrpt/jQuery, which is then imported in the standard way using script tags like so

```html
<script src="../../js/index.js"></script>
```

Notice how the above script tag goes up two levels before going into the *js* folder then the *index.js* file to get the custom jQuery.  When I started developing this application initially my script tag looked like this:

```html
<script src="js/index.js"></script>
```

For the main **index.js* view, this was correct.  But since I'm using *handlebars* as my view engine, changes had to be made to the script src attribute.  For every level my view went down, I hade to reach up one level to reach my *js* folder.

For example, after I created **pr** routes (```localhost:5000/pr```), my script src had to be changed to ```../js/index.js```

