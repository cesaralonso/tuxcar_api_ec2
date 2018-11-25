const connection = require('../config/db-connection');

const Permisotaxiestado = {};

Permisotaxiestado.findByIdEstadoactividad = (idEstadoactividad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiestado.*, _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM permisotaxiestado INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiestado.permisotaxi_idpermisotaxi INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = permisotaxiestado.estadoactividad_idestadoactividad   WHERE permisotaxiestado.estadoactividad_idestadoactividad = ? AND permisotaxiestado.created_by = ? HAVING permisotaxiestado.baja IS NULL OR permisotaxiestado.baja = false';
        keys = [idEstadoactividad, created_by];
    } else {
        query = 'SELECT permisotaxiestado.*, _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM permisotaxiestado INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiestado.permisotaxi_idpermisotaxi INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = permisotaxiestado.estadoactividad_idestadoactividad   WHERE permisotaxiestado.estadoactividad_idestadoactividad = ? HAVING permisotaxiestado.baja IS NULL OR permisotaxiestado.baja = false';
        keys = [idEstadoactividad];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado encontrad@' });
    });
};
Permisotaxiestado.findByIdPermisotaxi = (idPermisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiestado.*, _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM permisotaxiestado INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiestado.permisotaxi_idpermisotaxi INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = permisotaxiestado.estadoactividad_idestadoactividad   WHERE permisotaxiestado.permisotaxi_idpermisotaxi = ? AND permisotaxiestado.created_by = ? HAVING permisotaxiestado.baja IS NULL OR permisotaxiestado.baja = false';
        keys = [idPermisotaxi, created_by];
    } else {
        query = 'SELECT permisotaxiestado.*, _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM permisotaxiestado INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiestado.permisotaxi_idpermisotaxi INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = permisotaxiestado.estadoactividad_idestadoactividad   WHERE permisotaxiestado.permisotaxi_idpermisotaxi = ? HAVING permisotaxiestado.baja IS NULL OR permisotaxiestado.baja = false';
        keys = [idPermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado encontrad@' });
    });
};
Permisotaxiestado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiestado.*, _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM permisotaxiestado INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiestado.permisotaxi_idpermisotaxi INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = permisotaxiestado.estadoactividad_idestadoactividad   WHERE permisotaxiestado.created_by = ? HAVING permisotaxiestado.baja IS NULL OR permisotaxiestado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT permisotaxiestado.*, _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM permisotaxiestado INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiestado.permisotaxi_idpermisotaxi INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = permisotaxiestado.estadoactividad_idestadoactividad   HAVING permisotaxiestado.baja IS NULL OR permisotaxiestado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado leíd@' });
    });
};

Permisotaxiestado.findById = (idPermisotaxiestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM permisotaxiestado WHERE idpermisotaxiestado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxiestado, created_by];
    } else {
        query = 'SELECT * FROM permisotaxiestado WHERE idpermisotaxiestado = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxiestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado encontrad@' });
    });
};

Permisotaxiestado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpermisotaxiestado) AS count FROM permisotaxiestado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado contabilizad@' });
    });
};

Permisotaxiestado.exist = (idPermisotaxiestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM permisotaxiestado WHERE idpermisotaxiestado = ?) AS exist';
    keys = [idPermisotaxiestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado verificad@' });
    });
};

Permisotaxiestado.insert = (Permisotaxiestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO permisotaxiestado SET ?';
    keys = [Permisotaxiestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado cread@' });
    });
};

Permisotaxiestado.update = (Permisotaxiestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxiestado SET ? WHERE idpermisotaxiestado = ? AND created_by = ?';
        keys = [Permisotaxiestado, Permisotaxiestado.idpermisotaxiestado, created_by];
    } else {
        query = 'UPDATE permisotaxiestado SET ? WHERE idpermisotaxiestado = ?';
        keys = [Permisotaxiestado, Permisotaxiestado.idpermisotaxiestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado actualizad@' });
    });
};

Permisotaxiestado.remove = (idpermisotaxiestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM permisotaxiestado WHERE idpermisotaxiestado = ? AND created_by = ?';
        keys = [idpermisotaxiestado, created_by];
    } else {
        query = 'DELETE FROM permisotaxiestado WHERE idpermisotaxiestado = ?';
        keys = [idpermisotaxiestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado eliminad@' });
    });
};

Permisotaxiestado.logicRemove = (idpermisotaxiestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxiestado SET baja = 1 WHERE idpermisotaxiestado = ? AND created_by = ?';
        keys = [idpermisotaxiestado, created_by];
    } else {
        query = 'UPDATE permisotaxiestado SET baja = 1 WHERE idpermisotaxiestado = ?';
        keys = [idpermisotaxiestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso estado eliminad@' });
    });
};

Permisotaxiestado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Permisotaxiestado;
