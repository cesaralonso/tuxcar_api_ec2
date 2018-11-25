const connection = require('../config/db-connection');

const Ordenproducto = {};


Ordenproducto.calcularPrecio = (calculo, connection, next) => {
    if( !connection )
        return next('Connection refused');

    /*
    calculo = {
        'idtipoprecio': this.tipoprecio_idtipoprecioAC,
        'cantidad': this.cantidad,
        'producto_idproducto': this.producto_idproductoAC,
    };

    tipoprecio
        FLOTILLA 1
        PUBLICO 2
    */

    let query = '';
    let keys = [];

    // BUSCAR EL PRECIO, LA FÓRMULA Y EL COSTO EXTRA DEL PRODUCTO
    query = 'SELECT precioPublico, precioMaquila, precioMayoreo, formula_idformula FROM producto WHERE idproducto = ?';
    keys = [calculo.producto_idproducto];

    connection.query(query, keys, (error, producto) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            // VALIDAR TODOS LOS CAMPOS
            if (calculo.idtipoprecio === undefined || calculo.producto_idproducto === undefined) {
                return next(null, { success: false, error: {}, message: 'Debe Seleccionar un Tipo de Precio y Producto' });
            }

            let precio = 0;
            // SELECCIONAR EL PRECIO SEGÚN EL TIPO DE PRECIO ELEGIDO
            if (calculo.idtipoprecio === '1') {
                precio = producto[0].precioMayoreo;
            } else if (calculo.idtipoprecio === '2') {
                precio = producto[0].precioPublico;
            }

            let formula = producto[0].formula_idformula;

            // SACAR EL PRECIO DEL PRODUCTO SEGÚN SU FÓRMULA
            let precioPorFormula = 0;

            // SI HUBIERA QUE SACAR POR FÓRMULA
            if (formula) {
                precioPorFormula = precio;
            }

            let precioPorCantidad = precioPorFormula * calculo.cantidad;
            return next(null, { success: true, result: precioPorCantidad, message: 'Precio del producto calculado' });
        }
    });
};

Ordenproducto.findByIdOrden = (idOrden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.orden_idorden = ? AND ordenproducto.created_by = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false';
        keys = [idOrden, created_by];
    } else {
        query = 'SELECT ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.orden_idorden = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false';
        keys = [idOrden];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto encontrad@' });
    });
};
Ordenproducto.findByIdProducto = (idProducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.producto_idproducto = ? AND ordenproducto.created_by = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false';
        keys = [idProducto, created_by];
    } else {
        query = 'SELECT ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.producto_idproducto = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false';
        keys = [idProducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto encontrad@' });
    });
};
Ordenproducto.findByIdTipoprecio = (idTipoprecio, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.tipoprecio_idtipoprecio = ? AND ordenproducto.created_by = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false';
        keys = [idTipoprecio, created_by];
    } else {
        query = 'SELECT ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.tipoprecio_idtipoprecio = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false';
        keys = [idTipoprecio];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto encontrad@' });
    });
};
Ordenproducto.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.created_by = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto leíd@' });
    });
};

Ordenproducto.findById = (idOrdenproducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM ordenproducto WHERE idordenproducto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrdenproducto, created_by];
    } else {
        query = 'SELECT * FROM ordenproducto WHERE idordenproducto = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrdenproducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto encontrad@' });
    });
};

Ordenproducto.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idordenproducto) AS count FROM ordenproducto';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto contabilizad@' });
    });
};

Ordenproducto.exist = (idOrdenproducto, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM ordenproducto WHERE idordenproducto = ?) AS exist';
    keys = [idOrdenproducto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto verificad@' });
    });
};

Ordenproducto.insert = (Ordenproducto, connection, next) => {
    if( !connection )
        return next('Connection refused');

    /*
    MODELO DE REFERENCIA 
    idordenproducto?: number;
    orden_idorden?: number;
    producto_idproducto?: number;
    cantidad?: number;
    tipoprecio_idtipoprecio?: number;
    precio?: number;
    */

    let query = '';
    let keys = [];
    query = 'INSERT INTO ordenproducto SET ?';
    keys = [Ordenproducto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            // buscar valor factura en orden
            query = 'SELECT factura FROM  orden WHERE idorden = ?';
            keys = [Ordenproducto.orden_idorden];

            connection.query(query, keys, (error, _factura) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                else {

                    // AGREGAR AL TOTAL DE LA ORDEN LA CANTIDAD DE SERVICIO AGREGADO
                    let totalSuma = Ordenproducto.precio ;
                    const subtotalSuma = totalSuma;

                    // VALIDAR PRECIO CON IVA
                    const factura = _factura[0].factura;
                    if (factura) {
                        totalSuma = totalSuma * 1.16;
                    }

                    query = 'UPDATE orden SET total = total + ?, subtotal = subtotal + ? WHERE idorden = ?';
                    keys = [totalSuma, subtotalSuma, Ordenproducto.orden_idorden];

                    connection.query(query, keys, (error, result) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                        else {
                            return next(null, { success: true, result: result, message: 'Servicio(s) agregado(s) a Orden' });
                        }
                    });
                }
            });
        }
    });
};

Ordenproducto.update = (Ordenproducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE ordenproducto SET ? WHERE idordenproducto = ? AND created_by = ?';
        keys = [Ordenproducto, Ordenproducto.idordenproducto, created_by];
    } else {
        query = 'UPDATE ordenproducto SET ? WHERE idordenproducto = ?';
        keys = [Ordenproducto, Ordenproducto.idordenproducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto actualizad@' });
    });
};

Ordenproducto.remove = (idordenproducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM ordenproducto WHERE idordenproducto = ? AND created_by = ?';
        keys = [idordenproducto, created_by];
    } else {
        query = 'DELETE FROM ordenproducto WHERE idordenproducto = ?';
        keys = [idordenproducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto eliminad@' });
    });
};

Ordenproducto.logicRemove = (idordenproducto, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE ordenproducto SET baja = 1 WHERE idordenproducto = ? AND created_by = ?';
        keys = [idordenproducto, created_by];
    } else {
        query = 'UPDATE ordenproducto SET baja = 1 WHERE idordenproducto = ?';
        keys = [idordenproducto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Ordenproducto eliminad@' });
    });
};

Ordenproducto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Ordenproducto;
