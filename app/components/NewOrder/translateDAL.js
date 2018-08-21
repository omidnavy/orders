const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class RegisterModel extends DatabaseModel {
    static prepare(order) {
        let SpecificInfocInfo = {
            Language: order.Language,
            Field: order.Field,
            OptionTables: !!+order.OptionTables || false,
            OptionReferences: !!+order.OptionReferences || false,
            OptionFootnotes: !!+order.OptionFootnotes || false,
            OptionShapes: !!+order.OptionShapes || false
        };
        let additionalInfo = {
            Type: 'translate',
            SubmitDate: +new Date(),
            Status: 0
        };


        return {...additionalInfo, SpecificInfocInfo}
    }

};

