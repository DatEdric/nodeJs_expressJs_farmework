const express = require('express');
const app = express();
const port = 3000;


app.get('/trang-chu',(req,res) => res.send('hello_world!'));

app.listen(port, () => { console.log(`Example app listening on port ${port}`)});