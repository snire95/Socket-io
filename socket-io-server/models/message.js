const getDb = require('../util/database').getDb;

class Message{
 constructor(id,name,content,date){
  this.id = id;
  this.name = name;
  this.content = content;
  this.date = date;
 }
 save(){
  const db = getDb();

  db.collection("room-2").insertMany(res, function(err, res) {
    if (err) return err;
    //Return the result object:
    console.log(res);
    _db.close();
  db.collection('messages')
  .insertOne(this)
  .then(result => {
   console.log(result);
  }).catch(err => {
   console.log(err);
  });
  // })
}
}
module.exports = Message;