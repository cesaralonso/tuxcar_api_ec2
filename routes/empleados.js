const router = require('express').Router();
const Empleado = require('../models/empleado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/taller', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.allTaller(created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/ordentarea/:idordentarea', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.allByAreaWithIdOrdenTarea(req.params.idordentarea, created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/area/:idarea', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.findByIdArea(req.params.idarea, created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.findByIdPersona(req.params.idpersona, created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/si_user/:idsi_user', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.findByIdSi_user(req.params.idsi_user, created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.all(created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Empleado.count(req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Empleado.exist(req.params.id, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _empleado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleado.update(_empleado, created_by, req.mysql, (error, data) => {
                        return Empleado.response(res, error, data);
                    })
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _empleado = req.body;
                    _empleado.created_by = auth_data.user.idsi_user;
                    Empleado.insert( _empleado, req.mysql, (error, data) =>{
                        return Empleado.response(res, error, data);
                    });
                } else {
                    return Empleado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
