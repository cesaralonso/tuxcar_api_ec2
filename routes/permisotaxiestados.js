const router = require('express').Router();
const Permisotaxiestado = require('../models/permisotaxiestado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/estadoactividad/:idestadoactividad', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiestado.findByIdEstadoactividad(req.params.idestadoactividad, created_by, req.mysql, (error, data) => {
                        return Permisotaxiestado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/permisotaxi/:idpermisotaxi', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiestado.findByIdPermisotaxi(req.params.idpermisotaxi, created_by, req.mysql, (error, data) => {
                        return Permisotaxiestado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiestado.all(created_by, req.mysql, (error, data) => {
                        return Permisotaxiestado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxiestado.count(req.mysql, (error, data) => {
                        return Permisotaxiestado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxiestado.exist(req.params.id, req.mysql, (error, data) => {
                        return Permisotaxiestado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiestado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Permisotaxiestado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiestado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Permisotaxiestado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxiestado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiestado.update(_permisotaxiestado, created_by, req.mysql, (error, data) => {
                        return Permisotaxiestado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiestado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxiestado = req.body;
                    _permisotaxiestado.created_by = auth_data.user.idsi_user;
                    Permisotaxiestado.insert( _permisotaxiestado, req.mysql, (error, data) =>{
                        return Permisotaxiestado.response(res, error, data);
                    });
                } else {
                    return Permisotaxiestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
