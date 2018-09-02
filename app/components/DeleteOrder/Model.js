const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class RegisterModel extends DatabaseModel {

    constructor() {
        super();
    }

    async remove(user,order) {
        if (!order) return {status: 'error', error: 'bad request'};

        try {
            let result = await this.db.orders.remove({_id : mongo.ObjectId(order), Status : {$lte : 2}});
            console.log(result)
            if (result.ok === 1 && result.deletedCount === 1) {
                deleteFolderRecursive('./upload/' + user + '/' + order + '/' );
                return {status: 'success', id: result._id};
            }
            else return {status: 'error', error: 'can not delete'}
        }
        catch (e) {
            logger('error',e);
            return {status: 'error', error: 'bad request'}
        }
    }

};

