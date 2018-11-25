const connection = require('../config/db-connection');

const Empleado = {};


Empleado.allTaller = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.created_by = ? AND _area_idarea.nombre = "ADMINISTRACIÓN TALLER" HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user WHERE _area_idarea.nombre = "ADMINISTRACIÓN TALLER" HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleados Administradores de Taller leidos' });
    });
};

Empleado.allByAreaWithIdOrdenTarea = (idordentarea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    // SELECCIONA EL IDAREA CORRESPONDIENTE A LA ORDENTAREA
    query = 'SELECT a.idarea FROM ordentarea as ot INNER JOIN tarea as t on t.idtarea = ot.tarea_idtarea INNER JOIN area as a on a.idarea = t.area_idarea WHERE idordentarea = ?';
    keys = [idordentarea];
    connection.query(query, keys, (error, ordentarea) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (ordentarea.affectedRows === 0)
            return next(null, { success: false, result: ordentarea, message: 'Solo es posible encontrar registros propios' });
        else {

            if (ordentarea[0]) {

                // BUSCA LOS EMPLEADOS CON LA MISMA ÁREA
                if (created_by) {
                    query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.area_idarea = ? AND empleado.created_by = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
                    keys = [ordentarea[0].idarea, created_by];
                } else {
                    query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.area_idarea = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
                    keys = [ordentarea[0].idarea];
                }

                connection.query(query, keys, (error, result) => {
                    if(error)
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                    else if (result.affectedRows === 0)
                        return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
                    else
                        return next(null, { success: true, result: result, message: 'Empleado encontrad@' });
                });

            } else {
                return next(null, { success: false, result: ordentarea, message: 'Tarea de Orden no encontrada' });
            }

        }
    });

};

Empleado.findByIdArea = (idArea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.area_idarea = ? AND empleado.created_by = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [idArea, created_by];
    } else {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.area_idarea = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [idArea];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleado encontrad@' });
    });
};

Empleado.findByIdPersona = (idPersona, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.persona_idpersona = ? AND empleado.created_by = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.persona_idpersona = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleado encontrad@' });
    });
};

Empleado.findByIdSi_user = (idSi_user, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.si_user_idsi_user = ? AND empleado.created_by = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [idSi_user, created_by];
    } else {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.si_user_idsi_user = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [idSi_user];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleado encontrad@' });
    });
};

Empleado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   WHERE empleado.created_by = ? HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT empleado.*, _area_idarea.nombre as area_area_idarea , CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona , _si_user_idsi_user.email as si_user_si_user_idsi_user FROM empleado INNER JOIN area as _area_idarea ON _area_idarea.idarea = empleado.area_idarea INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = empleado.persona_idpersona INNER JOIN si_user as _si_user_idsi_user ON _si_user_idsi_user.idsi_user = empleado.si_user_idsi_user   HAVING empleado.baja IS NULL OR empleado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleado leíd@' });
    });
};

Empleado.findById = (idEmpleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM empleado WHERE idempleado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpleado, created_by];
    } else {
        query = 'SELECT * FROM empleado WHERE idempleado = ? HAVING baja IS NULL OR baja = false';
        keys = [idEmpleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleado encontrad@' });
    });
};

Empleado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idempleado) AS count FROM empleado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empleado contabilizad@' });
    });
};

Empleado.exist = (idEmpleado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM empleado WHERE idempleado = ?) AS exist';
    keys = [idEmpleado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Empleado verificad@' });
    });
};

Empleado.insert = (Empleado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO empleado SET ?';
    keys = [Empleado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Empleado cread@' });
    });
};

Empleado.update = (Empleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empleado SET ? WHERE idempleado = ? AND created_by = ?';
        keys = [Empleado, Empleado.idempleado, created_by];
    } else {
        query = 'UPDATE empleado SET ? WHERE idempleado = ?';
        keys = [Empleado, Empleado.idempleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleado actualizad@' });
    });
};

Empleado.remove = (idempleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM empleado WHERE idempleado = ? AND created_by = ?';
        keys = [idempleado, created_by];
    } else {
        query = 'DELETE FROM empleado WHERE idempleado = ?';
        keys = [idempleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleado eliminad@' });
    });
};

Empleado.logicRemove = (idempleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE empleado SET baja = 1 WHERE idempleado = ? AND created_by = ?';
        keys = [idempleado, created_by];
    } else {
        query = 'UPDATE empleado SET baja = 1 WHERE idempleado = ?';
        keys = [idempleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Empleado eliminad@' });
    });
};

Empleado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Empleado;
