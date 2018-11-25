const router = require('express').Router();
const Ciudad = require('../models/ciudad');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'ciudad', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ciudad.all(created_by, req.mysql, (error, data) => {
                        return Ciudad.response(res, error, data);
                    })
                } else {
                    return Ciudad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'ciudad', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Ciudad.count(req.mysql, (error, data) => {
                        return Ciudad.response(res, error, data);
                    })
                } else {
                    return Ciudad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'ciudad', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Ciudad.exist(req.params.id, req.mysql, (error, data) => {
                        return Ciudad.response(res, error, data);
                    })
                } else {
                    return Ciudad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'ciudad', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ciudad.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Ciudad.response(res, error, data);
                    })
                } else {
                    return Ciudad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'ciudad', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ciudad.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Ciudad.response(res, error, data);
                    })
                } else {
                    return Ciudad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'ciudad', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _ciudad = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ciudad.update(_ciudad, created_by, req.mysql, (error, data) => {
                        return Ciudad.response(res, error, data);
                    })
                } else {
                    return Ciudad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'ciudad', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _ciudad = req.body;
                    _ciudad.created_by = auth_data.user.idsi_user;
                    Ciudad.insert( _ciudad, req.mysql, (error, data) =>{
                        return Ciudad.response(res, error, data);
                    });
                } else {
                    return Ciudad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
