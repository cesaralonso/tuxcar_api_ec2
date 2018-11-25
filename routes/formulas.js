const router = require('express').Router();
const Formula = require('../models/formula');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'formula', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Formula.all(created_by, req.mysql, (error, data) => {
                        return Formula.response(res, error, data);
                    })
                } else {
                    return Formula.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'formula', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Formula.count(req.mysql, (error, data) => {
                        return Formula.response(res, error, data);
                    })
                } else {
                    return Formula.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'formula', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Formula.exist(req.params.id, req.mysql, (error, data) => {
                        return Formula.response(res, error, data);
                    })
                } else {
                    return Formula.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'formula', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Formula.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Formula.response(res, error, data);
                    })
                } else {
                    return Formula.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'formula', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Formula.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Formula.response(res, error, data);
                    })
                } else {
                    return Formula.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'formula', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _formula = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Formula.update(_formula, created_by, req.mysql, (error, data) => {
                        return Formula.response(res, error, data);
                    })
                } else {
                    return Formula.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'formula', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _formula = req.body;
                    _formula.created_by = auth_data.user.idsi_user;
                    Formula.insert( _formula, req.mysql, (error, data) =>{
                        return Formula.response(res, error, data);
                    });
                } else {
                    return Formula.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
