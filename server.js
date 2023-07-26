const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://codersaro:Sarorosy12@cluster0.av48khu.mongodb.net/';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

// Create a Mongoose model for the form data
const FormData = mongoose.model('FormData', formDataSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Handling form submissions
app.post('/submit-form', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    try {
      // Create a new FormData instance with the submitted data
      const formData = new FormData({
        name,
        email,
        subject,
        message,
      });
  
      // Save the form data to the database
      await formData.save();
      res.redirect('/thankyou.html'); // Redirect to a thank you page after successful form submission
    } catch (err) {
      console.error('Error saving data:', err);
      res.sendStatus(500);
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
