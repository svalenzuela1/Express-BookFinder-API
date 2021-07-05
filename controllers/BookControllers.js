require("dotenv").config()

//book Schema
const Book = require("../models/BookSchema")

//router
const { Router } = require("express")
const router = Router();

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
router.get("/searchOne", async(req, res) =>{
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


module.exports = router
