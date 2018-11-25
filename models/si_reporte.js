const connection = require('../config/db-connection');

const Si_reporte = {};

Si_reporte.findByIdSi_modulo = (idSi_modulo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT si_reporte.*, _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo FROM si_reporte INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_reporte.si_modulo_idsi_modulo   WHERE si_reporte.si_modulo_idsi_modulo = ? AND si_reporte.created_by = ? HAVING si_reporte.baja IS NULL OR si_reporte.baja = false';
        keys = [idSi_modulo, created_by];
    } else {
        query = 'SELECT si_reporte.*, _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo FROM si_reporte INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_reporte.si_modulo_idsi_modulo   WHERE si_reporte.si_modulo_idsi_modulo = ? HAVING si_reporte.baja IS NULL OR si_reporte.baja = false';
        keys = [idSi_modulo];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte encontrad@' });
    });
};

Si_reporte.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT si_reporte.*, _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo FROM si_reporte INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_reporte.si_modulo_idsi_modulo   WHERE si_reporte.created_by = ? HAVING si_reporte.baja IS NULL OR si_reporte.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT si_reporte.*, _si_modulo_idsi_modulo.nombre as si_modulo_si_modulo_idsi_modulo FROM si_reporte INNER JOIN si_modulo as _si_modulo_idsi_modulo ON _si_modulo_idsi_modulo.idsi_modulo = si_reporte.si_modulo_idsi_modulo   HAVING si_reporte.baja IS NULL OR si_reporte.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte leíd@' });
    });
};

Si_reporte.findById = (idSi_reporte, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM si_reporte WHERE idsi_reporte = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_reporte, created_by];
    } else {
        query = 'SELECT * FROM si_reporte WHERE idsi_reporte = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_reporte];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte encontrad@' });
    });
};

Si_reporte.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idsi_reporte) AS count FROM si_reporte';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte contabilizad@' });
    });
};

Si_reporte.exist = (idSi_reporte, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM si_reporte WHERE idsi_reporte = ?) AS exist';
    keys = [idSi_reporte];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte verificad@' });
    });
};

Si_reporte.insert = (Si_reporte, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO si_reporte SET ?';
    keys = [Si_reporte];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte cread@' });
    });
};

Si_reporte.update = (Si_reporte, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_reporte SET ? WHERE idsi_reporte = ? AND created_by = ?';
        keys = [Si_reporte, Si_reporte.idsi_reporte, created_by];
    } else {
        query = 'UPDATE si_reporte SET ? WHERE idsi_reporte = ?';
        keys = [Si_reporte, Si_reporte.idsi_reporte];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte actualizad@' });
    });
};

Si_reporte.remove = (idsi_reporte, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM si_reporte WHERE idsi_reporte = ? AND created_by = ?';
        keys = [idsi_reporte, created_by];
    } else {
        query = 'DELETE FROM si_reporte WHERE idsi_reporte = ?';
        keys = [idsi_reporte];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte eliminad@' });
    });
};

Si_reporte.logicRemove = (idsi_reporte, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_reporte SET baja = 1 WHERE idsi_reporte = ? AND created_by = ?';
        keys = [idsi_reporte, created_by];
    } else {
        query = 'UPDATE si_reporte SET baja = 1 WHERE idsi_reporte = ?';
        keys = [idsi_reporte];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_reporte eliminad@' });
    });
};

Si_reporte.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_reporte;
