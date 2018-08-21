const BaseController = require("../../core/BaseController");
const Model = require("./RegisterModel");
const multiparty = require('multiparty')
    , fs = require('fs');
module.exports = class UploadController extends BaseController {
    constructor() {
        super();
    }

    upload(req, res) {
        if (!fs.existsSync('./upload/' + req.params.user)) fs.mkdirSync('./upload/' + req.params.user);
        if (!fs.existsSync('./upload/' + req.params.user + '/' + req.params.order)) fs.mkdirSync('./upload/' + req.params.user + '/' + req.params.order);
        this.model = new Model();

        let form = new multiparty.Form();
        form.parse(req, async function (err, fields, files) {
            await this.model.upload(req.params.order);
            res.status(201).send('success')

        }.bind(this));
        form.on('file', function (name, file) {
            moveFile(file.path, './upload/' + req.params.user + '/' + req.params.order + '/' + file.originalFilename)
        });
    }
};