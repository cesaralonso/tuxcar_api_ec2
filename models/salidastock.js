const connection = require('../config/db-connection');

const Salidastock = {};

Salidastock.findByIdOrdentarea = (idOrdentarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT salidastock.*, _ordentarea_idordentarea.idordentarea as ordentarea_ordentarea_idordentarea , _stock_idstock.nombre as stock_stock_idstock FROM salidastock INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = salidastock.ordentarea_idordentarea INNER JOIN stock as _stock_idstock ON _stock_idstock.idstock = salidastock.stock_idstock   WHERE salidastock.ordentarea_idordentarea = ? AND salidastock.created_by = ? HAVING salidastock.baja IS NULL OR salidastock.baja = false';
        keys = [idOrdentarea, created_by];
    } else {
        query = 'SELECT salidastock.*, _ordentarea_idordentarea.idordentarea as ordentarea_ordentarea_idordentarea , _stock_idstock.nombre as stock_stock_idstock FROM salidastock INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = salidastock.ordentarea_idordentarea INNER JOIN stock as _stock_idstock ON _stock_idstock.idstock = salidastock.stock_idstock   WHERE salidastock.ordentarea_idordentarea = ? HAVING salidastock.baja IS NULL OR salidastock.baja = false';
        keys = [idOrdentarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Salidastock encontrad@' });
    });
};

Salidastock.findByIdStock = (idStock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT salidastock.*, _ordentarea_idordentarea.idordentarea as ordentarea_ordentarea_idordentarea , _stock_idstock.nombre as stock_stock_idstock FROM salidastock INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = salidastock.ordentarea_idordentarea INNER JOIN stock as _stock_idstock ON _stock_idstock.idstock = salidastock.stock_idstock   WHERE salidastock.stock_idstock = ? AND salidastock.created_by = ? HAVING salidastock.baja IS NULL OR salidastock.baja = false';
        keys = [idStock, created_by];
    } else {
        query = 'SELECT salidastock.*, _ordentarea_idordentarea.idordentarea as ordentarea_ordentarea_idordentarea , _stock_idstock.nombre as stock_stock_idstock FROM salidastock INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = salidastock.ordentarea_idordentarea INNER JOIN stock as _stock_idstock ON _stock_idstock.idstock = salidastock.stock_idstock   WHERE salidastock.stock_idstock = ? HAVING salidastock.baja IS NULL OR salidastock.baja = false';
        keys = [idStock];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Salidastock encontrad@' });
    });
};

Salidastock.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT salidastock.*, _ordentarea_idordentarea.idordentarea as ordentarea_ordentarea_idordentarea , _stock_idstock.nombre as stock_stock_idstock FROM salidastock INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = salidastock.ordentarea_idordentarea INNER JOIN stock as _stock_idstock ON _stock_idstock.idstock = salidastock.stock_idstock   WHERE salidastock.created_by = ? HAVING salidastock.baja IS NULL OR salidastock.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT salidastock.*, _ordentarea_idordentarea.idordentarea as ordentarea_ordentarea_idordentarea , _stock_idstock.nombre as stock_stock_idstock FROM salidastock INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = salidastock.ordentarea_idordentarea INNER JOIN stock as _stock_idstock ON _stock_idstock.idstock = salidastock.stock_idstock   HAVING salidastock.baja IS NULL OR salidastock.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Salidastock leíd@' });
    });
};

Salidastock.findById = (idSalidastock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM salidastock WHERE idsalidastock = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSalidastock, created_by];
    } else {
        query = 'SELECT * FROM salidastock WHERE idsalidastock = ? HAVING baja IS NULL OR baja = false';
        keys = [idSalidastock];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Salidastock encontrad@' });
    });
};

Salidastock.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idsalidastock) AS count FROM salidastock';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Salidastock contabilizad@' });
    });
};

Salidastock.exist = (idSalidastock, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM salidastock WHERE idsalidastock = ?) AS exist';
    keys = [idSalidastock];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Salidastock verificad@' });
    });
};

Salidastock.insert = (Salidastock, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO salidastock SET ?';
    keys = [Salidastock];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            // ACTUALIZAR CANTIDAD DE STOCK
            query = 'UPDATE stock SET cantidad = cantidad - ? WHERE idstock = ?';
            keys = [Salidastock.cantidad, Salidastock.stock_idstock];

            connection.query(query, keys, (error, stock) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                else {
                    return next(null, { success: true, result: stock, message: 'Salidastock creada, Stock actualizado' });
                }
            });
        }
    });
};

Salidastock.update = (Salidastock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE salidastock SET ? WHERE idsalidastock = ? AND created_by = ?';
        keys = [Salidastock, Salidastock.idsalidastock, created_by];
    } else {
        query = 'UPDATE salidastock SET ? WHERE idsalidastock = ?';
        keys = [Salidastock, Salidastock.idsalidastock];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Salidastock actualizad@' });
    });
};

Salidastock.remove = (idsalidastock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM salidastock WHERE idsalidastock = ? AND created_by = ?';
        keys = [idsalidastock, created_by];
    } else {
        query = 'DELETE FROM salidastock WHERE idsalidastock = ?';
        keys = [idsalidastock];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Salidastock eliminad@' });
    });
};

Salidastock.logicRemove = (idsalidastock, cantidad, idstock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE salidastock SET baja = 1 WHERE idsalidastock = ? AND created_by = ?';
        keys = [idsalidastock, created_by];
    } else {
        query = 'UPDATE salidastock SET baja = 1 WHERE idsalidastock = ?';
        keys = [idsalidastock];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else {

            // ACTUALIZAR CANTIDAD DE STOCK
            query = 'UPDATE stock SET cantidad = cantidad + ? WHERE idstock = ?';
            keys = [cantidad, idstock];

            connection.query(query, keys, (error, stock) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                else {
                    return next(null, { success: true, result: stock, message: 'Salidastock eliminada, Stock actualizado' });
                }
            });
        }
    });
};

Salidastock.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Salidastock;
