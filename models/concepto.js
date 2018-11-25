const connection = require('../config/db-connection');

const Concepto = {};

Concepto.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT concepto.* FROM concepto    WHERE concepto.created_by = ? HAVING concepto.baja IS NULL OR concepto.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT concepto.* FROM concepto    HAVING concepto.baja IS NULL OR concepto.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Concepto leíd@' });
    });
};

Concepto.findById = (idConcepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM concepto WHERE idconcepto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idConcepto, created_by];
    } else {
        query = 'SELECT * FROM concepto WHERE idconcepto = ? HAVING baja IS NULL OR baja = false';
        keys = [idConcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Concepto encontrad@' });
    });
};

Concepto.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idconcepto) AS count FROM concepto';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Concepto contabilizad@' });
    });
};

Concepto.exist = (idConcepto, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM concepto WHERE idconcepto = ?) AS exist';
    keys = [idConcepto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Concepto verificad@' });
    });
};

Concepto.insert = (Concepto, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO concepto SET ?';
    keys = [Concepto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Concepto cread@' });
    });
};

Concepto.update = (Concepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE concepto SET ? WHERE idconcepto = ? AND created_by = ?';
        keys = [Concepto, Concepto.idconcepto, created_by];
    } else {
        query = 'UPDATE concepto SET ? WHERE idconcepto = ?';
        keys = [Concepto, Concepto.idconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Concepto actualizad@' });
    });
};

Concepto.remove = (idconcepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM concepto WHERE idconcepto = ? AND created_by = ?';
        keys = [idconcepto, created_by];
    } else {
        query = 'DELETE FROM concepto WHERE idconcepto = ?';
        keys = [idconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Concepto eliminad@' });
    });
};

Concepto.logicRemove = (idconcepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE concepto SET baja = 1 WHERE idconcepto = ? AND created_by = ?';
        keys = [idconcepto, created_by];
    } else {
        query = 'UPDATE concepto SET baja = 1 WHERE idconcepto = ?';
        keys = [idconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Concepto eliminad@' });
    });
};

Concepto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Concepto;
