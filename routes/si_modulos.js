const router = require('express').Router();
const Si_modulo = require('../models/si_modulo');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'si_modulo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_modulo.all(created_by, req.mysql, (error, data) => {
                        return Si_modulo.response(res, error, data);
                    })
                } else {
                    return Si_modulo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'si_modulo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_modulo.count(req.mysql, (error, data) => {
                        return Si_modulo.response(res, error, data);
                    })
                } else {
                    return Si_modulo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'si_modulo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Si_modulo.exist(req.params.id, req.mysql, (error, data) => {
                        return Si_modulo.response(res, error, data);
                    })
                } else {
                    return Si_modulo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'si_modulo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_modulo.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Si_modulo.response(res, error, data);
                    })
                } else {
                    return Si_modulo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'si_modulo', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_modulo.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Si_modulo.response(res, error, data);
                    })
                } else {
                    return Si_modulo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'si_modulo', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _si_modulo = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Si_modulo.update(_si_modulo, created_by, req.mysql, (error, data) => {
                        return Si_modulo.response(res, error, data);
                    })
                } else {
                    return Si_modulo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'si_modulo', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _si_modulo = req.body;
                    _si_modulo.created_by = auth_data.user.idsi_user;
                    Si_modulo.insert( _si_modulo, req.mysql, (error, data) =>{
                        return Si_modulo.response(res, error, data);
                    });
                } else {
                    return Si_modulo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
