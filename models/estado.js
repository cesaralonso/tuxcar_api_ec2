const connection = require('../config/db-connection');

const Estado = {};

Estado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT estado.* FROM estado    WHERE estado.created_by = ? HAVING estado.baja IS NULL OR estado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT estado.* FROM estado    HAVING estado.baja IS NULL OR estado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estado leíd@' });
    });
};

Estado.findById = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM estado WHERE idestado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT * FROM estado WHERE idestado = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estado encontrad@' });
    });
};

Estado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idestado) AS count FROM estado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estado contabilizad@' });
    });
};

Estado.exist = (idEstado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM estado WHERE idestado = ?) AS exist';
    keys = [idEstado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estado verificad@' });
    });
};

Estado.insert = (Estado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO estado SET ?';
    keys = [Estado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Estado cread@' });
    });
};

Estado.update = (Estado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estado SET ? WHERE idestado = ? AND created_by = ?';
        keys = [Estado, Estado.idestado, created_by];
    } else {
        query = 'UPDATE estado SET ? WHERE idestado = ?';
        keys = [Estado, Estado.idestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estado actualizad@' });
    });
};

Estado.remove = (idestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM estado WHERE idestado = ? AND created_by = ?';
        keys = [idestado, created_by];
    } else {
        query = 'DELETE FROM estado WHERE idestado = ?';
        keys = [idestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estado eliminad@' });
    });
};

Estado.logicRemove = (idestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estado SET baja = 1 WHERE idestado = ? AND created_by = ?';
        keys = [idestado, created_by];
    } else {
        query = 'UPDATE estado SET baja = 1 WHERE idestado = ?';
        keys = [idestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estado eliminad@' });
    });
};

Estado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Estado;
