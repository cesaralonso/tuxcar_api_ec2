const connection = require('../config/db-connection');

const Tarea = {};

Tarea.findByIdArea = (idArea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT tarea.*, _producto_idproducto.nombre as producto_producto_idproducto , _area_idarea.nombre as area_area_idarea FROM tarea INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = tarea.producto_idproducto INNER JOIN area as _area_idarea ON _area_idarea.idarea = tarea.area_idarea   WHERE tarea.area_idarea = ? AND tarea.created_by = ? HAVING tarea.baja IS NULL OR tarea.baja = false';
        keys = [idArea, created_by];
    } else {
        query = 'SELECT tarea.*, _producto_idproducto.nombre as producto_producto_idproducto , _area_idarea.nombre as area_area_idarea FROM tarea INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = tarea.producto_idproducto INNER JOIN area as _area_idarea ON _area_idarea.idarea = tarea.area_idarea   WHERE tarea.area_idarea = ? HAVING tarea.baja IS NULL OR tarea.baja = false';
        keys = [idArea];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tarea encontrad@' });
    });
};

Tarea.findByIdProducto = (idProducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT tarea.*, _producto_idproducto.nombre as producto_producto_idproducto , _area_idarea.nombre as area_area_idarea FROM tarea INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = tarea.producto_idproducto INNER JOIN area as _area_idarea ON _area_idarea.idarea = tarea.area_idarea   WHERE tarea.producto_idproducto = ? AND tarea.created_by = ? HAVING tarea.baja IS NULL OR tarea.baja = false';
        keys = [idProducto, created_by];
    } else {
        query = 'SELECT tarea.*, _producto_idproducto.nombre as producto_producto_idproducto , _area_idarea.nombre as area_area_idarea FROM tarea INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = tarea.producto_idproducto INNER JOIN area as _area_idarea ON _area_idarea.idarea = tarea.area_idarea   WHERE tarea.producto_idproducto = ? HAVING tarea.baja IS NULL OR tarea.baja = false';
        keys = [idProducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tarea encontrad@' });
    });
};

Tarea.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT tarea.*, _producto_idproducto.nombre as producto_producto_idproducto , _area_idarea.nombre as area_area_idarea FROM tarea INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = tarea.producto_idproducto INNER JOIN area as _area_idarea ON _area_idarea.idarea = tarea.area_idarea   WHERE tarea.created_by = ? HAVING tarea.baja IS NULL OR tarea.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT tarea.*, _producto_idproducto.nombre as producto_producto_idproducto , _area_idarea.nombre as area_area_idarea FROM tarea INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = tarea.producto_idproducto INNER JOIN area as _area_idarea ON _area_idarea.idarea = tarea.area_idarea   HAVING tarea.baja IS NULL OR tarea.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tarea leíd@' });
    });
};

Tarea.findById = (idTarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM tarea WHERE idtarea = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idTarea, created_by];
    } else {
        query = 'SELECT * FROM tarea WHERE idtarea = ? HAVING baja IS NULL OR baja = false';
        keys = [idTarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tarea encontrad@' });
    });
};

Tarea.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idtarea) AS count FROM tarea';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tarea contabilizad@' });
    });
};

Tarea.exist = (idTarea, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM tarea WHERE idtarea = ?) AS exist';
    keys = [idTarea];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tarea verificad@' });
    });
};

Tarea.insert = (Tarea, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO tarea SET ?';
    keys = [Tarea];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Tarea cread@' });
    });
};

Tarea.update = (Tarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tarea SET ? WHERE idtarea = ? AND created_by = ?';
        keys = [Tarea, Tarea.idtarea, created_by];
    } else {
        query = 'UPDATE tarea SET ? WHERE idtarea = ?';
        keys = [Tarea, Tarea.idtarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tarea actualizad@' });
    });
};

Tarea.remove = (idtarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM tarea WHERE idtarea = ? AND created_by = ?';
        keys = [idtarea, created_by];
    } else {
        query = 'DELETE FROM tarea WHERE idtarea = ?';
        keys = [idtarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tarea eliminad@' });
    });
};

Tarea.logicRemove = (idtarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tarea SET baja = 1 WHERE idtarea = ? AND created_by = ?';
        keys = [idtarea, created_by];
    } else {
        query = 'UPDATE tarea SET baja = 1 WHERE idtarea = ?';
        keys = [idtarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tarea eliminad@' });
    });
};

Tarea.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Tarea;
