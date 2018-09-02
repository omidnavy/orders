/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */
const mongo = require('mongodb');

const DatabaseModel = require('../../core/BaseDBModel');
const Translate = require('./translateDAL');
module.exports = class NewOrderModel extends DatabaseModel {

    constructor() {
        super();
    }

    async register(user, type, order) {
        if (!user) return {status: 'error', error: 'bad request'};
        let additionalInfo ;
        if (type === 'translate') {
            if (!order.Language || !order.Field) return {status: 'error', error: 'bad request'};
            else additionalInfo = Translate.prepare(order);
        }
        let basicInfo = {
            UserID: user,
            OrderSubject: order.OrderSubject || '',
            RequestDate: order.RequestDate || null,
            Description: order.Description || null,
            DiscountCoupon: order.DiscountCoupon || null,
        };
        try {
            let result = await this.db.orders.insert({...basicInfo,...additionalInfo});
            if (result._id) return {status: 'success', id: result._id};
            else return {status: 'error', error: 'can not insert'}
        }
        catch (e) {
            console.log(e)
        }
    }

    upload(order){
        return this.db.orders.update({_id : mongo.ObjectId(order)},{$set : {Status : 1}});
    }
};

