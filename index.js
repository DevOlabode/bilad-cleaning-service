require('dotenv').config();
const express = require('express');

const app = express();
app.get('/', (req, res) => {
    res.send('Bilad Cleaning Service Home Page');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));