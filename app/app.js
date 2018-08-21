require('./helpers/helpers.js');
const routes = require('./core/RouteMapper');
const express = require('express')
    , cors = require('cors')
    , app = express();
new routes();
const upload = require('./components/NewOrder/UploadController');
const Upload = new upload();




app.use(cors());
process.on('uncaughtException', function (err) {
    console.log(err);
});

app.post('/upload/:user/:order', cors(), Upload.upload.bind(this));

app.listen(4000, function(){
    console.log('CORS-enabled web server listening on port 4000');
});