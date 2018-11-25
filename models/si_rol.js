const connection = require('../config/db-connection');

const Si_rol = {};

Si_rol.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT si_rol.* FROM si_rol    WHERE si_rol.created_by = ? HAVING si_rol.baja IS NULL OR si_rol.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT si_rol.* FROM si_rol    HAVING si_rol.baja IS NULL OR si_rol.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol leíd@' });
    });
};

Si_rol.findById = (idSi_rol, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM si_rol WHERE idsi_rol = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_rol, created_by];
    } else {
        query = 'SELECT * FROM si_rol WHERE idsi_rol = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_rol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol encontrad@' });
    });
};

Si_rol.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idsi_rol) AS count FROM si_rol';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol contabilizad@' });
    });
};

Si_rol.exist = (idSi_rol, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM si_rol WHERE idsi_rol = ?) AS exist';
    keys = [idSi_rol];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol verificad@' });
    });
};

Si_rol.insert = (Si_rol, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO si_rol SET ?';
    keys = [Si_rol];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol cread@' });
    });
};

Si_rol.update = (Si_rol, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_rol SET ? WHERE idsi_rol = ? AND created_by = ?';
        keys = [Si_rol, Si_rol.idsi_rol, created_by];
    } else {
        query = 'UPDATE si_rol SET ? WHERE idsi_rol = ?';
        keys = [Si_rol, Si_rol.idsi_rol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol actualizad@' });
    });
};

Si_rol.remove = (idsi_rol, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM si_rol WHERE idsi_rol = ? AND created_by = ?';
        keys = [idsi_rol, created_by];
    } else {
        query = 'DELETE FROM si_rol WHERE idsi_rol = ?';
        keys = [idsi_rol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol eliminad@' });
    });
};

Si_rol.logicRemove = (idsi_rol, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_rol SET baja = 1 WHERE idsi_rol = ? AND created_by = ?';
        keys = [idsi_rol, created_by];
    } else {
        query = 'UPDATE si_rol SET baja = 1 WHERE idsi_rol = ?';
        keys = [idsi_rol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_rol eliminad@' });
    });
};

Si_rol.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Si_rol;
