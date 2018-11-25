const router = require('express').Router();
const Pagofianza = require('../models/pagofianza');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.findByIdChofer(req.params.idchofer, created_by, req.mysql, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/pago/:idpago', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.findByIdPago(req.params.idpago, created_by, req.mysql, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.all(created_by, req.mysql, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pagofianza.count(req.mysql, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pagofianza.exist(req.params.id, req.mysql, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _pagofianza = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.update(_pagofianza, created_by, req.mysql, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _pagofianza = req.body;
                    _pagofianza.created_by = auth_data.user.idsi_user;
                    Pagofianza.insert( _pagofianza, req.mysql, (error, data) =>{
                        return Pagofianza.response(res, error, data);
                    });
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
