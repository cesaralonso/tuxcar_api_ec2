const router = require('express').Router();
const Tarea = require('../models/tarea');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/area/:idarea', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tarea.findByIdArea(req.params.idarea, created_by, req.mysql, (error, data) => {
                        return Tarea.response(res, error, data);
                    })
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/producto/:idproducto', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tarea.findByIdProducto(req.params.idproducto, created_by, req.mysql, (error, data) => {
                        return Tarea.response(res, error, data);
                    })
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tarea.all(created_by, req.mysql, (error, data) => {
                        return Tarea.response(res, error, data);
                    })
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tarea.count(req.mysql, (error, data) => {
                        return Tarea.response(res, error, data);
                    })
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tarea.exist(req.params.id, req.mysql, (error, data) => {
                        return Tarea.response(res, error, data);
                    })
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tarea.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Tarea.response(res, error, data);
                    })
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tarea.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Tarea.response(res, error, data);
                    })
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _tarea = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tarea.update(_tarea, created_by, req.mysql, (error, data) => {
                        return Tarea.response(res, error, data);
                    })
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'tarea', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _tarea = req.body;
                    _tarea.created_by = auth_data.user.idsi_user;
                    Tarea.insert( _tarea, req.mysql, (error, data) =>{
                        return Tarea.response(res, error, data);
                    });
                } else {
                    return Tarea.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
