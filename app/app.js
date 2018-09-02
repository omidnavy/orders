require('./helpers/helpers.js');
const routes = require('./core/RouteMapper');
const express = require('express')
    , cors = require('cors')
    , app = express();

const argv = require('minimist')(process.argv.slice(2));
const port = argv.port || '4000';
new routes();
const upload = require('./components/NewOrder/UploadController');
const Upload = new upload();




app.use(cors());
process.on('uncaughtException', function (err) {
    console.log(err);
});

app.post('/upload/:user/:order', cors(), Upload.upload.bind(this));

app.listen(port, function(){
    console.log(`CORS-enabled web server listening on port ${port}`);
});