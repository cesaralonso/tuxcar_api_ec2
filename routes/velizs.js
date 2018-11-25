const router = require('express').Router();
const Veliz = require('../models/veliz');
const passport = require('passport');
const permissions = require('../config/permissions');

router 
    .get('/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.findFromTo(req.params.fechaDesde, req.params.fechaHasta, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/reporte', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Veliz.reporte(req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/veliz-from-idchofer/:id/fecha/:fecha', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.velizFromIdchoferFecha(req.params.id,req.params.fecha, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/adeudo-from-idchofer/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.adeudoFromIdchofer(req.params.id, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/adeudando-from-idchofer/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.adeudandoFromIdchofer(req.params.id, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.findByIdChofer(req.params.idchofer, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.findByIdEstado(req.params.idestado, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.all(created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Veliz.count(req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Veliz.exist(req.params.id, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _veliz = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Veliz.update(_veliz, created_by, req.mysql, (error, data) => {
                        return Veliz.response(res, error, data);
                    })
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/idpermisotaxi', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _veliz = req.body;
                    _veliz.created_by = auth_data.user.idsi_user;
                    Veliz.insertWithIdpermisotaxi( _veliz, req.mysql, (error, data) =>{
                        return Veliz.response(res, error, data);
                    });
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'veliz', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _veliz = req.body;
                    _veliz.created_by = auth_data.user.idsi_user;
                    Veliz.insert( _veliz, req.mysql, (error, data) =>{
                        return Veliz.response(res, error, data);
                    });
                } else {
                    return Veliz.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
