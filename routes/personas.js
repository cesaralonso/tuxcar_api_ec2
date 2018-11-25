const router = require('express').Router();
const Persona = require('../models/persona');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.findByIdChofer(req.params.idchofer, created_by, req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/ciudad/:idciudad', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.findByIdCiudad(req.params.idciudad, created_by, req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/sexo/:idsexo', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.findByIdSexo(req.params.idsexo, created_by, req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.all(created_by, req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Persona.count(req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Persona.exist(req.params.id, req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _persona = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Persona.update(_persona, created_by, req.mysql, (error, data) => {
                        return Persona.response(res, error, data);
                    })
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'persona', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _persona = req.body;
                    _persona.created_by = auth_data.user.idsi_user;
                    Persona.insert( _persona, req.mysql, (error, data) =>{
                        return Persona.response(res, error, data);
                    });
                } else {
                    return Persona.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
