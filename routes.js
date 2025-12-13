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

router.get('/office-cleaning', (req, res)=>{
    res.render('services/officeCleaning')
});

router.get('/commercial', (req, res) =>{
    res.render('services/officeCleaning')
});

router.get('/operation', (req, res)=>{
    res.render('plan/operation')
});

router.post('/contact', (req, res) => {
    const { name, email, phone, service, message } = req.body;
    
    // TODO: Implement email sending functionality here
    // For now, just flash a success message
    req.flash('success', 'Thank you for contacting us! We will get back to you soon.');
    res.redirect('/#contact');
});

module.exports = router;