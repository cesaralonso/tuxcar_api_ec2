const router = require('express').Router();
const Ordenestado = require('../models/ordenestado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/estadopago/:idestadopago', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenestado.findByIdEstadopago(req.params.idestadopago, created_by, req.mysql, (error, data) => {
                        return Ordenestado.response(res, error, data);
                    })
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/orden/:idorden', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenestado.findByIdOrden(req.params.idorden, created_by, req.mysql, (error, data) => {
                        return Ordenestado.response(res, error, data);
                    })
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenestado.all(created_by, req.mysql, (error, data) => {
                        return Ordenestado.response(res, error, data);
                    })
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Ordenestado.count(req.mysql, (error, data) => {
                        return Ordenestado.response(res, error, data);
                    })
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Ordenestado.exist(req.params.id, req.mysql, (error, data) => {
                        return Ordenestado.response(res, error, data);
                    })
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenestado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Ordenestado.response(res, error, data);
                    })
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenestado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Ordenestado.response(res, error, data);
                    })
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _ordenestado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenestado.update(_ordenestado, created_by, req.mysql, (error, data) => {
                        return Ordenestado.response(res, error, data);
                    })
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenestado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _ordenestado = req.body;
                    _ordenestado.created_by = auth_data.user.idsi_user;
                    Ordenestado.insert( _ordenestado, req.mysql, (error, data) =>{
                        return Ordenestado.response(res, error, data);
                    });
                } else {
                    return Ordenestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
