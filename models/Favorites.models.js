const {Schema, model} = require('mongoose')

const favoritesModel = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'user'},
    book: {type: Schema.Types.ObjectId, ref: 'book'}
})

const Favorites = model('favorites', favoritesModel)