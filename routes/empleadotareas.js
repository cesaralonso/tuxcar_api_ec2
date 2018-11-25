const router = require('express').Router();
const Empleadotarea = require('../models/empleadotarea');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/empleado/:idempleado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotarea.findByIdEmpleado(req.params.idempleado, created_by, req.mysql, (error, data) => {
                        return Empleadotarea.response(res, error, data);
                    })
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/ordentarea/:idordentarea', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotarea.findByIdOrdentarea(req.params.idordentarea, created_by, req.mysql, (error, data) => {
                        return Empleadotarea.response(res, error, data);
                    })
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotarea.all(created_by, req.mysql, (error, data) => {
                        return Empleadotarea.response(res, error, data);
                    })
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Empleadotarea.count(req.mysql, (error, data) => {
                        return Empleadotarea.response(res, error, data);
                    })
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Empleadotarea.exist(req.params.id, req.mysql, (error, data) => {
                        return Empleadotarea.response(res, error, data);
                    })
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotarea.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Empleadotarea.response(res, error, data);
                    })
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotarea.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Empleadotarea.response(res, error, data);
                    })
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _empleadotarea = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Empleadotarea.update(_empleadotarea, created_by, req.mysql, (error, data) => {
                        return Empleadotarea.response(res, error, data);
                    })
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'empleadotarea', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _empleadotarea = req.body;
                    _empleadotarea.created_by = auth_data.user.idsi_user;
                    Empleadotarea.insert( _empleadotarea, req.mysql, (error, data) =>{
                        return Empleadotarea.response(res, error, data);
                    });
                } else {
                    return Empleadotarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
