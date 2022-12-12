const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // id, topic, description, posted_at, posted_by
    topic: String,
    description: String,
    posted_at: Date,
    posted_by: String
})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;