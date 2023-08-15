//Import packages
import express from "express";
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
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

// Define the culturalFactSchema
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

  //Define Model
  const CulturalFact = mongoose.model('CulturalFact', culturalFactSchema );

//////////////////////////// Create RESTful API: Requests Targeting all culturalFactS

//Display all cultural facts
app.get('/cultural-facts', async (req, res) => {
    try {
      const foundCulturalFacts = await CulturalFact.find();
      console.log(foundCulturalFacts, "Cultural facts are successfully fetched");
      res.send(foundCulturalFacts); 
    } catch (error) {
      console.error('Error retrieving cultural facts:', error);
      res.status(500).json({ error: 'An error occurred while retrieving cultural facts.' });
    }
  });

  //Add new cultural fact

  app.post('/cultural-facts', async (req, res) => {
    try {
      console.log(req.body.culturalFact);
      console.log(req.body.country);
      const newCulturalFact = new CulturalFact({
        culturalFact: req.body.culturalFact,
        country: req.body.country
      });
      newCulturalFact.save()
        .then(savedCulturalFact => {
          console.log("Cultural fact is successfully added", savedCulturalFact);
          res.status(201).json(savedCulturalFact);
        })
        .catch(error => {
          console.error("Error adding cultural fact:", error);
          res.status(500).json({ error: "An error occurred while adding the cultural fact." });
        });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(400).json({ error: "Bad request." });
    }
  });




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});