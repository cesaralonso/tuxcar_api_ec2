const router = require('express').Router();
const Choferestado = require('../models/choferestado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Choferestado.findByIdChofer(req.params.idchofer, created_by, req.mysql, (error, data) => {
                        return Choferestado.response(res, error, data);
                    })
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estadoactividad/:idestadoactividad', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Choferestado.findByIdEstadoactividad(req.params.idestadoactividad, created_by, req.mysql, (error, data) => {
                        return Choferestado.response(res, error, data);
                    })
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Choferestado.all(created_by, req.mysql, (error, data) => {
                        return Choferestado.response(res, error, data);
                    })
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Choferestado.count(req.mysql, (error, data) => {
                        return Choferestado.response(res, error, data);
                    })
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Choferestado.exist(req.params.id, req.mysql, (error, data) => {
                        return Choferestado.response(res, error, data);
                    })
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Choferestado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Choferestado.response(res, error, data);
                    })
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Choferestado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Choferestado.response(res, error, data);
                    })
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _choferestado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Choferestado.update(_choferestado, created_by, req.mysql, (error, data) => {
                        return Choferestado.response(res, error, data);
                    })
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'choferestado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _choferestado = req.body;
                    _choferestado.created_by = auth_data.user.idsi_user;
                    Choferestado.insert( _choferestado, req.mysql, (error, data) =>{
                        return Choferestado.response(res, error, data);
                    });
                } else {
                    return Choferestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
