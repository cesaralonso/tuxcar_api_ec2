const router = require('express').Router();
const Api = require('../models/api');
// const passport = require('passport');


router    
    .post('/notifications', (req, res, next) => {
        const pushSubscriber = req.body;
        Api.notifications(pushSubscriber, req.mysql, (error, data) => {
            return Api.response(res, error, data);
        });
    })
    .post('/newsletter', (req, res, next) => { 
        Api.newsletter(req.mysql, (error, data) =>{
            return Api.response(res, error, data);
        });
    })

module.exports = router;
