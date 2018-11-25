const connection = require('../config/db-connection');

const Orden_has_refaccion = {};

Orden_has_refaccion.findByIdOrden = (idOrden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT orden_has_refaccion.*, _orden_idorden.idorden as orden_orden_idorden , _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion   WHERE orden_has_refaccion.orden_idorden = ? AND orden_has_refaccion.created_by = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false';
        keys = [idOrden, created_by];
    } else {
        query = 'SELECT orden_has_refaccion.*, _orden_idorden.idorden as orden_orden_idorden , _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion   WHERE orden_has_refaccion.orden_idorden = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false';
        keys = [idOrden];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion encontrad@' });
    });
};

Orden_has_refaccion.findByIdRefaccion = (idRefaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT orden_has_refaccion.*, _orden_idorden.idorden as orden_orden_idorden , _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion   WHERE orden_has_refaccion.refaccion_idrefaccion = ? AND orden_has_refaccion.created_by = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false';
        keys = [idRefaccion, created_by];
    } else {
        query = 'SELECT orden_has_refaccion.*, _orden_idorden.idorden as orden_orden_idorden , _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion   WHERE orden_has_refaccion.refaccion_idrefaccion = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false';
        keys = [idRefaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion encontrad@' });
    });
};

Orden_has_refaccion.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT orden_has_refaccion.*, _orden_idorden.idorden as orden_orden_idorden , _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion   WHERE orden_has_refaccion.created_by = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT orden_has_refaccion.*, _orden_idorden.idorden as orden_orden_idorden , _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion   HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion leíd@' });
    });
};

Orden_has_refaccion.findById = (idOrden_has_refaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM orden_has_refaccion WHERE idorden_has_refaccion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrden_has_refaccion, created_by];
    } else {
        query = 'SELECT * FROM orden_has_refaccion WHERE idorden_has_refaccion = ? HAVING baja IS NULL OR baja = false';
        keys = [idOrden_has_refaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion encontrad@' });
    });
};

Orden_has_refaccion.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idorden_has_refaccion) AS count FROM orden_has_refaccion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion contabilizad@' });
    });
};

Orden_has_refaccion.exist = (idOrden_has_refaccion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM orden_has_refaccion WHERE idorden_has_refaccion = ?) AS exist';
    keys = [idOrden_has_refaccion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion verificad@' });
    });
};

Orden_has_refaccion.insert = (Orden_has_refaccion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    /*
    MODELO DE REFERENCIA 
    idorden_has_refaccion?: number;
    orden_idorden?: number;
    refaccion_idrefaccion?: number;
    cantidad?: number;
    */

    // ANTES DE CREARSE REGISTRO EN ORDEN REFACCIÓN SE DEBE VERIFICAR DISPONIBILIDAD EN STOCK
    let query = '';
    let keys = [];
    query = 'SELECT cantidad, precioVenta FROM refaccion WHERE idrefaccion = ?';
    keys = [Orden_has_refaccion.refaccion_idrefaccion];
    connection.query(query, keys, (error, refaccion) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leia el registro refacción' });
        else {

            if (refaccion[0].cantidad >= Orden_has_refaccion.cantidad) {

                // OBTIENE EL PRECIO DE VENTA
                const precioVenta = refaccion[0].precioVenta;

                // POSTERIOR SE DEBE ACTUALIZAR EL DESCUENTO A LA CANTIDAD DE LA REFACCIÓN SELECCIONADA
                const nuevaCantidad = refaccion[0].cantidad - Orden_has_refaccion.cantidad;
                        
                let query = '';
                let keys = [];
                query = 'UPDATE refaccion SET cantidad = ? WHERE idrefaccion = ?';
                keys = [nuevaCantidad, Orden_has_refaccion.refaccion_idrefaccion];

                connection.query(query, keys, (error, refaccion) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro refacción' });
                    else {

                        // PORTERIOR CREAR EL REGISTRO DE ORDEN REFACCIÓN
                        let query = '';
                        let keys = [];
                        query = 'INSERT INTO orden_has_refaccion SET ?';
                        keys = [Orden_has_refaccion];

                        connection.query(query, keys, (error, result) => {
                            if(error) 
                                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                            else {

                                // buscar valor factura en orden
                                query = 'SELECT factura FROM orden WHERE idorden = ?';
                                keys = [Orden_has_refaccion.orden_idorden];
                                
                                connection.query(query, keys, (error, _factura) => {
                                    if(error) 
                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se cargaba el registro' });
                                    else {

                                        // AGREGAR AL TOTAL DE LA ORDEN LA CANTIDAD DE PRECIOVENTA POR CANRTIDAD
                                        let totalSuma = precioVenta * Orden_has_refaccion.cantidad;
                                        const subtotalSuma = totalSuma;

                                        // VALIDAR PRECIO CON IVA
                                        const factura = _factura[0].factura;
                                        if (factura) {
                                            totalSuma = totalSuma * 1.16;
                                        }

                                        query = 'UPDATE  orden SET  total = total + ?, subtotal = subtotal + ? WHERE idorden = ?';
                                        keys = [totalSuma, subtotalSuma, Orden_has_refaccion.orden_idorden];

                                        connection.query(query, keys, (error, result) => {
                                            if(error) 
                                                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                            else {
                                                return next(null, { success: true, result: result, message: 'Refacción(es) agregada(s) a Orden' });
                                            }
                                        });

                                    }
                                });

                            }
                        });
                    }
                });
            } else {  
                return next(null, { success: false, result: refaccion, message: 'No se encuentran la cantidad solicitada en Stock' });
            }
        }
    });
};

Orden_has_refaccion.update = (Orden_has_refaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE orden_has_refaccion SET ? WHERE idorden_has_refaccion = ? AND created_by = ?';
        keys = [Orden_has_refaccion, Orden_has_refaccion.idorden_has_refaccion, created_by];
    } else {
        query = 'UPDATE orden_has_refaccion SET ? WHERE idorden_has_refaccion = ?';
        keys = [Orden_has_refaccion, Orden_has_refaccion.idorden_has_refaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion actualizad@' });
    });
};

Orden_has_refaccion.remove = (idorden_has_refaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM orden_has_refaccion WHERE idorden_has_refaccion = ? AND created_by = ?';
        keys = [idorden_has_refaccion, created_by];
    } else {
        query = 'DELETE FROM orden_has_refaccion WHERE idorden_has_refaccion = ?';
        keys = [idorden_has_refaccion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden_has_refaccion eliminad@' });
    });
};

Orden_has_refaccion.logicRemove = (idorden_has_refaccion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    if (created_by) {
        query = 'SELECT cantidad, orden_idorden, refaccion_idrefaccion FROM orden_has_refaccion WHERE idorden_has_refaccion = ? AND created_by = ?';
        keys = [idorden_has_refaccion, created_by];
    } else {
        query = 'SELECT cantidad, orden_idorden, refaccion_idrefaccion FROM orden_has_refaccion WHERE idorden_has_refaccion = ?';
        keys = [idorden_has_refaccion];
    }

    // OBTENER EL REGISTRO DE ORDEN HAS REFACCION
    connection.query(query, keys, (error, orden_has_refaccion) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leia el registro orden_has_refaccion' });
        else {

            const ohr_orden_idorden = orden_has_refaccion[0].orden_idorden;
            const ohr_cantidad = orden_has_refaccion[0].cantidad;
            const ohr_refaccion_idrefaccion = orden_has_refaccion[0].refaccion_idrefaccion;

            if (created_by) {
                query = 'UPDATE refaccion SET cantidad = cantidad + ? WHERE idrefaccion = ? AND created_by = ?';
                keys = [ohr_cantidad, ohr_refaccion_idrefaccion, created_by];
            } else {
                query = 'UPDATE refaccion SET cantidad = cantidad + ? WHERE idrefaccion = ?';
                keys = [ohr_cantidad, ohr_refaccion_idrefaccion];
            }

            // POSTERIOR SE DEBE ADICIONAR LA CANTIDAD DE LA ORDEN HAS REFACCION A CANTIDAD EN REFACCIÓN
            connection.query(query, keys, (error, update_refaccion) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro refacción' });
                else {

                    if (created_by) {
                        query = 'SELECT precioVenta FROM refaccion WHERE idrefaccion = ? AND created_by = ?';
                        keys = [ohr_refaccion_idrefaccion, created_by];
                    } else {
                        query = 'SELECT precioVenta FROM refaccion WHERE idrefaccion = ?';
                        keys = [ohr_refaccion_idrefaccion];
                    }

                    // RESTAR A ORDEN TOTAL Y SUBTOTAL EL COSTO DE CANTIDAD OHR POR EL PRECIOVENTA DE REFACCION
                    connection.query(query, keys, (error, refaccion) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leia el registro refacción' });
                        else {

                            const r_precioVenta = refaccion[0].precioVenta;
                            const cantidadDescontar = r_precioVenta * ohr_cantidad;

                            if (created_by) {
                                query = 'UPDATE orden SET total = total - ?, subtotal = subtotal - ? WHERE idorden = ? AND created_by = ?';
                                keys = [cantidadDescontar, cantidadDescontar, ohr_orden_idorden, created_by];
                            } else {
                                query = 'UPDATE orden SET total = total - ?, subtotal = subtotal - ? WHERE idorden = ?';
                                keys = [cantidadDescontar, cantidadDescontar, ohr_orden_idorden];
                            }

                            // ACTUALIZAR REGISTRO EN ORDEN
                            connection.query(query, keys, (error, update_refaccion) => {
                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro orden' });
                                else {

                                    // DAR DE BAJA REGISTRO ORDEN HAS REFACCION
                                    if (created_by) {
                                        query = 'UPDATE orden_has_refaccion SET baja = 1 WHERE idorden_has_refaccion = ? AND created_by = ?';
                                        keys = [idorden_has_refaccion, created_by];
                                    } else {
                                        query = 'UPDATE orden_has_refaccion SET baja = 1 WHERE idorden_has_refaccion = ?';
                                        keys = [idorden_has_refaccion];
                                    }

                                    connection.query(query, keys, (error, result) => {
                                        if(error) 
                                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
                                        else if (result.affectedRows === 0)
                                            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
                                        else
                                            return next(null, { success: true, result: result, message: 'Orden_has_refaccion eliminad@' });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

Orden_has_refaccion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Orden_has_refaccion;
