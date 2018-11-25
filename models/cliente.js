const connection = require('../config/db-connection');

const Cliente = {};

Cliente.findByIdPersona = (idPersona, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT cliente.*, CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona FROM cliente INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = cliente.persona_idpersona   WHERE cliente.persona_idpersona = ? AND cliente.created_by = ? HAVING cliente.baja IS NULL OR cliente.baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT cliente.*, CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona FROM cliente INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = cliente.persona_idpersona   WHERE cliente.persona_idpersona = ? HAVING cliente.baja IS NULL OR cliente.baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cliente encontrad@' });
    });
};

Cliente.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT cliente.*, CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona FROM cliente INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = cliente.persona_idpersona   WHERE cliente.created_by = ? HAVING cliente.baja IS NULL OR cliente.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT cliente.*, CONCAT(_persona_idpersona.nombre, " ", _persona_idpersona.apellidoPaterno, " ", _persona_idpersona.apellidoMaterno ) as persona_persona_idpersona FROM cliente INNER JOIN persona as _persona_idpersona ON _persona_idpersona.idpersona = cliente.persona_idpersona   HAVING cliente.baja IS NULL OR cliente.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cliente leíd@' });
    });
};

Cliente.findById = (idCliente, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM cliente WHERE idcliente = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idCliente, created_by];
    } else {
        query = 'SELECT * FROM cliente WHERE idcliente = ? HAVING baja IS NULL OR baja = false';
        keys = [idCliente];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cliente encontrad@' });
    });
};

Cliente.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idcliente) AS count FROM cliente';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Cliente contabilizad@' });
    });
};

Cliente.exist = (idCliente, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM cliente WHERE idcliente = ?) AS exist';
    keys = [idCliente];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Cliente verificad@' });
    });
};

Cliente.insert = (Cliente, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO cliente SET ?';
    keys = [Cliente];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Cliente cread@' });
    });
};

Cliente.update = (Cliente, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE cliente SET ? WHERE idcliente = ? AND created_by = ?';
        keys = [Cliente, Cliente.idcliente, created_by];
    } else {
        query = 'UPDATE cliente SET ? WHERE idcliente = ?';
        keys = [Cliente, Cliente.idcliente];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cliente actualizad@' });
    });
};

Cliente.remove = (idcliente, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM cliente WHERE idcliente = ? AND created_by = ?';
        keys = [idcliente, created_by];
    } else {
        query = 'DELETE FROM cliente WHERE idcliente = ?';
        keys = [idcliente];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cliente eliminad@' });
    });
};

Cliente.logicRemove = (idcliente, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE cliente SET baja = 1 WHERE idcliente = ? AND created_by = ?';
        keys = [idcliente, created_by];
    } else {
        query = 'UPDATE cliente SET baja = 1 WHERE idcliente = ?';
        keys = [idcliente];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cliente eliminad@' });
    });
};

Cliente.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Cliente;
