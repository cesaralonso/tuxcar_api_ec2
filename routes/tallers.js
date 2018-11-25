const router = require('express').Router();
const Taller = require('../models/taller');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/bitacora-ingresos-egresos/:id/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.bitacoraIngresosEgresosFromTo(req.params.id, req.params.fechaDesde, req.params.fechaHasta, created_by, req.mysql, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/bitacora-ingresos-egresos/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.bitacoraIngresosEgresos(req.params.id, created_by, req.mysql, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.all(created_by, req.mysql, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Taller.count(req.mysql, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Taller.exist(req.params.id, req.mysql, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _taller = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Taller.update(_taller, created_by, req.mysql, (error, data) => {
                        return Taller.response(res, error, data);
                    })
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'taller', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _taller = req.body;
                    _taller.created_by = auth_data.user.idsi_user;
                    Taller.insert( _taller, req.mysql, (error, data) =>{
                        return Taller.response(res, error, data);
                    });
                } else {
                    return Taller.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
