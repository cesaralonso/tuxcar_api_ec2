const connection = require('../config/db-connection');

const Liquidacion = {};


Liquidacion.adeudoFromIdchofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT SUM(liquidacion.saldoactual) AS deudaliquidacion FROM liquidacion WHERE liquidacion.estado_idestado = 9 AND liquidacion.chofer_idchofer = ? AND liquidacion.created_by = ? AND liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT SUM(liquidacion.saldoactual) AS deudaliquidacion FROM liquidacion WHERE liquidacion.estado_idestado = 9 AND liquidacion.chofer_idchofer = ? AND liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el monto adeudado de liquidaciones' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else {

            let deudaliquidacion = 0;
            if (result[0].deudaliquidacion !== null) {
                deudaliquidacion = result[0].deudaliquidacion;
            }
            result[0].deudaliquidacion = deudaliquidacion;

            return next(null, { success: true, result: result, message: 'Monto Adeudado de Liquidaciones encontrados' });

        }
    });
};

Liquidacion.liquidacionFromIdchoferFecha = (idChofer, fecha, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    const newFecha = fecha.split('_');
    fecha = newFecha[0] + "-" + newFecha[1] + "-" + newFecha[2];

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.* FROM liquidacion WHERE liquidacion.chofer_idchofer = ? AND liquidacion.estado_idestado = 9 AND liquidacion.fecha = ? AND liquidacion.created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idChofer, fecha, created_by];
    } else {
        query = 'SELECT liquidacion.* FROM liquidacion WHERE  liquidacion.chofer_idchofer = ? AND liquidacion.estado_idestado = 9 AND liquidacion.fecha = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idChofer, fecha];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion encontrad@' });
    });
};

Liquidacion.reporte = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    let now = '';
    let weekday = '';
    let weelastdaykday = '';
    let arr_dias = [];
    let arr_choferes = [];
    let arr_dias_choferes = new Array();

    // SACAR QUE NÚMERO DÍA ES HOY Y LA FECHA
    query = 'SELECT WEEKDAY(NOW()) as weekday, CURDATE() as now, LAST_DAY(NOW()) as lastday, YEAR(NOW()) as year, MONTH(NOW()) as month';
    keys = [];

    connection.query(query, keys, (error, fecha) => {
        if(error) 
            console.log("ERROR Un error ha ocurrido mientras se leía el día de la semana y la fecha");
        else {
            now = fecha[0].now;
            weekday = fecha[0].weekday;
            lastday = fecha[0].lastday;
            lastday = lastday.split('-');
            lastday = lastday[2];
            year = fecha[0].year;
            month = fecha[0].month;

            // SACAR ARREGLO DESDE DIA 1 AL ULTIMO DÍA
            for(let day = 1; day<=lastday; day++) {
                let date = year + '-' + ((month < 10) ? "0" : "") + month + '-' + ((day < 10) ? "0" : "") + day;
                arr_dias.push(date);
            }

            // CREAR ARREGLO DE CHOFERES POR PERMISOS TAXI ASIGNADOS
            query = 'SELECT p.nombre as chofer, pt.numero as permiso, pta.idpermisotaxiasignado, pta.baja FROM permisotaxiasignado as pta INNER JOIN chofer as c ON c.idchofer = pta.chofer_idchofer INNER JOIN persona as p ON p.idpersona = c.chofer INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE pta.estado_idestado = 12 HAVING pta.baja IS NULL OR pta.baja = false';
            keys = [];

            connection.query(query, keys, (error, choferes) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el permisotaxiasignado' });
                else  {

                    choferes.forEach(permisotaxiasignado => {

                        // arr_dias_choferes[permisotaxiasignado.idpermisotaxiasignado] = new Array();
                        arr_dias.forEach(date => {

                            let i = 0;
                            arr_dias_choferes[date][i] = new Array(permisotaxiasignado.idpermisotaxiasignado);

                            // LEER LIQUIDACIONES POR FECHA Y permisotaxiasignado
                            query = 'SELECT * FROM liquidacion AS l WHERE l.fecha = ? AND l.permisotaxiasignado_idpermisotaxiasignado = ? HAVING l.baja IS NULL OR l.baja = false';
                            keys = [date, permisotaxiasignado.idpermisotaxiasignado];
                            
                            connection.query(query, keys, (error, liquidacion) => {
                                if(error) 
                                    console.log("Un error ha ocurrido mientras se encontraba la liquidación");
                                else  {
                                    if (liquidacion.length) {
                                        if (liquidacion[0].estado_idestado !== null) {
                                            arr_dias_choferes[date][i] = new Array(permisotaxiasignado.idpermisotaxiasignado, liquidacion[0].estado_idestado);
                                            i++;
                                        }
                                    }
                                }
                            });
                        });
                    });
                    return next(null, { success: true, result: arr_dias_choferes, message: 'Reporte listo' });
                }    
            });
        }
    });
};

Liquidacion.adeudandoFromIdchofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.*, pt.numero, _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN permisotaxiasignado AS pta ON pta.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi AS pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi  WHERE liquidacion.estado_idestado = 9 AND liquidacion.chofer_idchofer = ? AND liquidacion.created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false ORDER BY liquidacion.fecha';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT liquidacion.*, pt.numero, _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN permisotaxiasignado AS pta ON pta.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi AS pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE liquidacion.estado_idestado = 9 AND liquidacion.chofer_idchofer = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false ORDER BY liquidacion.fecha';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion encontrad@' });
    });
};

Liquidacion.findByIdChofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE liquidacion.chofer_idchofer = ? AND liquidacion.created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT liquidacion.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE liquidacion.chofer_idchofer = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion encontrad@' });
    });
};
Liquidacion.findByIdEstado = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE liquidacion.estado_idestado = ? AND liquidacion.created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT liquidacion.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE liquidacion.estado_idestado = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion encontrad@' });
    });
};


Liquidacion.findFromTo = (fechaDesde, fechaHasta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer WHERE (liquidacion.fecha BETWEEN ? AND ?) AND liquidacion.created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [fechaDesde, fechaHasta, created_by];
    } else {
        query = 'SELECT liquidacion.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer WHERE (liquidacion.fecha BETWEEN ? AND ?) HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [fechaDesde, fechaHasta];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion leíd@' });
    });

};


Liquidacion.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE liquidacion.fecha >= (DATE_FORMAT(liquidacion.fecha, \"%Y-%m-01\")) AND liquidacion.created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT liquidacion.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer  WHERE liquidacion.fecha >= (DATE_FORMAT(liquidacion.fecha, \"%Y-%m-01\")) HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion leíd@' });
    });
};

Liquidacion.findById = (idLiquidacion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM liquidacion WHERE idliquidacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idLiquidacion, created_by];
    } else {
        query = 'SELECT * FROM liquidacion WHERE idliquidacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idLiquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion encontrad@' });
    });
};

Liquidacion.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idliquidacion) AS count FROM liquidacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion contabilizad@' });
    });
};

Liquidacion.exist = (idLiquidacion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM liquidacion WHERE idliquidacion = ?) AS exist';
    keys = [idLiquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion verificad@' });
    });
};

Liquidacion.insertWithIdpermisotaxi = (Liquidacion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    const liquidacion = Liquidacion.liquidacion;
    const idpermisotaxi = Liquidacion.idpermisotaxi;
    const idchofer = liquidacion.chofer_idchofer;
    const element = Liquidacion.element;
    const fecha = liquidacion.fecha;
    const hora = liquidacion.hora;

    // SACAR NÚMERO DE DÍA
    connection.query('SELECT WEEKDAY(?) AS dia', [fecha], (error, resultDay) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else {

            let dia = resultDay[0].dia;
            // SACAR SI LA FECHA ES UN DÍA DOMINGO
            let query = '';
            if (dia === 6) {
                query = `SELECT pt.liquidezDom as liquidez, (ROUND(TIME_TO_SEC(TIMEDIFF("23:59:59", "${hora}"))/60)) as minutosFaltan,  (ROUND(TIME_TO_SEC(TIMEDIFF("${hora}", "00:00:00"))/60)) as minutosPasan  FROM permisotaxi as pt  WHERE pt.idpermisotaxi = ?`;
            } else {
                query = `SELECT pt.liquidez as liquidez,  (ROUND(TIME_TO_SEC(TIMEDIFF("23:59:59", "${hora}"))/60)) as minutosFaltan,  (ROUND(TIME_TO_SEC(TIMEDIFF("${hora}", "00:00:00"))/60)) as minutosPasan  FROM permisotaxi as pt  WHERE pt.idpermisotaxi = ?`;
            }
            keys = [idpermisotaxi];
            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                else if (result.affectedRows === 0)
                    return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
                else {

                    let query = '';
                    let keys = [];
                    
                    // FÓRMULA LIQUIDEZ
                    const liquidezFalta = result[0].minutosFaltan * result[0].liquidez / 1440;
                    const liquidezPasa = result[0].minutosPasan * result[0].liquidez / 1440;

                    // SI ES LA PRIMER FECHA
                    const liquidez = (!element) ? liquidezFalta : result[0].liquidez;

                    const _liquidacion = {
                        fecha: fecha,
                        saldoanterior: liquidez,
                        saldoactual: liquidez,
                        montopagado: 0,
                        bonificado: 0,
                        h_corte: '00:00:00',
                        permisotaxiasignado_idpermisotaxiasignado: liquidacion.permisotaxiasignado_idpermisotaxiasignado,
                        chofer_idchofer: liquidacion.chofer_idchofer,
                        estado_idestado: 9, // ADEUDANDO
                    }

                    query = 'INSERT INTO liquidacion SET ?';
                    keys = [_liquidacion];

                    connection.query(query, keys, (error, result) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                        else {

                            // UPDATE A CHOFER DEUDA LIQUIDACIÓN
                            query = 'UPDATE chofer SET deudaliquidacion = deudaliquidacion + ? WHERE idchofer = ?';
                            keys = [liquidez, idchofer];
                            connection.query(query, keys, (error, result) => {
                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el chofer' });
                                else {
                                    return next(null, { success: true, result: result, message: 'Liquidación a chofer creada para el día ' + fecha });
                                }
                            });

                        }
                    });
                }
            });
        }
    });
};

Liquidacion.insert = (Liquidacion, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO liquidacion SET ?';
    keys = [Liquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion cread@' });
    });
};

Liquidacion.update = (Liquidacion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE liquidacion SET ? WHERE idliquidacion = ? AND created_by = ?';
        keys = [Liquidacion, Liquidacion.idliquidacion, created_by];
    } else {
        query = 'UPDATE liquidacion SET ? WHERE idliquidacion = ?';
        keys = [Liquidacion, Liquidacion.idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion actualizad@' });
    });
};

Liquidacion.remove = (idliquidacion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM liquidacion WHERE idliquidacion = ? AND created_by = ?';
        keys = [idliquidacion, created_by];
    } else {
        query = 'DELETE FROM liquidacion WHERE idliquidacion = ?';
        keys = [idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion eliminad@' });
    });
};

Liquidacion.logicRemove = (idliquidacion, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE liquidacion SET baja = 1 WHERE idliquidacion = ? AND created_by = ?';
        keys = [idliquidacion, created_by];
    } else {
        query = 'UPDATE liquidacion SET baja = 1 WHERE idliquidacion = ?';
        keys = [idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion eliminad@' });
    });
};

Liquidacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Liquidacion;
