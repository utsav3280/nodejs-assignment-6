const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();
//connect to DB
mongoose.connect("mongodb://localhost/blogging", () => {
    console.log('connected to DB')
})
// process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }

app.listen(3000, () => console.log('Server running......')); 

   