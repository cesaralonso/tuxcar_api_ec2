const router = require('express').Router();
const Vehiculoestado = require('../models/vehiculoestado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/estadoactividad/:idestadoactividad', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoestado.findByIdEstadoactividad(req.params.idestadoactividad, created_by, req.mysql, (error, data) => {
                        return Vehiculoestado.response(res, error, data);
                    })
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/vehiculo/:idvehiculo', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoestado.findByIdVehiculo(req.params.idvehiculo, created_by, req.mysql, (error, data) => {
                        return Vehiculoestado.response(res, error, data);
                    })
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoestado.all(created_by, req.mysql, (error, data) => {
                        return Vehiculoestado.response(res, error, data);
                    })
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculoestado.count(req.mysql, (error, data) => {
                        return Vehiculoestado.response(res, error, data);
                    })
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculoestado.exist(req.params.id, req.mysql, (error, data) => {
                        return Vehiculoestado.response(res, error, data);
                    })
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoestado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Vehiculoestado.response(res, error, data);
                    })
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoestado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Vehiculoestado.response(res, error, data);
                    })
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _vehiculoestado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoestado.update(_vehiculoestado, created_by, req.mysql, (error, data) => {
                        return Vehiculoestado.response(res, error, data);
                    })
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculoestado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _vehiculoestado = req.body;
                    _vehiculoestado.created_by = auth_data.user.idsi_user;
                    Vehiculoestado.insert( _vehiculoestado, req.mysql, (error, data) =>{
                        return Vehiculoestado.response(res, error, data);
                    });
                } else {
                    return Vehiculoestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
