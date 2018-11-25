const connection = require('../config/db-connection');

const Pagoliquidacion = {};


Pagoliquidacion.pagoLiquidaciones = (Pagoliquidaciones, connection, next) => {
    if( !connection )
        return next('Connection refused');

    /* Modelo de referencia de entrada
    Pagoliquidaciones = {
        'pagoliquidacion': number[],
        'totalLiquidacion': number, 
        'idpago': number,
        'idchofer': number,
    };*/

    // Monto total descontable
    let montoLiquidable = +Pagoliquidaciones.totalLiquidacion;

    if (Pagoliquidaciones.pagoliquidacion !== undefined) {

        let array_liquidaciones = [];
        let i = 0;

        // Barrer todas las liquidaciones seleccionadas
        Pagoliquidaciones.pagoliquidacion.forEach(idliquidacion => {

            // VIENE CON UN FORMATO CONCATENADO, EL PRIMER ELELEMTO ES EL idliquidacion
            // idliquidacion = idliquidacion.split(',')[0];

            query = 'SELECT liquidacion.saldoactual, liquidacion.fecha, pt.numero  FROM liquidacion INNER JOIN permisotaxiasignado as pta on pta.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as pt on pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE idliquidacion = ? AND (liquidacion.baja IS NULL OR liquidacion.baja = false)';
            keys = [idliquidacion];

            connection.query(query, keys, (error, liquidacion) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leia el registro liquidación' });
                else {

                    // Deuda actual para esta liquidación
                    const saldoactual = liquidacion[0].saldoactual;
                    const fecha = liquidacion[0].fecha;
                    const numero = liquidacion[0].numero;

                    // Validar si montoLiquidable es mayor a cero para hacer update a tabla liquidacion
                    if (montoLiquidable) {

                        let montoapagar = 0;
                        let saldoadeber = saldoactual;

                        if (montoLiquidable >= saldoactual) {
                            montoapagar = saldoactual;
                            saldoadeber = 0;
                        } else {
                            montoapagar = montoLiquidable;
                            saldoadeber = saldoactual - montoLiquidable;
                        }

                        if (!saldoadeber) {
                            idestado = 8; // Pagado
                        } else { 
                            idestado = 9; // Adeudando
                        }


                        const _liquidaciones = {
                            'estado': ((idestado === 9) ? 'ADEUDANDO' : 'PAGADA'),
                            'saldoadeber': saldoadeber,
                            'montoapagar': montoapagar,
                            'fecha': fecha,
                            'numero': numero
                        }

                        array_liquidaciones.push(_liquidaciones);

                        // Descontar a montoLiquidable
                        montoLiquidable =  montoLiquidable - montoapagar;

                        query = 'UPDATE liquidacion SET montopagado = ?, saldoactual = ?, estado_idestado = ?  WHERE idliquidacion = ?';
                        keys = [montoapagar, saldoadeber, idestado, idliquidacion];

                        connection.query(query, keys, (error, result) => {
                            if(error) 
                                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leia el registro liquidación' });
                            else {

                                // Crear registro en pago liquidacion
                                const pagoliquidacion = {
                                    pago_idpago: Pagoliquidaciones.idpago,
                                    liquidacion_idliquidacion: idliquidacion,
                                    chofer_idchofer: Pagoliquidaciones.idchofer,
                                };
                                
                                query = 'INSERT INTO pagoliquidacion SET ?';
                                keys = [pagoliquidacion];

                                connection.query(query, keys, (error, result) => {
                                    if(error) 
                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro pagoliquidacion' });
                                    else {

                                        i++;

                                        // LLEGA AL FINAL
                                        if (i === Pagoliquidaciones.pagoliquidacion.length) {
                                            return next(null, { success: true, result: array_liquidaciones, message: 'Montos de liquidaciones seleccionadas actualizadas' });
                                        }

                                    }
                                });

                            }
                        });
                    }
                }
            });
        });
              
    } else {
        return next(null, { success: false, result: montoLiquidable, message: 'Si has ingresado una cantidad a liquidar debes seleccionar fechas a liquidar' });
    }
};

Pagoliquidacion.findByIdChofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT e.nombre as estado_estado_idestado, l.fecha as fecha, l.saldoanterior as saldoanterior, l.saldoactual as saldoactual, l.montopagado as montopagado, l.bonificado as bonificado, l.idliquidacion, pagoliquidacion.baja, _pago_idpago.folio as pago_pago_idpago , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  INNER JOIN liquidacion as l on l.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN estado as e on e.idestado = l.estado_idestado WHERE pagoliquidacion.chofer_idchofer = ? AND pagoliquidacion.created_by = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT e.nombre as estado_estado_idestado, l.fecha as fecha, l.saldoanterior as saldoanterior, l.saldoactual as saldoactual, l.montopagado as montopagado, l.bonificado as bonificado, l.idliquidacion, pagoliquidacion.baja, _pago_idpago.folio as pago_pago_idpago , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  INNER JOIN liquidacion as l on l.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN estado as e on e.idestado = l.estado_idestado WHERE pagoliquidacion.chofer_idchofer = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion encontrad@' });
    });
};

Pagoliquidacion.findByIdPago = (idPago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT e.nombre as estado_estado_idestado, l.fecha as fecha, l.saldoanterior as saldoanterior, l.saldoactual as saldoactual, l.montopagado as montopagado, l.bonificado as bonificado, l.idliquidacion, pagoliquidacion.baja, _pago_idpago.folio as pago_pago_idpago , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  INNER JOIN liquidacion as l on l.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN estado as e on e.idestado = l.estado_idestado WHERE pagoliquidacion.pago_idpago = ? AND pagoliquidacion.created_by = ?  HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [idPago, created_by];
    } else {
        query = 'SELECT e.nombre as estado_estado_idestado, l.fecha as fecha, l.saldoanterior as saldoanterior, l.saldoactual as saldoactual, l.montopagado as montopagado, l.bonificado as bonificado, l.idliquidacion, pagoliquidacion.baja, _pago_idpago.folio as pago_pago_idpago , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  INNER JOIN liquidacion as l on l.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN estado as e on e.idestado = l.estado_idestado WHERE pagoliquidacion.pago_idpago = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [idPago];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion encontrad@' });
    });
};

Pagoliquidacion.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT e.nombre as estado_estado_idestado, l.fecha as fecha, l.saldoanterior as saldoanterior, l.saldoactual as saldoactual, l.montopagado as montopagado, l.bonificado as bonificado, l.idliquidacion, pagoliquidacion.baja, _pago_idpago.folio as pago_pago_idpago , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  INNER JOIN liquidacion as l on l.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN estado as e on e.idestado = l.estado_idestado WHERE pagoliquidacion.created_by = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT e.nombre as estado_estado_idestado, l.fecha as fecha, l.saldoanterior as saldoanterior, l.saldoactual as saldoactual, l.montopagado as montopagado, l.bonificado as bonificado, l.idliquidacion, pagoliquidacion.baja, _pago_idpago.folio as pago_pago_idpago , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer INNER JOIN liquidacion as l on l.idliquidacion = pagoliquidacion.liquidacion_idliquidacion INNER JOIN estado as e on e.idestado = l.estado_idestado HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion leíd@' });
    });
};

Pagoliquidacion.findById = (idPagoliquidacion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM pagoliquidacion WHERE idpagoliquidacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPagoliquidacion, created_by];
    } else {
        query = 'SELECT * FROM pagoliquidacion WHERE idpagoliquidacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idPagoliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion encontrad@' });
    });
};

Pagoliquidacion.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpagoliquidacion) AS count FROM pagoliquidacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion contabilizad@' });
    });
};

Pagoliquidacion.exist = (idPagoliquidacion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM pagoliquidacion WHERE idpagoliquidacion = ?) AS exist';
    keys = [idPagoliquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion verificad@' });
    });
};

Pagoliquidacion.insert = (Pagoliquidacion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO pagoliquidacion SET ?';
    keys = [Pagoliquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion cread@' });
    });
};

Pagoliquidacion.update = (Pagoliquidacion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pagoliquidacion SET ? WHERE idpagoliquidacion = ? AND created_by = ?';
        keys = [Pagoliquidacion, Pagoliquidacion.idpagoliquidacion, created_by];
    } else {
        query = 'UPDATE pagoliquidacion SET ? WHERE idpagoliquidacion = ?';
        keys = [Pagoliquidacion, Pagoliquidacion.idpagoliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion actualizad@' });
    });
};

Pagoliquidacion.remove = (idpagoliquidacion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM pagoliquidacion WHERE idpagoliquidacion = ? AND created_by = ?';
        keys = [idpagoliquidacion, created_by];
    } else {
        query = 'DELETE FROM pagoliquidacion WHERE idpagoliquidacion = ?';
        keys = [idpagoliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion eliminad@' });
    });
};

Pagoliquidacion.logicRemove = (idpagoliquidacion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pagoliquidacion SET baja = 1 WHERE idpagoliquidacion = ? AND created_by = ?';
        keys = [idpagoliquidacion, created_by];
    } else {
        query = 'UPDATE pagoliquidacion SET baja = 1 WHERE idpagoliquidacion = ?';
        keys = [idpagoliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion eliminad@' });
    });
};

Pagoliquidacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Pagoliquidacion;
