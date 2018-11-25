const connection = require('../config/db-connection');

const Egresoconcepto = {};

Egresoconcepto.totalEgresosPorFechas = (fechainicial, fechafinal, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT SUM(egresoconcepto.total) as egreso, egresoconcepto.baja FROM egresoconcepto WHERE egresoconcepto.fecha BETWEEN ? AND ?  AND egresoconcepto.created_by = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [fechainicial, fechafinal, created_by];
    } else {
        query = 'SELECT SUM(egresoconcepto.total) as egreso, egresoconcepto.baja FROM egresoconcepto WHERE egresoconcepto.fecha BETWEEN ? AND ?  HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [fechainicial, fechafinal];
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

Egresoconcepto.findByIdTaller = (idTaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT egresoconcepto.*,  if (_taller_idtaller.idtaller > 0, _taller_idtaller.nombre, "ADMINISTRACION") as taller_taller_idtaller, _concepto_idconcepto.nombre as concepto_concepto_idconcepto , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM egresoconcepto LEFT JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = egresoconcepto.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE egresoconcepto.taller_idtaller = ? AND egresoconcepto.created_by = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [idTaller, created_by];
    } else {
        query = 'SELECT egresoconcepto.*,  if (_taller_idtaller.idtaller > 0, _taller_idtaller.nombre, "ADMINISTRACION") as taller_taller_idtaller, _concepto_idconcepto.nombre as concepto_concepto_idconcepto , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM egresoconcepto LEFT JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = egresoconcepto.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE egresoconcepto.taller_idtaller = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [idTaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto encontrad@' });
    });
};

Egresoconcepto.findByIdConcepto = (idConcepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT egresoconcepto.*,  if (_taller_idtaller.idtaller > 0, _taller_idtaller.nombre, "ADMINISTRACION") as taller_taller_idtaller, _concepto_idconcepto.nombre as concepto_concepto_idconcepto , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM egresoconcepto LEFT JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = egresoconcepto.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE egresoconcepto.concepto_idconcepto = ? AND egresoconcepto.created_by = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [idConcepto, created_by];
    } else {
        query = 'SELECT egresoconcepto.*,  if (_taller_idtaller.idtaller > 0, _taller_idtaller.nombre, "ADMINISTRACION") as taller_taller_idtaller, _concepto_idconcepto.nombre as concepto_concepto_idconcepto , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM egresoconcepto LEFT JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = egresoconcepto.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE egresoconcepto.concepto_idconcepto = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [idConcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto encontrad@' });
    });
};

Egresoconcepto.findByIdEmpleado = (idEmpleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT egresoconcepto.*,  if (_taller_idtaller.idtaller > 0, _taller_idtaller.nombre, "ADMINISTRACION") as taller_taller_idtaller, _concepto_idconcepto.nombre as concepto_concepto_idconcepto , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM egresoconcepto LEFT JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = egresoconcepto.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE egresoconcepto.empleado_idempleado = ? AND egresoconcepto.created_by = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [idEmpleado, created_by];
    } else {
        query = 'SELECT egresoconcepto.*,  if (_taller_idtaller.idtaller > 0, _taller_idtaller.nombre, "ADMINISTRACION") as taller_taller_idtaller, _concepto_idconcepto.nombre as concepto_concepto_idconcepto , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM egresoconcepto LEFT JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = egresoconcepto.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE egresoconcepto.empleado_idempleado = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [idEmpleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto encontrad@' });
    });
};

Egresoconcepto.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT egresoconcepto.*,  if (_taller_idtaller.idtaller > 0, _taller_idtaller.nombre, "ADMINISTRACION") as taller_taller_idtaller, _concepto_idconcepto.nombre as concepto_concepto_idconcepto , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM egresoconcepto LEFT JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = egresoconcepto.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE egresoconcepto.created_by = ? HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT egresoconcepto.*,  if (_taller_idtaller.idtaller > 0, _taller_idtaller.nombre, "ADMINISTRACION") as taller_taller_idtaller, _concepto_idconcepto.nombre as concepto_concepto_idconcepto , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado FROM egresoconcepto LEFT JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = egresoconcepto.taller_idtaller INNER JOIN concepto as _concepto_idconcepto ON _concepto_idconcepto.idconcepto = egresoconcepto.concepto_idconcepto INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = egresoconcepto.empleado_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  HAVING egresoconcepto.baja IS NULL OR egresoconcepto.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto leíd@' });
    });
};

Egresoconcepto.findById = (idEgresoconcepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM egresoconcepto WHERE idegresoconcepto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEgresoconcepto, created_by];
    } else {
        query = 'SELECT * FROM egresoconcepto WHERE idegresoconcepto = ? HAVING baja IS NULL OR baja = false';
        keys = [idEgresoconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto encontrad@' });
    });
};

Egresoconcepto.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idegresoconcepto) AS count FROM egresoconcepto';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto contabilizad@' });
    });
};

Egresoconcepto.exist = (idEgresoconcepto, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM egresoconcepto WHERE idegresoconcepto = ?) AS exist';
    keys = [idEgresoconcepto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto verificad@' });
    });
};


Egresoconcepto.insert = (Egresoconcepto, connection, next) => {
    if( !connection )
        return next('Connection refused');

    const egresoFecha = Egresoconcepto.fecha;

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM corte WHERE fechaInicia = ? AND fechaFInaliza IS NULL) AS exist';
    keys = [egresoFecha];

    // REVISA QUE UN CORTE ESTÉ INICIADO EN FECHA DE EGRESO

    connection.query(query, keys, (error, corte) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            if (corte[0].exist) {

                query = 'INSERT INTO egresoconcepto SET ?';
                keys = [Egresoconcepto];

                connection.query(query, keys, (error, result) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                    else
                        return next(null, { success: true, result: result, message: 'Egresoconcepto cread@' });
                });

            } else {
                return next(null, { success: false, result: false, message: 'Debes iniciar la caja para crear un egreso' });
            }

        }
    });

};

Egresoconcepto.update = (Egresoconcepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE egresoconcepto SET ? WHERE idegresoconcepto = ? AND created_by = ?';
        keys = [Egresoconcepto, Egresoconcepto.idegresoconcepto, created_by];
    } else {
        query = 'UPDATE egresoconcepto SET ? WHERE idegresoconcepto = ?';
        keys = [Egresoconcepto, Egresoconcepto.idegresoconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto actualizad@' });
    });
};

Egresoconcepto.remove = (idegresoconcepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM egresoconcepto WHERE idegresoconcepto = ? AND created_by = ?';
        keys = [idegresoconcepto, created_by];
    } else {
        query = 'DELETE FROM egresoconcepto WHERE idegresoconcepto = ?';
        keys = [idegresoconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto eliminad@' });
    });
};

Egresoconcepto.logicRemove = (idegresoconcepto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE egresoconcepto SET baja = 1 WHERE idegresoconcepto = ? AND created_by = ?';
        keys = [idegresoconcepto, created_by];
    } else {
        query = 'UPDATE egresoconcepto SET baja = 1 WHERE idegresoconcepto = ?';
        keys = [idegresoconcepto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Egresoconcepto eliminad@' });
    });
};

Egresoconcepto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Egresoconcepto;
