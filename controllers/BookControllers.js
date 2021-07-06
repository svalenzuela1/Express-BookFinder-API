require("dotenv").config()

//book Schema
const Book = require("../models/BookSchema")
const Genre = require("../models/GenreSchema")

//router
const { Router } = require("express")
const router = Router();

//Get all books
router.get("/", async(req, res) =>{
try{
    const allBooks = await Book.find({})

   //check if there are any books in database
    allBooks ? res.status(200).json({
            statusCode: 200,
            message: "Here all the books that currently exist",
            allBooks
        }) :
        res.status(400).json({
            statusCode: 400,
            error: "There are No Books"
        })


}catch(error){
    res.status(400).json({statusCode: 400, error: "Could not find Books"})
}
})

//Get all books by Query
router.get('/search', async (req, res) =>{
    try{
        //NOTE: research how to modify query alphabetically
        //instead of by release date
        const query = await Book.find(req.query).sort({releaseDate: -1 })

        res.status(200).json({
            statusCode: 200,
            message:"Here are all the books that match the query",
            query
        })
    }catch(error){
        res.status(400).json({statusCode:400, error: "Query didnt work"})
    }
})

//will create Book
router.post("/", async (req, res) =>{

    try {
        const newBook = await Book.create(req.body);


        res.status(200).json({statusCode: 200, newBook});
    } catch(error){
        res.status(400).json({statusCode: 400, error: "Could Not Create Book. Please Try Again"})
    }
})

//Search specific Book
router.get("/search/oneBook", async(req, res) =>{
    try{
        const {title, ISBN} = req.body
        const book = await Book.findOne({title})
        const bookISBN = await Book.findOne({ISBN})

        book ?  res.status(200).json({statusCode: 200, book}) :
            bookISBN ? res.status(200).json({statusCode: 200, bookISBN}) :
                res.status(400).json({error: "No Book Found"})

    } catch(error){
        res.status(400).json({statusCode:400, error: "Error Finding Book, Please Try Again"})
    }
})

//update the Book that is clicked on
router.patch('/update/:id', async(req, res) =>{
    try{
        //find BY ID
        //const {authors, ISBN, title, genre, releaseDate} = req.body
        //const bookAuthors = await Book.findByIdAndUpdate({authors})
        // const bookISBN = Book.findByIdAndUpdate({ISBN})
        // const bookTitle = Book.findByIdAndUpdate({title})
        // const bookGenre = Book.findByIdAndUpdate({genre})
        // const bookReleaseDate = Book.findByIdAndUpdate({releaseDate})

        const book = await Book.findOneAndUpdate({_id: req.params.id}, req.body)

        res.status(200).json({
            statusCode: 200,
            message: "Update was Made",
            book
        })

    }catch(error){
        res.status(400).json({error: "Update was not made"})
    }
})


//STILL WORKING ON THIS ROUTE
//Search By Genre
router.get('/genre', async(req, res) =>{
    try{
        const books = await Genre.find({})

        books ? res.status(200).json({books}) :
            res.status(400).json({error: "Sorry, No books here"})
    }catch(error){
        res.status(400).json(error)
    }
})
module.exports = router
