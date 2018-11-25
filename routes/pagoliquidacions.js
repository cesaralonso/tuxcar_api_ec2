const router = require('express').Router();
const Pagoliquidacion = require('../models/pagoliquidacion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .post('/pago-liquidaciones', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _pagoliquidaciones = req.body;

                    console.log("_pagoliquidaciones", _pagoliquidaciones);
                    Pagoliquidacion.pagoLiquidaciones( _pagoliquidaciones, req.mysql, (error, data) =>{
                        return Pagoliquidacion.response(res, error, data);
                    });
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagoliquidacion.findByIdChofer(req.params.idchofer, created_by, req.mysql, (error, data) => {
                        return Pagoliquidacion.response(res, error, data);
                    })
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/pago/:idpago', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagoliquidacion.findByIdPago(req.params.idpago, created_by, req.mysql, (error, data) => {
                        return Pagoliquidacion.response(res, error, data);
                    })
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagoliquidacion.all(created_by, req.mysql, (error, data) => {
                        return Pagoliquidacion.response(res, error, data);
                    })
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pagoliquidacion.count(req.mysql, (error, data) => {
                        return Pagoliquidacion.response(res, error, data);
                    })
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pagoliquidacion.exist(req.params.id, req.mysql, (error, data) => {
                        return Pagoliquidacion.response(res, error, data);
                    })
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagoliquidacion.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Pagoliquidacion.response(res, error, data);
                    })
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagoliquidacion.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Pagoliquidacion.response(res, error, data);
                    })
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _pagoliquidacion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagoliquidacion.update(_pagoliquidacion, created_by, req.mysql, (error, data) => {
                        return Pagoliquidacion.response(res, error, data);
                    })
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {

            if( !auth_data )
                return next('auth_data refused');
 
            permissions.module_permission(auth_data.modules, 'pagoliquidacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _pagoliquidacion = req.body;
                    _pagoliquidacion.created_by = auth_data.user.idsi_user;
                    Pagoliquidacion.insert( _pagoliquidacion, req.mysql, (error, data) =>{
                        return Pagoliquidacion.response(res, error, data);
                    });
                } else {
                    return Pagoliquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
