
import express from "express";
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));


const uri = 'mongodb://127.0.0.1:27017/culturalFactsDB';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose connected to ' + uri);
});

db.on('error', error => {
    console.error('Mongoose connection error:', error);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

//Create and add cultural facts to the DB
const culturalFactsToAdd = [
    { culturalFact: 'Fact 1', country: 'Country A' },
    { culturalFact: 'Fact 2', country: 'Country B' },
    // Add more objects as needed
  ];

  
//Now lets add the cultural facts through code
//CulturalFact.insertMany()
//.then(insertedDocs => {
    //console.log('Documents inserted:', insertedDocs);
  //})
  //.catch(error => {
    //console.error('Error inserting documents:', error);
 // });

const culturalFactSchema = new mongoose.Schema({
  culturalFact: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const CulturalFact = mongoose.model('CulturalFact', culturalFactSchema);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
