const connection = require('../config/db-connection');

const Pagofianza = {};

Pagofianza.findByIdChofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pagofianza.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagofianza INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagofianza.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagofianza.chofer_idchofer = ? AND pagofianza.created_by = ? HAVING pagofianza.baja IS NULL OR pagofianza.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT pagofianza.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagofianza INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagofianza.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagofianza.chofer_idchofer = ? HAVING pagofianza.baja IS NULL OR pagofianza.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza encontrad@' });
    });
};

Pagofianza.findByIdPago = (idPago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pagofianza.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagofianza INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagofianza.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagofianza.pago_idpago = ? AND pagofianza.created_by = ? HAVING pagofianza.baja IS NULL OR pagofianza.baja = false';
        keys = [idPago, created_by];
    } else {
        query = 'SELECT pagofianza.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagofianza INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagofianza.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagofianza.pago_idpago = ? HAVING pagofianza.baja IS NULL OR pagofianza.baja = false';
        keys = [idPago];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza encontrad@' });
    });
};

Pagofianza.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pagofianza.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagofianza INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagofianza.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagofianza.created_by = ? HAVING pagofianza.baja IS NULL OR pagofianza.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT pagofianza.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagofianza INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagofianza.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING pagofianza.baja IS NULL OR pagofianza.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza leíd@' });
    });
};

Pagofianza.findById = (idPagofianza, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM pagofianza WHERE idpagofianza = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPagofianza, created_by];
    } else {
        query = 'SELECT * FROM pagofianza WHERE idpagofianza = ? HAVING baja IS NULL OR baja = false';
        keys = [idPagofianza];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza encontrad@' });
    });
};

Pagofianza.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpagofianza) AS count FROM pagofianza';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza contabilizad@' });
    });
};

Pagofianza.exist = (idPagofianza, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM pagofianza WHERE idpagofianza = ?) AS exist';
    keys = [idPagofianza];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza verificad@' });
    });
};

Pagofianza.insert = (Pagofianza, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO pagofianza SET ?';
    keys = [Pagofianza];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza cread@' });
    });
};

Pagofianza.update = (Pagofianza, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pagofianza SET ? WHERE idpagofianza = ? AND created_by = ?';
        keys = [Pagofianza, Pagofianza.idpagofianza, created_by];
    } else {
        query = 'UPDATE pagofianza SET ? WHERE idpagofianza = ?';
        keys = [Pagofianza, Pagofianza.idpagofianza];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza actualizad@' });
    });
};

Pagofianza.remove = (idpagofianza, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM pagofianza WHERE idpagofianza = ? AND created_by = ?';
        keys = [idpagofianza, created_by];
    } else {
        query = 'DELETE FROM pagofianza WHERE idpagofianza = ?';
        keys = [idpagofianza];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza eliminad@' });
    });
};

Pagofianza.logicRemove = (idpagofianza, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pagofianza SET baja = 1 WHERE idpagofianza = ? AND created_by = ?';
        keys = [idpagofianza, created_by];
    } else {
        query = 'UPDATE pagofianza SET baja = 1 WHERE idpagofianza = ?';
        keys = [idpagofianza];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagofianza eliminad@' });
    });
};

Pagofianza.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Pagofianza;
