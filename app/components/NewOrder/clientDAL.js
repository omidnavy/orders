const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class RegisterModel extends DatabaseModel {
    static prepare(user) {

        let additionalInfo = {
            Role:'client',
            registeredDate: +new Date(),
            Status: 1
        };
        return {...user,...additionalInfo}
    }

};

