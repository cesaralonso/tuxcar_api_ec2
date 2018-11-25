const router = require('express').Router();
const Dashboard = require('../models/dashboard');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            Dashboard.all(req.mysql, (error, data) => {
                return Dashboard.response(res, error, data);
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'dashboard', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Dashboard.findByChofer(req.params.id, created_by, req.mysql, (error, data) => {
                        return Dashboard.response(res, error, data);
                    })
                } else {
                    return Dashboard.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
  

module.exports = router;
