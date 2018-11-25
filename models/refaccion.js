const connection = require('../config/db-connection');

const Refaccion = {};

Refaccion.findByIdTaller = (idTaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT refaccion.*, _taller_idtaller.nombre as taller_taller_idtaller FROM refaccion INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = refaccion.taller_idtaller   WHERE refaccion.taller_idtaller = ? AND refaccion.created_by = ? HAVING refaccion.baja IS NULL OR refaccion.baja = false';
        keys = [idTaller, created_by];
    } else {
        query = 'SELECT refaccion.*, _taller_idtaller.nombre as taller_taller_idtaller FROM refaccion INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = refaccion.taller_idtaller   WHERE refaccion.taller_idtaller = ? HAVING refaccion.baja IS NULL OR refaccion.baja = false';
        keys = [idTaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion encontrad@' });
    });
};

Refaccion.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT refaccion.*, _taller_idtaller.nombre as taller_taller_idtaller FROM refaccion INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = refaccion.taller_idtaller   WHERE refaccion.created_by = ? HAVING refaccion.baja IS NULL OR refaccion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT refaccion.*, _taller_idtaller.nombre as taller_taller_idtaller FROM refaccion INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = refaccion.taller_idtaller   HAVING refaccion.baja IS NULL OR refaccion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion leíd@' });
    });
};

Refaccion.findById = (idRefaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM refaccion WHERE idrefaccion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idRefaccion, created_by];
    } else {
        query = 'SELECT * FROM refaccion WHERE idrefaccion = ? HAVING baja IS NULL OR baja = false';
        keys = [idRefaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion encontrad@' });
    });
};

Refaccion.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idrefaccion) AS count FROM refaccion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion contabilizad@' });
    });
};

Refaccion.exist = (idRefaccion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM refaccion WHERE idrefaccion = ?) AS exist';
    keys = [idRefaccion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion verificad@' });
    });
};

Refaccion.insert = (Refaccion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO refaccion SET ?';
    keys = [Refaccion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion cread@' });
    });
};

Refaccion.update = (Refaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE refaccion SET ? WHERE idrefaccion = ? AND created_by = ?';
        keys = [Refaccion, Refaccion.idrefaccion, created_by];
    } else {
        query = 'UPDATE refaccion SET ? WHERE idrefaccion = ?';
        keys = [Refaccion, Refaccion.idrefaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion actualizad@' });
    });
};

Refaccion.remove = (idrefaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM refaccion WHERE idrefaccion = ? AND created_by = ?';
        keys = [idrefaccion, created_by];
    } else {
        query = 'DELETE FROM refaccion WHERE idrefaccion = ?';
        keys = [idrefaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion eliminad@' });
    });
};

Refaccion.logicRemove = (idrefaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE refaccion SET baja = 1 WHERE idrefaccion = ? AND created_by = ?';
        keys = [idrefaccion, created_by];
    } else {
        query = 'UPDATE refaccion SET baja = 1 WHERE idrefaccion = ?';
        keys = [idrefaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Refaccion eliminad@' });
    });
};

Refaccion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Refaccion;
