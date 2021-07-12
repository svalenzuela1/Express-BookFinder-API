# Express BookFinder API

This Rest API was built using Express.JS with a mongoDB database. The project has been deployed on AWS Elastic Beanstalk.

## Deployed Link

* http://express-bookfinder-api-env.eba-ajpftpv3.us-east-2.elasticbeanstalk.com


## Local Installation

Someone else can fork, clone, and run the application locally by visiting my GitHub: https://github.com/svalenzuela1 
and clicking on this repository titled: Express-BookFinder-API. How to run this project after forking, use your terminal on Visual Studio Code to:

### 1. Install packages and dependencies

### `npm install`

### 2. Start the application in local browser

### `npm start`

**Note: npm start run the app in development mode. This will direct you to `localhost:3000`,**

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## API Routes

* Get All Books
### GET `/books`

Response
```json
{
  "statusCode": 200,
  "message": "Here all the books that currently exist",
  "allBooks": [
    {
      "authors": [],
      "genre": [],
      "_id": "String",
      "ISBN": Integer,
      "title": "String",
      "releaseDate": "String",
      "__v": 0
    }
  ]
}
```
* Create New Book
### POST `/books`

Example Request Body 
```json
{
    "ISBN": 200,
    "authors": ["J.K Rowling"],
    "title": "Harry Potter and the Sorcerer's Stone",
    "genre": ["Mystery", "Fantasy", "Fiction"],
    "releaseDate": "June 26, 1997"
}
```
* Search For Books

### POST `/books/search`

Example Request Body

```json
{
        "$search": "harry potter"
}
```

* Update A Book

### PATCH `/books/:id`

Example Request Body
```json
  {
   "title": "Harry Potter and the Philosopher's Stone"
  }

```
* Delete a Book
### Delete `/books/:id`
#### No Request Body Needed

Response

```json
{
    "statusCode": 200,
    "message": "Book Has Been Deleted",
    "deleteBook": {
        "authors": [
            "Example Author"
        ],
        "genre": [
            "Fiction"
        ],
        "_id": "60ebdab1019f691172039e01",
        "ISBN": 125,
        "title": "Example Book",
        "releaseDate": "June 1, 2021",
        "__v": 0
    }
}
```


## List of Technologies Used

* Node.JS
* Express.JS
* MongoDB
* AWS
