require('dotenv').config();
const express = require('express');
const path = require('path');

const session = require('express-session');
const flash = require('connect-flash');

const ejsMate = require('ejs-mate');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => {
    res.render('home')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));