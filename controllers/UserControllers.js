require('dotenv').config

const User = require('../models/UserSchema')

const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = process.env

//Create User
router.post('/signup', async (req, res) =>{
    try{
        const newUser = await User.create(req.body)

        res.status(200).json({message: 'User Successfully Created', newUser})

    }catch(error){
        res.status(400).json({error: 'Could Not Create User, Please Try Again.'})
    }
})

//User login
router.post('/login', async (req, res) =>{
    try{
        const {username, password} = req.body

        const user = await User.findOne({username})

        //check if user exists
        if(user){
            const token = await jwt.sign({username}, SECRET)

            res.status(200).json({username, token})
        } else {
            res.status(400).json({error: 'User Does Not Exist'})
        }

    }catch(error){
        res.status(400).json({error: 'Credentials Do Not Match. Please Try Again'})
    }
})

router.delete('/:id', async (req, res, next) =>{
    try {

        if (req.headers.authorization) {

            const token = req.headers.authorization.split(" ")[1]
            const payload = await jwt.verify(token, SECRET)

            // User.findOneAndDelete({_id: req.params.id})

            //query strings
            // const {username} = req.params.username

                if(payload) {
                    req.payload = payload

                    const user = await User.findById({_id: req.params.id})

                    if (user) {
                        await User.findByIdAndDelete({_id: req.params.id})

                        res.status(200).json({
                            message: "User Has Been Deleted"
                        })
                    } else {
                        res.status(400).json({error: "User not found"})
                    }
                } else{

                    res.status(400).json({error: "Not Authorized"})
                }





            } else {

                res.status(400).json({
                    error: "Token Invalid"
                })
            }

    } catch(error){
        res.status(400).json({
            error: error.message //"User Could Not Be Deleted, Try Again"
        })
    }
})

module.exports = router
