const router = require('express').Router();
const Corralon = require('../models/corralon');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .post('/salida-chocado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _corralon = req.body;
                    _corralon.created_by = auth_data.user.idsi_user;
                    Corralon.salidaChocado( _corralon, req.mysql, (error, data) =>{
                        return Corralon.response(res, error, data);
                    });
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/salida-corralon', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _corralon = req.body;
                    _corralon.created_by = auth_data.user.idsi_user;
                    Corralon.salidaCorralon( _corralon, req.mysql, (error, data) =>{
                        return Corralon.response(res, error, data);
                    });
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

    .post('/go-out-corralon', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _corralon = req.body;
                    _corralon.created_by = auth_data.user.idsi_user;
                    Corralon.goOutCorralon( _corralon, req.mysql, (error, data) =>{
                        return Corralon.response(res, error, data);
                    });
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corralon.findByIdEstado(req.params.idestado, created_by, req.mysql, (error, data) => {
                        return Corralon.response(res, error, data);
                    })
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corralon.allFromTo(req.params.fechaDesde, req.params.fechaHasta, created_by, req.mysql, (error, data) => {
                        return Corralon.response(res, error, data);
                    })
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corralon.all(created_by, req.mysql, (error, data) => {
                        return Corralon.response(res, error, data);
                    })
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Corralon.count(req.mysql, (error, data) => {
                        return Corralon.response(res, error, data);
                    })
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Corralon.exist(req.params.id, req.mysql, (error, data) => {
                        return Corralon.response(res, error, data);
                    })
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corralon.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Corralon.response(res, error, data);
                    })
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corralon.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Corralon.response(res, error, data);
                    })
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _corralon = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Corralon.update(_corralon, created_by, req.mysql, (error, data) => {
                        return Corralon.response(res, error, data);
                    })
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Corralon.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'corralon', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _corralon = req.body;
                    _corralon.created_by = auth_data.user.idsi_user;
                    Corralon.insert( _corralon, req.mysql, (error, data) =>{
                        return Corralon.response(res, error, data);
                    });
                } else {
                    return Corralon.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
