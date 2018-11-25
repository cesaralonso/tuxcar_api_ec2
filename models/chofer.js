const connection = require('../config/db-connection');

const Chofer = {};



Chofer.findByIdChoferFromTo = (idChofer, fechaDesde, fechaHasta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = 'SELECT pago.fecha as pago_fecha, permisotaxi.numero, persona.nombre as chofer, liquidacion.fecha, liquidacion.montopagado, pago.folio, pago.nota from permisotaxi INNER JOIN permisotaxiasignado on permisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN chofer on permisotaxiasignado.chofer_idchofer = chofer.idchofer INNER JOIN persona on chofer.chofer = persona.idpersona INNER JOIN liquidacion on permisotaxiasignado.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN pagoliquidacion on liquidacion.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN pago on pagoliquidacion.pago_idpago = pago.idpago WHERE pago.chofer_idchofer = ?  AND liquidacion.fecha BETWEEN ? AND ? AND (pago.baja IS NULL OR pago.baja = false) AND (pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false) AND (liquidacion.baja IS NULL OR liquidacion.baja = false) AND (chofer.baja IS NULL OR chofer.baja = false)  AND (pago.baja IS NULL OR pago.baja = false) order by liquidacion.fecha';

    let keys = [idChofer, fechaDesde, fechaHasta];

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};

Chofer.findByIdChofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = 'SELECT pago.fecha as pago_fecha, permisotaxi.numero, persona.nombre as chofer, liquidacion.fecha, liquidacion.montopagado, pago.folio, pago.nota from permisotaxi INNER JOIN permisotaxiasignado on permisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN chofer on permisotaxiasignado.chofer_idchofer = chofer.idchofer INNER JOIN persona on chofer.chofer = persona.idpersona INNER JOIN liquidacion on permisotaxiasignado.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN pagoliquidacion on liquidacion.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN pago on pagoliquidacion.pago_idpago = pago.idpago WHERE pago.chofer_idchofer = ? AND (pago.baja IS NULL OR pago.baja = false) AND (pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false) AND (liquidacion.baja IS NULL OR liquidacion.baja = false) AND (chofer.baja IS NULL OR chofer.baja = false)  AND (pago.baja IS NULL OR pago.baja = false) order by liquidacion.fecha';

    let keys = [idChofer];

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.allDisponibles = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado_fianza.nombre as estado_estado_idestado_fianza ,  CONCAT(_chofer.nombre, " ", _chofer.apellidoPaterno, " ", _chofer.apellidoMaterno ) as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4, (SELECT ea.nombre as estadoactividad FROM chofer as c INNER JOIN choferestado as ce on ce.chofer_idchofer = c.idchofer INNER JOIN estadoactividad as ea on ea.idestadoactividad = ce.estadoactividad_idestadoactividad WHERE c.idchofer = chofer.idchofer AND (c.baja IS NULL OR c.baja = false) AND (ce.baja IS NULL OR ce.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY ce.idchoferestado DESC LIMIT 0,1) AS estado_estado_idestado FROM chofer INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4  WHERE chofer.created_by = ? AND chofer.baja IS NULL OR chofer.baja = false GROUP BY chofer.idchofer HAVING estado_estado_idestado = "DISPONIBLE" OR estado_estado_idestado = "ACTIVO"';
        keys = [created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado_fianza.nombre as estado_estado_idestado_fianza ,  CONCAT(_chofer.nombre, " ", _chofer.apellidoPaterno, " ", _chofer.apellidoMaterno ) as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4, (SELECT ea.nombre as estadoactividad FROM chofer as c INNER JOIN choferestado as ce on ce.chofer_idchofer = c.idchofer INNER JOIN estadoactividad as ea on ea.idestadoactividad = ce.estadoactividad_idestadoactividad WHERE c.idchofer = chofer.idchofer AND (c.baja IS NULL OR c.baja = false) AND (ce.baja IS NULL OR ce.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY ce.idchoferestado DESC LIMIT 0,1) AS estado_estado_idestado FROM chofer INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4  WHERE chofer.baja IS NULL OR chofer.baja = false GROUP BY chofer.idchofer HAVING estado_estado_idestado = "DISPONIBLE" OR estado_estado_idestado = "ACTIVO"';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer leíd@' });
    });
};
Chofer.findByIdEstado = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, (SELECT pt.numero FROM permisotaxiasignado as pta INNER JOIN permisotaxi as pt on pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE (pta.estado_idestado = 12  OR pta.estado_idestado = 21) AND pta.chofer_idchofer = chofer.idchofer ORDER BY pta.created_by DESC LIMIT 0,1) as permisotaxi_idpermisotaxi, (SELECT l.fecha FROM permisotaxiasignado as pta INNER JOIN liquidacion as l on l.permisotaxiasignado_idpermisotaxiasignado = pta.idpermisotaxiasignado WHERE l.estado_idestado = 8 AND pta.chofer_idchofer = chofer.idchofer ORDER BY  pta.created_by DESC, l.fecha DESC  LIMIT 0,1 ) as ultimaLiquidacion, _chofer.telefonoCasa, _estado_idestado_fianza.nombre as estado_estado_idestado_fianza ,  CONCAT(_chofer.nombre, " ", _chofer.apellidoPaterno, " ", _chofer.apellidoMaterno ) as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4, (SELECT ea.nombre as estadoactividad FROM chofer as c INNER JOIN choferestado as ce on ce.chofer_idchofer = c.idchofer INNER JOIN estadoactividad as ea on ea.idestadoactividad = ce.estadoactividad_idestadoactividad WHERE c.idchofer = chofer.idchofer AND (c.baja IS NULL OR c.baja = false) AND (ce.baja IS NULL OR ce.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY ce.idchoferestado DESC LIMIT 0,1) AS estado_estado_idestado FROM chofer INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.estado_idestado = ? AND chofer.created_by = ? AND chofer.baja IS NULL OR chofer.baja = false GROUP BY chofer.idchofer HAVING estado_estado_idestado IS NOT NULL';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT chofer.*, (SELECT pt.numero FROM permisotaxiasignado as pta INNER JOIN permisotaxi as pt on pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE (pta.estado_idestado = 12  OR pta.estado_idestado = 21) AND pta.chofer_idchofer = chofer.idchofer ORDER BY pta.created_by DESC LIMIT 0,1) as permisotaxi_idpermisotaxi, (SELECT l.fecha FROM permisotaxiasignado as pta INNER JOIN liquidacion as l on l.permisotaxiasignado_idpermisotaxiasignado = pta.idpermisotaxiasignado WHERE l.estado_idestado = 8 AND pta.chofer_idchofer = chofer.idchofer ORDER BY  pta.created_by DESC, l.fecha DESC  LIMIT 0,1 ) as ultimaLiquidacion, _chofer.telefonoCasa, _estado_idestado_fianza.nombre as estado_estado_idestado_fianza ,  CONCAT(_chofer.nombre, " ", _chofer.apellidoPaterno, " ", _chofer.apellidoMaterno ) as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4, (SELECT ea.nombre as estadoactividad FROM chofer as c INNER JOIN choferestado as ce on ce.chofer_idchofer = c.idchofer INNER JOIN estadoactividad as ea on ea.idestadoactividad = ce.estadoactividad_idestadoactividad WHERE c.idchofer = chofer.idchofer AND (c.baja IS NULL OR c.baja = false) AND (ce.baja IS NULL OR ce.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY ce.idchoferestado DESC LIMIT 0,1) AS estado_estado_idestado FROM chofer INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.estado_idestado = ? AND chofer.baja IS NULL OR chofer.baja = false GROUP BY chofer.idchofer HAVING estado_estado_idestado IS NOT NULL';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.findByIdPersona = (idPersona, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, (SELECT pt.numero FROM permisotaxiasignado as pta INNER JOIN permisotaxi as pt on pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE (pta.estado_idestado = 12  OR pta.estado_idestado = 21) AND pta.chofer_idchofer = chofer.idchofer ORDER BY pta.created_by DESC LIMIT 0,1) as permisotaxi_idpermisotaxi, (SELECT l.fecha FROM permisotaxiasignado as pta INNER JOIN liquidacion as l on l.permisotaxiasignado_idpermisotaxiasignado = pta.idpermisotaxiasignado WHERE l.estado_idestado = 8 AND pta.chofer_idchofer = chofer.idchofer ORDER BY  pta.created_by DESC, l.fecha DESC  LIMIT 0,1 ) as ultimaLiquidacion, _chofer.telefonoCasa, _estado_idestado_fianza.nombre as estado_estado_idestado_fianza ,  CONCAT(_chofer.nombre, " ", _chofer.apellidoPaterno, " ", _chofer.apellidoMaterno ) as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4, (SELECT ea.nombre as estadoactividad FROM chofer as c INNER JOIN choferestado as ce on ce.chofer_idchofer = c.idchofer INNER JOIN estadoactividad as ea on ea.idestadoactividad = ce.estadoactividad_idestadoactividad WHERE c.idchofer = chofer.idchofer AND (c.baja IS NULL OR c.baja = false) AND (ce.baja IS NULL OR ce.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY ce.idchoferestado DESC LIMIT 0,1) AS estado_estado_idestado FROM chofer INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? AND chofer.created_by = ? AND chofer.baja IS NULL OR chofer.baja = false GROUP BY chofer.idchofer HAVING estado_estado_idestado IS NOT NULL';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT chofer.*, (SELECT pt.numero FROM permisotaxiasignado as pta INNER JOIN permisotaxi as pt on pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE (pta.estado_idestado = 12  OR pta.estado_idestado = 21) AND pta.chofer_idchofer = chofer.idchofer ORDER BY pta.created_by DESC LIMIT 0,1) as permisotaxi_idpermisotaxi, (SELECT l.fecha FROM permisotaxiasignado as pta INNER JOIN liquidacion as l on l.permisotaxiasignado_idpermisotaxiasignado = pta.idpermisotaxiasignado WHERE l.estado_idestado = 8 AND pta.chofer_idchofer = chofer.idchofer ORDER BY  pta.created_by DESC, l.fecha DESC  LIMIT 0,1 ) as ultimaLiquidacion, _chofer.telefonoCasa, _estado_idestado_fianza.nombre as estado_estado_idestado_fianza ,  CONCAT(_chofer.nombre, " ", _chofer.apellidoPaterno, " ", _chofer.apellidoMaterno ) as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4, (SELECT ea.nombre as estadoactividad FROM chofer as c INNER JOIN choferestado as ce on ce.chofer_idchofer = c.idchofer INNER JOIN estadoactividad as ea on ea.idestadoactividad = ce.estadoactividad_idestadoactividad WHERE c.idchofer = chofer.idchofer AND (c.baja IS NULL OR c.baja = false) AND (ce.baja IS NULL OR ce.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY ce.idchoferestado DESC LIMIT 0,1) AS estado_estado_idestado FROM chofer INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? AND chofer.baja IS NULL OR chofer.baja = false GROUP BY chofer.idchofer HAVING estado_estado_idestado IS NOT NULL';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, (SELECT pt.numero FROM permisotaxiasignado as pta INNER JOIN permisotaxi as pt on pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE (pta.estado_idestado = 12  OR pta.estado_idestado = 21) AND pta.chofer_idchofer = chofer.idchofer ORDER BY pta.created_by DESC LIMIT 0,1) as permisotaxi_idpermisotaxi, (SELECT l.fecha FROM permisotaxiasignado as pta INNER JOIN liquidacion as l on l.permisotaxiasignado_idpermisotaxiasignado = pta.idpermisotaxiasignado WHERE l.estado_idestado = 8 AND pta.chofer_idchofer = chofer.idchofer ORDER BY  pta.created_by DESC, l.fecha DESC  LIMIT 0,1 ) as ultimaLiquidacion, _chofer.telefonoCasa, _estado_idestado_fianza.nombre as estado_estado_idestado_fianza ,  CONCAT(_chofer.nombre, " ", _chofer.apellidoPaterno, " ", _chofer.apellidoMaterno ) as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4, (SELECT ea.nombre as estadoactividad FROM chofer as c INNER JOIN choferestado as ce on ce.chofer_idchofer = c.idchofer INNER JOIN estadoactividad as ea on ea.idestadoactividad = ce.estadoactividad_idestadoactividad WHERE c.idchofer = chofer.idchofer AND (c.baja IS NULL OR c.baja = false) AND (ce.baja IS NULL OR ce.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY ce.idchoferestado DESC LIMIT 0,1) AS estado_estado_idestado FROM chofer INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.created_by = ? AND chofer.baja IS NULL OR chofer.baja = false GROUP BY chofer.idchofer HAVING estado_estado_idestado IS NOT NULL';
        keys = [created_by];
    } else {
        query = 'SELECT chofer.*, (SELECT pt.numero FROM permisotaxiasignado as pta INNER JOIN permisotaxi as pt on pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE (pta.estado_idestado = 12  OR pta.estado_idestado = 21) AND pta.chofer_idchofer = chofer.idchofer ORDER BY pta.created_by DESC LIMIT 0,1) as permisotaxi_idpermisotaxi, (SELECT l.fecha FROM permisotaxiasignado as pta INNER JOIN liquidacion as l on l.permisotaxiasignado_idpermisotaxiasignado = pta.idpermisotaxiasignado WHERE l.estado_idestado = 8 AND pta.chofer_idchofer = chofer.idchofer ORDER BY  pta.created_by DESC, l.fecha DESC  LIMIT 0,1 ) as ultimaLiquidacion, _chofer.telefonoCasa, _estado_idestado_fianza.nombre as estado_estado_idestado_fianza ,  CONCAT(_chofer.nombre, " ", _chofer.apellidoPaterno, " ", _chofer.apellidoMaterno ) as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4, (SELECT ea.nombre as estadoactividad FROM chofer as c INNER JOIN choferestado as ce on ce.chofer_idchofer = c.idchofer INNER JOIN estadoactividad as ea on ea.idestadoactividad = ce.estadoactividad_idestadoactividad WHERE c.idchofer = chofer.idchofer AND (c.baja IS NULL OR c.baja = false) AND (ce.baja IS NULL OR ce.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY ce.idchoferestado DESC LIMIT 0,1) AS estado_estado_idestado FROM chofer INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4  WHERE chofer.baja IS NULL OR chofer.baja = false GROUP BY chofer.idchofer HAVING estado_estado_idestado IS NOT NULL';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer leíd@' });
    });
};

Chofer.findById = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM chofer WHERE idchofer = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT * FROM chofer WHERE idchofer = ? HAVING baja IS NULL OR baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};

Chofer.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idchofer) AS count FROM chofer';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Chofer contabilizad@' });
    });
};

Chofer.exist = (idChofer, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM chofer WHERE idchofer = ?) AS exist';
    keys = [idChofer];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Chofer verificad@' });
    });
};

Chofer.insert = (Chofer, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO chofer SET ?';
    keys = [Chofer];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {
            // AGREGA ESTADO A CHOFER
            query = 'INSERT INTO choferestado(chofer_idchofer, estadoactividad_idestadoactividad, fecha, hora) VALUES (?, ?, DATE(NOW()), TIME(NOW()))';
            keys = [result.insertId, 8];

            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                else
                    return next(null, { success: true, result: result, message: 'Chofer y Chofer Estado creados' });
            });

        }
    });
};

Chofer.update = (Chofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE chofer SET ? WHERE idchofer = ? AND created_by = ?';
        keys = [Chofer, Chofer.idchofer, created_by];
    } else {
        query = 'UPDATE chofer SET ? WHERE idchofer = ?';
        keys = [Chofer, Chofer.idchofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer actualizad@' });
    });
};

Chofer.remove = (idchofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM chofer WHERE idchofer = ? AND created_by = ?';
        keys = [idchofer, created_by];
    } else {
        query = 'DELETE FROM chofer WHERE idchofer = ?';
        keys = [idchofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer eliminad@' });
    });
};

Chofer.logicRemove = (idchofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE chofer SET baja = 1 WHERE idchofer = ? AND created_by = ?';
        keys = [idchofer, created_by];
    } else {
        query = 'UPDATE chofer SET baja = 1 WHERE idchofer = ?';
        keys = [idchofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer eliminad@' });
    });
};

Chofer.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Chofer;
