const router = require('express').Router();
const Ordentareaestado = require('../models/ordentareaestado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/estadoscrum/:idestadoscrum', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordentareaestado.findByIdEstadoscrum(req.params.idestadoscrum, created_by, req.mysql, (error, data) => {
                        return Ordentareaestado.response(res, error, data);
                    })
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/ordentarea/:idordentarea', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordentareaestado.findByIdOrdentarea(req.params.idordentarea, created_by, req.mysql, (error, data) => {
                        return Ordentareaestado.response(res, error, data);
                    })
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordentareaestado.all(created_by, req.mysql, (error, data) => {
                        return Ordentareaestado.response(res, error, data);
                    })
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Ordentareaestado.count(req.mysql, (error, data) => {
                        return Ordentareaestado.response(res, error, data);
                    })
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Ordentareaestado.exist(req.params.id, req.mysql, (error, data) => {
                        return Ordentareaestado.response(res, error, data);
                    })
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordentareaestado.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Ordentareaestado.response(res, error, data);
                    })
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordentareaestado.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Ordentareaestado.response(res, error, data);
                    })
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _ordentareaestado = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordentareaestado.update(_ordentareaestado, created_by, req.mysql, (error, data) => {
                        return Ordentareaestado.response(res, error, data);
                    })
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordentareaestado', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _ordentareaestado = req.body;
                    _ordentareaestado.created_by = auth_data.user.idsi_user;
                    Ordentareaestado.insert( _ordentareaestado, req.mysql, (error, data) =>{
                        return Ordentareaestado.response(res, error, data);
                    });
                } else {
                    return Ordentareaestado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
