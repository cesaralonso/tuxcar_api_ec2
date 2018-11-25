const router = require('express').Router();
const Tipoprecio = require('../models/tipoprecio');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tipoprecio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipoprecio.all(created_by, req.mysql, (error, data) => {
                        return Tipoprecio.response(res, error, data);
                    })
                } else {
                    return Tipoprecio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tipoprecio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tipoprecio.count(req.mysql, (error, data) => {
                        return Tipoprecio.response(res, error, data);
                    })
                } else {
                    return Tipoprecio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tipoprecio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tipoprecio.exist(req.params.id, req.mysql, (error, data) => {
                        return Tipoprecio.response(res, error, data);
                    })
                } else {
                    return Tipoprecio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tipoprecio', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipoprecio.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Tipoprecio.response(res, error, data);
                    })
                } else {
                    return Tipoprecio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tipoprecio', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipoprecio.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Tipoprecio.response(res, error, data);
                    })
                } else {
                    return Tipoprecio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tipoprecio', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _tipoprecio = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipoprecio.update(_tipoprecio, created_by, req.mysql, (error, data) => {
                        return Tipoprecio.response(res, error, data);
                    })
                } else {
                    return Tipoprecio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tipoprecio', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _tipoprecio = req.body;
                    _tipoprecio.created_by = auth_data.user.idsi_user;
                    Tipoprecio.insert( _tipoprecio, req.mysql, (error, data) =>{
                        return Tipoprecio.response(res, error, data);
                    });
                } else {
                    return Tipoprecio.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
