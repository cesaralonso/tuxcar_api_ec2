const connection = require('../config/db-connection');

const Ciudad = {};

Ciudad.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ciudad.* FROM ciudad    WHERE ciudad.created_by = ? HAVING ciudad.baja IS NULL OR ciudad.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT ciudad.* FROM ciudad    HAVING ciudad.baja IS NULL OR ciudad.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ciudad leíd@' });
    });
};

Ciudad.findById = (idCiudad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM ciudad WHERE idciudad = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idCiudad, created_by];
    } else {
        query = 'SELECT * FROM ciudad WHERE idciudad = ? HAVING baja IS NULL OR baja = false';
        keys = [idCiudad];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ciudad encontrad@' });
    });
};

Ciudad.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idciudad) AS count FROM ciudad';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Ciudad contabilizad@' });
    });
};

Ciudad.exist = (idCiudad, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM ciudad WHERE idciudad = ?) AS exist';
    keys = [idCiudad];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Ciudad verificad@' });
    });
};

Ciudad.insert = (Ciudad, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO ciudad SET ?';
    keys = [Ciudad];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Ciudad cread@' });
    });
};

Ciudad.update = (Ciudad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE ciudad SET ? WHERE idciudad = ? AND created_by = ?';
        keys = [Ciudad, Ciudad.idciudad, created_by];
    } else {
        query = 'UPDATE ciudad SET ? WHERE idciudad = ?';
        keys = [Ciudad, Ciudad.idciudad];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ciudad actualizad@' });
    });
};

Ciudad.remove = (idciudad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM ciudad WHERE idciudad = ? AND created_by = ?';
        keys = [idciudad, created_by];
    } else {
        query = 'DELETE FROM ciudad WHERE idciudad = ?';
        keys = [idciudad];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ciudad eliminad@' });
    });
};

Ciudad.logicRemove = (idciudad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE ciudad SET baja = 1 WHERE idciudad = ? AND created_by = ?';
        keys = [idciudad, created_by];
    } else {
        query = 'UPDATE ciudad SET baja = 1 WHERE idciudad = ?';
        keys = [idciudad];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ciudad eliminad@' });
    });
};

Ciudad.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Ciudad;
