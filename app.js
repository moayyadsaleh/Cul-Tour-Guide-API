//Import packages
import express from "express";
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';


// Apply rate limiting middleware to specific routes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max requests per window
    message: 'Too many requests from this IP, please try again later.',
  });


// Validation and sanitization middleware
const validateAndSanitizeInput = [
    // Validate and sanitize input fields using express-validator methods
    body('culturalFact').trim().isString().escape(),
    body('country').trim().isString().escape(),
  
    // Handle validation errors
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]; 


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
const uri = "mongodb+srv://moayyedazzam:0S7oROl68buOOAfX@cluster0.dny87pr.mongodb.net/?retryWrites=true&w=majority";
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

//////////////////////////// Requests Targeting all culturalFacts

//Display all cultural facts
app.get(
    '/cultural-facts',
    validateAndSanitizeInput, // Apply validation and sanitization 
    apiLimiter, // Then apply rate limiting
    async (req, res) => {
      try {
        const foundCulturalFacts = await CulturalFact.find();
        console.log(foundCulturalFacts, 'Cultural facts are successfully fetched');
        res.send(foundCulturalFacts);
      } catch (error) {
        console.error('Error retrieving cultural facts:', error);
        res.status(500).json({ error: 'An error occurred while retrieving cultural facts.' });
      }
    }
  );
//Display a random cultural fact
  app.get('/random-cultural-fact', validateAndSanitizeInput, apiLimiter, async (req, res) => {
    try {
      const randomFact = await CulturalFact.aggregate([{ $sample: { size: 1 } }]);
      if (randomFact.length === 0) {
        res.status(404).send({ error: 'No cultural facts found.' });
      } else {
        res.send(randomFact[0]);
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while retrieving a random cultural fact.' });
    }
  });


  //Add new cultural fact
  app.post(
    '/cultural-facts',
    validateAndSanitizeInput, // Apply validation and sanitization first
    apiLimiter, // Then apply rate limiting
    async (req, res) => {
      try {
        const newCulturalFact = new CulturalFact({
          culturalFact: req.body.culturalFact,
          country: req.body.country
        });
        newCulturalFact.save()
          .then(savedCulturalFact => {
            console.log('Cultural fact is successfully added', savedCulturalFact);
            res.status(201).json(savedCulturalFact);
          })
          .catch(error => {
            console.error('Error adding cultural fact:', error);
            res.status(500).json({ error: 'An error occurred while adding the cultural fact.' });
          });
      } catch (error) {
        console.error('Error processing request:', error);
        res.status(400).json({ error: 'Bad request.' });
      }
    }
  );

  //delete all cultural facts. This is not going to be used in the documentation
  app.delete(
    "/cultural-facts",
    validateAndSanitizeInput, // Apply validation and sanitization first
    apiLimiter, // Then apply rate limiting
    async (req, res) => {
      try {
        const deletedCulturalFacts = await CulturalFact.deleteMany();
        console.log(deletedCulturalFacts, "All articles are successfully deleted");
        res.json(deletedCulturalFacts);
      } catch (error) {
        console.error("Error deleting cultural facts", error);
        res.status(500).send("Error deleting articles");
      }
    }
  );



////////////////////////////Requests Targeting individual culturalFacts
app.get(
    "/cultural-facts/:id",
    validateAndSanitizeInput, // Apply validation and sanitization first
    apiLimiter, // Then apply rate limiting
    async (req, res) => {
      try {
        const factId = req.params.id;
    
        const foundFact = await CulturalFact.findById(factId);
    
        if (foundFact) {
          res.send(foundFact);
        } else {
          res.status(404).send({ error: 'Cultural fact not found.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the cultural fact.' });
      }
    }
  );

  //Request for updating one cultural fact
  app.put(
    "/cultural-facts/:id",
    validateAndSanitizeInput, // Apply validation and sanitization first
    apiLimiter, // Then apply rate limiting
    async (req, res) => {
      try {
        const factId = req.params.id;
    
        // Update both the cultural fact content and country
        const updatedFact = await CulturalFact.findByIdAndUpdate(
          factId,
          {
            culturalFact: req.body.culturalFact,
            country: req.body.country,
          },
          { new: true }
        );
    
        if (updatedFact) {
          res.json(updatedFact);
        } else {
          res.status(404).json({ error: 'Cultural fact not found.'});
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the cultural fact.' });
      }
    }
  );
  


  app.patch(
    "/cultural-facts/:id",
    validateAndSanitizeInput, // Apply validation and sanitization first
    apiLimiter, // Then apply rate limiting
    async (req, res) => {
      try {
        const factId = req.params.id;
    
        // Update specific fields of the cultural fact (culturalFact and/or country)
        const updatedFact = await CulturalFact.findByIdAndUpdate(
          factId,
          { $set: req.body }, //  $set  updates only specified fields
          { new: true }
        );
    
        if (updatedFact) {
          res.send(updatedFact);
        } else {
          res.status(404).send({ error: 'Cultural fact not found.' });
        }
      } catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the cultural fact.' });
      }
    }
  );

  app.delete(
    "/cultural-facts/:id",
    validateAndSanitizeInput, // Apply validation and sanitization first
    apiLimiter, // Then apply rate limiting
    async (req, res) => {
      try {
        const factId = req.params.id;
    
        // Find and delete the cultural fact based on its ID
        const deletedFact = await CulturalFact.findByIdAndDelete(factId);
    
        if (deletedFact) {
          res.json({ message: 'Cultural fact deleted successfully.' });
        } else {
          res.status(404).json({ error: 'Cultural fact not found.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the cultural fact.' });
      }
    }
  );
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


