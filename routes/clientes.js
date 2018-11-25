const router = require('express').Router();
const Cliente = require('../models/cliente');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'cliente', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cliente.findByIdPersona(req.params.idpersona, created_by, req.mysql, (error, data) => {
                        return Cliente.response(res, error, data);
                    })
                } else {
                    return Cliente.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'cliente', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cliente.all(created_by, req.mysql, (error, data) => {
                        return Cliente.response(res, error, data);
                    })
                } else {
                    return Cliente.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'cliente', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Cliente.count(req.mysql, (error, data) => {
                        return Cliente.response(res, error, data);
                    })
                } else {
                    return Cliente.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'cliente', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Cliente.exist(req.params.id, req.mysql, (error, data) => {
                        return Cliente.response(res, error, data);
                    })
                } else {
                    return Cliente.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'cliente', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cliente.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Cliente.response(res, error, data);
                    })
                } else {
                    return Cliente.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'cliente', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cliente.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Cliente.response(res, error, data);
                    })
                } else {
                    return Cliente.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'cliente', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _cliente = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Cliente.update(_cliente, created_by, req.mysql, (error, data) => {
                        return Cliente.response(res, error, data);
                    })
                } else {
                    return Cliente.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'cliente', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _cliente = req.body;
                    _cliente.created_by = auth_data.user.idsi_user;
                    Cliente.insert( _cliente, req.mysql, (error, data) =>{
                        return Cliente.response(res, error, data);
                    });
                } else {
                    return Cliente.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
