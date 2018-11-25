const connection = require('../config/db-connection');

const Sexo = {};

Sexo.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT sexo.* FROM sexo    WHERE sexo.created_by = ? HAVING sexo.baja IS NULL OR sexo.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT sexo.* FROM sexo    HAVING sexo.baja IS NULL OR sexo.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Sexo leíd@' });
    });
};

Sexo.findById = (idSexo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM sexo WHERE idsexo = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSexo, created_by];
    } else {
        query = 'SELECT * FROM sexo WHERE idsexo = ? HAVING baja IS NULL OR baja = false';
        keys = [idSexo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Sexo encontrad@' });
    });
};

Sexo.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idsexo) AS count FROM sexo';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Sexo contabilizad@' });
    });
};

Sexo.exist = (idSexo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM sexo WHERE idsexo = ?) AS exist';
    keys = [idSexo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Sexo verificad@' });
    });
};

Sexo.insert = (Sexo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO sexo SET ?';
    keys = [Sexo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Sexo cread@' });
    });
};

Sexo.update = (Sexo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE sexo SET ? WHERE idsexo = ? AND created_by = ?';
        keys = [Sexo, Sexo.idsexo, created_by];
    } else {
        query = 'UPDATE sexo SET ? WHERE idsexo = ?';
        keys = [Sexo, Sexo.idsexo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Sexo actualizad@' });
    });
};

Sexo.remove = (idsexo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM sexo WHERE idsexo = ? AND created_by = ?';
        keys = [idsexo, created_by];
    } else {
        query = 'DELETE FROM sexo WHERE idsexo = ?';
        keys = [idsexo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Sexo eliminad@' });
    });
};

Sexo.logicRemove = (idsexo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE sexo SET baja = 1 WHERE idsexo = ? AND created_by = ?';
        keys = [idsexo, created_by];
    } else {
        query = 'UPDATE sexo SET baja = 1 WHERE idsexo = ?';
        keys = [idsexo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Sexo eliminad@' });
    });
};

Sexo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Sexo;
