const connection = require('../config/db-connection');

const Formula = {};

Formula.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT formula.* FROM formula    WHERE formula.created_by = ? HAVING formula.baja IS NULL OR formula.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT formula.* FROM formula    HAVING formula.baja IS NULL OR formula.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Formula leíd@' });
    });
};

Formula.findById = (idFormula, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM formula WHERE idformula = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idFormula, created_by];
    } else {
        query = 'SELECT * FROM formula WHERE idformula = ? HAVING baja IS NULL OR baja = false';
        keys = [idFormula];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Formula encontrad@' });
    });
};

Formula.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idformula) AS count FROM formula';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Formula contabilizad@' });
    });
};

Formula.exist = (idFormula, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM formula WHERE idformula = ?) AS exist';
    keys = [idFormula];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Formula verificad@' });
    });
};

Formula.insert = (Formula, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO formula SET ?';
    keys = [Formula];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Formula cread@' });
    });
};

Formula.update = (Formula, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE formula SET ? WHERE idformula = ? AND created_by = ?';
        keys = [Formula, Formula.idformula, created_by];
    } else {
        query = 'UPDATE formula SET ? WHERE idformula = ?';
        keys = [Formula, Formula.idformula];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Formula actualizad@' });
    });
};

Formula.remove = (idformula, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM formula WHERE idformula = ? AND created_by = ?';
        keys = [idformula, created_by];
    } else {
        query = 'DELETE FROM formula WHERE idformula = ?';
        keys = [idformula];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Formula eliminad@' });
    });
};

Formula.logicRemove = (idformula, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE formula SET baja = 1 WHERE idformula = ? AND created_by = ?';
        keys = [idformula, created_by];
    } else {
        query = 'UPDATE formula SET baja = 1 WHERE idformula = ?';
        keys = [idformula];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Formula eliminad@' });
    });
};

Formula.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Formula;
