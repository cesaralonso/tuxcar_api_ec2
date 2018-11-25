const router = require('express').Router();
const Registradora = require('../models/registradora');
const passport = require('passport');
const permissions = require('../config/permissions');

router

    .get('/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Registradora.allFromTo(req.params.fechaDesde, req.params.fechaHasta, created_by, req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/totalPorFechas/:seccion/:fechainicial/:fechafinal', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Registradora.totalPorFechas(req.params.fechainicial, req.params.fechafinal, req.params.seccion, created_by, req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/empleado/:idempleado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Registradora.findByIdEmpleado(req.params.idempleado, created_by, req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Registradora.all(created_by, req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Registradora.count(req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Registradora.exist(req.params.id, req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Registradora.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Registradora.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _registradora = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Registradora.update(_registradora, created_by, req.mysql, (error, data) => {
                        return Registradora.response(res, error, data);
                    })
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'registradora', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _registradora = req.body;
                    _registradora.created_by = auth_data.user.idsi_user;
                    Registradora.insert( _registradora, req.mysql, (error, data) =>{
                        return Registradora.response(res, error, data);
                    });
                } else {
                    return Registradora.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
