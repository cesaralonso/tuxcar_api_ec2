const router = require('express').Router();
const Salidastock = require('../models/salidastock');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/ordentarea/:idordentarea', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Salidastock.findByIdOrdentarea(req.params.idordentarea, created_by, req.mysql, (error, data) => {
                        return Salidastock.response(res, error, data);
                    })
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/stock/:idstock', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Salidastock.findByIdStock(req.params.idstock, created_by, req.mysql, (error, data) => {
                        return Salidastock.response(res, error, data);
                    })
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Salidastock.all(created_by, req.mysql, (error, data) => {
                        return Salidastock.response(res, error, data);
                    })
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Salidastock.count(req.mysql, (error, data) => {
                        return Salidastock.response(res, error, data);
                    })
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Salidastock.exist(req.params.id, req.mysql, (error, data) => {
                        return Salidastock.response(res, error, data);
                    })
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Salidastock.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Salidastock.response(res, error, data);
                    })
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Salidastock.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Salidastock.response(res, error, data);
                    })
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _salidastock = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Salidastock.update(_salidastock, created_by, req.mysql, (error, data) => {
                        return Salidastock.response(res, error, data);
                    })
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'salidastock', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _salidastock = req.body;
                    _salidastock.created_by = auth_data.user.idsi_user;
                    Salidastock.insert( _salidastock, req.mysql, (error, data) =>{
                        return Salidastock.response(res, error, data);
                    });
                } else {
                    return Salidastock.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
