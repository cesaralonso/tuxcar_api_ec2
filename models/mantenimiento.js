const connection = require('../config/db-connection');

const Mantenimiento = {};

Mantenimiento.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT mantenimiento.* FROM mantenimiento    WHERE mantenimiento.created_by = ? HAVING mantenimiento.baja IS NULL OR mantenimiento.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT mantenimiento.* FROM mantenimiento    HAVING mantenimiento.baja IS NULL OR mantenimiento.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mantenimiento leíd@' });
    });
};

Mantenimiento.findById = (idMantenimiento, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM mantenimiento WHERE idmantenimiento = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idMantenimiento, created_by];
    } else {
        query = 'SELECT * FROM mantenimiento WHERE idmantenimiento = ? HAVING baja IS NULL OR baja = false';
        keys = [idMantenimiento];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mantenimiento encontrad@' });
    });
};

Mantenimiento.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idmantenimiento) AS count FROM mantenimiento';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Mantenimiento contabilizad@' });
    });
};

Mantenimiento.exist = (idMantenimiento, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM mantenimiento WHERE idmantenimiento = ?) AS exist';
    keys = [idMantenimiento];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Mantenimiento verificad@' });
    });
};

Mantenimiento.insert = (Mantenimiento, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO mantenimiento SET ?';
    keys = [Mantenimiento];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Mantenimiento cread@' });
    });
};

Mantenimiento.update = (Mantenimiento, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE mantenimiento SET ? WHERE idmantenimiento = ? AND created_by = ?';
        keys = [Mantenimiento, Mantenimiento.idmantenimiento, created_by];
    } else {
        query = 'UPDATE mantenimiento SET ? WHERE idmantenimiento = ?';
        keys = [Mantenimiento, Mantenimiento.idmantenimiento];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mantenimiento actualizad@' });
    });
};

Mantenimiento.remove = (idmantenimiento, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM mantenimiento WHERE idmantenimiento = ? AND created_by = ?';
        keys = [idmantenimiento, created_by];
    } else {
        query = 'DELETE FROM mantenimiento WHERE idmantenimiento = ?';
        keys = [idmantenimiento];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mantenimiento eliminad@' });
    });
};

Mantenimiento.logicRemove = (idmantenimiento, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE mantenimiento SET baja = 1 WHERE idmantenimiento = ? AND created_by = ?';
        keys = [idmantenimiento, created_by];
    } else {
        query = 'UPDATE mantenimiento SET baja = 1 WHERE idmantenimiento = ?';
        keys = [idmantenimiento];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Mantenimiento eliminad@' });
    });
};

Mantenimiento.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Mantenimiento;
