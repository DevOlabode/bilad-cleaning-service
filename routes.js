const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('home')
});

router.get('/residential', (req, res)=>{
    res.render('services/residential')
});

router.get('/airbnb', (req, res) =>{
    res.render('services/airbnb')
});

module.exports = router;