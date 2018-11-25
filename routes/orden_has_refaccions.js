const router = require('express').Router();
const Orden_has_refaccion = require('../models/orden_has_refaccion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/orden/:idorden', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden_has_refaccion.findByIdOrden(req.params.idorden, created_by, req.mysql, (error, data) => {
                        return Orden_has_refaccion.response(res, error, data);
                    })
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/refaccion/:idrefaccion', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden_has_refaccion.findByIdRefaccion(req.params.idrefaccion, created_by, req.mysql, (error, data) => {
                        return Orden_has_refaccion.response(res, error, data);
                    })
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden_has_refaccion.all(created_by, req.mysql, (error, data) => {
                        return Orden_has_refaccion.response(res, error, data);
                    })
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orden_has_refaccion.count(req.mysql, (error, data) => {
                        return Orden_has_refaccion.response(res, error, data);
                    })
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orden_has_refaccion.exist(req.params.id, req.mysql, (error, data) => {
                        return Orden_has_refaccion.response(res, error, data);
                    })
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden_has_refaccion.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Orden_has_refaccion.response(res, error, data);
                    })
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden_has_refaccion.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Orden_has_refaccion.response(res, error, data);
                    })
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _orden_has_refaccion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden_has_refaccion.update(_orden_has_refaccion, created_by, req.mysql, (error, data) => {
                        return Orden_has_refaccion.response(res, error, data);
                    })
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden_has_refaccion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _orden_has_refaccion = req.body;
                    _orden_has_refaccion.created_by = auth_data.user.idsi_user;
                    Orden_has_refaccion.insert( _orden_has_refaccion, req.mysql, (error, data) =>{
                        return Orden_has_refaccion.response(res, error, data);
                    });
                } else {
                    return Orden_has_refaccion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
