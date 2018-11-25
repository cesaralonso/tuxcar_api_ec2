const connection = require('../config/db-connection');

const Vehiculoestado = {};

Vehiculoestado.findByIdEstadoactividad = (idEstadoactividad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoestado.*, _vehiculo_idvehiculo.placa as vehiculo_vehiculo_idvehiculo , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM vehiculoestado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculoestado.vehiculo_idvehiculo INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = vehiculoestado.estadoactividad_idestadoactividad   WHERE vehiculoestado.estadoactividad_idestadoactividad = ? AND vehiculoestado.created_by = ? HAVING vehiculoestado.baja IS NULL OR vehiculoestado.baja = false';
        keys = [idEstadoactividad, created_by];
    } else {
        query = 'SELECT vehiculoestado.*, _vehiculo_idvehiculo.placa as vehiculo_vehiculo_idvehiculo , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM vehiculoestado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculoestado.vehiculo_idvehiculo INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = vehiculoestado.estadoactividad_idestadoactividad   WHERE vehiculoestado.estadoactividad_idestadoactividad = ? HAVING vehiculoestado.baja IS NULL OR vehiculoestado.baja = false';
        keys = [idEstadoactividad];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado encontrad@' });
    });
};

Vehiculoestado.findByIdVehiculo = (idVehiculo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoestado.*, _vehiculo_idvehiculo.placa as vehiculo_vehiculo_idvehiculo , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM vehiculoestado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculoestado.vehiculo_idvehiculo INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = vehiculoestado.estadoactividad_idestadoactividad   WHERE vehiculoestado.vehiculo_idvehiculo = ? AND vehiculoestado.created_by = ? HAVING vehiculoestado.baja IS NULL OR vehiculoestado.baja = false';
        keys = [idVehiculo, created_by];
    } else {
        query = 'SELECT vehiculoestado.*, _vehiculo_idvehiculo.placa as vehiculo_vehiculo_idvehiculo , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM vehiculoestado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculoestado.vehiculo_idvehiculo INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = vehiculoestado.estadoactividad_idestadoactividad   WHERE vehiculoestado.vehiculo_idvehiculo = ? HAVING vehiculoestado.baja IS NULL OR vehiculoestado.baja = false';
        keys = [idVehiculo];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado encontrad@' });
    });
};

Vehiculoestado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoestado.*, _vehiculo_idvehiculo.placa as vehiculo_vehiculo_idvehiculo , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM vehiculoestado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculoestado.vehiculo_idvehiculo INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = vehiculoestado.estadoactividad_idestadoactividad   WHERE vehiculoestado.created_by = ? HAVING vehiculoestado.baja IS NULL OR vehiculoestado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT vehiculoestado.*, _vehiculo_idvehiculo.placa as vehiculo_vehiculo_idvehiculo , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM vehiculoestado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculoestado.vehiculo_idvehiculo INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = vehiculoestado.estadoactividad_idestadoactividad   HAVING vehiculoestado.baja IS NULL OR vehiculoestado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado leíd@' });
    });
};

Vehiculoestado.findById = (idVehiculoestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM vehiculoestado WHERE idvehiculoestado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculoestado, created_by];
    } else {
        query = 'SELECT * FROM vehiculoestado WHERE idvehiculoestado = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculoestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado encontrad@' });
    });
};

Vehiculoestado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idvehiculoestado) AS count FROM vehiculoestado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado contabilizad@' });
    });
};

Vehiculoestado.exist = (idVehiculoestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM vehiculoestado WHERE idvehiculoestado = ?) AS exist';
    keys = [idVehiculoestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado verificad@' });
    });
};

Vehiculoestado.insert = (Vehiculoestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO vehiculoestado SET ?';
    keys = [Vehiculoestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado cread@' });
    });
};

Vehiculoestado.update = (Vehiculoestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculoestado SET ? WHERE idvehiculoestado = ? AND created_by = ?';
        keys = [Vehiculoestado, Vehiculoestado.idvehiculoestado, created_by];
    } else {
        query = 'UPDATE vehiculoestado SET ? WHERE idvehiculoestado = ?';
        keys = [Vehiculoestado, Vehiculoestado.idvehiculoestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado actualizad@' });
    });
};

Vehiculoestado.remove = (idvehiculoestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM vehiculoestado WHERE idvehiculoestado = ? AND created_by = ?';
        keys = [idvehiculoestado, created_by];
    } else {
        query = 'DELETE FROM vehiculoestado WHERE idvehiculoestado = ?';
        keys = [idvehiculoestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado eliminad@' });
    });
};

Vehiculoestado.logicRemove = (idvehiculoestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculoestado SET baja = 1 WHERE idvehiculoestado = ? AND created_by = ?';
        keys = [idvehiculoestado, created_by];
    } else {
        query = 'UPDATE vehiculoestado SET baja = 1 WHERE idvehiculoestado = ?';
        keys = [idvehiculoestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoestado eliminad@' });
    });
};

Vehiculoestado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Vehiculoestado;
