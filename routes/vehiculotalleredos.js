const router = require('express').Router();
const Vehiculotalleredo = require('../models/vehiculotalleredo');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/estadoscrum/:idestadoscrum', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotalleredo.findByIdEstadoscrum(req.params.idestadoscrum, created_by, req.mysql, (error, data) => {
                        return Vehiculotalleredo.response(res, error, data);
                    })
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/vehiculotaller/:idvehiculotaller', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotalleredo.findByIdVehiculotaller(req.params.idvehiculotaller, created_by, req.mysql, (error, data) => {
                        return Vehiculotalleredo.response(res, error, data);
                    })
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotalleredo.all(created_by, req.mysql, (error, data) => {
                        return Vehiculotalleredo.response(res, error, data);
                    })
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculotalleredo.count(req.mysql, (error, data) => {
                        return Vehiculotalleredo.response(res, error, data);
                    })
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculotalleredo.exist(req.params.id, req.mysql, (error, data) => {
                        return Vehiculotalleredo.response(res, error, data);
                    })
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotalleredo.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Vehiculotalleredo.response(res, error, data);
                    })
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotalleredo.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Vehiculotalleredo.response(res, error, data);
                    })
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _vehiculotalleredo = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculotalleredo.update(_vehiculotalleredo, created_by, req.mysql, (error, data) => {
                        return Vehiculotalleredo.response(res, error, data);
                    })
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'vehiculotalleredo', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _vehiculotalleredo = req.body;
                    _vehiculotalleredo.created_by = auth_data.user.idsi_user;
                    Vehiculotalleredo.insert( _vehiculotalleredo, req.mysql, (error, data) =>{
                        return Vehiculotalleredo.response(res, error, data);
                    });
                } else {
                    return Vehiculotalleredo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
