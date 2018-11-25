const router = require('express').Router();
const Ordenproducto = require('../models/ordenproducto');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .post('/calcular-precio', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const _calculo = req.body;
                    _calculo.created_by = auth_data.user.idsi_user;
                    Ordenproducto.calcularPrecio( _calculo, req.mysql, (error, data) =>{
                        return Ordenproducto.response(res, error, data);
                    });
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/orden/:idorden', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenproducto.findByIdOrden(req.params.idorden, created_by, req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/producto/:idproducto', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenproducto.findByIdProducto(req.params.idproducto, created_by, req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/tipoprecio/:idtipoprecio', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenproducto.findByIdTipoprecio(req.params.idtipoprecio, created_by, req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenproducto.all(created_by, req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Ordenproducto.count(req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Ordenproducto.exist(req.params.id, req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenproducto.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenproducto.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _ordenproducto = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Ordenproducto.update(_ordenproducto, created_by, req.mysql, (error, data) => {
                        return Ordenproducto.response(res, error, data);
                    })
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'ordenproducto', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _ordenproducto = req.body;
                    _ordenproducto.created_by = auth_data.user.idsi_user;
                    Ordenproducto.insert( _ordenproducto, req.mysql, (error, data) =>{
                        return Ordenproducto.response(res, error, data);
                    });
                } else {
                    return Ordenproducto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
