
const connection = require('../config/db-connection');

const Empleadotarea = {};

Empleadotarea.findByIdEmpleado = (idEmpleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT op.orden_idorden as orden_idorden, p.nombre as producto_idproducto, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.placa, " ", v.color) as vehiculo_idvehiculo, (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.empleado_idempleado = ? AND empleadotarea.created_by = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false) AND (ordentarea_estado != "FINALIZADA" AND ordentarea_estado != "CANCELADA")';
        keys = [idEmpleado, created_by];
    } else {
        query = 'SELECT op.orden_idorden as orden_idorden, p.nombre as producto_idproducto, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.placa, " ", v.color) as vehiculo_idvehiculo, (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.empleado_idempleado = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false) AND (ordentarea_estado != "FINALIZADA" AND ordentarea_estado != "CANCELADA")';
        keys = [idEmpleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea encontrad@' });
    });
};

Empleadotarea.findByIdOrdentarea = (idOrdentarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT op.orden_idorden as orden_idorden, p.nombre as producto_idproducto, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.placa, " ", v.color) as vehiculo_idvehiculo, (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ? AND empleadotarea.created_by = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false) AND (ordentarea_estado != "FINALIZADA" AND ordentarea_estado != "CANCELADA")';
        keys = [idOrdentarea, created_by];
    } else {
        query = 'SELECT op.orden_idorden as orden_idorden, p.nombre as producto_idproducto, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.placa, " ", v.color) as vehiculo_idvehiculo, (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false) AND (ordentarea_estado != "FINALIZADA" AND ordentarea_estado != "CANCELADA")';
        keys = [idOrdentarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea encontrad@' });
    });
};

Empleadotarea.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT op.orden_idorden as orden_idorden, p.nombre as producto_idproducto, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.placa, " ", v.color) as vehiculo_idvehiculo, (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.created_by = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false) AND (ordentarea_estado != "FINALIZADA" AND ordentarea_estado != "CANCELADA")';
        keys = [created_by];
    } else {
        query = 'SELECT op.orden_idorden as orden_idorden, p.nombre as producto_idproducto, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.placa, " ", v.color) as vehiculo_idvehiculo, (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones,empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea    GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false) AND (ordentarea_estado != "FINALIZADA" AND ordentarea_estado != "CANCELADA")';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else {
            return next(null, { success: true, result: result, message: 'Empleadotarea leíd@' });
        }
    });
};

Empleadotarea.findById = (idEmpleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM empleadotarea WHERE idempleadotarea = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpleadotarea, created_by];
    } else {
        query = 'SELECT * FROM empleadotarea WHERE idempleadotarea = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea encontrad@' });
    });
};

Empleadotarea.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idempleadotarea) AS count FROM empleadotarea';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea contabilizad@' });
    });
};

Empleadotarea.exist = (idEmpleadotarea, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM empleadotarea WHERE idempleadotarea = ?) AS exist';
    keys = [idEmpleadotarea];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea verificad@' });
    });
};

Empleadotarea.insert = (Empleadotarea, connection, next) => {
    if( !connection )
        return next('Connection refused');

    // AÑADIR ID USER DE EMPLEADO EN EMPLEADOTAREA CREATED BY
    let query = '';
    let keys = [];
    query = 'SELECT si_user_idsi_user FROM empleado WHERE idempleado = ?';
    keys = [Empleadotarea.empleado_idempleado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            const idsi_user = result[0].si_user_idsi_user;

            Empleadotarea.created_by = idsi_user;

            query = 'INSERT INTO empleadotarea SET ?';
            keys = [Empleadotarea];

            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                else {

                    // AL AGREGAR EMPLEADO TAREA TAMBIÉN AGREGAR UN ESTADO SCRUM 1 POR HACERSE
                    query = 'INSERT INTO empleadotareaestado(empleadotarea_idempleadotarea, estadoscrum_idestadoscrum, created_by, fecha, hora) VALUES(?, ?, ?, DATE(NOW()), TIME(NOW()))';
                    keys = [result.insertId, 1, idsi_user];

                    connection.query(query, keys, (error, result) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                        else {

                            // IGUALMENTE AGREGAR EL MISMO ESTADO A ORDEN TAREA POR HACERSE
                            query = 'INSERT INTO ordentareaestado(ordentarea_idordentarea, estadoscrum_idestadoscrum, created_by, fecha, hora) VALUES(?, ?, ?, DATE(NOW()), TIME(NOW()))';
                            keys = [Empleadotarea.ordentarea_idordentarea, 1, idsi_user];

                            connection.query(query, keys, (error, result) => {
                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                else
                                    return next(null, { success: true, result: result, message: 'Tarea actualizada' });
                            });
                        } 
                    });
                }
            });
        }
    });
};

Empleadotarea.update = (Empleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empleadotarea SET ? WHERE idempleadotarea = ? AND created_by = ?';
        keys = [Empleadotarea, Empleadotarea.idempleadotarea, created_by];
    } else {
        query = 'UPDATE empleadotarea SET ? WHERE idempleadotarea = ?';
        keys = [Empleadotarea, Empleadotarea.idempleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea actualizad@' });
    });
};

Empleadotarea.remove = (idempleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM empleadotarea WHERE idempleadotarea = ? AND created_by = ?';
        keys = [idempleadotarea, created_by];
    } else {
        query = 'DELETE FROM empleadotarea WHERE idempleadotarea = ?';
        keys = [idempleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea eliminad@' });
    });
};

Empleadotarea.logicRemove = (idempleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empleadotarea SET baja = 1 WHERE idempleadotarea = ? AND created_by = ?';
        keys = [idempleadotarea, created_by];
    } else {
        query = 'UPDATE empleadotarea SET baja = 1 WHERE idempleadotarea = ?';
        keys = [idempleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea eliminad@' });
    });
};

Empleadotarea.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Empleadotarea;









/*
const connection = require('../config/db-connection');

const Empleadotarea = {};

Empleadotarea.findByIdEmpleado = (idEmpleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea FROM empleadotarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.empleado_idempleado = ? AND empleadotarea.created_by = ? HAVING empleadotarea.baja IS NULL OR empleadotarea.baja = false';
        keys = [idEmpleado, created_by];
    } else {
        query = 'SELECT empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea FROM empleadotarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.empleado_idempleado = ? HAVING empleadotarea.baja IS NULL OR empleadotarea.baja = false';
        keys = [idEmpleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea encontrad@' });
    });
};
Empleadotarea.findByIdOrdentarea = (idOrdentarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea FROM empleadotarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ? AND empleadotarea.created_by = ? HAVING empleadotarea.baja IS NULL OR empleadotarea.baja = false';
        keys = [idOrdentarea, created_by];
    } else {
        query = 'SELECT empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea FROM empleadotarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ? HAVING empleadotarea.baja IS NULL OR empleadotarea.baja = false';
        keys = [idOrdentarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea encontrad@' });
    });
};
Empleadotarea.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea FROM empleadotarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.created_by = ? HAVING empleadotarea.baja IS NULL OR empleadotarea.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea FROM empleadotarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN producto as p on p.idproducto = op.producto_idproducto INNER JOIN orden as o on o.idorden = op.orden_idorden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = o.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = vt.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  HAVING empleadotarea.baja IS NULL OR empleadotarea.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea leíd@' });
    });
};

Empleadotarea.findById = (idEmpleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM empleadotarea WHERE idempleadotarea = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpleadotarea, created_by];
    } else {
        query = 'SELECT * FROM empleadotarea WHERE idempleadotarea = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea encontrad@' });
    });
};

Empleadotarea.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idempleadotarea) AS count FROM empleadotarea';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea contabilizad@' });
    });
};

Empleadotarea.exist = (idEmpleadotarea, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM empleadotarea WHERE idempleadotarea = ?) AS exist';
    keys = [idEmpleadotarea];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea verificad@' });
    });
};

Empleadotarea.insert = (Empleadotarea, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO empleadotarea SET ?';
    keys = [Empleadotarea];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea cread@' });
    });
};

Empleadotarea.update = (Empleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empleadotarea SET ? WHERE idempleadotarea = ? AND created_by = ?';
        keys = [Empleadotarea, Empleadotarea.idempleadotarea, created_by];
    } else {
        query = 'UPDATE empleadotarea SET ? WHERE idempleadotarea = ?';
        keys = [Empleadotarea, Empleadotarea.idempleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea actualizad@' });
    });
};

Empleadotarea.remove = (idempleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM empleadotarea WHERE idempleadotarea = ? AND created_by = ?';
        keys = [idempleadotarea, created_by];
    } else {
        query = 'DELETE FROM empleadotarea WHERE idempleadotarea = ?';
        keys = [idempleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea eliminad@' });
    });
};

Empleadotarea.logicRemove = (idempleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empleadotarea SET baja = 1 WHERE idempleadotarea = ? AND created_by = ?';
        keys = [idempleadotarea, created_by];
    } else {
        query = 'UPDATE empleadotarea SET baja = 1 WHERE idempleadotarea = ?';
        keys = [idempleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotarea eliminad@' });
    });
};

Empleadotarea.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Empleadotarea;
*/