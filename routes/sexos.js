const router = require('express').Router();
const Sexo = require('../models/sexo');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'sexo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Sexo.all(created_by, req.mysql, (error, data) => {
                        return Sexo.response(res, error, data);
                    })
                } else {
                    return Sexo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'sexo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Sexo.count(req.mysql, (error, data) => {
                        return Sexo.response(res, error, data);
                    })
                } else {
                    return Sexo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'sexo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Sexo.exist(req.params.id, req.mysql, (error, data) => {
                        return Sexo.response(res, error, data);
                    })
                } else {
                    return Sexo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'sexo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Sexo.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Sexo.response(res, error, data);
                    })
                } else {
                    return Sexo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'sexo', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Sexo.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Sexo.response(res, error, data);
                    })
                } else {
                    return Sexo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'sexo', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _sexo = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Sexo.update(_sexo, created_by, req.mysql, (error, data) => {
                        return Sexo.response(res, error, data);
                    })
                } else {
                    return Sexo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'sexo', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _sexo = req.body;
                    _sexo.created_by = auth_data.user.idsi_user;
                    Sexo.insert( _sexo, req.mysql, (error, data) =>{
                        return Sexo.response(res, error, data);
                    });
                } else {
                    return Sexo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
