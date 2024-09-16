const express = require('express');
const app = express();
const cors = require('cors'); 
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

app.use(cors());
// Middleware for parsing request bodies
app.use(express.json()); // Built-in JSON parser

app.use('/user', userRouter);
app.use('/post', postRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
