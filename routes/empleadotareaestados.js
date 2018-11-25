const router = require('express').Router();
const Empleadotareaestado = require('../models/empleadotareaestado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/empleadotarea/:idempleadotarea', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotareaestado.findByIdEmpleadotarea(req.params.idempleadotarea, created_by, req.mysql, (error, data) => {
                        return Empleadotareaestado.response(res, error, data);
                    })
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estadoscrum/:idestadoscrum', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotareaestado.findByIdEstadoscrum(req.params.idestadoscrum, created_by, req.mysql, (error, data) => {
                        return Empleadotareaestado.response(res, error, data);
                    })
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotareaestado.all(created_by, req.mysql, (error, data) => {
                        return Empleadotareaestado.response(res, error, data);
                    })
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Empleadotareaestado.count(req.mysql, (error, data) => {
                        return Empleadotareaestado.response(res, error, data);
                    })
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Empleadotareaestado.exist(req.params.id, req.mysql, (error, data) => {
                        return Empleadotareaestado.response(res, error, data);
                    })
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotareaestado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Empleadotareaestado.response(res, error, data);
                    })
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotareaestado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Empleadotareaestado.response(res, error, data);
                    })
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _empleadotareaestado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotareaestado.update(_empleadotareaestado, created_by, req.mysql, (error, data) => {
                        return Empleadotareaestado.response(res, error, data);
                    })
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotareaestado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _empleadotareaestado = req.body;
                    _empleadotareaestado.created_by = auth_data.user.idsi_user;
                    Empleadotareaestado.insert( _empleadotareaestado, req.mysql, (error, data) =>{
                        return Empleadotareaestado.response(res, error, data);
                    });
                } else {
                    return Empleadotareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
