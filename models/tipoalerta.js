const connection = require('../config/db-connection');

const Tipoalerta = {};

Tipoalerta.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT tipoalerta.* FROM tipoalerta    WHERE tipoalerta.created_by = ? HAVING tipoalerta.baja IS NULL OR tipoalerta.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT tipoalerta.* FROM tipoalerta    HAVING tipoalerta.baja IS NULL OR tipoalerta.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoalerta leíd@' });
    });
};

Tipoalerta.findById = (idTipoalerta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM tipoalerta WHERE idtipoalerta = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idTipoalerta, created_by];
    } else {
        query = 'SELECT * FROM tipoalerta WHERE idtipoalerta = ? HAVING baja IS NULL OR baja = false';
        keys = [idTipoalerta];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoalerta encontrad@' });
    });
};

Tipoalerta.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idtipoalerta) AS count FROM tipoalerta';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tipoalerta contabilizad@' });
    });
};

Tipoalerta.exist = (idTipoalerta, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM tipoalerta WHERE idtipoalerta = ?) AS exist';
    keys = [idTipoalerta];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tipoalerta verificad@' });
    });
};

Tipoalerta.insert = (Tipoalerta, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO tipoalerta SET ?';
    keys = [Tipoalerta];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Tipoalerta cread@' });
    });
};

Tipoalerta.update = (Tipoalerta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tipoalerta SET ? WHERE idtipoalerta = ? AND created_by = ?';
        keys = [Tipoalerta, Tipoalerta.idtipoalerta, created_by];
    } else {
        query = 'UPDATE tipoalerta SET ? WHERE idtipoalerta = ?';
        keys = [Tipoalerta, Tipoalerta.idtipoalerta];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoalerta actualizad@' });
    });
};

Tipoalerta.remove = (idtipoalerta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM tipoalerta WHERE idtipoalerta = ? AND created_by = ?';
        keys = [idtipoalerta, created_by];
    } else {
        query = 'DELETE FROM tipoalerta WHERE idtipoalerta = ?';
        keys = [idtipoalerta];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoalerta eliminad@' });
    });
};

Tipoalerta.logicRemove = (idtipoalerta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tipoalerta SET baja = 1 WHERE idtipoalerta = ? AND created_by = ?';
        keys = [idtipoalerta, created_by];
    } else {
        query = 'UPDATE tipoalerta SET baja = 1 WHERE idtipoalerta = ?';
        keys = [idtipoalerta];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoalerta eliminad@' });
    });
};

Tipoalerta.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Tipoalerta;
