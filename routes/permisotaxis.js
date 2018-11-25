const router = require('express').Router();
const Permisotaxi = require('../models/permisotaxi');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/reporte-ingresos-egresos/:idpermisotaxi', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.reporteIngresosEgresos(req.params.idpermisotaxi, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

    .get('/reporte-ingresos-egresos/:idpermisotaxi/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.reporteIngresosEgresosFromTo(req.params.idpermisotaxi, req.params.fechaDesde, req.params.fechaHasta, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

    .get('/bitacora-pagos/:idpermisotaxi/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findFromTo(req.params.idpermisotaxi, req.params.fechaDesde, req.params.fechaHasta, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

    .get('/bitacora-pagos/:idpermisotaxi', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxi.findByIdPermisoTaxi(req.params.idpermisotaxi, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/this-day/:id/this-hour', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findLiquidezByIdInThisDayAtThisHour(req.params.id, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/this-day/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findLiquidezByIdInThisDay(req.params.id, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/disponibles', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.allDisponibles(created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findByIdEstado(req.params.idestado, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findByIdPersona(req.params.idpersona, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/vehiculo/:idvehiculo', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findByIdVehiculo(req.params.idvehiculo, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.all(created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxi.count(req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxi.exist(req.params.id, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxi = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.update(_permisotaxi, created_by, req.mysql, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxi = req.body;
                    _permisotaxi.created_by = auth_data.user.idsi_user;
                    Permisotaxi.insert( _permisotaxi, req.mysql, (error, data) =>{
                        return Permisotaxi.response(res, error, data);
                    });
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
