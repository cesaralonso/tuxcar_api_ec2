const router = require('express').Router();
const Orden = require('../models/orden');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.findFromTo(req.params.fechaDesde, req.params.fechaHasta, created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/entrega/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _orden = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.entregaOrden(_orden, created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/finaliza/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _orden = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.finalizaOrden(_orden, created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/montos/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orden.updateMontos(req.params.id, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/cliente/:idcliente', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.findByIdCliente(req.params.idcliente, created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/vehiculotaller/:idvehiculotaller/:idvehiculo', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.findByIdVehiculotaller(req.params.idvehiculotaller, req.params.idvehiculo, created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.all(created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orden.count(req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Orden.exist(req.params.id, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _orden = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Orden.update(_orden, created_by, req.mysql, (error, data) => {
                        return Orden.response(res, error, data);
                    })
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'orden', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _orden = req.body;
                    _orden.created_by = auth_data.user.idsi_user;
                    Orden.insert( _orden, req.mysql, (error, data) =>{
                        return Orden.response(res, error, data);
                    });
                } else {
                    return Orden.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
