const connection = require('../config/db-connection');

const Abono = {};

Abono.totalAbonosPorFechas = (fechainicial, fechafinal, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT SUM(abono.montoPagado) as ingreso, abono.baja FROM abono INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden WHERE WHERE abono.fecha BETWEEN ? AND ? AND abono.created_by = ? HAVING abono.baja IS NULL OR abono.baja = false';
        keys = [fechainicial, fechafinal, created_by];
    } else {
        query = 'SELECT SUM(abono.montoPagado) as ingreso, abono.baja FROM abono INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden WHERE abono.fecha BETWEEN ? AND ? HAVING abono.baja IS NULL OR abono.baja = false';
        keys = [fechainicial, fechafinal];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el total' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else {
            return next(null, { success: true, result: result, message: 'Total de abonos por fecha obtenido' });
        }
    });
};

Abono.findByIdOrden = (idOrden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden FROM abono INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden   WHERE abono.orden_idorden = ? AND abono.created_by = ? HAVING abono.baja IS NULL OR abono.baja = false';
        keys = [idOrden, created_by];
    } else {
        query = 'SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden FROM abono INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden   WHERE abono.orden_idorden = ? HAVING abono.baja IS NULL OR abono.baja = false';
        keys = [idOrden];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Abono encontrad@' });
    });
};

Abono.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden FROM abono INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden WHERE abono.created_at >= (DATE_FORMAT(abono.created_at, \"%Y-%m-01\")) AND abono.created_by = ? HAVING abono.baja IS NULL OR abono.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden FROM abono INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden WHERE abono.created_at >= (DATE_FORMAT(abono.created_at, \"%Y-%m-01\")) HAVING abono.baja IS NULL OR abono.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Abono leíd@' });
    });
};

Abono.findById = (idAbono, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM abono WHERE idabono = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idAbono, created_by];
    } else {
        query = 'SELECT * FROM abono WHERE idabono = ? HAVING baja IS NULL OR baja = false';
        keys = [idAbono];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Abono encontrad@' });
    });
};

Abono.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idabono) AS count FROM abono';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Abono contabilizad@' });
    });
};

Abono.exist = (idAbono, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM abono WHERE idabono = ?) AS exist';
    keys = [idAbono];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Abono verificad@' });
    });
};

Abono.insert = (Abono, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    const abonoFecha = Abono.fecha;

    query = 'SELECT EXISTS(SELECT 1 FROM corte WHERE fechaInicia = ? AND fechaFInaliza IS NULL) AS exist';
    keys = [abonoFecha];

    // REVISA QUE UN CORTE ESTÉ INICIADO EN FECHA DE ABONO
    connection.query(query, keys, (error, corte) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            if (corte[0].exist) {

                query = 'INSERT INTO abono SET ?';
                keys = [Abono];

                connection.query(query, keys, (error, result) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                    else
                        return next(null, { success: true, result: result, message: 'Abono cread@' });
                });

            } else {
                return next(null, { success: false, result: false, message: 'Debes iniciar la caja para crear un abono' });
            }

        }
    });

};

Abono.update = (Abono, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE abono SET ? WHERE idabono = ? AND created_by = ?';
        keys = [Abono, Abono.idabono, created_by];
    } else {
        query = 'UPDATE abono SET ? WHERE idabono = ?';
        keys = [Abono, Abono.idabono];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Abono actualizad@' });
    });
};

Abono.remove = (idabono, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM abono WHERE idabono = ? AND created_by = ?';
        keys = [idabono, created_by];
    } else {
        query = 'DELETE FROM abono WHERE idabono = ?';
        keys = [idabono];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Abono eliminad@' });
    });
};

Abono.logicRemove = (idabono, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE abono SET baja = 1 WHERE idabono = ? AND created_by = ?';
        keys = [idabono, created_by];
    } else {
        query = 'UPDATE abono SET baja = 1 WHERE idabono = ?';
        keys = [idabono];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Abono eliminad@' });
    });
};

Abono.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Abono;
