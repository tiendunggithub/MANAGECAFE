const express = require("express");
// const cors = require("cors");
const app = express();
let port = process.env.PORT || 3000;

app.use(express.static('../frontend'));
app.use(express.json());
let routes = require('./router') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port, () => {
    console.log('RESTful API server started http://localhost:' + port);
})