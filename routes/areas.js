const router = require('express').Router();
const Area = require('../models/area');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'area', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Area.all(created_by, req.mysql, (error, data) => {
                        return Area.response(res, error, data);
                    })
                } else {
                    return Area.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'area', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Area.count(req.mysql, (error, data) => {
                        return Area.response(res, error, data);
                    })
                } else {
                    return Area.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'area', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Area.exist(req.params.id, req.mysql, (error, data) => {
                        return Area.response(res, error, data);
                    })
                } else {
                    return Area.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'area', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Area.findById(req.params.id, created_by, req.mysql, (error, data) => {
                        return Area.response(res, error, data);
                    })
                } else {
                    return Area.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'area', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Area.logicRemove(req.params.id, created_by, req.mysql, (error, data) => {
                        return Area.response(res, error, data);
                    })
                } else {
                    return Area.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'area', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _area = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Area.update(_area, created_by, req.mysql, (error, data) => {
                        return Area.response(res, error, data);
                    })
                } else {
                    return Area.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            if( !auth_data )
                return next('auth_data refused');

            permissions.module_permission(auth_data.modules, 'area', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _area = req.body;
                    _area.created_by = auth_data.user.idsi_user;
                    Area.insert( _area, req.mysql, (error, data) =>{
                        return Area.response(res, error, data);
                    });
                } else {
                    return Area.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
