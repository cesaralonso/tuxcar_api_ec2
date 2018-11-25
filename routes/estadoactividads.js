const router = require('express').Router();
const Estadoactividad = require('../models/estadoactividad');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoactividad', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadoactividad.all(created_by, req.mysql, (error, data) => {
                        return Estadoactividad.response(res, error, data);
                    })
                } else {
                    return Estadoactividad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoactividad', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estadoactividad.count(req.mysql, (error, data) => {
                        return Estadoactividad.response(res, error, data);
                    })
                } else {
                    return Estadoactividad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoactividad', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estadoactividad.exist(req.params.id, req.mysql, (error, data) => {
                        return Estadoactividad.response(res, error, data);
                    })
                } else {
                    return Estadoactividad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoactividad', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadoactividad.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Estadoactividad.response(res, error, data);
                    })
                } else {
                    return Estadoactividad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoactividad', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadoactividad.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Estadoactividad.response(res, error, data);
                    })
                } else {
                    return Estadoactividad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoactividad', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _estadoactividad = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadoactividad.update(_estadoactividad, created_by, req.mysql, (error, data) => {
                        return Estadoactividad.response(res, error, data);
                    })
                } else {
                    return Estadoactividad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoactividad', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _estadoactividad = req.body;
                    _estadoactividad.created_by = auth_data.user.idsi_user;
                    Estadoactividad.insert( _estadoactividad, req.mysql, (error, data) =>{
                        return Estadoactividad.response(res, error, data);
                    });
                } else {
                    return Estadoactividad.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
