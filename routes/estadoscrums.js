const router = require('express').Router();
const Estadoscrum = require('../models/estadoscrum');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoscrum', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadoscrum.all(created_by, req.mysql, (error, data) => {
                        return Estadoscrum.response(res, error, data);
                    })
                } else {
                    return Estadoscrum.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoscrum', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estadoscrum.count(req.mysql, (error, data) => {
                        return Estadoscrum.response(res, error, data);
                    })
                } else {
                    return Estadoscrum.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoscrum', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Estadoscrum.exist(req.params.id, req.mysql, (error, data) => {
                        return Estadoscrum.response(res, error, data);
                    })
                } else {
                    return Estadoscrum.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoscrum', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadoscrum.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Estadoscrum.response(res, error, data);
                    })
                } else {
                    return Estadoscrum.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoscrum', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadoscrum.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Estadoscrum.response(res, error, data);
                    })
                } else {
                    return Estadoscrum.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoscrum', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _estadoscrum = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estadoscrum.update(_estadoscrum, created_by, req.mysql, (error, data) => {
                        return Estadoscrum.response(res, error, data);
                    })
                } else {
                    return Estadoscrum.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'estadoscrum', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _estadoscrum = req.body;
                    _estadoscrum.created_by = auth_data.user.idsi_user;
                    Estadoscrum.insert( _estadoscrum, req.mysql, (error, data) =>{
                        return Estadoscrum.response(res, error, data);
                    });
                } else {
                    return Estadoscrum.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
