const connection = require('../config/db-connection');

const Area = {};

Area.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT area.* FROM area    WHERE area.created_by = ? HAVING area.baja IS NULL OR area.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT area.* FROM area    HAVING area.baja IS NULL OR area.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Area leíd@' });
    });
};

Area.findById = (idArea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM area WHERE idarea = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idArea, created_by];
    } else {
        query = 'SELECT * FROM area WHERE idarea = ? HAVING baja IS NULL OR baja = false';
        keys = [idArea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Area encontrad@' });
    });
};

Area.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idarea) AS count FROM area';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Area contabilizad@' });
    });
};

Area.exist = (idArea, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM area WHERE idarea = ?) AS exist';
    keys = [idArea];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Area verificad@' });
    });
};

Area.insert = (Area, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO area SET ?';
    keys = [Area];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Area cread@' });
    });
};

Area.update = (Area, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE area SET ? WHERE idarea = ? AND created_by = ?';
        keys = [Area, Area.idarea, created_by];
    } else {
        query = 'UPDATE area SET ? WHERE idarea = ?';
        keys = [Area, Area.idarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Area actualizad@' });
    });
};

Area.remove = (idarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM area WHERE idarea = ? AND created_by = ?';
        keys = [idarea, created_by];
    } else {
        query = 'DELETE FROM area WHERE idarea = ?';
        keys = [idarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Area eliminad@' });
    });
};

Area.logicRemove = (idarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE area SET baja = 1 WHERE idarea = ? AND created_by = ?';
        keys = [idarea, created_by];
    } else {
        query = 'UPDATE area SET baja = 1 WHERE idarea = ?';
        keys = [idarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Area eliminad@' });
    });
};

Area.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Area;
