## Backend Development
## Day - 1
### Let's understand two major components
1) A programming Language (eg -: Js,Java,C++)
<br />
2) A Database (eg -: Mongo,Postgres,MySQL)

### What is Backend ?
#### The backend refers to the server-side of an application where data is processed and managed. It involves communicating with a database, handling API requests, and implementing logic that manipulates or retrieves data. The backend ensures the proper functioning of the application's business logic and data storage.

### JavaScript based backend -: 
### Handling -: file,data,third party (APIs)


### Some essential file/folder structure

## Src -: 
(files) <br />
package.json, .env, (Readme,git,lint,prettier etc)
#### Index.js, App, Constant

#### (directories) -: 
(DB, Models,Controllers, Routes,Middlewares, Utils, More (Depends) )


### The three main components of backend

1) <strong>Server</strong> -: This is the computer or system that listens for requests from users (through the frontend) and responds. It runs the backend logic and coordinates the whole process of handling data.

<br />

2) <strong>Database</strong> -: This is where the data is stored. The backend interacts with the database to save, update, retrieve, or delete data.

3) <strong>API</strong> -: The API is like a bridge between the frontend and backend. It defines how different parts of the system communicate and exchange data. When the frontend needs information, it sends a request to the backend via the API.

## Day - 2

### Learnt simple way to connect BackEnd with FrontEnd

``` javascript

server.js (Main Backend code)

// Creating our server here

import express from "express";

const app = express()

// Creating our route here

// app.get('/', (req,res) => {
//      res.send('<h1>Server is Ready</h1>')
// })

// Creating a middleware

app.use(express.static('dist'));

// Creating our second route to send our json data
app.get('/api/jokes',(req,res) => {
     const jokes = [
          {
               id:1,
               title:'first',
               joke:'This is our first joke'
          },
          {
               id:2,
               title:'second',
               joke:'This is our second joke'
          },
          {
               id:3,
               title:'third',
               joke:'This is our third joke'
          }
     ]
     res.send(jokes)
})

const port = process.env.PORT || 7000

app.listen(port,() => {
     console.log(`Server is running at http://localhost:${port}`)
})
```
### FrontEnd code

``` javascript 
// App.jsx (Main frontEnd code)

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);

  // using useEffect hook to render data is being fetched from axios

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Full Stack App</h1>
      <div>
        <h3>Jokes -: {jokes.length}</h3>
        {jokes.map((items,index) => (
              <div key={index}>
              <p>Id -: {items.id}</p>
              <p>Title -: {items.title}</p>
              <p>Title -: {items.joke}</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default App;

```

### The important things to do in viteConfig.js (Add proxy to replace the cors policy)

``` javascript
// vite.config.js (part of frontEnd)

export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:7000',
    }
  },
  plugins: [react()],
})
```

## Day_3 (Learnt about data modeling)

#### Steps to create Db Schema 
1) npm i mongoose, (import it into your file) <br />

2) create a schema (like userSchema, accountSchema etc) <br />

3) create a model and export it (just remember model name should be in upperCase)

### Examples

#### userModel-:  ( Each user has a unique username, an email, and a password.)

``` javascript
// user.model.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Reference to posts created by this user
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

```

#### PostModel -: (Each post has a title, content, author (reference to a User), a category, and an array of comments.)

``` javascript
// post.model.js

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'  // Reference to the Category model
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'  // Reference to the Comment model
    }]
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);

```

### Comment Model -: (Each comment has text, a reference to the user who created it, and the post it belongs to)

``` javascript
// comment.model.js

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',  // Reference to the Post model
        required: true
    }
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);

```

#### Category Model-: (Each category has a name and an array of posts associated with it.)

``` javascript
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'  // Reference to the Post model
    }]
});

export const Category = mongoose.model('Category', categorySchema);

```