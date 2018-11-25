const router = require('express').Router();
const Corte = require('../models/corte');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/administracion-in-this-day', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corte.findAdministracionInThisDay(created_by, req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/taller-in-this-day', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corte.findTallerInThisDay(created_by, req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/empleado/:idempleado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corte.findByIdEmpleado(req.params.idempleado, created_by, req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corte.all(created_by, req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Corte.count(req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Corte.exist(req.params.id, req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corte.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corte.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _corte = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corte.update(_corte, created_by, req.mysql, (error, data) => {
                        return Corte.response(res, error, data);
                    })
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corte', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _corte = req.body;
                    _corte.created_by = auth_data.user.idsi_user;
                    Corte.insert( _corte, req.mysql, (error, data) =>{
                        return Corte.response(res, error, data);
                    });
                } else {
                    return Corte.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
