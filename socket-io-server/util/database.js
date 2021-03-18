const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
 MongoClient.connect('mongodb+srv://snir_el:wiQS81wS8RL8NyhR@cluster0.vfqzm.mongodb.net/shop?retryWrites=true', {
  useUnifiedTopology: true ,
 }
 )
 .then(client => {
  console.log('Connected to MongoDb');
  _db = client.db()

  callback()
 })
 .catch(err => {
  console.log(err)
  return err
 });
};

const getDb = () =>{
 if(_db){
  return _db;
 }
 return 'No database found!'
};
// module.exports = mongoConnect;

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;