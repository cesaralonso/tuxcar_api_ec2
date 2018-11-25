const connection = require('../config/db-connection');

const Estadoscrum = {};

Estadoscrum.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT estadoscrum.* FROM estadoscrum    WHERE estadoscrum.created_by = ? HAVING estadoscrum.baja IS NULL OR estadoscrum.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT estadoscrum.* FROM estadoscrum    HAVING estadoscrum.baja IS NULL OR estadoscrum.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoscrum leíd@' });
    });
};

Estadoscrum.findById = (idEstadoscrum, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM estadoscrum WHERE idestadoscrum = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstadoscrum, created_by];
    } else {
        query = 'SELECT * FROM estadoscrum WHERE idestadoscrum = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstadoscrum];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoscrum encontrad@' });
    });
};

Estadoscrum.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idestadoscrum) AS count FROM estadoscrum';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estadoscrum contabilizad@' });
    });
};

Estadoscrum.exist = (idEstadoscrum, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM estadoscrum WHERE idestadoscrum = ?) AS exist';
    keys = [idEstadoscrum];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estadoscrum verificad@' });
    });
};

Estadoscrum.insert = (Estadoscrum, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO estadoscrum SET ?';
    keys = [Estadoscrum];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Estadoscrum cread@' });
    });
};

Estadoscrum.update = (Estadoscrum, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estadoscrum SET ? WHERE idestadoscrum = ? AND created_by = ?';
        keys = [Estadoscrum, Estadoscrum.idestadoscrum, created_by];
    } else {
        query = 'UPDATE estadoscrum SET ? WHERE idestadoscrum = ?';
        keys = [Estadoscrum, Estadoscrum.idestadoscrum];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoscrum actualizad@' });
    });
};

Estadoscrum.remove = (idestadoscrum, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM estadoscrum WHERE idestadoscrum = ? AND created_by = ?';
        keys = [idestadoscrum, created_by];
    } else {
        query = 'DELETE FROM estadoscrum WHERE idestadoscrum = ?';
        keys = [idestadoscrum];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoscrum eliminad@' });
    });
};

Estadoscrum.logicRemove = (idestadoscrum, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estadoscrum SET baja = 1 WHERE idestadoscrum = ? AND created_by = ?';
        keys = [idestadoscrum, created_by];
    } else {
        query = 'UPDATE estadoscrum SET baja = 1 WHERE idestadoscrum = ?';
        keys = [idestadoscrum];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoscrum eliminad@' });
    });
};

Estadoscrum.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Estadoscrum;
