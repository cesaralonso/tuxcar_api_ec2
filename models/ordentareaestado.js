const connection = require('../config/db-connection');

const Ordentareaestado = {};

Ordentareaestado.findByIdEstadoscrum = (idEstadoscrum, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordentareaestado.*, _tarea.nombre as ordentarea_ordentarea_idordentarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum, op.orden_idorden as orden_idorden FROM ordentareaestado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = ordentareaestado.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = ordentareaestado.estadoscrum_idestadoscrum INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE ordentareaestado.estadoscrum_idestadoscrum = ? AND ordentareaestado.created_by = ? HAVING ordentareaestado.baja IS NULL OR ordentareaestado.baja = false';
        keys = [idEstadoscrum, created_by];
    } else {
        query = 'SELECT ordentareaestado.*, _tarea.nombre as ordentarea_ordentarea_idordentarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum, op.orden_idorden as orden_idorden FROM ordentareaestado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = ordentareaestado.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = ordentareaestado.estadoscrum_idestadoscrum INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE ordentareaestado.estadoscrum_idestadoscrum = ? HAVING ordentareaestado.baja IS NULL OR ordentareaestado.baja = false';
        keys = [idEstadoscrum];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado encontrad@' });
    });
};

Ordentareaestado.findByIdOrdentarea = (idOrdentarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordentareaestado.*, _tarea.nombre as ordentarea_ordentarea_idordentarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum, op.orden_idorden as orden_idorden FROM ordentareaestado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = ordentareaestado.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = ordentareaestado.estadoscrum_idestadoscrum INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE ordentareaestado.ordentarea_idordentarea = ? AND ordentareaestado.created_by = ? HAVING ordentareaestado.baja IS NULL OR ordentareaestado.baja = false';
        keys = [idOrdentarea, created_by];
    } else {
        query = 'SELECT ordentareaestado.*, _tarea.nombre as ordentarea_ordentarea_idordentarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum, op.orden_idorden as orden_idorden FROM ordentareaestado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = ordentareaestado.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = ordentareaestado.estadoscrum_idestadoscrum INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE ordentareaestado.ordentarea_idordentarea = ? HAVING ordentareaestado.baja IS NULL OR ordentareaestado.baja = false';
        keys = [idOrdentarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado encontrad@' });
    });
};

Ordentareaestado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordentareaestado.*, _tarea.nombre as ordentarea_ordentarea_idordentarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum, op.orden_idorden as orden_idorden FROM ordentareaestado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = ordentareaestado.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = ordentareaestado.estadoscrum_idestadoscrum INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE ordentareaestado.created_by = ? HAVING ordentareaestado.baja IS NULL OR ordentareaestado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT ordentareaestado.*, _tarea.nombre as ordentarea_ordentarea_idordentarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum, op.orden_idorden as orden_idorden FROM ordentareaestado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = ordentareaestado.ordentarea_idordentarea INNER JOIN ordenproducto as op ON op.idordenproducto = _ordentarea_idordentarea.ordenproducto_idordenproducto INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = ordentareaestado.estadoscrum_idestadoscrum INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  HAVING ordentareaestado.baja IS NULL OR ordentareaestado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado leíd@' });
    });
};

Ordentareaestado.findById = (idOrdentareaestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM ordentareaestado WHERE idordentareaestado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrdentareaestado, created_by];
    } else {
        query = 'SELECT * FROM ordentareaestado WHERE idordentareaestado = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrdentareaestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado encontrad@' });
    });
};

Ordentareaestado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idordentareaestado) AS count FROM ordentareaestado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado contabilizad@' });
    });
};

Ordentareaestado.exist = (idOrdentareaestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM ordentareaestado WHERE idordentareaestado = ?) AS exist';
    keys = [idOrdentareaestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado verificad@' });
    });
};


Ordentareaestado.insert = (Ordentareaestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO ordentareaestado SET ?';
    keys = [Ordentareaestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            if (result.insertId) {
                
                // SI SE CANCELA
                if (Ordentareaestado.estadoscrum_idestadoscrum == '5') {

                    // SELECCIONAR TODAS LAS EMPLEADOTAREA RELACIONADAS Y CREAR EMPLEADOTAREAESTADO CON CANCELADO Y FECHA ACTUAL
                    query = 'INSERT INTO empleadotareaestado (empleadotarea_idempleadotarea, estadoscrum_idestadoscrum, fecha, hora) SELECT et.idempleadotarea, 5, current_date() as fecha, current_time() as hora FROM empleadotarea as et INNER JOIN ordentarea as ot on ot.idordentarea = et.ordentarea_idordentarea WHERE ot.idordentarea = ?';
                    keys = [Ordentareaestado.ordentarea_idordentarea];
                    connection.query(query, keys, (error, empleadotareaestados) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                        else {
                            return next(null, { success: true, result: empleadotareaestados, message: 'Estado para tarea de orden creado. Se ha actualizado Fecha y Hora de término de la tarea de orden' });
                        }
                    });

                } else if (Ordentareaestado.estadoscrum_idestadoscrum == '4') {

                    // SI SE FINALIZA MODIFICAR LA ORDEN PARA ASIGNAR LA HORA Y FECHA DE TÉRMINO
                    query = 'UPDATE ordentarea SET fechaTermina = ?, horaTermina = ? WHERE idordentarea = ?';
                    keys = [Ordentareaestado.fecha, Ordentareaestado.hora, Ordentareaestado.ordentarea_idordentarea];
                    connection.query(query, keys, (error, result) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                        else {

                            // PASAR EMPLEADO TAREAS CORRESPONDIENTES A ESTADO FINALIZADO  
                            query = 'INSERT INTO empleadotareaestado (empleadotarea_idempleadotarea, estadoscrum_idestadoscrum, fecha, hora) SELECT et.idempleadotarea, 4, current_date() as fecha, current_time() as hora FROM empleadotarea as et INNER JOIN ordentarea as ot on ot.idordentarea = et.ordentarea_idordentarea WHERE ot.idordentarea = ?';
                            keys = [Ordentareaestado.ordentarea_idordentarea];
                            connection.query(query, keys, (error, empleadotareaestados) => {
                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                else {
                                    

                                    // TOMAR LA HORA ESTIMADA Y HORA TERMINA, SACAR LA DIFERENCIA


                                    return next(null, { success: true, result: result, message: 'Estado para tarea de orden creado. Se ha actualizado Fecha y Hora de término de la tarea de orden' });
                                }
                            });
                        }
                    });
                } else {
                    return next(null, { success: true, result: result, message: 'Orden tarea estado creada' });
                }
            }
        } 
    });
};

Ordentareaestado.update = (Ordentareaestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE ordentareaestado SET ? WHERE idordentareaestado = ? AND created_by = ?';
        keys = [Ordentareaestado, Ordentareaestado.idordentareaestado, created_by];
    } else {
        query = 'UPDATE ordentareaestado SET ? WHERE idordentareaestado = ?';
        keys = [Ordentareaestado, Ordentareaestado.idordentareaestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado actualizad@' });
    });
};

Ordentareaestado.remove = (idordentareaestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM ordentareaestado WHERE idordentareaestado = ? AND created_by = ?';
        keys = [idordentareaestado, created_by];
    } else {
        query = 'DELETE FROM ordentareaestado WHERE idordentareaestado = ?';
        keys = [idordentareaestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado eliminad@' });
    });
};

Ordentareaestado.logicRemove = (idordentareaestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE ordentareaestado SET baja = 1 WHERE idordentareaestado = ? AND created_by = ?';
        keys = [idordentareaestado, created_by];
    } else {
        query = 'UPDATE ordentareaestado SET baja = 1 WHERE idordentareaestado = ?';
        keys = [idordentareaestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordentareaestado eliminad@' });
    });
};

Ordentareaestado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Ordentareaestado;
