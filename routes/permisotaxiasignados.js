const router = require('express').Router();
const Permisotaxiasignado = require('../models/permisotaxiasignado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.findByIdChofer(req.params.idchofer, created_by, req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.findByIdEstado(req.params.idestado, created_by, req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/permisotaxi/:idpermisotaxi', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.findByIdPermisotaxi(req.params.idpermisotaxi, created_by, req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.all(created_by, req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxiasignado.count(req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxiasignado.exist(req.params.id, req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxiasignado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxiasignado.update(_permisotaxiasignado, created_by, req.mysql, (error, data) => {
                        return Permisotaxiasignado.response(res, error, data);
                    })
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxiasignado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxiasignado = req.body;
                    _permisotaxiasignado.created_by = auth_data.user.idsi_user;
                    Permisotaxiasignado.insert( _permisotaxiasignado, req.mysql, (error, data) =>{
                        return Permisotaxiasignado.response(res, error, data);
                    });
                } else {
                    return Permisotaxiasignado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
