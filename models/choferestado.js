const connection = require('../config/db-connection');

const Choferestado = {};

Choferestado.findByIdChofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT choferestado.*, _p.nombre as chofer_chofer_idchofer , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM choferestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = choferestado.chofer_idchofer INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = choferestado.estadoactividad_idestadoactividad INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer  WHERE choferestado.chofer_idchofer = ? AND choferestado.created_by = ? HAVING choferestado.baja IS NULL OR choferestado.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT choferestado.*, _p.nombre as chofer_chofer_idchofer , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM choferestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = choferestado.chofer_idchofer INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = choferestado.estadoactividad_idestadoactividad INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer  WHERE choferestado.chofer_idchofer = ? HAVING choferestado.baja IS NULL OR choferestado.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado encontrad@' });
    });
};
Choferestado.findByIdEstadoactividad = (idEstadoactividad, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT choferestado.*, _p.nombre as chofer_chofer_idchofer , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM choferestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = choferestado.chofer_idchofer INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = choferestado.estadoactividad_idestadoactividad INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer  WHERE choferestado.estadoactividad_idestadoactividad = ? AND choferestado.created_by = ? HAVING choferestado.baja IS NULL OR choferestado.baja = false';
        keys = [idEstadoactividad, created_by];
    } else {
        query = 'SELECT choferestado.*, _p.nombre as chofer_chofer_idchofer , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM choferestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = choferestado.chofer_idchofer INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = choferestado.estadoactividad_idestadoactividad INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer  WHERE choferestado.estadoactividad_idestadoactividad = ? HAVING choferestado.baja IS NULL OR choferestado.baja = false';
        keys = [idEstadoactividad];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado encontrad@' });
    });
};
Choferestado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT choferestado.*, CONCAT(_p.nombre, " ", _p.apellidoPaterno, " ", _p.apellidoMaterno) as chofer_chofer_idchofer , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM choferestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = choferestado.chofer_idchofer INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = choferestado.estadoactividad_idestadoactividad INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer  WHERE choferestado.created_by = ? HAVING choferestado.baja IS NULL OR choferestado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT choferestado.*, CONCAT(_p.nombre, " ", _p.apellidoPaterno, " ", _p.apellidoMaterno) as chofer_chofer_idchofer , _estadoactividad_idestadoactividad.nombre as estadoactividad_estadoactividad_idestadoactividad FROM choferestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = choferestado.chofer_idchofer INNER JOIN estadoactividad as _estadoactividad_idestadoactividad ON _estadoactividad_idestadoactividad.idestadoactividad = choferestado.estadoactividad_idestadoactividad INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer  HAVING choferestado.baja IS NULL OR choferestado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado leíd@' });
    });
};

Choferestado.findById = (idChoferestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM choferestado WHERE idchoferestado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idChoferestado, created_by];
    } else {
        query = 'SELECT * FROM choferestado WHERE idchoferestado = ? HAVING baja IS NULL OR baja = false';
        keys = [idChoferestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado encontrad@' });
    });
};

Choferestado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idchoferestado) AS count FROM choferestado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado contabilizad@' });
    });
};

Choferestado.exist = (idChoferestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM choferestado WHERE idchoferestado = ?) AS exist';
    keys = [idChoferestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado verificad@' });
    });
};

Choferestado.insert = (Choferestado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO choferestado SET ?';
    keys = [Choferestado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado cread@' });
    });
};

Choferestado.update = (Choferestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE choferestado SET ? WHERE idchoferestado = ? AND created_by = ?';
        keys = [Choferestado, Choferestado.idchoferestado, created_by];
    } else {
        query = 'UPDATE choferestado SET ? WHERE idchoferestado = ?';
        keys = [Choferestado, Choferestado.idchoferestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado actualizad@' });
    });
};

Choferestado.remove = (idchoferestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM choferestado WHERE idchoferestado = ? AND created_by = ?';
        keys = [idchoferestado, created_by];
    } else {
        query = 'DELETE FROM choferestado WHERE idchoferestado = ?';
        keys = [idchoferestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado eliminad@' });
    });
};

Choferestado.logicRemove = (idchoferestado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE choferestado SET baja = 1 WHERE idchoferestado = ? AND created_by = ?';
        keys = [idchoferestado, created_by];
    } else {
        query = 'UPDATE choferestado SET baja = 1 WHERE idchoferestado = ?';
        keys = [idchoferestado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Choferestado eliminad@' });
    });
};

Choferestado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Choferestado;
