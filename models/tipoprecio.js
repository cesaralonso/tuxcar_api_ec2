const connection = require('../config/db-connection');

const Tipoprecio = {};

Tipoprecio.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT tipoprecio.* FROM tipoprecio    WHERE tipoprecio.created_by = ? HAVING tipoprecio.baja IS NULL OR tipoprecio.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT tipoprecio.* FROM tipoprecio    HAVING tipoprecio.baja IS NULL OR tipoprecio.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoprecio leíd@' });
    });
};

Tipoprecio.findById = (idTipoprecio, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM tipoprecio WHERE idtipoprecio = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idTipoprecio, created_by];
    } else {
        query = 'SELECT * FROM tipoprecio WHERE idtipoprecio = ? HAVING baja IS NULL OR baja = false';
        keys = [idTipoprecio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoprecio encontrad@' });
    });
};

Tipoprecio.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idtipoprecio) AS count FROM tipoprecio';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tipoprecio contabilizad@' });
    });
};

Tipoprecio.exist = (idTipoprecio, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM tipoprecio WHERE idtipoprecio = ?) AS exist';
    keys = [idTipoprecio];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tipoprecio verificad@' });
    });
};

Tipoprecio.insert = (Tipoprecio, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO tipoprecio SET ?';
    keys = [Tipoprecio];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Tipoprecio cread@' });
    });
};

Tipoprecio.update = (Tipoprecio, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tipoprecio SET ? WHERE idtipoprecio = ? AND created_by = ?';
        keys = [Tipoprecio, Tipoprecio.idtipoprecio, created_by];
    } else {
        query = 'UPDATE tipoprecio SET ? WHERE idtipoprecio = ?';
        keys = [Tipoprecio, Tipoprecio.idtipoprecio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoprecio actualizad@' });
    });
};

Tipoprecio.remove = (idtipoprecio, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM tipoprecio WHERE idtipoprecio = ? AND created_by = ?';
        keys = [idtipoprecio, created_by];
    } else {
        query = 'DELETE FROM tipoprecio WHERE idtipoprecio = ?';
        keys = [idtipoprecio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoprecio eliminad@' });
    });
};

Tipoprecio.logicRemove = (idtipoprecio, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tipoprecio SET baja = 1 WHERE idtipoprecio = ? AND created_by = ?';
        keys = [idtipoprecio, created_by];
    } else {
        query = 'UPDATE tipoprecio SET baja = 1 WHERE idtipoprecio = ?';
        keys = [idtipoprecio];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipoprecio eliminad@' });
    });
};

Tipoprecio.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Tipoprecio;
