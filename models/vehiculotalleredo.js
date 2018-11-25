const connection = require('../config/db-connection');

const Vehiculotalleredo = {};

Vehiculotalleredo.findByIdEstadoscrum = (idEstadoscrum, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculotalleredo.*, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.color, " ", v.placa) as vehiculotaller_vehiculotaller_idvehiculotaller, _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM vehiculotalleredo INNER JOIN vehiculotaller as _vehiculotaller_idvehiculotaller ON _vehiculotaller_idvehiculotaller.idvehiculotaller = vehiculotalleredo.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = _vehiculotaller_idvehiculotaller.vehiculo_idvehiculo INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = vehiculotalleredo.estadoscrum_idestadoscrum   WHERE vehiculotalleredo.estadoscrum_idestadoscrum = ? AND vehiculotalleredo.created_by = ? HAVING vehiculotalleredo.baja IS NULL OR vehiculotalleredo.baja = false';
        keys = [idEstadoscrum, created_by];
    } else {
        query = 'SELECT vehiculotalleredo.*, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.color, " ", v.placa) as vehiculotaller_vehiculotaller_idvehiculotaller, _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM vehiculotalleredo INNER JOIN vehiculotaller as _vehiculotaller_idvehiculotaller ON _vehiculotaller_idvehiculotaller.idvehiculotaller = vehiculotalleredo.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = _vehiculotaller_idvehiculotaller.vehiculo_idvehiculo INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = vehiculotalleredo.estadoscrum_idestadoscrum   WHERE vehiculotalleredo.estadoscrum_idestadoscrum = ? HAVING vehiculotalleredo.baja IS NULL OR vehiculotalleredo.baja = false';
        keys = [idEstadoscrum];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo encontrad@' });
    });
};

Vehiculotalleredo.findByIdVehiculotaller = (idVehiculotaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculotalleredo.*, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.color, " ", v.placa) as vehiculotaller_vehiculotaller_idvehiculotaller, _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM vehiculotalleredo INNER JOIN vehiculotaller as _vehiculotaller_idvehiculotaller ON _vehiculotaller_idvehiculotaller.idvehiculotaller = vehiculotalleredo.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = _vehiculotaller_idvehiculotaller.vehiculo_idvehiculo INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = vehiculotalleredo.estadoscrum_idestadoscrum   WHERE vehiculotalleredo.vehiculotaller_idvehiculotaller = ? AND vehiculotalleredo.created_by = ? HAVING vehiculotalleredo.baja IS NULL OR vehiculotalleredo.baja = false';
        keys = [idVehiculotaller, created_by];
    } else {
        query = 'SELECT vehiculotalleredo.*, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.color, " ", v.placa) as vehiculotaller_vehiculotaller_idvehiculotaller, _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM vehiculotalleredo INNER JOIN vehiculotaller as _vehiculotaller_idvehiculotaller ON _vehiculotaller_idvehiculotaller.idvehiculotaller = vehiculotalleredo.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = _vehiculotaller_idvehiculotaller.vehiculo_idvehiculo INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = vehiculotalleredo.estadoscrum_idestadoscrum   WHERE vehiculotalleredo.vehiculotaller_idvehiculotaller = ? HAVING vehiculotalleredo.baja IS NULL OR vehiculotalleredo.baja = false';
        keys = [idVehiculotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo encontrad@' });
    });
};

Vehiculotalleredo.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculotalleredo.*, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.color, " ", v.placa) as vehiculotaller_vehiculotaller_idvehiculotaller, _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM vehiculotalleredo INNER JOIN vehiculotaller as _vehiculotaller_idvehiculotaller ON _vehiculotaller_idvehiculotaller.idvehiculotaller = vehiculotalleredo.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = _vehiculotaller_idvehiculotaller.vehiculo_idvehiculo INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = vehiculotalleredo.estadoscrum_idestadoscrum   WHERE vehiculotalleredo.created_by = ? HAVING vehiculotalleredo.baja IS NULL OR vehiculotalleredo.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT vehiculotalleredo.*, CONCAT(v.marca, " ", v.modelo, " ", v.anio, " ", v.color, " ", v.placa) as vehiculotaller_vehiculotaller_idvehiculotaller, _estadoscrum_idestadoscrum.nombre as estadoscrum_estadoscrum_idestadoscrum FROM vehiculotalleredo INNER JOIN vehiculotaller as _vehiculotaller_idvehiculotaller ON _vehiculotaller_idvehiculotaller.idvehiculotaller = vehiculotalleredo.vehiculotaller_idvehiculotaller INNER JOIN vehiculo as v on v.idvehiculo = _vehiculotaller_idvehiculotaller.vehiculo_idvehiculo INNER JOIN estadoscrum as _estadoscrum_idestadoscrum ON _estadoscrum_idestadoscrum.idestadoscrum = vehiculotalleredo.estadoscrum_idestadoscrum   HAVING vehiculotalleredo.baja IS NULL OR vehiculotalleredo.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo leíd@' });
    });
};

Vehiculotalleredo.findById = (idVehiculotalleredo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM vehiculotalleredo WHERE idvehiculotalleredo = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculotalleredo, created_by];
    } else {
        query = 'SELECT * FROM vehiculotalleredo WHERE idvehiculotalleredo = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculotalleredo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo encontrad@' });
    });
};

Vehiculotalleredo.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idvehiculotalleredo) AS count FROM vehiculotalleredo';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo contabilizad@' });
    });
};

Vehiculotalleredo.exist = (idVehiculotalleredo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM vehiculotalleredo WHERE idvehiculotalleredo = ?) AS exist';
    keys = [idVehiculotalleredo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo verificad@' });
    });
};

Vehiculotalleredo.insert = (Vehiculotalleredo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO vehiculotalleredo SET ?';
    keys = [Vehiculotalleredo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo cread@' });
    });
};

Vehiculotalleredo.update = (Vehiculotalleredo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculotalleredo SET ? WHERE idvehiculotalleredo = ? AND created_by = ?';
        keys = [Vehiculotalleredo, Vehiculotalleredo.idvehiculotalleredo, created_by];
    } else {
        query = 'UPDATE vehiculotalleredo SET ? WHERE idvehiculotalleredo = ?';
        keys = [Vehiculotalleredo, Vehiculotalleredo.idvehiculotalleredo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo actualizad@' });
    });
};

Vehiculotalleredo.remove = (idvehiculotalleredo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM vehiculotalleredo WHERE idvehiculotalleredo = ? AND created_by = ?';
        keys = [idvehiculotalleredo, created_by];
    } else {
        query = 'DELETE FROM vehiculotalleredo WHERE idvehiculotalleredo = ?';
        keys = [idvehiculotalleredo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo eliminad@' });
    });
};

Vehiculotalleredo.logicRemove = (idvehiculotalleredo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculotalleredo SET baja = 1 WHERE idvehiculotalleredo = ? AND created_by = ?';
        keys = [idvehiculotalleredo, created_by];
    } else {
        query = 'UPDATE vehiculotalleredo SET baja = 1 WHERE idvehiculotalleredo = ?';
        keys = [idvehiculotalleredo];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotalleredo eliminad@' });
    });
};

Vehiculotalleredo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Vehiculotalleredo;
