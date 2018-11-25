const connection = require('../config/db-connection');

const Stock = {};

Stock.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT stock.* FROM stock    WHERE stock.created_by = ? HAVING stock.baja IS NULL OR stock.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT stock.* FROM stock    HAVING stock.baja IS NULL OR stock.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Stock leíd@' });
    });
};

Stock.findById = (idStock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM stock WHERE idstock = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idStock, created_by];
    } else {
        query = 'SELECT * FROM stock WHERE idstock = ? HAVING baja IS NULL OR baja = false';
        keys = [idStock];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Stock encontrad@' });
    });
};

Stock.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idstock) AS count FROM stock';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Stock contabilizad@' });
    });
};

Stock.exist = (idStock, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM stock WHERE idstock = ?) AS exist';
    keys = [idStock];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Stock verificad@' });
    });
};

Stock.insert = (Stock, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO stock SET ?';
    keys = [Stock];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Stock cread@' });
    });
};

Stock.update = (Stock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE stock SET ? WHERE idstock = ? AND created_by = ?';
        keys = [Stock, Stock.idstock, created_by];
    } else {
        query = 'UPDATE stock SET ? WHERE idstock = ?';
        keys = [Stock, Stock.idstock];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Stock actualizad@' });
    });
};

Stock.remove = (idstock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM stock WHERE idstock = ? AND created_by = ?';
        keys = [idstock, created_by];
    } else {
        query = 'DELETE FROM stock WHERE idstock = ?';
        keys = [idstock];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Stock eliminad@' });
    });
};

Stock.logicRemove = (idstock, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE stock SET baja = 1 WHERE idstock = ? AND created_by = ?';
        keys = [idstock, created_by];
    } else {
        query = 'UPDATE stock SET baja = 1 WHERE idstock = ?';
        keys = [idstock];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Stock eliminad@' });
    });
};

Stock.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Stock;
