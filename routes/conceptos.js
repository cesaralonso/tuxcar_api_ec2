const router = require('express').Router();
const Concepto = require('../models/concepto');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'concepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Concepto.all(created_by, req.mysql, (error, data) => {
                        return Concepto.response(res, error, data);
                    })
                } else {
                    return Concepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'concepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Concepto.count(req.mysql, (error, data) => {
                        return Concepto.response(res, error, data);
                    })
                } else {
                    return Concepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'concepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Concepto.exist(req.params.id, req.mysql, (error, data) => {
                        return Concepto.response(res, error, data);
                    })
                } else {
                    return Concepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'concepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Concepto.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Concepto.response(res, error, data);
                    })
                } else {
                    return Concepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'concepto', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Concepto.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Concepto.response(res, error, data);
                    })
                } else {
                    return Concepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'concepto', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _concepto = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Concepto.update(_concepto, created_by, req.mysql, (error, data) => {
                        return Concepto.response(res, error, data);
                    })
                } else {
                    return Concepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'concepto', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _concepto = req.body;
                    _concepto.created_by = auth_data.user.idsi_user;
                    Concepto.insert( _concepto, req.mysql, (error, data) =>{
                        return Concepto.response(res, error, data);
                    });
                } else {
                    return Concepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
