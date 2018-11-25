const router = require('express').Router();
const Estadopago = require('../models/estadopago');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadopago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadopago.all(created_by, req.mysql, (error, data) => {
                        return Estadopago.response(res, error, data);
                    })
                } else {
                    return Estadopago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadopago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estadopago.count(req.mysql, (error, data) => {
                        return Estadopago.response(res, error, data);
                    })
                } else {
                    return Estadopago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadopago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estadopago.exist(req.params.id, req.mysql, (error, data) => {
                        return Estadopago.response(res, error, data);
                    })
                } else {
                    return Estadopago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadopago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadopago.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Estadopago.response(res, error, data);
                    })
                } else {
                    return Estadopago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadopago', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadopago.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Estadopago.response(res, error, data);
                    })
                } else {
                    return Estadopago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadopago', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _estadopago = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadopago.update(_estadopago, created_by, req.mysql, (error, data) => {
                        return Estadopago.response(res, error, data);
                    })
                } else {
                    return Estadopago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadopago', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _estadopago = req.body;
                    _estadopago.created_by = auth_data.user.idsi_user;
                    Estadopago.insert( _estadopago, req.mysql, (error, data) =>{
                        return Estadopago.response(res, error, data);
                    });
                } else {
                    return Estadopago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
