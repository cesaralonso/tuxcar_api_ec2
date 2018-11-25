const router = require('express').Router();
const Egresoconcepto = require('../models/egresoconcepto');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/totalEgresosPorFechas/:fechainicial/:fechafinal', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.totalEgresosPorFechas(req.params.fechainicial, req.params.fechafinal, created_by, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/taller/:idtaller', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.findByIdTaller(req.params.idtaller, created_by, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/concepto/:idconcepto', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.findByIdConcepto(req.params.idconcepto, created_by, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/empleado/:idempleado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.findByIdEmpleado(req.params.idempleado, created_by, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.all(created_by, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Egresoconcepto.count(req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Egresoconcepto.exist(req.params.id, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _egresoconcepto = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Egresoconcepto.update(_egresoconcepto, created_by, req.mysql, (error, data) => {
                        return Egresoconcepto.response(res, error, data);
                    })
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
                
            permissions.module_permission(auth_data.modules, 'egresoconcepto', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _egresoconcepto = req.body;
                    _egresoconcepto.created_by = auth_data.user.idsi_user;
                    Egresoconcepto.insert( _egresoconcepto, req.mysql, (error, data) =>{
                        return Egresoconcepto.response(res, error, data);
                    });
                } else {
                    return Egresoconcepto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
