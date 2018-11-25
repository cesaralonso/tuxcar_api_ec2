const router = require('express').Router();
const Bonificacion = require('../models/bonificacion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .post('/apply-bonification', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _bonificacion = req.body;
                    _bonificacion.created_by = auth_data.user.idsi_user;
                    Bonificacion.applyBonification( _bonificacion, req.mysql, (error, data) =>{
                        return Bonificacion.response(res, error, data);
                    });
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.findByIdChofer(req.params.idchofer, created_by, req.mysql, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.findByIdEstado(req.params.idestado, created_by, req.mysql, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.all(created_by, req.mysql, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Bonificacion.count(req.mysql, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Bonificacion.exist(req.params.id, req.mysql, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _bonificacion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Bonificacion.update(_bonificacion, created_by, req.mysql, (error, data) => {
                        return Bonificacion.response(res, error, data);
                    })
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Bonificacion.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'bonificacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _bonificacion = req.body;
                    _bonificacion.created_by = auth_data.user.idsi_user;
                    Bonificacion.insert( _bonificacion, req.mysql, (error, data) =>{
                        return Bonificacion.response(res, error, data);
                    });
                } else {
                    return Bonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
