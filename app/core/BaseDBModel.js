/*
Simple MYSQL DB Class using pools and basic query function.
you can extend this class as you need or change it to another DB
 */
const argv = require('minimist')(process.argv.slice(2));
const env = argv.enviroment || 'home';
const config = require('./config/database')[env];



const bluebird = require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis);

const client = redis.createClient({host: config.host});
client.on('connect', () => console.log('redis connected\n'));
client.on('error', (e) => logger('error', e));


const mongojs = require('mongoist');
const url = `mongodb://${config.host}:27017/orders`;
const BaseModel = require('./BaseModel');

const db = mongojs(url, {useNewUrlParser: true});
const onConnectionError = (e) => {
    logger('error', e);
};
db.on('error', onConnectionError);

db.on('connect', function () {
    console.log('database connected')
});
// db.dropDatabase()
(async () => {
    try {
        await db.createCollection('orders', {autoIndexId: true});
    }
    catch (e) {
        if (e.codeName !== 'NamespaceExists') logger('error', e)
    }
})();


module.exports = class BaseDBModel extends BaseModel {
    constructor() {
        super();
        this.db = db;
        this.redis = client;
    }


};