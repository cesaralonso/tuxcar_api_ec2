const router = require('express').Router();
const Chofer = require('../models/chofer');
const passport = require('passport');
const permissions = require('../config/permissions');

router

    .get('/bitacora-pagos/:idchofer/from-to/:fechaDesde/:fechaHasta', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findByIdChoferFromTo(req.params.idchofer, req.params.fechaDesde, req.params.fechaHasta, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    
    .get('/bitacora-pagos/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findByIdChofer(req.params.idchofer, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/disponibles', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.allDisponibles(created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findByIdEstado(req.params.idestado, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findByIdPersona(req.params.idpersona, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findByIdPersona(req.params.idpersona, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findByIdPersona(req.params.idpersona, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findByIdPersona(req.params.idpersona, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findByIdPersona(req.params.idpersona, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.all(created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Chofer.count(req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Chofer.exist(req.params.id, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _chofer = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Chofer.update(_chofer, created_by, req.mysql, (error, data) => {
                        return Chofer.response(res, error, data);
                    })
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
          if (!auth_data) {
              return Chofer.response(res, auth_data, info);
          }
            permissions.module_permission(auth_data.modules, 'chofer', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _chofer = req.body;
                    _chofer.created_by = auth_data.user.idsi_user;
                    Chofer.insert( _chofer, req.mysql, (error, data) =>{
                        return Chofer.response(res, error, data);
                    });
                } else {
                    return Chofer.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
