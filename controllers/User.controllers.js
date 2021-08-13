require('dotenv').config

const User = require('../models/User.models')

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

module.exports = router
