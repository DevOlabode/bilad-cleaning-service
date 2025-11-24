require('dotenv').config();
const express = require('express');
const path = require('path');

const ejsMate = require('ejs-mate');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bilad Cleaning Service Home Page');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));