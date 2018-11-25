const connection = require('../config/db-connection');

const Permisotaxi = {};

Permisotaxi.reporteIngresosEgresos = (idPermisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    // DATOS DEL PERMISO
    query = 'SELECT permisotaxi.numero, personapt.nombre as propietario,v.modelo, v.anio as año, v.serie, v.serieMotor as motor, v.polizaTipo as mutualidad, v.poliza from permisotaxi LEFT JOIN persona as personapt on permisotaxi.propietario = personapt.idpersona LEFT JOIN vehiculo as v on v.idvehiculo = permisotaxi.vehiculo_idvehiculo WHERE permisotaxi.idpermisotaxi = ? AND (permisotaxi.baja IS NULL OR permisotaxi.baja = false) AND (personapt.baja IS NULL OR personapt.baja = false) AND (v.baja IS NULL OR v.baja = false)';
    keys = [idPermisotaxi];

    connection.query(query, keys, (error, vehiculo) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (vehiculo.affectedRows === 0)
            return next(null, { success: false, result: vehiculo, message: 'Solo es posible encontrar registros propios' });
        else {

            // SACAR PAGO DE LIQUIDACIONES DE PERMISO total_ingreso
            query = 'SELECT ROUND(SUM(l.montopagado + l.bonificado), 2) AS total_ingreso FROM liquidacion AS l INNER JOIN permisotaxiasignado as pta on pta.idpermisotaxiasignado = l.permisotaxiasignado_idpermisotaxiasignado WHERE pta.permisotaxi_idpermisotaxi = ? AND l.fecha >= (DATE_FORMAT(NOW(), "%Y-%m-01")) AND (l.baja IS NULL OR l.baja = false) GROUP BY pta.permisotaxi_idpermisotaxi';
            keys = [idPermisotaxi];
    
            connection.query(query, keys, (error, ingreso) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                else if (ingreso.affectedRows === 0)
                    return next(null, { success: false, result: ingreso, message: 'Solo es posible encontrar registros propios' });
                else {

                    let total_ingreso = 0;
                    if(ingreso[0] &&  ingreso[0].total_ingreso > 0) {
                        total_ingreso = ingreso[0].total_ingreso ;
                    }

                    // SACAR PAGO DE LIQUIDACIONES DE PERMISO total_ingreso
                    query = 'SELECT e.nombre as estado_idestado, l.montopagado, l.bonificado, l.fecha FROM liquidacion AS l INNER JOIN permisotaxiasignado as pta on pta.idpermisotaxiasignado = l.permisotaxiasignado_idpermisotaxiasignado INNER JOIN estado as e on e.idestado = l.estado_idestado WHERE pta.permisotaxi_idpermisotaxi = ? AND l.fecha >= (DATE_FORMAT(NOW(), "%Y-%m-01")) AND (l.baja IS NULL OR l.baja = false) ORDER BY l.fecha';
                    keys = [idPermisotaxi];

                    connection.query(query, keys, (error, liquidaciones) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                        else if (liquidaciones.affectedRows === 0)
                            return next(null, { success: false, result: liquidaciones, message: 'Solo es posible encontrar registros propios' });
                        else {

                            // SACAR ORDENES DE PERMISO total_ingreso
                            query = 'SELECT ROUND(SUM(orden.abonado), 2) AS total_egreso FROM orden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = orden.vehiculotaller_idvehiculotaller INNER JOIN permisotaxi as pt on pt.vehiculo_idvehiculo = vt.vehiculo_idvehiculo WHERE pt.idpermisotaxi = ? AND orden.fecha >= (DATE_FORMAT(NOW(), "%Y-%m-01")) AND orden.baja IS NULL OR orden.baja = false GROUP BY pt.idpermisotaxi';
                            keys = [idPermisotaxi];

                            connection.query(query, keys, (error, egreso) => {

                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                                else if (egreso.affectedRows === 0)
                                    return next(null, { success: false, result: egreso, message: 'Solo es posible encontrar registros propios' });
                                else {

                                    let total_egreso = 0;
                                    if(egreso[0] &&  egreso[0].total_egreso > 0) {
                                        total_egreso = egreso[0].total_egreso ;
                                    }

                                    // SACAR ORDENES DE PERMISO
                                    query = 'SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden AND o.fecha >= (DATE_FORMAT(NOW(), "%Y-%m-01"))   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = orden.vehiculotaller_idvehiculotaller INNER JOIN permisotaxi as pt on pt.vehiculo_idvehiculo = vt.vehiculo_idvehiculo WHERE pt.idpermisotaxi = ? AND orden.fecha >= (DATE_FORMAT(NOW(), "%Y-%m-01")) GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.fecha';
                                    keys = [idPermisotaxi];

                                    connection.query(query, keys, (error, ordenes) => {

                                        if(error) 
                                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                                        else if (ordenes.affectedRows === 0)
                                            return next(null, { success: false, result: ordenes, message: 'Solo es posible encontrar registros propios' });
                                        else {

                                            const result = {
                                                'ordenes': ordenes,
                                                'total_egreso': total_egreso,
                                                'liquidaciones': liquidaciones,
                                                'total_ingreso': total_ingreso,
                                                'vehiculo': vehiculo };
                                            return next(null, { success: true, result: result, message: 'Registros recuperados correctamente' });
                                        }
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

Permisotaxi.reporteIngresosEgresosFromTo = (idPermisotaxi, fechaDesde, fechaHasta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    // DATOS DEL PERMISO
    query = 'SELECT permisotaxi.numero, personapt.nombre as propietario,v.modelo, v.anio as año, v.serie, v.serieMotor as motor, v.polizaTipo as mutualidad, v.poliza from permisotaxi LEFT JOIN persona as personapt on permisotaxi.propietario = personapt.idpersona LEFT JOIN vehiculo as v on v.idvehiculo = permisotaxi.vehiculo_idvehiculo WHERE permisotaxi.idpermisotaxi = ? AND (permisotaxi.baja IS NULL OR permisotaxi.baja = false) AND (personapt.baja IS NULL OR personapt.baja = false) AND (v.baja IS NULL OR v.baja = false)';
    keys = [idPermisotaxi];

    connection.query(query, keys, (error, vehiculo) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (vehiculo.affectedRows === 0)
            return next(null, { success: false, result: vehiculo, message: 'Solo es posible encontrar registros propios' });
        else {

            // SACAR PAGO DE LIQUIDACIONES DE PERMISO total_ingreso
            query = 'SELECT ROUND(SUM(l.montopagado + l.bonificado), 2) AS total_ingreso FROM liquidacion AS l INNER JOIN permisotaxiasignado as pta on pta.idpermisotaxiasignado = l.permisotaxiasignado_idpermisotaxiasignado WHERE pta.permisotaxi_idpermisotaxi = ? AND l.fecha BETWEEN ? AND ? AND (l.baja IS NULL OR l.baja = false) GROUP BY pta.permisotaxi_idpermisotaxi';
            keys = [idPermisotaxi, fechaDesde, fechaHasta];
    
            connection.query(query, keys, (error, ingreso) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                else if (ingreso.affectedRows === 0)
                    return next(null, { success: false, result: ingreso, message: 'Solo es posible encontrar registros propios' });
                else {

                    let total_ingreso = 0;
                    if(ingreso[0] &&  ingreso[0].total_ingreso > 0) {
                        total_ingreso = ingreso[0].total_ingreso ;
                    }

                    // SACAR PAGO DE LIQUIDACIONES DE PERMISO total_ingreso
                    query = 'SELECT e.nombre as estado_idestado, l.montopagado, l.bonificado, l.fecha FROM liquidacion AS l INNER JOIN permisotaxiasignado as pta on pta.idpermisotaxiasignado = l.permisotaxiasignado_idpermisotaxiasignado INNER JOIN estado as e on e.idestado = l.estado_idestado WHERE pta.permisotaxi_idpermisotaxi = ? AND l.fecha BETWEEN ? AND ? AND (l.baja IS NULL OR l.baja = false) ORDER BY l.fecha';
                    keys = [idPermisotaxi, fechaDesde, fechaHasta];

                    connection.query(query, keys, (error, liquidaciones) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                        else if (liquidaciones.affectedRows === 0)
                            return next(null, { success: false, result: liquidaciones, message: 'Solo es posible encontrar registros propios' });
                        else {

                            // SACAR ORDENES DE PERMISO total_egreso
                            query = 'SELECT ROUND(SUM(orden.abonado), 2) AS total_egreso FROM orden INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = orden.vehiculotaller_idvehiculotaller INNER JOIN permisotaxi as pt on pt.vehiculo_idvehiculo = vt.vehiculo_idvehiculo WHERE pt.idpermisotaxi = ? AND orden.fecha BETWEEN ? AND ?  AND orden.baja IS NULL OR orden.baja = false GROUP BY pt.idpermisotaxi';
                            keys = [idPermisotaxi, fechaDesde, fechaHasta];

                            connection.query(query, keys, (error, egreso) => {

                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                                else if (egreso.affectedRows === 0)
                                    return next(null, { success: false, result: egreso, message: 'Solo es posible encontrar registros propios' });
                                else {

                                    let total_egreso = 0;
                                    if(egreso[0] &&  egreso[0].total_egreso > 0) {
                                        total_egreso = egreso[0].total_egreso ;
                                    }

                                    // SACAR ORDENES DE PERMISO
                                    query = 'SELECT (SELECT e.nombre FROM orden as o INNER JOIN ordenestado as oe on o.idorden = oe.orden_idorden INNER JOIN estadopago as e on e.idestadopago = oe.estadopago_idestadopago  WHERE o.idorden = orden.idorden   ORDER BY oe.created_at DESC LIMIT 0,1) as estado_estado_idestado, orden.*, _cliente_idcliente.razonsocial as cliente_razonsocial, CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as cliente_cliente_idcliente FROM orden INNER JOIN cliente as _cliente_idcliente ON _cliente_idcliente.idcliente = orden.cliente_idcliente INNER JOIN persona as _persona ON _persona.idpersona = _cliente_idcliente.persona_idpersona INNER JOIN ordenestado AS oe ON oe.orden_idorden = orden.idorden INNER JOIN estadopago AS e ON e.idestadopago = oe.estadopago_idestadopago INNER JOIN vehiculotaller as vt on vt.idvehiculotaller = orden.vehiculotaller_idvehiculotaller INNER JOIN permisotaxi as pt on pt.vehiculo_idvehiculo = vt.vehiculo_idvehiculo WHERE pt.idpermisotaxi = ? AND orden.fecha BETWEEN ? AND ? GROUP BY orden.idorden  HAVING orden.baja IS NULL OR orden.baja = false  ORDER BY orden.fecha';
                                    keys = [idPermisotaxi, fechaDesde, fechaHasta];

                                    connection.query(query, keys, (error, ordenes) => {

                                        if(error) 
                                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                                        else if (ordenes.affectedRows === 0)
                                            return next(null, { success: false, result: ordenes, message: 'Solo es posible encontrar registros propios' });
                                        else {

                                            const result = {
                                                'ordenes': ordenes,
                                                'total_egreso': total_egreso,
                                                'liquidaciones': liquidaciones,
                                                'total_ingreso': total_ingreso,
                                                'vehiculo': vehiculo };
                                            return next(null, { success: true, result: result, message: 'Registros recuperados correctamente' });
                                        }
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

Permisotaxi.findByIdPermisoTaxi = (idPermisotaxi, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = 'SELECT pago.fecha as pago_fecha, permisotaxi.numero,persona.nombre as chofer, liquidacion.fecha, liquidacion.montopagado, pago.folio, pago.nota from permisotaxi INNER JOIN permisotaxiasignado on permisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN chofer on permisotaxiasignado.chofer_idchofer = chofer.idchofer INNER JOIN persona on chofer.chofer = persona.idpersona INNER JOIN liquidacion on permisotaxiasignado.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN pagoliquidacion on liquidacion.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN pago on pagoliquidacion.pago_idpago = pago.idpago WHERE permisotaxi.idpermisotaxi = ? AND (pago.baja IS NULL OR pago.baja = false) AND (pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false) AND (liquidacion.baja IS NULL OR liquidacion.baja = false) AND (permisotaxi.baja IS NULL OR permisotaxi.baja = false) AND (pago.baja IS NULL OR pago.baja = false)  order by liquidacion.fecha';

    let keys = [idPermisotaxi];

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso encontrad@' });
    });
};

Permisotaxi.findLiquidezByIdInThisDayAtThisHour = (idPermisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    // SACAR NÚMERO DE DÍA
    connection.query('SELECT WEEKDAY(NOW())', [], (error, resultDay) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else {

            let diaBonificar = resultDay[0].dia;
            // SACAR SI LA FECHA ES UN DÍA DOMINGO
            let query = '';
            if (diaBonificar === 6) {
                query = 'SELECT pt.liquidezDom as liquidez, (ROUND(TIME_TO_SEC(TIMEDIFF("23:59:59", curTime()))/60)) as minutosFaltan, (ROUND(TIME_TO_SEC(TIMEDIFF(curTime(), "00:00:00"))/60)) as minutosPasan FROM permisotaxi as pt WHERE pt.idpermisotaxi = ?';
            } else {
                query = 'SELECT pt.liquidez as liquidez, (ROUND(TIME_TO_SEC(TIMEDIFF("23:59:59", curTime()))/60)) as minutosFaltan, (ROUND(TIME_TO_SEC(TIMEDIFF(curTime(), "00:00:00"))/60)) as minutosPasan FROM permisotaxi as pt WHERE pt.idpermisotaxi = ?';
            }
            keys = [idPermisotaxi];
            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                else if (result.affectedRows === 0)
                    return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
                else {

                    // FÓRMULA LIQUIDEZ
                    result[0].liquidezUp = result[0].minutosFaltan * result[0].liquidez / 1440;
                    result[0].liquidezDown = result[0].minutosPasan * result[0].liquidez / 1440;
                    return next(null, { success: true, result: result, message: 'Liquidez encontrad@' });
                }
            });
        }
    });

};

Permisotaxi.findLiquidezByIdInThisDay = (idPermisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    // SACAR NÚMERO DE DÍA
    connection.query('SELECT WEEKDAY(NOW())', [], (error, resultDay) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else {

            let diaBonificar = resultDay[0].dia;
            // SACAR SI LA FECHA ES UN DÍA DOMINGO Y SI ESTA ENVIADO DE TALLER PARA APLICAR LA BONIFICACION
            let query = '';
            if (diaBonificar === 6) {
                query = 'SELECT pt.liquidezDom as liquidez FROM permisotaxi as pt WHERE pt.idpermisotaxi = ?';
            } else {
                query = 'SELECT pt.liquidez as liquidez FROM permisotaxi as pt WHERE pt.idpermisotaxi = ?';
            }
            keys = [idPermisotaxi];
            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                else if (result.affectedRows === 0)
                    return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
                else
                    return next(null, { success: true, result: result, message: 'Liquidez encontrad@' });
            });
        }
    });

};

Permisotaxi.allDisponibles = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo WHERE permisotaxi.created_by = ? AND permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado = "DISPONIBLE" OR estado_estado_idestado = "ACTIVO"';
        keys = [created_by];
    } else {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo WHERE permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado = "DISPONIBLE" OR estado_estado_idestado = "ACTIVO"';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso leíd@' });
    });
};

Permisotaxi.findFromTo = (idpermisotaxi, fechaDesde, fechaHasta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pago.fecha as pago_fecha, permisotaxi.numero,persona.nombre as chofer, liquidacion.fecha, liquidacion.montopagado, pago.folio, pago.nota from permisotaxi INNER JOIN permisotaxiasignado on permisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN chofer on permisotaxiasignado.chofer_idchofer = chofer.idchofer INNER JOIN persona on chofer.chofer = persona.idpersona INNER JOIN liquidacion on permisotaxiasignado.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN pagoliquidacion on liquidacion.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN pago on pagoliquidacion.pago_idpago = pago.idpago WHERE permisotaxi.idpermisotaxi = ? AND liquidacion.fecha BETWEEN ? AND ? AND pago.created_by = ? AND (pago.baja IS NULL OR pago.baja = false) AND (pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false) AND (liquidacion.baja IS NULL OR liquidacion.baja = false) AND (permisotaxi.baja IS NULL OR permisotaxi.baja = false) AND (pago.baja IS NULL OR pago.baja = false)  order by liquidacion.fecha';
        keys = [idpermisotaxi, fechaDesde, fechaHasta, created_by];
    } else {
        query = 'SELECT pago.fecha as pago_fecha, permisotaxi.numero,persona.nombre as chofer, liquidacion.fecha, liquidacion.montopagado, pago.folio, pago.nota from permisotaxi INNER JOIN permisotaxiasignado on permisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN chofer on permisotaxiasignado.chofer_idchofer = chofer.idchofer INNER JOIN persona on chofer.chofer = persona.idpersona INNER JOIN liquidacion on permisotaxiasignado.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN pagoliquidacion on liquidacion.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN pago on pagoliquidacion.pago_idpago = pago.idpago WHERE permisotaxi.idpermisotaxi = ? AND liquidacion.fecha BETWEEN ? AND ? AND (pago.baja IS NULL OR pago.baja = false) AND (pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false) AND (liquidacion.baja IS NULL OR liquidacion.baja = false) AND (permisotaxi.baja IS NULL OR permisotaxi.baja = false) AND (pago.baja IS NULL OR pago.baja = false)  order by liquidacion.fecha';
        keys = [idpermisotaxi, fechaDesde, fechaHasta];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso leíd@' });
    });

};

Permisotaxi.findByIdEstado = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo  WHERE permisotaxi.estado_idestado = ? AND permisotaxi.created_by = ? AND permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado IS NOT NULL';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo  WHERE permisotaxi.estado_idestado = ? AND permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado IS NOT NULL';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso encontrad@' });
    });
};

Permisotaxi.findByIdPersona = (idPersona, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo  WHERE permisotaxi.persona_idpersona = ? AND permisotaxi.created_by = ? AND permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado IS NOT NULL';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo  WHERE permisotaxi.persona_idpersona = ? AND permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado IS NOT NULL';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso encontrad@' });
    });
};

Permisotaxi.findByIdVehiculo = (idVehiculo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo  WHERE permisotaxi.vehiculo_idvehiculo = ? AND permisotaxi.created_by = ? AND permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado IS NOT NULL LIMIT 0,1';
        keys = [idVehiculo, created_by];
    } else {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo  WHERE permisotaxi.vehiculo_idvehiculo = ? AND permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado IS NOT NULL LIMIT 0,1';
        keys = [idVehiculo];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso encontrad@' });
    });
};

Permisotaxi.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo  WHERE permisotaxi.created_by = ? AND permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado IS NOT NULL';
        keys = [created_by];
    } else {
        query = 'SELECT (SELECT ea.nombre as estadoactividad FROM permisotaxi as pt INNER JOIN permisotaxiestado as pte on pte.permisotaxi_idpermisotaxi = pt.idpermisotaxi INNER JOIN estadoactividad as ea on ea.idestadoactividad = pte.estadoactividad_idestadoactividad WHERE pt.idpermisotaxi = permisotaxi.idpermisotaxi AND (pt.baja IS NULL OR pt.baja = false) AND (pte.baja IS NULL OR pte.baja = false) AND (ea.baja IS NULL OR ea.baja = false) ORDER BY pte.idpermisotaxiestado DESC LIMIT 0,1) as estado_estado_idestado,  permisotaxi.*, _propietario.nombre as persona_propietario , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM permisotaxi INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = permisotaxi.vehiculo_idvehiculo WHERE permisotaxi.baja IS NULL OR permisotaxi.baja = false GROUP BY permisotaxi.idpermisotaxi HAVING estado_estado_idestado IS NOT NULL';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso leíd@' });
    });
};

Permisotaxi.findById = (idPermisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM permisotaxi WHERE idpermisotaxi = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxi, created_by];
    } else {
        query = 'SELECT * FROM permisotaxi WHERE idpermisotaxi = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso encontrad@' });
    });
};

Permisotaxi.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpermisotaxi) AS count FROM permisotaxi';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permiso contabilizad@' });
    });
};

Permisotaxi.exist = (idPermisotaxi, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM permisotaxi WHERE idpermisotaxi = ?) AS exist';
    keys = [idPermisotaxi];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permiso verificad@' });
    });
};

Permisotaxi.insert = (Permisotaxi, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO permisotaxi SET ?';
    keys = [Permisotaxi];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            // CREA UN REGISTRO EN permisotaxiestado
            query = 'INSERT INTO permisotaxiestado(permisotaxi_idpermisotaxi, estadoactividad_idestadoactividad, fecha, hora) VALUES(?, ?, DATE(NOW()), TIME(NOW()))';
            keys = [result.insertId, 8];

            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                else
                    return next(null, { success: true, result: result, message: 'Permiso Taxi y Permiso Taxi Estado creados' });
            });
        }
    });
};

Permisotaxi.update = (Permisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxi SET ? WHERE idpermisotaxi = ? AND created_by = ?';
        keys = [Permisotaxi, Permisotaxi.idpermisotaxi, created_by];
    } else {
        query = 'UPDATE permisotaxi SET ? WHERE idpermisotaxi = ?';
        keys = [Permisotaxi, Permisotaxi.idpermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso actualizad@' });
    });
};

Permisotaxi.remove = (idpermisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM permisotaxi WHERE idpermisotaxi = ? AND created_by = ?';
        keys = [idpermisotaxi, created_by];
    } else {
        query = 'DELETE FROM permisotaxi WHERE idpermisotaxi = ?';
        keys = [idpermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso eliminad@' });
    });
};

Permisotaxi.logicRemove = (idpermisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxi SET baja = 1 WHERE idpermisotaxi = ? AND created_by = ?';
        keys = [idpermisotaxi, created_by];
    } else {
        query = 'UPDATE permisotaxi SET baja = 1 WHERE idpermisotaxi = ?';
        keys = [idpermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso eliminad@' });
    });
};

Permisotaxi.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Permisotaxi;
