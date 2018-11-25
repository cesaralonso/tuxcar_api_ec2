const connection = require('../config/db-connection');

const Vehiculo = {};

Vehiculo.findByIdEstado = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT CONCAT(vehiculo.marca, " ", vehiculo.modelo, " ", vehiculo.anio, " ", vehiculo.placa) as vehiculo_idvehiculo, vehiculo.*, _estado_idestado.nombre as estado_estado_idestado , _propietario.nombre as persona_propietario FROM vehiculo INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculo.estado_idestado INNER JOIN persona as _propietario ON _propietario.idpersona = vehiculo.propietario   WHERE vehiculo.estado_idestado = ? AND vehiculo.created_by = ? HAVING vehiculo.baja IS NULL OR vehiculo.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT CONCAT(vehiculo.marca, " ", vehiculo.modelo, " ", vehiculo.anio, " ", vehiculo.placa) as vehiculo_idvehiculo, vehiculo.*, _estado_idestado.nombre as estado_estado_idestado , _propietario.nombre as persona_propietario FROM vehiculo INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculo.estado_idestado INNER JOIN persona as _propietario ON _propietario.idpersona = vehiculo.propietario   WHERE vehiculo.estado_idestado = ? HAVING vehiculo.baja IS NULL OR vehiculo.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo encontrad@' });
    });
};

Vehiculo.findByIdPersona = (idPersona, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT CONCAT(vehiculo.marca, " ", vehiculo.modelo, " ", vehiculo.anio, " ", vehiculo.placa) as vehiculo_idvehiculo, vehiculo.*, _estado_idestado.nombre as estado_estado_idestado , _propietario.nombre as persona_propietario FROM vehiculo INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculo.estado_idestado INNER JOIN persona as _propietario ON _propietario.idpersona = vehiculo.propietario   WHERE vehiculo.persona_idpersona = ? AND vehiculo.created_by = ? HAVING vehiculo.baja IS NULL OR vehiculo.baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT CONCAT(vehiculo.marca, " ", vehiculo.modelo, " ", vehiculo.anio, " ", vehiculo.placa) as vehiculo_idvehiculo, vehiculo.*, _estado_idestado.nombre as estado_estado_idestado , _propietario.nombre as persona_propietario FROM vehiculo INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculo.estado_idestado INNER JOIN persona as _propietario ON _propietario.idpersona = vehiculo.propietario   WHERE vehiculo.persona_idpersona = ? HAVING vehiculo.baja IS NULL OR vehiculo.baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo encontrad@' });
    });
};

Vehiculo.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT CONCAT(vehiculo.marca, " ", vehiculo.modelo, " ", vehiculo.anio, " ", vehiculo.placa) as vehiculo_idvehiculo, vehiculo.*, _estado_idestado.nombre as estado_estado_idestado , _propietario.nombre as persona_propietario FROM vehiculo INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculo.estado_idestado INNER JOIN persona as _propietario ON _propietario.idpersona = vehiculo.propietario   WHERE vehiculo.created_by = ? HAVING vehiculo.baja IS NULL OR vehiculo.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT CONCAT(vehiculo.marca, " ", vehiculo.modelo, " ", vehiculo.anio, " ", vehiculo.placa) as vehiculo_idvehiculo, vehiculo.*, _estado_idestado.nombre as estado_estado_idestado , _propietario.nombre as persona_propietario FROM vehiculo INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculo.estado_idestado INNER JOIN persona as _propietario ON _propietario.idpersona = vehiculo.propietario   HAVING vehiculo.baja IS NULL OR vehiculo.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo leíd@' });
    });
};

Vehiculo.findById = (idVehiculo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM vehiculo WHERE idvehiculo = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculo, created_by];
    } else {
        query = 'SELECT * FROM vehiculo WHERE idvehiculo = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo encontrad@' });
    });
};

Vehiculo.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idvehiculo) AS count FROM vehiculo';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo contabilizad@' });
    });
};

Vehiculo.exist = (idVehiculo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM vehiculo WHERE idvehiculo = ?) AS exist';
    keys = [idVehiculo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo verificad@' });
    });
};

Vehiculo.insert = (Vehiculo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO vehiculo SET ?';
    keys = [Vehiculo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo cread@' });
    });
};

Vehiculo.update = (Vehiculo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculo SET ? WHERE idvehiculo = ? AND created_by = ?';
        keys = [Vehiculo, Vehiculo.idvehiculo, created_by];
    } else {
        query = 'UPDATE vehiculo SET ? WHERE idvehiculo = ?';
        keys = [Vehiculo, Vehiculo.idvehiculo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo actualizad@' });
    });
};

Vehiculo.remove = (idvehiculo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM vehiculo WHERE idvehiculo = ? AND created_by = ?';
        keys = [idvehiculo, created_by];
    } else {
        query = 'DELETE FROM vehiculo WHERE idvehiculo = ?';
        keys = [idvehiculo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo eliminad@' });
    });
};

Vehiculo.logicRemove = (idvehiculo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculo SET baja = 1 WHERE idvehiculo = ? AND created_by = ?';
        keys = [idvehiculo, created_by];
    } else {
        query = 'UPDATE vehiculo SET baja = 1 WHERE idvehiculo = ?';
        keys = [idvehiculo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculo eliminad@' });
    });
};

Vehiculo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Vehiculo;
