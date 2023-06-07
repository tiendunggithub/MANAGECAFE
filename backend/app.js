const express = require("express");
// const cors = require("cors");
const app = express();
let port = process.env.PORT || 3000;

app.use(express.static('../frontend'));
const bodyParser = require('body-parser')
// require('dotenv').load()
// app.use(express.json());
// app.use(cors({ origin: true }));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./router') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port, () => {
    console.log('RESTful API server started http://localhost:' + port);
})

// app.get('/', async(request, response) => {
//     const fetchApi = await fetch1('http://localhost:3000/',{
//         method: 'GET',
//         header: {}
//     })
//     const res = await fetchApi.json();
//     response.json(res);
// })