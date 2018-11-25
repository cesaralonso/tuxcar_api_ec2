const router = require('express').Router();
const Vehiculotaller = require('../models/vehiculotaller');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .post('/go-out-vehicle', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _vehiculotaller = req.body;
                    _vehiculotaller.created_by = auth_data.user.idsi_user;
                    Vehiculotaller.goOutVehicle( _vehiculotaller, req.mysql, (error, data) =>{
                        return Vehiculotaller.response(res, error, data);
                    });
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/empleado/:idempleado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotaller.findByIdEmpleado(req.params.idempleado, created_by, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotaller.findByIdEstado(req.params.idestado, created_by, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/taller/:idtaller', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotaller.findByIdTaller(req.params.idtaller, created_by, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/vehiculo/:idvehiculo', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotaller.findByIdVehiculo(req.params.idvehiculo, created_by, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotaller.all(created_by, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculotaller.count(req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculotaller.exist(req.params.id, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotaller.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotaller.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _vehiculotaller = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotaller.update(_vehiculotaller, created_by, req.mysql, (error, data) => {
                        return Vehiculotaller.response(res, error, data);
                    })
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotaller', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _vehiculotaller = req.body;
                    _vehiculotaller.created_by = auth_data.user.idsi_user;
                    Vehiculotaller.insert( _vehiculotaller, req.mysql, (error, data) =>{
                        return Vehiculotaller.response(res, error, data);
                    });
                } else {
                    return Vehiculotaller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
