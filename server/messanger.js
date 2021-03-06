const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const redis = require('redis');
const client = redis.createClient();

const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);

mongoClient.connect((err) => {
    if (err) console.log(err);
    const db = mongoClient.db('test101');

    //move app logic in here
    const app = express();
    app.use(bodyParser.json());
    
    app.get('/messanger/getMessages', (req, res) => {
        db.collection('test').find({}).toArray()
          .then((result) => {
            res.send(result.map(r => r.data));
          })
          .catch((e) => console.log(e));
      });

      app.get('/messanger/getMessages2', (req, res) => {
        db.collection('test2').find({}).toArray()
          .then((result) => {
            res.send(result.map(r => r.data));
          })
          .catch((e) => console.log(e));
      });
      
    app.post(('/messanger/postMessage'), (req,res) => {
        console.log(req.body);
        db.collection('test').insertOne({data: req.body.message})
            .then(() => console.log('db instert worked'))
            .catch((e) => console.log(e));
        client.publish('testPublish', req.body.message);
        res.send('ok');
    });

    app.post(('/messanger/postMessage2'), (req,res) => {
      console.log(req.body);
      db.collection('test2').insertOne({data: req.body.message})
          .then(() => console.log('db instert worked'))
          .catch((e) => console.log(e));
      client.publish('testPublish', req.body.message);
      res.send('ok');
  });
    
    app.listen(5000);
    //end app logic
})
