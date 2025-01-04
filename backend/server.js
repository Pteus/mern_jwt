require('dotenv').config();
const express = require('express');

const app = express();

// middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

app.get('/', (req, res) => {
    res.json({message: 'Hello World!'});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})