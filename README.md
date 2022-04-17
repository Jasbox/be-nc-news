# Northcoders News API

### Link to the hosted version:

https://jason-be-nc-news.herokuapp.com/api/


## Summary:

This is the backend project for the Northcoder News API, a news website. 
It has many endpoints to navigate the database linking to articles, topics, users and comments. You can interact with the data in the form of GET, POST, PATCH, DELETE request.


### Link to clone the repo locally:

In the terminal
```
$ git clone https://github.com/Jasbox/be-nc-news.git
```

## .env files

For this repo to work locally, two .env files must be created in the main folder.

in the file named:  ```.env.development``` 
copy and paste below:
```
PGDATABASE=nc_news
```
in the file named:  ```.env.test``` 
copy and paste below:
```
PGDATABASE=nc_news_test
```

## Setup

### To install the dependencies:

In the terminal
```
$ npm install
```

### To seed the databases:

In the terminal
```
npm run setup-dbs
npm run seed
```

### To run the test suites:
In the terminal
```
npm test
```

### To run the app test alone:
In the terminal
```
npm test app.test.js
```

### This repo was created by using ```node.js``` v16.13.0 and ```postgres``` 14.2.