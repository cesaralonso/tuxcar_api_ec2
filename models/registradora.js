const connection = require('../config/db-connection');

const Registradora = {};

Registradora.totalPorFechas = (fechainicial, fechafinal, seccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT SUM(registradora.montoIngresa) as ingreso, SUM(registradora.montoEgresa) as egreso, registradora.baja FROM registradora WHERE registradora.destino = ? AND registradora.fecha BETWEEN ? AND ?  AND registradora.created_by = ? HAVING registradora.baja IS NULL OR registradora.baja = false';
        keys = [seccion, fechainicial, fechafinal, created_by];
    } else {
        query = 'SELECT SUM(registradora.montoIngresa) as ingreso, SUM(registradora.montoEgresa) as egreso, registradora.baja FROM registradora WHERE registradora.destino = ? AND registradora.fecha BETWEEN ? AND ?  HAVING registradora.baja IS NULL OR registradora.baja = false';
        keys = [seccion, fechainicial, fechafinal];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el total' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Total de egreso por fecha obtenido' });
    });
};

Registradora.findByIdEmpleado = (idEmpleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT registradora.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM registradora INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = registradora.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE registradora.empleado_idempleado = ? AND registradora.created_by = ? HAVING registradora.baja IS NULL OR registradora.baja = false';
        keys = [idEmpleado, created_by];
    } else {
        query = 'SELECT registradora.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM registradora INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = registradora.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE registradora.empleado_idempleado = ? HAVING registradora.baja IS NULL OR registradora.baja = false';
        keys = [idEmpleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Registradora encontrad@' });
    });
};

Registradora.allFromTo = (fechaDesde, fechaHasta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT registradora.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM registradora INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = registradora.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE registradora.fecha BETWEEN ? AND ? AND registradora.created_by = ? HAVING registradora.baja IS NULL OR registradora.baja = false';
        keys = [fechaDesde, fechaHasta, created_by];
    } else {
        query = 'SELECT registradora.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM registradora INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = registradora.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona WHERE registradora.fecha BETWEEN ? AND ?  HAVING registradora.baja IS NULL OR registradora.baja = false';
        keys = [fechaDesde, fechaHasta];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Registradora leíd@' });
    });
};

Registradora.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT registradora.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM registradora INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = registradora.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE registradora.created_by = ? HAVING registradora.baja IS NULL OR registradora.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT registradora.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM registradora INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = registradora.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  HAVING registradora.baja IS NULL OR registradora.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Registradora leíd@' });
    });
};

Registradora.findById = (idRegistradora, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM registradora WHERE idregistradora = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idRegistradora, created_by];
    } else {
        query = 'SELECT * FROM registradora WHERE idregistradora = ? HAVING baja IS NULL OR baja = false';
        keys = [idRegistradora];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Registradora encontrad@' });
    });
};

Registradora.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idregistradora) AS count FROM registradora';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Registradora contabilizad@' });
    });
};

Registradora.exist = (idRegistradora, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM registradora WHERE idregistradora = ?) AS exist';
    keys = [idRegistradora];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Registradora verificad@' });
    });
};

Registradora.insert = (Registradora, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO registradora SET ?';
    keys = [Registradora];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Registradora cread@' });
    });
};

Registradora.update = (Registradora, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE registradora SET ? WHERE idregistradora = ? AND created_by = ?';
        keys = [Registradora, Registradora.idregistradora, created_by];
    } else {
        query = 'UPDATE registradora SET ? WHERE idregistradora = ?';
        keys = [Registradora, Registradora.idregistradora];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Registradora actualizad@' });
    });
};

Registradora.remove = (idregistradora, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM registradora WHERE idregistradora = ? AND created_by = ?';
        keys = [idregistradora, created_by];
    } else {
        query = 'DELETE FROM registradora WHERE idregistradora = ?';
        keys = [idregistradora];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Registradora eliminad@' });
    });
};

Registradora.logicRemove = (idregistradora, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE registradora SET baja = 1 WHERE idregistradora = ? AND created_by = ?';
        keys = [idregistradora, created_by];
    } else {
        query = 'UPDATE registradora SET baja = 1 WHERE idregistradora = ?';
        keys = [idregistradora];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Registradora eliminad@' });
    });
};

Registradora.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Registradora;
