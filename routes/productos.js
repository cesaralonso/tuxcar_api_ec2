const router = require('express').Router();
const Producto = require('../models/producto');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/area/:idarea', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Producto.findByIdArea(req.params.idarea, created_by, req.mysql, (error, data) => {
                        return Producto.response(res, error, data);
                    })
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/formula/:idformula', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Producto.findByIdFormula(req.params.idformula, created_by, req.mysql, (error, data) => {
                        return Producto.response(res, error, data);
                    })
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Producto.all(created_by, req.mysql, (error, data) => {
                        return Producto.response(res, error, data);
                    })
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Producto.count(req.mysql, (error, data) => {
                        return Producto.response(res, error, data);
                    })
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Producto.exist(req.params.id, req.mysql, (error, data) => {
                        return Producto.response(res, error, data);
                    })
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Producto.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Producto.response(res, error, data);
                    })
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Producto.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Producto.response(res, error, data);
                    })
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _producto = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Producto.update(_producto, created_by, req.mysql, (error, data) => {
                        return Producto.response(res, error, data);
                    })
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'producto', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _producto = req.body;
                    _producto.created_by = auth_data.user.idsi_user;
                    Producto.insert( _producto, req.mysql, (error, data) =>{
                        return Producto.response(res, error, data);
                    });
                } else {
                    return Producto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
