const connection = require('../config/db-connection');
const async = require('async');

const Orden = {};


Orden.entregaOrden = (Orden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    if (Orden.estado_estado_idestado === 'PAGADO SIN ENTREGAR' || Orden.estado_estado_idestado === 'SOBREPAGADO' || Orden.estado_estado_idestado === 'REALIZADO SIN ENTREGAR') {

        // ESTADO ENTREGADO 
        query = 'INSERT INTO ordenestado(orden_idorden, estadopago_idestadopago, fecha, hora) VALUES(?, ?, current_date(), current_time())';
        keys = [Orden.idorden, 7];

        connection.query(query, keys, (error, result) => {
            if(error) 
                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro de orden' });
            else {

                // ACTUALIZAR HORAENTREGA Y FECHAENTREGA DE ORDEN
                if (created_by) {
                    query = 'UPDATE orden SET idorden = ?, fechaEntregaReal = current_date(), horaEntregaReal = current_time() WHERE idorden = ? AND created_by = ?';
                    keys = [Orden.idorden, Orden.idorden, created_by];
                } else {
                    query = 'UPDATE orden SET idorden = ?, fechaEntregaReal = current_date(), horaEntregaReal = current_time() WHERE idorden = ?';
                    keys = [Orden.idorden, Orden.idorden];
                }

                connection.query(query, keys, (error, result) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro de orden' });
                    else {

                        return next(null, { success: true, result: result, message: 'Orden entregada' });

                    }
                });
        
            }
        });

    } else {
        return next(null, { success: false, result: Orden, message: 'Solo órdenes sin entregar y pagadas pueden entregarse' });
    }
};

Orden.finalizaOrden = (Orden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    if (Orden.estado_estado_idestado === 'SIN COSTO' || Orden.estado_estado_idestado === 'PAGADO SIN ENTREGAR' || Orden.estado_estado_idestado === 'PAGADO ENTREGADO') {

        // ESTADO FINALIZADO 
        query = 'INSERT INTO ordenestado(orden_idorden, estadopago_idestadopago, fecha, hora) VALUES(?, ?, DATE(NOW()), TIME(NOW()))';
        keys = [Orden.idorden, 11];

        connection.query(query, keys, (error, result) => {
            if(error) 
                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro de orden' });
            else {
                return next(null, { success: true, result: result, message: 'Orden finalizada' });
            }
        });

    } else {
        return next(null, { success: false, result: Orden, message: 'Solo órdenes pagadas o sin costo pueden finalizarse' });
    }
};

Orden.updateMontos = (idOrden, connection, next) => {
    if( !connection )
        return next('Connection refused');

    // Obtengo el abono total para esta orden
    let query = '';
    let keys = [];
    query = 'SELECT SUM(montoPagado) as abonado FROM abono WHERE orden_idorden = ? AND baja IS NULL GROUP BY orden_idorden ORDER BY idabono DESC';
    keys = [idOrden];

    connection.query(query, keys, (error, abono) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else {
            
            let abonoAbonado = 0;
            if (abono[0]) {
                abonoAbonado = abono[0].abonado;
            } else {
                console.log('No se encontraron abonos');
            }

            // Update a orden para modificar el adeudo que es la resta de abonado y adelanto a total y setear monto abonado que es el abono obtenido
            query = '';
            keys = [];

            // OBTENER LOS DATOS DE LA ORDEN
            query = 'SELECT * FROM orden WHERE idorden = ? HAVING baja IS NULL OR baja = false';
            keys = [idOrden];

            connection.query(query, keys, (error, orden) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
                else {

                    const adelanto = orden[0].cubierto;
                    const adeudo = orden[0].adeudo;
                    const abonado = orden[0].abonado;
                    const total = orden[0].total;
                    let idestado = 0;
                    const nuevoAdeudo = total - abonoAbonado - adelanto;

                    // REALIZA EL ACTUALIZADO DE MONTOS A ORDEN
                    query = '';
                    keys = [];
                    query = 'UPDATE orden SET adeudo = ?, abonado = ? WHERE idorden = ?';
                    keys = [nuevoAdeudo, abonoAbonado, idOrden];

                    connection.query(query, keys, (error, ordenActualizada) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
                        else {

                            // INSERTAR REGISTRO EN ORDEN ESTADO
                            if (nuevoAdeudo === 0) {
                                idestado = 2; // PAGADO
                            } else if (nuevoAdeudo > 0) {
                                idestado = 1; // ADEUDANDO
                            } else if (nuevoAdeudo < 0) {
                                idestado = 5; // SOBREPAGADO
                            }

                            query = '';
                            keys = [];
                            query = 'INSERT INTO ordenestado(orden_idorden, estadopago_idestadopago, fecha, hora) VALUES (?, ?, DATE(NOW()), TIME(NOW()))';
                            keys = [idOrden, idestado];

                            connection.query(query, keys, (error, ordenActualizada) => {
                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
                                else {
                                    return next(null, { success: true, result: ordenActualizada, message: 'Orden actualizada, montos actualizados correctamente' });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

Orden.findByIdCliente = (idCliente, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    async.waterfall([
        next => {

            if (created_by) {
                query = 'SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago   WHERE orden.cliente_idcliente = ? AND orden.created_by = ? GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.idorden';
                keys = [idCliente, created_by];
            } else {
                query = 'SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago  WHERE orden.cliente_idcliente = ? GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.idorden';
                keys = [idCliente];
            }

            connection.query(query, keys, (error, result) => {
                error ? next(error) : next(null, result)
            });
        },
        (ordenes, next) => {

            const ordenrefaccion = [];

            // AGREGAR REFACCIONES
            async.each(ordenes, (orden, nextIteration) => {
                
                        
                orden.refacciones = [];

                query = `SELECT orden_has_refaccion.*, _refaccion_idrefaccion.proveedor, _refaccion_idrefaccion.nota, _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion, _refaccion_idrefaccion.precioVenta FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion WHERE orden_has_refaccion.orden_idorden = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false `;
                keys = [+orden.idorden];
                
                connection.query(query, keys, (error, refacciones) => {
                    orden.refacciones = refacciones;
                    ordenrefaccion.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenrefaccion ) )
        },
        (ordenrefaccion, next) => {

            const ordenproducto = [];

            // AGREGAR SERVICIOS
            async.each(ordenrefaccion, (orden, nextIteration) => {
                        
                orden.ordenproducto = [];

                query = `SELECT cpersona.nombre as cliente, ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden  INNER JOIN orden as o on o.idorden = ordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.orden_idorden = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, ordenproductos) => {

                    orden.ordenproducto = ordenproductos;
                    ordenproducto.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenproducto) )
        },
        (ordenproducto, next) => {

            // AGREGAR TAREAS A SERVICIOS
            const _ordenproducto = [];

            // BARRER ORDENES
            async.each(ordenproducto, (orden, nextIteration) => {

                const ordentarea = [];
                _ordenproducto.push(orden);
                
                // BARRER SERVICIOS
                async.each(orden.ordenproducto, (servicio, nextIteration) => {
                    
                    servicio.tareas = [];

                    // OBTIENE TAREAS
                    let query = '';
                    let keys = [];
                    query = `SELECT  (SELECT es.nombre FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum  WHERE ot.idordentarea = ordentarea.idordentarea   ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  cpersona.nombre as cliente, ordentarea.*, _tarea_idtarea.nombre as tarea_tarea_idtarea , _producto.nombre as ordenproducto_ordenproducto_idordenproducto FROM ordentarea INNER JOIN tarea as _tarea_idtarea ON _tarea_idtarea.idtarea = ordentarea.tarea_idtarea INNER JOIN ordenproducto as _ordenproducto_idordenproducto ON _ordenproducto_idordenproducto.idordenproducto = ordentarea.ordenproducto_idordenproducto INNER JOIN orden as o on o.idorden = _ordenproducto_idordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto ON _producto.idproducto = _ordenproducto_idordenproducto.producto_idproducto   WHERE ordentarea.ordenproducto_idordenproducto = ?  GROUP BY ordentarea.idordentarea HAVING ordentarea.baja IS NULL OR ordentarea.baja = false`;
                    
                    keys = [+servicio.idordenproducto];

                    connection.query(query, keys, (error, tareas) => {
                        servicio.tareas = tareas;
                        ordentarea.push(servicio);

                        const empleadotarea = [];
                
                        // BARRER TAREAS
                        async.each(servicio.tareas, (tarea, nextIteration) => {
    
                            tarea.empleadotarea = [];

                            // OBTIENE EMPLEADOS TAREA
                            let query = '';
                            let keys = [];
                            query = 'SELECT (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false)';
                            keys = [+tarea.idordentarea];

                            connection.query(query, keys, (error, empleadotareas) => {
                                tarea.empleadotarea = empleadotareas;
                                empleadotarea.push(tarea);
                                error ? nextIteration(error) : nextIteration();
                            });

                        }, (error) => error ? nextIteration(error) : nextIteration(null, empleadotarea) );

                    });

                }, (error) => error ? nextIteration(error) : nextIteration(null, ordentarea) );
                
            }, (error) => {
                if (error) {
                    next(error);
                } else {
                    next(null, _ordenproducto);
                }
            } );
        },
        (ordentarea, next) => {

            const ordenesabonos = [];

            // AGREGAR ABONOS
            async.each(ordentarea, (orden, nextIteration) => {
                        
                orden.abonos = [];

                query = `SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden 
                            FROM abono 
                            INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden   
                            WHERE abono.orden_idorden = ? 
                            HAVING abono.baja IS NULL OR abono.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, abonos) => {

                    orden.abonos = abonos;
                    ordenesabonos.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenesabonos) )
        }
    ],
    (error, result) => {
        if ( error )
            next({ success: false, error: error });
        else {
            next(null, { success: true, result: result, message: 'Órdenes leídas' })
        }
    })


};

Orden.findById = (idOrden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    async.waterfall([
        next => {

            if (created_by) {
                query = 'SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago   WHERE orden.idorden = ? AND orden.created_by = ? GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.idorden';
                keys = [idOrden, created_by];
            } else {
                query = 'SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago  WHERE orden.idorden = ? GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.idorden';
                keys = [idOrden];
            }

            connection.query(query, keys, (error, result) => {
                error ? next(error) : next(null, result)
            });
        },
        (ordenes, next) => {

            const ordenrefaccion = [];

            // AGREGAR REFACCIONES
            async.each(ordenes, (orden, nextIteration) => {
                
                        
                orden.refacciones = [];

                query = `SELECT orden_has_refaccion.*, _refaccion_idrefaccion.proveedor, _refaccion_idrefaccion.nota, _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion, _refaccion_idrefaccion.precioVenta FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion WHERE orden_has_refaccion.orden_idorden = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false `;
                keys = [+orden.idorden];
                
                connection.query(query, keys, (error, refacciones) => {
                    orden.refacciones = refacciones;
                    ordenrefaccion.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenrefaccion ) )
        },
        (ordenrefaccion, next) => {

            const ordenproducto = [];

            // AGREGAR SERVICIOS
            async.each(ordenrefaccion, (orden, nextIteration) => {
                        
                orden.ordenproducto = [];

                query = `SELECT cpersona.nombre as cliente, ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden  INNER JOIN orden as o on o.idorden = ordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.orden_idorden = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, ordenproductos) => {

                    orden.ordenproducto = ordenproductos;
                    ordenproducto.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenproducto) )
        },
        (ordenproducto, next) => {

            // AGREGAR TAREAS A SERVICIOS
            const _ordenproducto = [];

            // BARRER ORDENES
            async.each(ordenproducto, (orden, nextIteration) => {

                const ordentarea = [];
                _ordenproducto.push(orden);
                
                // BARRER SERVICIOS
                async.each(orden.ordenproducto, (servicio, nextIteration) => {
                    
                    servicio.tareas = [];

                    // OBTIENE TAREAS
                    let query = '';
                    let keys = [];
                    query = `SELECT  (SELECT es.nombre FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum  WHERE ot.idordentarea = ordentarea.idordentarea   ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  cpersona.nombre as cliente, ordentarea.*, _tarea_idtarea.nombre as tarea_tarea_idtarea , _producto.nombre as ordenproducto_ordenproducto_idordenproducto FROM ordentarea INNER JOIN tarea as _tarea_idtarea ON _tarea_idtarea.idtarea = ordentarea.tarea_idtarea INNER JOIN ordenproducto as _ordenproducto_idordenproducto ON _ordenproducto_idordenproducto.idordenproducto = ordentarea.ordenproducto_idordenproducto INNER JOIN orden as o on o.idorden = _ordenproducto_idordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto ON _producto.idproducto = _ordenproducto_idordenproducto.producto_idproducto   WHERE ordentarea.ordenproducto_idordenproducto = ?  GROUP BY ordentarea.idordentarea HAVING ordentarea.baja IS NULL OR ordentarea.baja = false`;
                    
                    keys = [+servicio.idordenproducto];

                    connection.query(query, keys, (error, tareas) => {
                        servicio.tareas = tareas;
                        ordentarea.push(servicio);

                        const empleadotarea = [];
                
                        // BARRER TAREAS
                        async.each(servicio.tareas, (tarea, nextIteration) => {
    
                            tarea.empleadotarea = [];

                            // OBTIENE EMPLEADOS TAREA
                            let query = '';
                            let keys = [];
                            query = 'SELECT (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false)';
                            keys = [+tarea.idordentarea];

                            connection.query(query, keys, (error, empleadotareas) => {
                                tarea.empleadotarea = empleadotareas;
                                empleadotarea.push(tarea);
                                error ? nextIteration(error) : nextIteration();
                            });

                        }, (error) => error ? nextIteration(error) : nextIteration(null, empleadotarea) );

                    });

                }, (error) => error ? nextIteration(error) : nextIteration(null, ordentarea) );
                
            }, (error) => {

                if (error) {
                    next(error);
                } else {
                    next(null, _ordenproducto);
                }
            } );
        },

        (ordentarea, next) => {

            const ordenesabonos = [];

            // AGREGAR ABONOS
            async.each(ordentarea, (orden, nextIteration) => {
                        
                orden.abonos = [];

                query = `SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden 
                            FROM abono 
                            INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden   
                            WHERE abono.orden_idorden = ? 
                            HAVING abono.baja IS NULL OR abono.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, abonos) => {

                    orden.abonos = abonos;
                    ordenesabonos.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenesabonos) )
        }
    ],
    (error, result) => {
        if ( error )
            next({ success: false, error: error });
        else {
            next(null, { success: true, result: result, message: 'Órdenes leídas' })
        }
    })

};

Orden.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    async.waterfall([
        next => {

            if (created_by) {
                query = `SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden  AND o.fecha >= (DATE_FORMAT(o.fecha, "%Y-%m-01"))   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago   WHERE orden.created_by = ?
                AND orden.fecha >= (DATE_FORMAT(orden.fecha, "%Y-%m-01")) GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.idorden`;
                keys = [created_by];
            } else {
                query = `SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden  AND o.fecha >= (DATE_FORMAT(o.fecha, "%Y-%m-01"))   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago  WHERE orden.fecha >= (DATE_FORMAT(orden.fecha, "%Y-%m-01")) GROUP BY orden.idorden   HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.idorden`;
                keys = [];
            }

            connection.query(query, keys, (error, result) => {
                error ? next(error) : next(null, result)
            });
        },
        (ordenes, next) => {

            const ordenrefaccion = [];

            // AGREGAR REFACCIONES
            async.each(ordenes, (orden, nextIteration) => {

                orden.refacciones = [];

                query = `SELECT orden_has_refaccion.*, _refaccion_idrefaccion.proveedor, _refaccion_idrefaccion.nota, _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion, _refaccion_idrefaccion.precioVenta FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion WHERE orden_has_refaccion.orden_idorden = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false `;
                keys = [+orden.idorden];
                
                connection.query(query, keys, (error, refacciones) => {
                    orden.refacciones = refacciones;
                    ordenrefaccion.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenrefaccion ) )
        },

        (ordenrefaccion, next) => {

            const ordenproducto = [];

            // AGREGAR SERVICIOS
            async.each(ordenrefaccion, (orden, nextIteration) => {
                        
                orden.ordenproducto = [];

                query = `SELECT cpersona.nombre as cliente, ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden  INNER JOIN orden as o on o.idorden = ordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.orden_idorden = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, ordenproductos) => {

                    orden.ordenproducto = ordenproductos;
                    ordenproducto.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenproducto) )
        },
        

        (ordenproducto, next) => {

            // AGREGAR TAREAS A SERVICIOS
            const _ordenproducto = [];

            // BARRER ORDENES
            async.each(ordenproducto, (orden, nextIteration) => {

                const ordentarea = [];
                _ordenproducto.push(orden);
                
                // BARRER SERVICIOS
                async.each(orden.ordenproducto, (servicio, nextIteration) => {
                    
                    servicio.tareas = [];

                    // OBTIENE TAREAS
                    let query = '';
                    let keys = [];
                    query = `SELECT  (SELECT es.nombre FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum  WHERE ot.idordentarea = ordentarea.idordentarea   ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  cpersona.nombre as cliente, ordentarea.*, _tarea_idtarea.nombre as tarea_tarea_idtarea , _producto.nombre as ordenproducto_ordenproducto_idordenproducto FROM ordentarea INNER JOIN tarea as _tarea_idtarea ON _tarea_idtarea.idtarea = ordentarea.tarea_idtarea INNER JOIN ordenproducto as _ordenproducto_idordenproducto ON _ordenproducto_idordenproducto.idordenproducto = ordentarea.ordenproducto_idordenproducto INNER JOIN orden as o on o.idorden = _ordenproducto_idordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto ON _producto.idproducto = _ordenproducto_idordenproducto.producto_idproducto   WHERE ordentarea.ordenproducto_idordenproducto = ?  GROUP BY ordentarea.idordentarea HAVING ordentarea.baja IS NULL OR ordentarea.baja = false`;
                    
                    keys = [+servicio.idordenproducto];

                    connection.query(query, keys, (error, tareas) => {
                        servicio.tareas = tareas;
                        ordentarea.push(servicio);

                        const empleadotarea = [];
                
                        // BARRER TAREAS
                        async.each(servicio.tareas, (tarea, nextIteration) => {
    
                            tarea.empleadotarea = [];

                            // OBTIENE EMPLEADOS TAREA
                            let query = '';
                            let keys = [];
                            query = 'SELECT (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false)';
                            keys = [+tarea.idordentarea];

                            connection.query(query, keys, (error, empleadotareas) => {
                                tarea.empleadotarea = empleadotareas;
                                empleadotarea.push(tarea);
                                error ? nextIteration(error) : nextIteration();
                            });

                        }, (error) => error ? nextIteration(error) : nextIteration(null, empleadotarea) );

                    });

                }, (error) => error ? nextIteration(error) : nextIteration(null, ordentarea) );

            }, (error) => {

                if (error) {
                    next(error);
                } else {
                    next(null, _ordenproducto);
                }

            } );

        },

        (ordentarea, next) => {

            const ordenesabonos = [];

            // AGREGAR ABONOS
            async.each(ordentarea, (orden, nextIteration) => {
                        
                orden.abonos = [];

                query = `SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden 
                            FROM abono 
                            INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden   
                            WHERE abono.orden_idorden = ? 
                            HAVING abono.baja IS NULL OR abono.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, abonos) => {

                    orden.abonos = abonos;
                    ordenesabonos.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenesabonos) )
        }
    ],
    (error, result) => {
        if ( error )
            next({ success: false, error: error });
        else {
            next(null, { success: true, result: result, message: 'Órdenes leídas' })
        }
    })

};

Orden.findByIdVehiculotaller = (idVehiculotaller, idVehiculo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    async.waterfall([
        next => {

            if (created_by) {
                query = `SELECT (SELECT ep.nombre FROM ordenestado as oe INNER JOIN orden as o on o.idorden = oe.orden_idorden  INNER JOIN estadopago as ep on ep.idestadopago = oe.estadopago_idestadopago  WHERE o.vehiculotaller_idvehiculotaller = ?  AND (oe.baja IS NULL OR oe.baja = false) AND (o.baja IS NULL OR o.baja = false)  ORDER BY oe.created_at DESC LIMIT 0,1) AS estado_estado_idestado, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente, (SELECT p.idpermisotaxi FROM permisotaxi as p INNER JOIN permisotaxiestado as pe on pe.permisotaxi_idpermisotaxi = p.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pe.estadoactividad_idestadoactividad WHERE p.vehiculo_idvehiculo = ? AND ea.nombre = "TALLER NO DISPONIBLE" OR ea.nombre = "MANTENIMIENTO NO DISPONIBLE" ORDER BY ea.created_at DESC LIMIT 0,1) as idpermisotaxi, orden.*, _vehiculotaller_idvehiculotaller.motivo as vehiculotaller_vehiculotaller_idvehiculotaller  FROM orden  INNER JOIN vehiculotaller as _vehiculotaller_idvehiculotaller ON _vehiculotaller_idvehiculotaller.idvehiculotaller = orden.vehiculotaller_idvehiculotaller INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona WHERE orden.vehiculotaller_idvehiculotaller = ? AND orden.created_by = ?  HAVING orden.baja IS NULL OR orden.baja = false`;
                keys = [idVehiculotaller, idVehiculo, idVehiculotaller, created_by];
            } else {
                query = `SELECT (SELECT ep.nombre FROM ordenestado as oe INNER JOIN orden as o on o.idorden = oe.orden_idorden  INNER JOIN estadopago as ep on ep.idestadopago = oe.estadopago_idestadopago  WHERE o.vehiculotaller_idvehiculotaller = ?  AND (oe.baja IS NULL OR oe.baja = false) AND (o.baja IS NULL OR o.baja = false)  ORDER BY oe.created_at DESC LIMIT 0,1) AS estado_estado_idestado, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente, (SELECT p.idpermisotaxi FROM permisotaxi as p INNER JOIN permisotaxiestado as pe on pe.permisotaxi_idpermisotaxi = p.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pe.estadoactividad_idestadoactividad WHERE p.vehiculo_idvehiculo = ? AND ea.nombre = "TALLER NO DISPONIBLE" OR ea.nombre = "MANTENIMIENTO NO DISPONIBLE" ORDER BY ea.created_at DESC LIMIT 0,1) as idpermisotaxi, orden.*, _vehiculotaller_idvehiculotaller.motivo as vehiculotaller_vehiculotaller_idvehiculotaller  FROM orden  INNER JOIN vehiculotaller as _vehiculotaller_idvehiculotaller ON _vehiculotaller_idvehiculotaller.idvehiculotaller = orden.vehiculotaller_idvehiculotaller INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona WHERE orden.vehiculotaller_idvehiculotaller = ?  HAVING orden.baja IS NULL OR orden.baja = false`;
                keys = [idVehiculotaller, idVehiculo, idVehiculotaller];
            }

            connection.query(query, keys, (error, result) => {
                error ? next(error) : next(null, result)
            });
        },
        (ordenes, next) => {

            const ordenrefaccion = [];

            // AGREGAR REFACCIONES
            async.each(ordenes, (orden, nextIteration) => {
                
                        
                orden.refacciones = [];

                query = `SELECT orden_has_refaccion.*, _refaccion_idrefaccion.proveedor, _refaccion_idrefaccion.nota, _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion, _refaccion_idrefaccion.precioVenta FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion WHERE orden_has_refaccion.orden_idorden = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false `;
                keys = [+orden.idorden];
                
                connection.query(query, keys, (error, refacciones) => {
                    orden.refacciones = refacciones;
                    ordenrefaccion.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenrefaccion ) )
        },

        (ordenrefaccion, next) => {

            const ordenproducto = [];

            // AGREGAR SERVICIOS
            async.each(ordenrefaccion, (orden, nextIteration) => {
                        
                orden.ordenproducto = [];

                query = `SELECT cpersona.nombre as cliente, ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden  INNER JOIN orden as o on o.idorden = ordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.orden_idorden = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, ordenproductos) => {

                    orden.ordenproducto = ordenproductos;
                    ordenproducto.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenproducto) )
        },
        
        (ordenproducto, next) => {

            // AGREGAR TAREAS A SERVICIOS
            const _ordenproducto = [];

            // BARRER ORDENES
            async.each(ordenproducto, (orden, nextIteration) => {

                const ordentarea = [];
                _ordenproducto.push(orden);
                
                // BARRER SERVICIOS
                async.each(orden.ordenproducto, (servicio, nextIteration) => {

                    servicio.tareas = [];

                    // OBTIENE TAREAS
                    let query = '';
                    let keys = [];
                    query = `SELECT  (SELECT es.nombre FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum  WHERE ot.idordentarea = ordentarea.idordentarea   ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  cpersona.nombre as cliente, ordentarea.*, _tarea_idtarea.nombre as tarea_tarea_idtarea , _producto.nombre as ordenproducto_ordenproducto_idordenproducto FROM ordentarea INNER JOIN tarea as _tarea_idtarea ON _tarea_idtarea.idtarea = ordentarea.tarea_idtarea INNER JOIN ordenproducto as _ordenproducto_idordenproducto ON _ordenproducto_idordenproducto.idordenproducto = ordentarea.ordenproducto_idordenproducto INNER JOIN orden as o on o.idorden = _ordenproducto_idordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto ON _producto.idproducto = _ordenproducto_idordenproducto.producto_idproducto   WHERE ordentarea.ordenproducto_idordenproducto = ?  GROUP BY ordentarea.idordentarea HAVING ordentarea.baja IS NULL OR ordentarea.baja = false`;
                    
                    keys = [+servicio.idordenproducto];

                    connection.query(query, keys, (error, tareas) => {
                        servicio.tareas = tareas;
                        ordentarea.push(servicio);

                        const empleadotarea = [];
                
                        // BARRER TAREAS
                        async.each(servicio.tareas, (tarea, nextIteration) => {
    
                            tarea.empleadotarea = [];

                            // OBTIENE EMPLEADOS TAREA
                            let query = '';
                            let keys = [];
                            query = 'SELECT (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false)';
                            keys = [+tarea.idordentarea];

                            connection.query(query, keys, (error, empleadotareas) => {
                                tarea.empleadotarea = empleadotareas;
                                empleadotarea.push(tarea);
                                error ? nextIteration(error) : nextIteration();
                            });

                        }, (error) => error ? nextIteration(error) : nextIteration(null, empleadotarea) );

                    });

                }, (error) => error ? nextIteration(error) : nextIteration(null, ordentarea) );

                
            }, (error) => {

                if (error) {
                    next(error);
                } else {
                    next(null, _ordenproducto);
                }

            } );

        },

        (ordenes, next) => {

            console.log("ordenes", ordenes);
            const ordenesabonos = [];

            // AGREGAR ABONOS
            async.each(ordenes, (orden, nextIteration) => {
                        
                orden.abonos = [];

                query = `SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden 
                            FROM abono 
                            INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden   
                            WHERE abono.orden_idorden = ? 
                            HAVING abono.baja IS NULL OR abono.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, abonos) => {

                    orden.abonos = abonos;
                    ordenesabonos.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenesabonos) )
        }
    ],
    (error, result) => {
        if ( error )
            next({ success: false, error: error });
        else {
            
            console.log("result", result);
            next(null, { success: true, result: result, message: 'Órdenes leídas' })
        }
    })

};


Orden.findFromTo = (fechaDesde, fechaHasta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    async.waterfall([
        next => {

            if (created_by) {
                query = `SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago   WHERE orden.fecha BETWEEN ? AND ? AND orden.created_by = ? GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.idorden`;
                keys = [fechaDesde, fechaHasta, created_by];
            } else {
                query = `SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago  WHERE orden.fecha BETWEEN ? AND ? GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.idorden`;
                keys = [fechaDesde, fechaHasta];
            }

            connection.query(query, keys, (error, result) => {
                error ? next(error) : next(null, result)
            });
        },
        (ordenes, next) => {

            const ordenrefaccion = [];

            // AGREGAR REFACCIONES
            async.each(ordenes, (orden, nextIteration) => {
                
                        
                orden.refacciones = [];

                query = `SELECT orden_has_refaccion.*, _refaccion_idrefaccion.proveedor, _refaccion_idrefaccion.nota, _refaccion_idrefaccion.nombre as refaccion_refaccion_idrefaccion, _refaccion_idrefaccion.precioVenta FROM orden_has_refaccion INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = orden_has_refaccion.orden_idorden INNER JOIN refaccion as _refaccion_idrefaccion ON _refaccion_idrefaccion.idrefaccion = orden_has_refaccion.refaccion_idrefaccion WHERE orden_has_refaccion.orden_idorden = ? HAVING orden_has_refaccion.baja IS NULL OR orden_has_refaccion.baja = false `;
                keys = [+orden.idorden];
                
                connection.query(query, keys, (error, refacciones) => {
                    orden.refacciones = refacciones;
                    ordenrefaccion.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenrefaccion ) )
        },

        (ordenrefaccion, next) => {

            const ordenproducto = [];

            // AGREGAR SERVICIOS
            async.each(ordenrefaccion, (orden, nextIteration) => {
                        
                orden.ordenproducto = [];

                query = `SELECT cpersona.nombre as cliente, ordenproducto.*, _orden_idorden.idorden as orden_orden_idorden , _producto_idproducto.nombre as producto_producto_idproducto , _tipoprecio_idtipoprecio.nombre as tipoprecio_tipoprecio_idtipoprecio FROM ordenproducto INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = ordenproducto.orden_idorden  INNER JOIN orden as o on o.idorden = ordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto_idproducto ON _producto_idproducto.idproducto = ordenproducto.producto_idproducto INNER JOIN tipoprecio as _tipoprecio_idtipoprecio ON _tipoprecio_idtipoprecio.idtipoprecio = ordenproducto.tipoprecio_idtipoprecio   WHERE ordenproducto.orden_idorden = ? HAVING ordenproducto.baja IS NULL OR ordenproducto.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, ordenproductos) => {

                    orden.ordenproducto = ordenproductos;
                    ordenproducto.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenproducto) )
        },
        

        (ordenproducto, next) => {

            // AGREGAR TAREAS A SERVICIOS
            const _ordenproducto = [];

            // BARRER ORDENES
            async.each(ordenproducto, (orden, nextIteration) => {

                const ordentarea = [];
                _ordenproducto.push(orden);
                
                // BARRER SERVICIOS
                async.each(orden.ordenproducto, (servicio, nextIteration) => {
                    
                    servicio.tareas = [];

                    // OBTIENE TAREAS
                    let query = '';
                    let keys = [];
                    query = `SELECT  (SELECT es.nombre FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum  WHERE ot.idordentarea = ordentarea.idordentarea   ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  cpersona.nombre as cliente, ordentarea.*, _tarea_idtarea.nombre as tarea_tarea_idtarea , _producto.nombre as ordenproducto_ordenproducto_idordenproducto FROM ordentarea INNER JOIN tarea as _tarea_idtarea ON _tarea_idtarea.idtarea = ordentarea.tarea_idtarea INNER JOIN ordenproducto as _ordenproducto_idordenproducto ON _ordenproducto_idordenproducto.idordenproducto = ordentarea.ordenproducto_idordenproducto INNER JOIN orden as o on o.idorden = _ordenproducto_idordenproducto.orden_idorden INNER JOIN cliente as c on c.idcliente = o.cliente_idcliente INNER JOIN persona as cpersona on cpersona.idpersona = c.persona_idpersona INNER JOIN producto as _producto ON _producto.idproducto = _ordenproducto_idordenproducto.producto_idproducto   WHERE ordentarea.ordenproducto_idordenproducto = ?  GROUP BY ordentarea.idordentarea HAVING ordentarea.baja IS NULL OR ordentarea.baja = false`;
                    
                    keys = [+servicio.idordenproducto];

                    connection.query(query, keys, (error, tareas) => {
                        servicio.tareas = tareas;
                        ordentarea.push(servicio);

                        const empleadotarea = [];
                
                        // BARRER TAREAS
                        async.each(servicio.tareas, (tarea, nextIteration) => {
    
                            tarea.empleadotarea = [];

                            // OBTIENE EMPLEADOS TAREA
                            let query = '';
                            let keys = [];
                            query = 'SELECT (SELECT es.nombre FROM empleadotarea as ot INNER JOIN empleadotareaestado as ote on ot.idempleadotarea = ote.empleadotarea_idempleadotarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idempleadotarea = empleadotarea.idempleadotarea ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  _ordentarea_idordentarea.*, _ordentarea_idordentarea.especificaciones as ordentarea_especificaciones, empleadotarea.*, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , _tarea.nombre as ordentarea_ordentarea_idordentarea , xordentarea.ordentarea_estado as ordentarea_estado FROM empleadotarea  JOIN (SELECT es.nombre as ordentarea_estado, ot.idordentarea FROM ordentarea as ot INNER JOIN ordentareaestado as ote on ot.idordentarea = ote.ordentarea_idordentarea INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum ORDER BY ote.created_at DESC) as xordentarea on xordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = empleadotarea.empleado_idempleado INNER JOIN ordentarea as _ordentarea_idordentarea ON _ordentarea_idordentarea.idordentarea = empleadotarea.ordentarea_idordentarea INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona INNER JOIN tarea as _tarea ON _tarea.idtarea = _ordentarea_idordentarea.tarea_idtarea  WHERE empleadotarea.ordentarea_idordentarea = ?   GROUP BY empleadotarea.idempleadotarea  HAVING (empleadotarea.baja IS NULL OR empleadotarea.baja = false)';
                            keys = [+tarea.idordentarea];

                            connection.query(query, keys, (error, empleadotareas) => {
                                tarea.empleadotarea = empleadotareas;
                                empleadotarea.push(tarea);
                                error ? nextIteration(error) : nextIteration();
                            });

                        }, (error) => error ? nextIteration(error) : nextIteration(null, empleadotarea) );

                    });

                }, (error) => error ? nextIteration(error) : nextIteration(null, ordentarea) );

            }, (error) => {

                if (error) {
                    next(error);
                } else {
                    next(null, _ordenproducto);
                }

            } );

        },

        (ordentarea, next) => {

            const ordenesabonos = [];

            // AGREGAR ABONOS
            async.each(ordentarea, (orden, nextIteration) => {
                        
                orden.abonos = [];

                query = `SELECT abono.*, _orden_idorden.idorden as orden_orden_idorden 
                            FROM abono 
                            INNER JOIN orden as _orden_idorden ON _orden_idorden.idorden = abono.orden_idorden   
                            WHERE abono.orden_idorden = ? 
                            HAVING abono.baja IS NULL OR abono.baja = false`;
                keys = [+orden.idorden];

                connection.query(query, keys, (error, abonos) => {

                    orden.abonos = abonos;
                    ordenesabonos.push(orden);
                    error ? nextIteration(error) : nextIteration();
                });
            }, (error) => error ? next(error) : next(null, ordenesabonos) )
        }
    ],
    (error, result) => {
        if ( error )
            next({ success: false, error: error });
        else {
            next(null, { success: true, result: result, message: 'Órdenes leídas' })
        }
    })

};


Orden.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idorden) AS count FROM orden';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orden contabilizad@' });
    });
};

Orden.exist = (idOrden, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM orden WHERE idorden = ?) AS exist';
    keys = [idOrden];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Orden verificad@' });
    });
};

Orden.insert = (Orden, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO orden SET ?';
    keys = [Orden];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            let idestado;
            // CREACIÓN DE REGISTRO EN ORDEN ESTADO
            if (Orden.total === 0 && Orden.adeudo === 0) {
                idestado = 4; // SINCOSTO
            } else if (Orden.total > 0  && Orden.total === Orden.adelanto && Orden.adeudo === 0) {
                idestado = 2; // PAGADO
            }  else if (Orden.adelanto > Orden.total) {
                idestado = 5; // SOBREPAGADO
            } else {
                idestado = 1; // ADEUDANDO
            }

            const Ordenestado = {
                'orden_idorden': Orden.idorden,
                'estadopago_idestadopago': idestado, 
                'fecha': Orden.fecha,
                'hora': Orden.hora
            }

            let query = '';
            let keys = [];
            query = 'INSERT INTO ordenestado SET ?';
            keys = [Ordenestado];

            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro de orden' });
                else
                    return next(null, { success: true, result: result, message: 'Orden cread@' });
            });

        }
    });
};

Orden.update = (Orden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE orden SET ? WHERE idorden = ? AND created_by = ?';
        keys = [Orden, Orden.idorden, created_by];
    } else {
        query = 'UPDATE orden SET ? WHERE idorden = ?';
        keys = [Orden, Orden.idorden];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else {
            
            let idestado;
            // CREACIÓN DE REGISTRO EN ORDEN ESTADO
            if (Orden.total === 0 && Orden.adeudo === 0) {
                idestado = 4; // SINCOSTO
            } else if (Orden.total > 0  && Orden.total === Orden.adelanto && Orden.adeudo === 0) {
                idestado = 2; // PAGADO
            }  else if (Orden.adelanto > Orden.total) {
                idestado = 5; // SOBREPAGADO
            } else {
                idestado = 1; // ADEUDANDO
            }

            const Ordenestado = {
                'orden_idorden': Orden.idorden,
                'estadopago_idestadopago': idestado, 
                'fecha': Orden.fecha,
                'hora': Orden.hora
            }

            let query = '';
            let keys = [];
            query = 'INSERT INTO ordenestado SET ?';
            keys = [Ordenestado];

            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro de orden' });
                else
                    return next(null, { success: true, result: result, message: 'Orden actualizad@' });
            });

        }
    });
};

Orden.remove = (idorden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM orden WHERE idorden = ? AND created_by = ?';
        keys = [idorden, created_by];
    } else {
        query = 'DELETE FROM orden WHERE idorden = ?';
        keys = [idorden];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden eliminad@' });
    });
};

Orden.logicRemove = (idorden, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE orden SET baja = 1 WHERE idorden = ? AND created_by = ?';
        keys = [idorden, created_by];
    } else {
        query = 'UPDATE orden SET baja = 1 WHERE idorden = ?';
        keys = [idorden];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Orden eliminad@' });
    });
};

Orden.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Orden;
