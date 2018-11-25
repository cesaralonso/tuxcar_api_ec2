const connection = require('../config/db-connection');

const Empleadotareaestado = {};

Empleadotareaestado.findByIdEmpleadotarea = (idEmpleadotarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleadotareaestado.*, _empleadotarea_idempleadotarea.idempleadotarea as empleadotarea_empleadotarea_idempleadotarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM empleadotareaestado INNER JOIN empleadotarea as _empleadotarea_idempleadotarea ON _empleadotarea_idempleadotarea.idempleadotarea = empleadotareaestado.empleadotarea_idempleadotarea INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = empleadotareaestado.estadoscrum_idestadoscrum   WHERE empleadotareaestado.empleadotarea_idempleadotarea = ? AND empleadotareaestado.created_by = ? HAVING empleadotareaestado.baja IS NULL OR empleadotareaestado.baja = false';
        keys = [idEmpleadotarea, created_by];
    } else {
        query = 'SELECT empleadotareaestado.*, _empleadotarea_idempleadotarea.idempleadotarea as empleadotarea_empleadotarea_idempleadotarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM empleadotareaestado INNER JOIN empleadotarea as _empleadotarea_idempleadotarea ON _empleadotarea_idempleadotarea.idempleadotarea = empleadotareaestado.empleadotarea_idempleadotarea INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = empleadotareaestado.estadoscrum_idestadoscrum   WHERE empleadotareaestado.empleadotarea_idempleadotarea = ? HAVING empleadotareaestado.baja IS NULL OR empleadotareaestado.baja = false';
        keys = [idEmpleadotarea];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado encontrad@' });
    });
};

Empleadotareaestado.findByIdEstadoscrum = (idEstadoscrum, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleadotareaestado.*, _empleadotarea_idempleadotarea.idempleadotarea as empleadotarea_empleadotarea_idempleadotarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM empleadotareaestado INNER JOIN empleadotarea as _empleadotarea_idempleadotarea ON _empleadotarea_idempleadotarea.idempleadotarea = empleadotareaestado.empleadotarea_idempleadotarea INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = empleadotareaestado.estadoscrum_idestadoscrum   WHERE empleadotareaestado.estadoscrum_idestadoscrum = ? AND empleadotareaestado.created_by = ? HAVING empleadotareaestado.baja IS NULL OR empleadotareaestado.baja = false';
        keys = [idEstadoscrum, created_by];
    } else {
        query = 'SELECT empleadotareaestado.*, _empleadotarea_idempleadotarea.idempleadotarea as empleadotarea_empleadotarea_idempleadotarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM empleadotareaestado INNER JOIN empleadotarea as _empleadotarea_idempleadotarea ON _empleadotarea_idempleadotarea.idempleadotarea = empleadotareaestado.empleadotarea_idempleadotarea INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = empleadotareaestado.estadoscrum_idestadoscrum   WHERE empleadotareaestado.estadoscrum_idestadoscrum = ? HAVING empleadotareaestado.baja IS NULL OR empleadotareaestado.baja = false';
        keys = [idEstadoscrum];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado encontrad@' });
    });
};

Empleadotareaestado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleadotareaestado.*, _empleadotarea_idempleadotarea.idempleadotarea as empleadotarea_empleadotarea_idempleadotarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM empleadotareaestado INNER JOIN empleadotarea as _empleadotarea_idempleadotarea ON _empleadotarea_idempleadotarea.idempleadotarea = empleadotareaestado.empleadotarea_idempleadotarea INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = empleadotareaestado.estadoscrum_idestadoscrum   WHERE empleadotareaestado.created_by = ? HAVING empleadotareaestado.baja IS NULL OR empleadotareaestado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT empleadotareaestado.*, _empleadotarea_idempleadotarea.idempleadotarea as empleadotarea_empleadotarea_idempleadotarea , _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM empleadotareaestado INNER JOIN empleadotarea as _empleadotarea_idempleadotarea ON _empleadotarea_idempleadotarea.idempleadotarea = empleadotareaestado.empleadotarea_idempleadotarea INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = empleadotareaestado.estadoscrum_idestadoscrum   HAVING empleadotareaestado.baja IS NULL OR empleadotareaestado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado leíd@' });
    });
};

Empleadotareaestado.findById = (idEmpleadotareaestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM empleadotareaestado WHERE idempleadotareaestado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpleadotareaestado, created_by];
    } else {
        query = 'SELECT * FROM empleadotareaestado WHERE idempleadotareaestado = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpleadotareaestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado encontrad@' });
    });
};

Empleadotareaestado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idempleadotareaestado) AS count FROM empleadotareaestado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado contabilizad@' });
    });
};

Empleadotareaestado.exist = (idEmpleadotareaestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM empleadotareaestado WHERE idempleadotareaestado = ?) AS exist';
    keys = [idEmpleadotareaestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado verificad@' });
    });
};

Empleadotareaestado.insert = (Empleadotareaestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO empleadotareaestado SET ?';
    keys = [Empleadotareaestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {
            if (result.insertId) {

                // PRIMERO BUSCO EL ordentarea_idordentarea RELACIONADO A EMPLEADOTAREAESTADO
                query = 'SELECT et.ordentarea_idordentarea FROM empleadotarea as et  WHERE et.idempleadotarea = ?';
                keys = [Empleadotareaestado.empleadotarea_idempleadotarea];

                connection.query(query, keys, (error, empleadotareaestado) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                    else {

                        const idordentarea = empleadotareaestado[0].ordentarea_idordentarea;
                        // IGUALMENTE AGREGAR EL MISMO ESTADO A ORDEN TAREA . POR HACERSE
                        const ordentareaestado = {
                            'ordentarea_idordentarea':  idordentarea,
                            'estadoscrum_idestadoscrum': Empleadotareaestado.estadoscrum_idestadoscrum,
                            'fecha': Empleadotareaestado.fecha,
                            'hora': Empleadotareaestado.hora,
                            'created_by': Empleadotareaestado.created_by
                        }

                        query = 'INSERT INTO ordentareaestado SET ?';
                        keys = [ordentareaestado];

                        connection.query(query, keys, (error, result) => {
                            if(error) 
                                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                            else
                                return next(null, { success: true, result: result, message: 'Tarea actualizada' });
                        });
                    }
                });
            } else {
                return next(null, { success: false, result: result, message: 'No se pudo crear el registro' });
            }
        }
    });
};

Empleadotareaestado.update = (Empleadotareaestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empleadotareaestado SET ? WHERE idempleadotareaestado = ? AND created_by = ?';
        keys = [Empleadotareaestado, Empleadotareaestado.idempleadotareaestado, created_by];
    } else {
        query = 'UPDATE empleadotareaestado SET ? WHERE idempleadotareaestado = ?';
        keys = [Empleadotareaestado, Empleadotareaestado.idempleadotareaestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado actualizad@' });
    });
};

Empleadotareaestado.remove = (idempleadotareaestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM empleadotareaestado WHERE idempleadotareaestado = ? AND created_by = ?';
        keys = [idempleadotareaestado, created_by];
    } else {
        query = 'DELETE FROM empleadotareaestado WHERE idempleadotareaestado = ?';
        keys = [idempleadotareaestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado eliminad@' });
    });
};

Empleadotareaestado.logicRemove = (idempleadotareaestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empleadotareaestado SET baja = 1 WHERE idempleadotareaestado = ? AND created_by = ?';
        keys = [idempleadotareaestado, created_by];
    } else {
        query = 'UPDATE empleadotareaestado SET baja = 1 WHERE idempleadotareaestado = ?';
        keys = [idempleadotareaestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleadotareaestado eliminad@' });
    });
};

Empleadotareaestado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Empleadotareaestado;
