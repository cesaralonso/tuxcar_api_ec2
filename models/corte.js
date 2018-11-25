const connection = require('../config/db-connection');

const Corte = {};

Corte.findAdministracionInThisDay = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corte.*, _personai.nombre as empleado_inicia_idempleado , _persona.nombre as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _personai ON _personai.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _persona ON _persona.idpersona = _finaliza_idempleado.persona_idpersona WHERE corte.fechaInicia = DATE(NOW()) AND corte.created_by = ?  HAVING (corte.baja IS NULL OR corte.baja = false) AND corte.seccion = "ADMINISTRACION" AND corte.ganancia IS NULL';
        keys = [created_by];
    } else {
        query = 'SELECT corte.*, _personai.nombre as empleado_inicia_idempleado , _persona.nombre as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _personai ON _personai.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _persona ON _persona.idpersona = _finaliza_idempleado.persona_idpersona WHERE corte.fechaInicia = DATE(NOW()) HAVING (corte.baja IS NULL OR corte.baja = false) AND corte.seccion = "ADMINISTRACION" AND corte.ganancia IS NULL';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte encontrad@' });
    });
};

Corte.findTallerInThisDay = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corte.*, _personai.nombre as empleado_inicia_idempleado , _persona.nombre as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _personai ON _personai.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _persona ON _persona.idpersona = _finaliza_idempleado.persona_idpersona WHERE corte.fechaInicia = DATE(NOW()) AND corte.created_by = ?  HAVING (corte.baja IS NULL OR corte.baja = false) AND corte.seccion = "TALLER" AND corte.ganancia IS NULL';
        keys = [created_by];
    } else {
        query = 'SELECT corte.*, _personai.nombre as empleado_inicia_idempleado , _persona.nombre as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _personai ON _personai.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _persona ON _persona.idpersona = _finaliza_idempleado.persona_idpersona WHERE corte.fechaInicia = DATE(NOW()) HAVING (corte.baja IS NULL OR corte.baja = false) AND corte.seccion = "TALLER" AND corte.ganancia IS NULL';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte encontrad@' });
    });
};

Corte.findByIdEmpleado = (idEmpleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corte.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_inicia_idempleado , _personafin.nombre as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _personafin ON _personafin.idpersona = _finaliza_idempleado.persona_idpersona  WHERE corte.empleado_idempleado = ? AND corte.created_by = ? HAVING corte.baja IS NULL OR corte.baja = false';
        keys = [idEmpleado, created_by];
    } else {
        query = 'SELECT corte.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_inicia_idempleado , _personafin.nombre as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _personafin ON _personafin.idpersona = _finaliza_idempleado.persona_idpersona  WHERE corte.empleado_idempleado = ? HAVING corte.baja IS NULL OR corte.baja = false';
        keys = [idEmpleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte encontrad@' });
    });
};

Corte.findByIdEmpleado = (idEmpleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corte.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_inicia_idempleado , _personafin.nombre as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _personafin ON _personafin.idpersona = _finaliza_idempleado.persona_idpersona  WHERE corte.empleado_idempleado = ? AND corte.created_by = ? HAVING corte.baja IS NULL OR corte.baja = false';
        keys = [idEmpleado, created_by];
    } else {
        query = 'SELECT corte.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_inicia_idempleado , _personafin.nombre as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _personafin ON _personafin.idpersona = _finaliza_idempleado.persona_idpersona  WHERE corte.empleado_idempleado = ? HAVING corte.baja IS NULL OR corte.baja = false';
        keys = [idEmpleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte encontrad@' });
    });
};

Corte.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corte.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_inicia_idempleado, CONCAT(_personafin.nombre, " ", _personafin.apellidoPaterno, " ", _personafin.apellidoMaterno ) as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _personafin ON _personafin.idpersona = _finaliza_idempleado.persona_idpersona  WHERE corte.created_by = ? HAVING corte.baja IS NULL OR corte.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT corte.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_inicia_idempleado, CONCAT(_personafin.nombre, " ", _personafin.apellidoPaterno, " ", _personafin.apellidoMaterno ) as empleado_finaliza_idempleado FROM corte INNER JOIN empleado as _inicia_idempleado ON _inicia_idempleado.idempleado = corte.inicia_idempleado LEFT JOIN empleado as _finaliza_idempleado ON _finaliza_idempleado.idempleado = corte.finaliza_idempleado INNER JOIN persona as _persona ON _persona.idpersona = _inicia_idempleado.persona_idpersona LEFT JOIN persona as _personafin ON _personafin.idpersona = _finaliza_idempleado.persona_idpersona  HAVING corte.baja IS NULL OR corte.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte leíd@' });
    });
};

Corte.findById = (idCorte, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM corte WHERE idcorte = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idCorte, created_by];
    } else {
        query = 'SELECT * FROM corte WHERE idcorte = ? HAVING baja IS NULL OR baja = false';
        keys = [idCorte];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte encontrad@' });
    });
};

Corte.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idcorte) AS count FROM corte';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Corte contabilizad@' });
    });
};

Corte.exist = (idCorte, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM corte WHERE idcorte = ?) AS exist';
    keys = [idCorte];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Corte verificad@' });
    });
};

Corte.insert = (Corte, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO corte SET ?';
    keys = [Corte];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Corte cread@' });
    });
};

Corte.update = (Corte, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE corte SET ? WHERE idcorte = ? AND created_by = ?';
        keys = [Corte, Corte.idcorte, created_by];
    } else {
        query = 'UPDATE corte SET ? WHERE idcorte = ?';
        keys = [Corte, Corte.idcorte];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte actualizad@' });
    });
};

Corte.remove = (idcorte, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM corte WHERE idcorte = ? AND created_by = ?';
        keys = [idcorte, created_by];
    } else {
        query = 'DELETE FROM corte WHERE idcorte = ?';
        keys = [idcorte];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte eliminad@' });
    });
};

Corte.logicRemove = (idcorte, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE corte SET baja = 1 WHERE idcorte = ? AND created_by = ?';
        keys = [idcorte, created_by];
    } else {
        query = 'UPDATE corte SET baja = 1 WHERE idcorte = ?';
        keys = [idcorte];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corte eliminad@' });
    });
};

Corte.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Corte;
