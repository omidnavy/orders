const BaseController = require("../../core/BaseController");
const Model = require("./NewOrderModel");

module.exports = class NewOrderController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    async main(call, callback) {
        let response = await this.model.register(call.request.user, call.request.type, JSON.parse(call.request.order));
        if (response.status === 'error') callback(null, {status: false, msg: response.error});
        else callback(null, {status: true, msg: response.id})
    }
};