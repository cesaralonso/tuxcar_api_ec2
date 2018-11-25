const connection = require('../config/db-connection');

const Estadoactividad = {};

Estadoactividad.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT estadoactividad.* FROM estadoactividad    WHERE estadoactividad.created_by = ? HAVING estadoactividad.baja IS NULL OR estadoactividad.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT estadoactividad.* FROM estadoactividad    HAVING estadoactividad.baja IS NULL OR estadoactividad.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoactividad leíd@' });
    });
};

Estadoactividad.findById = (idEstadoactividad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM estadoactividad WHERE idestadoactividad = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstadoactividad, created_by];
    } else {
        query = 'SELECT * FROM estadoactividad WHERE idestadoactividad = ? HAVING baja IS NULL OR baja = false';
        keys = [idEstadoactividad];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoactividad encontrad@' });
    });
};

Estadoactividad.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idestadoactividad) AS count FROM estadoactividad';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estadoactividad contabilizad@' });
    });
};

Estadoactividad.exist = (idEstadoactividad, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM estadoactividad WHERE idestadoactividad = ?) AS exist';
    keys = [idEstadoactividad];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Estadoactividad verificad@' });
    });
};

Estadoactividad.insert = (Estadoactividad, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO estadoactividad SET ?';
    keys = [Estadoactividad];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Estadoactividad cread@' });
    });
};

Estadoactividad.update = (Estadoactividad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estadoactividad SET ? WHERE idestadoactividad = ? AND created_by = ?';
        keys = [Estadoactividad, Estadoactividad.idestadoactividad, created_by];
    } else {
        query = 'UPDATE estadoactividad SET ? WHERE idestadoactividad = ?';
        keys = [Estadoactividad, Estadoactividad.idestadoactividad];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoactividad actualizad@' });
    });
};

Estadoactividad.remove = (idestadoactividad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM estadoactividad WHERE idestadoactividad = ? AND created_by = ?';
        keys = [idestadoactividad, created_by];
    } else {
        query = 'DELETE FROM estadoactividad WHERE idestadoactividad = ?';
        keys = [idestadoactividad];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoactividad eliminad@' });
    });
};

Estadoactividad.logicRemove = (idestadoactividad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE estadoactividad SET baja = 1 WHERE idestadoactividad = ? AND created_by = ?';
        keys = [idestadoactividad, created_by];
    } else {
        query = 'UPDATE estadoactividad SET baja = 1 WHERE idestadoactividad = ?';
        keys = [idestadoactividad];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Estadoactividad eliminad@' });
    });
};

Estadoactividad.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Estadoactividad;
