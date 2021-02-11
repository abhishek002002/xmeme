// const { truncate } = require('lodash');
const mongoose = require('mongoose');
// const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String ,
        required: true
    },
    body : {
        type: String ,
        required: true
    }
},{ timestamps: true });

const Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;

// Meme