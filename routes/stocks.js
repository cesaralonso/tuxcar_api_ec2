const router = require('express').Router();
const Stock = require('../models/stock');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'stock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Stock.all(created_by, req.mysql, (error, data) => {
                        return Stock.response(res, error, data);
                    })
                } else {
                    return Stock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'stock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Stock.count(req.mysql, (error, data) => {
                        return Stock.response(res, error, data);
                    })
                } else {
                    return Stock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'stock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Stock.exist(req.params.id, req.mysql, (error, data) => {
                        return Stock.response(res, error, data);
                    })
                } else {
                    return Stock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'stock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Stock.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Stock.response(res, error, data);
                    })
                } else {
                    return Stock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'stock', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Stock.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Stock.response(res, error, data);
                    })
                } else {
                    return Stock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'stock', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _stock = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Stock.update(_stock, created_by, req.mysql, (error, data) => {
                        return Stock.response(res, error, data);
                    })
                } else {
                    return Stock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'stock', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _stock = req.body;
                    _stock.created_by = auth_data.user.idsi_user;
                    Stock.insert( _stock, req.mysql, (error, data) =>{
                        return Stock.response(res, error, data);
                    });
                } else {
                    return Stock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
