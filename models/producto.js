const connection = require('../config/db-connection');

const Producto = {};

Producto.findByIdArea = (idArea, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT producto.*, _formula_idformula.formula as formula_formula_idformula , _area_idarea.nombre as area_area_idarea FROM producto INNER JOIN formula as _formula_idformula ON _formula_idformula.idformula = producto.formula_idformula INNER JOIN area as _area_idarea ON _area_idarea.idarea = producto.area_idarea   WHERE producto.area_idarea = ? AND producto.created_by = ? HAVING producto.baja IS NULL OR producto.baja = false';
        keys = [idArea, created_by];
    } else {
        query = 'SELECT producto.*, _formula_idformula.formula as formula_formula_idformula , _area_idarea.nombre as area_area_idarea FROM producto INNER JOIN formula as _formula_idformula ON _formula_idformula.idformula = producto.formula_idformula INNER JOIN area as _area_idarea ON _area_idarea.idarea = producto.area_idarea   WHERE producto.area_idarea = ? HAVING producto.baja IS NULL OR producto.baja = false';
        keys = [idArea];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Producto encontrad@' });
    });
};

Producto.findByIdFormula = (idFormula, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT producto.*, _formula_idformula.formula as formula_formula_idformula , _area_idarea.nombre as area_area_idarea FROM producto INNER JOIN formula as _formula_idformula ON _formula_idformula.idformula = producto.formula_idformula INNER JOIN area as _area_idarea ON _area_idarea.idarea = producto.area_idarea   WHERE producto.formula_idformula = ? AND producto.created_by = ? HAVING producto.baja IS NULL OR producto.baja = false';
        keys = [idFormula, created_by];
    } else {
        query = 'SELECT producto.*, _formula_idformula.formula as formula_formula_idformula , _area_idarea.nombre as area_area_idarea FROM producto INNER JOIN formula as _formula_idformula ON _formula_idformula.idformula = producto.formula_idformula INNER JOIN area as _area_idarea ON _area_idarea.idarea = producto.area_idarea   WHERE producto.formula_idformula = ? HAVING producto.baja IS NULL OR producto.baja = false';
        keys = [idFormula];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Producto encontrad@' });
    });
};

Producto.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT producto.*, _formula_idformula.formula as formula_formula_idformula , _area_idarea.nombre as area_area_idarea FROM producto INNER JOIN formula as _formula_idformula ON _formula_idformula.idformula = producto.formula_idformula INNER JOIN area as _area_idarea ON _area_idarea.idarea = producto.area_idarea   WHERE producto.created_by = ? HAVING producto.baja IS NULL OR producto.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT producto.*, _formula_idformula.formula as formula_formula_idformula , _area_idarea.nombre as area_area_idarea FROM producto INNER JOIN formula as _formula_idformula ON _formula_idformula.idformula = producto.formula_idformula INNER JOIN area as _area_idarea ON _area_idarea.idarea = producto.area_idarea   HAVING producto.baja IS NULL OR producto.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Producto leíd@' });
    });
};

Producto.findById = (idProducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM producto WHERE idproducto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idProducto, created_by];
    } else {
        query = 'SELECT * FROM producto WHERE idproducto = ? HAVING baja IS NULL OR baja = false';
        keys = [idProducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Producto encontrad@' });
    });
};

Producto.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idproducto) AS count FROM producto';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Producto contabilizad@' });
    });
};

Producto.exist = (idProducto, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM producto WHERE idproducto = ?) AS exist';
    keys = [idProducto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Producto verificad@' });
    });
};

Producto.insert = (Producto, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO producto SET ?';
    keys = [Producto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Producto cread@' });
    });
};

Producto.update = (Producto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE producto SET ? WHERE idproducto = ? AND created_by = ?';
        keys = [Producto, Producto.idproducto, created_by];
    } else {
        query = 'UPDATE producto SET ? WHERE idproducto = ?';
        keys = [Producto, Producto.idproducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Producto actualizad@' });
    });
};

Producto.remove = (idproducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM producto WHERE idproducto = ? AND created_by = ?';
        keys = [idproducto, created_by];
    } else {
        query = 'DELETE FROM producto WHERE idproducto = ?';
        keys = [idproducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Producto eliminad@' });
    });
};

Producto.logicRemove = (idproducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE producto SET baja = 1 WHERE idproducto = ? AND created_by = ?';
        keys = [idproducto, created_by];
    } else {
        query = 'UPDATE producto SET baja = 1 WHERE idproducto = ?';
        keys = [idproducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Producto eliminad@' });
    });
};

Producto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Producto;
