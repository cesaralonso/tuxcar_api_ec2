const connection = require('../config/db-connection');

const Ordenestado = {};

Ordenestado.findByIdEstadopago = (idEstadopago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordenestado.*, _orden_idorden.idorden as orden_orden_idorden , _estadopago_idestadopago.nombre as estadopago_estadopago_idestadopago FROM ordenestado INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenestado.orden_idorden INNER JOIN estadopago as _estadopago_idestadopago ON _estadopago_idestadopago.idestadopago = ordenestado.estadopago_idestadopago   WHERE ordenestado.estadopago_idestadopago = ? AND ordenestado.created_by = ? HAVING ordenestado.baja IS NULL OR ordenestado.baja = false';
        keys = [idEstadopago, created_by];
    } else {
        query = 'SELECT ordenestado.*, _orden_idorden.idorden as orden_orden_idorden , _estadopago_idestadopago.nombre as estadopago_estadopago_idestadopago FROM ordenestado INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenestado.orden_idorden INNER JOIN estadopago as _estadopago_idestadopago ON _estadopago_idestadopago.idestadopago = ordenestado.estadopago_idestadopago   WHERE ordenestado.estadopago_idestadopago = ? HAVING ordenestado.baja IS NULL OR ordenestado.baja = false';
        keys = [idEstadopago];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado encontrad@' });
    });
};

Ordenestado.findByIdOrden = (idOrden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordenestado.*, _orden_idorden.idorden as orden_orden_idorden , _estadopago_idestadopago.nombre as estadopago_estadopago_idestadopago FROM ordenestado INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenestado.orden_idorden INNER JOIN estadopago as _estadopago_idestadopago ON _estadopago_idestadopago.idestadopago = ordenestado.estadopago_idestadopago   WHERE ordenestado.orden_idorden = ? AND ordenestado.created_by = ? HAVING ordenestado.baja IS NULL OR ordenestado.baja = false';
        keys = [idOrden, created_by];
    } else {
        query = 'SELECT ordenestado.*, _orden_idorden.idorden as orden_orden_idorden , _estadopago_idestadopago.nombre as estadopago_estadopago_idestadopago FROM ordenestado INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenestado.orden_idorden INNER JOIN estadopago as _estadopago_idestadopago ON _estadopago_idestadopago.idestadopago = ordenestado.estadopago_idestadopago   WHERE ordenestado.orden_idorden = ? HAVING ordenestado.baja IS NULL OR ordenestado.baja = false';
        keys = [idOrden];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado encontrad@' });
    });
};

Ordenestado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordenestado.*, _orden_idorden.idorden as orden_orden_idorden , _estadopago_idestadopago.nombre as estadopago_estadopago_idestadopago FROM ordenestado INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenestado.orden_idorden INNER JOIN estadopago as _estadopago_idestadopago ON _estadopago_idestadopago.idestadopago = ordenestado.estadopago_idestadopago   WHERE ordenestado.created_by = ? HAVING ordenestado.baja IS NULL OR ordenestado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT ordenestado.*, _orden_idorden.idorden as orden_orden_idorden , _estadopago_idestadopago.nombre as estadopago_estadopago_idestadopago FROM ordenestado INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenestado.orden_idorden INNER JOIN estadopago as _estadopago_idestadopago ON _estadopago_idestadopago.idestadopago = ordenestado.estadopago_idestadopago   HAVING ordenestado.baja IS NULL OR ordenestado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado leíd@' });
    });
};

Ordenestado.findById = (idOrdenestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM ordenestado WHERE idordenestado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrdenestado, created_by];
    } else {
        query = 'SELECT * FROM ordenestado WHERE idordenestado = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrdenestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado encontrad@' });
    });
};

Ordenestado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idordenestado) AS count FROM ordenestado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado contabilizad@' });
    });
};

Ordenestado.exist = (idOrdenestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM ordenestado WHERE idordenestado = ?) AS exist';
    keys = [idOrdenestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado verificad@' });
    });
};

Ordenestado.insert = (Ordenestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO ordenestado SET ?';
    keys = [Ordenestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado cread@' });
    });
};

Ordenestado.update = (Ordenestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE ordenestado SET ? WHERE idordenestado = ? AND created_by = ?';
        keys = [Ordenestado, Ordenestado.idordenestado, created_by];
    } else {
        query = 'UPDATE ordenestado SET ? WHERE idordenestado = ?';
        keys = [Ordenestado, Ordenestado.idordenestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado actualizad@' });
    });
};

Ordenestado.remove = (idordenestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM ordenestado WHERE idordenestado = ? AND created_by = ?';
        keys = [idordenestado, created_by];
    } else {
        query = 'DELETE FROM ordenestado WHERE idordenestado = ?';
        keys = [idordenestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado eliminad@' });
    });
};

Ordenestado.logicRemove = (idordenestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE ordenestado SET baja = 1 WHERE idordenestado = ? AND created_by = ?';
        keys = [idordenestado, created_by];
    } else {
        query = 'UPDATE ordenestado SET baja = 1 WHERE idordenestado = ?';
        keys = [idordenestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenestado eliminad@' });
    });
};

Ordenestado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Ordenestado;
