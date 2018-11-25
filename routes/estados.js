const router = require('express').Router();
const Estado = require('../models/estado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estado.all(created_by, req.mysql, (error, data) => {
                        return Estado.response(res, error, data);
                    })
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estado.count(req.mysql, (error, data) => {
                        return Estado.response(res, error, data);
                    })
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estado.exist(req.params.id, req.mysql, (error, data) => {
                        return Estado.response(res, error, data);
                    })
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Estado.response(res, error, data);
                    })
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Estado.response(res, error, data);
                    })
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _estado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estado.update(_estado, created_by, req.mysql, (error, data) => {
                        return Estado.response(res, error, data);
                    })
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _estado = req.body;
                    _estado.created_by = auth_data.user.idsi_user;
                    Estado.insert( _estado, req.mysql, (error, data) =>{
                        return Estado.response(res, error, data);
                    });
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
