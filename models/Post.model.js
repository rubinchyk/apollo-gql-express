const mongoose = require('mongoose');

// MONGOOSE SCHEMA
const PostSchema = new mongoose.Schema({
    "title": {
        "type": {
            "type": "String"
        },
        "required": {
            "type": "Boolean"
        }
    },
    "description": {
        "type": {
            "type": "String"
        }
    }
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;