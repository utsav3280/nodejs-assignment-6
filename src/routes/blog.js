const router = require('express').Router();
const Blog = require('../models/Blog');
const qstring = require("querystring");
const faker = require("faker");
// Your routing code goes here

// for (let i = 0; i < 20; i++) {
//     Blog.create({
//         topic: "India",
//         description: faker.lorem.text(),
//         posted_at: faker.date.future(),
//         posted_by: faker.name.firstName()
//     })
// }


router.get('/blog', async (req, res) => {
    const data = qstring.parse(req.url.split("?")[1]); // data = {page: "", search: ""}
    const blogs = await Blog.find({ topic: data.search });
    const len = blogs.length;
    const display = [];
    if (len < 5) {
        return res.json({
            status: "success",
            blogs: blogs
        })
    }
    // pages filtering
    let init = 5 * data.page - 5 // 5
    let end = 5 * data.page - 1 // 9
    for (let i = init; i <= end; i++) {
        if (blogs[i]) {
            display.push(blogs[i]);
        }
    }
    res.json({
        status: "success",
        blogs: display
    })
})

router.post("/blog", async (req, res) => {
    const newBlog = await Blog.create(req.body);
    res.json({
        status: "success",
        blog: newBlog
    })
})

router.delete("/blog/:id", async (req, res) => {
    const blog = await Blog.find({ _id: req.params.id });
    await Blog.deleteOne({ _id: req.params.id })
    res.json({
        status: "success",
        deletedBlog: blog
    })
})

router.put("/blog/:id", async (req, res) => {
    await Blog.updateOne({ _id: req.params.id }, { $set: { topic: req.body.topic, description: req.body.description, posted_at: req.body.posted_at, posted_by: req.body.posted_by } })
    const blog = await Blog.find({ _id: req.params.id });
    res.json({
        status: "success",
        updatedBlog: blog
    })
})

module.exports = router;