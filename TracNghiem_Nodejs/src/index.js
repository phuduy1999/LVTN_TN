require('dotenv').config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');

var cors = require('cors')

const app = express();
const port = 5000;

app.use(cors())

//tu nap index.js
//const route=require('./routes/index.js');
const route = require('./routes');

//chi ra static folder
app.use(express.static(path.join(__dirname, 'public')));

//midleware xu ly parse body(npm body parse)
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//HTTP logger
// app.use(morgan('combined'))

// console.warn(__dirname,path.join(__dirname,'resources/views'))

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
