const connection = require('../config/db-connection');

const Estadopago = {};

Estadopago.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT estadopago.* FROM estadopago    WHERE estadopago.created_by = ? HAVING estadopago.baja IS NULL OR estadopago.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT estadopago.* FROM estadopago    HAVING estadopago.baja IS NULL OR estadopago.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadopago leíd@' });
    });
};

Estadopago.findById = (idEstadopago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM estadopago WHERE idestadopago = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstadopago, created_by];
    } else {
        query = 'SELECT * FROM estadopago WHERE idestadopago = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstadopago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadopago encontrad@' });
    });
};

Estadopago.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idestadopago) AS count FROM estadopago';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estadopago contabilizad@' });
    });
};

Estadopago.exist = (idEstadopago, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM estadopago WHERE idestadopago = ?) AS exist';
    keys = [idEstadopago];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estadopago verificad@' });
    });
};

Estadopago.insert = (Estadopago, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO estadopago SET ?';
    keys = [Estadopago];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Estadopago cread@' });
    });
};

Estadopago.update = (Estadopago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estadopago SET ? WHERE idestadopago = ? AND created_by = ?';
        keys = [Estadopago, Estadopago.idestadopago, created_by];
    } else {
        query = 'UPDATE estadopago SET ? WHERE idestadopago = ?';
        keys = [Estadopago, Estadopago.idestadopago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadopago actualizad@' });
    });
};

Estadopago.remove = (idestadopago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM estadopago WHERE idestadopago = ? AND created_by = ?';
        keys = [idestadopago, created_by];
    } else {
        query = 'DELETE FROM estadopago WHERE idestadopago = ?';
        keys = [idestadopago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadopago eliminad@' });
    });
};

Estadopago.logicRemove = (idestadopago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estadopago SET baja = 1 WHERE idestadopago = ? AND created_by = ?';
        keys = [idestadopago, created_by];
    } else {
        query = 'UPDATE estadopago SET baja = 1 WHERE idestadopago = ?';
        keys = [idestadopago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadopago eliminad@' });
    });
};

Estadopago.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Estadopago;
