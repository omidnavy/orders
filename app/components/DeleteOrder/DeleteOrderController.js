const BaseController = require("../../core/BaseController");
const Model = require("./Model");

module.exports = class NewOrderController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    async main(call, callback) {
        let response = await this.model.remove(call.request.user, call.request.order);
        if (response.status === 'error') callback(null, {status: false});
        else callback(null, {status: true})
    }
};