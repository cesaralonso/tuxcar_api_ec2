const connection = require('../config/db-connection');

const Veliz = {};


Veliz.adeudoFromIdchofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT SUM(veliz.saldoactual) AS deudaveliz FROM veliz WHERE veliz.estado_idestado = 9 AND veliz.chofer_idchofer = ? AND veliz.created_by = ? AND veliz.baja IS NULL OR veliz.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT SUM(veliz.saldoactual) AS deudaveliz FROM veliz WHERE veliz.estado_idestado = 9 AND veliz.chofer_idchofer = ? AND veliz.baja IS NULL OR veliz.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el monto adeudado de velizes' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else {

            let deudaveliz = 0;
            if (result[0].deudaveliz !== null) {
                deudaveliz = result[0].deudaveliz;
            }
            result[0].deudaveliz = deudaveliz;

            return next(null, { success: true, result: result, message: 'Monto Adeudado de Velizes encontrados' });

        }
    });
};

Veliz.velizFromIdchoferFecha = (idChofer, fecha, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    const newFecha = fecha.split('_');
    fecha = newFecha[0] + "-" + newFecha[1] + "-" + newFecha[2];

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT veliz.* FROM veliz WHERE veliz.chofer_idchofer = ? AND veliz.estado_idestado = 9 AND veliz.fecha = ? AND veliz.created_by = ? HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [idChofer, fecha, created_by];
    } else {
        query = 'SELECT veliz.* FROM veliz WHERE  veliz.chofer_idchofer = ? AND veliz.estado_idestado = 9 AND veliz.fecha = ? HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [idChofer, fecha];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz encontrad@' });
    });
};

Veliz.reporte = (connection, next) => {
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
                            query = 'SELECT * FROM veliz AS l WHERE l.fecha = ? AND l.permisotaxiasignado_idpermisotaxiasignado = ? HAVING l.baja IS NULL OR l.baja = false';
                            keys = [date, permisotaxiasignado.idpermisotaxiasignado];
                            
                            connection.query(query, keys, (error, veliz) => {
                                if(error) 
                                    console.log("Un error ha ocurrido mientras se encontraba la liquidación");
                                else  {
                                    if (veliz.length) {
                                        if (veliz[0].estado_idestado !== null) {
                                            arr_dias_choferes[date][i] = new Array(permisotaxiasignado.idpermisotaxiasignado, veliz[0].estado_idestado);
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

Veliz.adeudandoFromIdchofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT veliz.*, pt.numero, _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN permisotaxiasignado AS pta ON pta.idpermisotaxiasignado = veliz.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi AS pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi  WHERE veliz.estado_idestado = 9 AND veliz.chofer_idchofer = ? AND veliz.created_by = ? HAVING veliz.baja IS NULL OR veliz.baja = false ORDER BY veliz.fecha';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT veliz.*, pt.numero, _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN permisotaxiasignado AS pta ON pta.idpermisotaxiasignado = veliz.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi AS pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE veliz.estado_idestado = 9 AND veliz.chofer_idchofer = ? HAVING veliz.baja IS NULL OR veliz.baja = false ORDER BY veliz.fecha';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz encontrad@' });
    });
};

Veliz.findByIdChofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT veliz.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = veliz.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE veliz.chofer_idchofer = ? AND veliz.created_by = ? HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT veliz.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = veliz.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE veliz.chofer_idchofer = ? HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz encontrad@' });
    });
};
Veliz.findByIdEstado = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT veliz.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = veliz.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE veliz.estado_idestado = ? AND veliz.created_by = ? HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT veliz.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = veliz.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE veliz.estado_idestado = ? HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz encontrad@' });
    });
};


Veliz.findFromTo = (fechaDesde, fechaHasta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT veliz.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = veliz.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer WHERE (veliz.fecha BETWEEN ? AND ?) AND veliz.created_by = ? HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [fechaDesde, fechaHasta, created_by];
    } else {
        query = 'SELECT veliz.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = veliz.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer WHERE (veliz.fecha BETWEEN ? AND ?) HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [fechaDesde, fechaHasta];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz leíd@' });
    });

};


Veliz.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT veliz.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = veliz.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer   WHERE veliz.fecha >= (DATE_FORMAT(veliz.fecha, \"%Y-%m-01\")) AND veliz.created_by = ? HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT veliz.*, _p.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM veliz INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = veliz.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = veliz.estado_idestado INNER JOIN persona as _p on _p.idpersona = _chofer_idchofer.chofer  WHERE veliz.fecha >= (DATE_FORMAT(veliz.fecha, \"%Y-%m-01\")) HAVING veliz.baja IS NULL OR veliz.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz leíd@' });
    });
};

Veliz.findById = (idVeliz, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM veliz WHERE idveliz = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idVeliz, created_by];
    } else {
        query = 'SELECT * FROM veliz WHERE idveliz = ? HAVING baja IS NULL OR baja = false';
        keys = [idVeliz];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz encontrad@' });
    });
};

Veliz.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idveliz) AS count FROM veliz';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Veliz contabilizad@' });
    });
};

Veliz.exist = (idVeliz, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM veliz WHERE idveliz = ?) AS exist';
    keys = [idVeliz];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Veliz verificad@' });
    });
};

Veliz.insertWithIdpermisotaxi = (Veliz, connection, next) => {
    if( !connection )
        return next('Connection refused');

    const veliz = Veliz.veliz;
    const idpermisotaxi = Veliz.idpermisotaxi;
    const idchofer = veliz.chofer_idchofer;
    const element = Veliz.element;
    const fecha = veliz.fecha;
    const hora = veliz.hora;

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

                    const _veliz = {
                        fecha: fecha,
                        saldoanterior: liquidez,
                        saldoactual: liquidez,
                        montopagado: 0,
                        bonificado: 0,
                        h_corte: '00:00:00',
                        permisotaxiasignado_idpermisotaxiasignado: veliz.permisotaxiasignado_idpermisotaxiasignado,
                        chofer_idchofer: veliz.chofer_idchofer,
                        estado_idestado: 9, // ADEUDANDO
                    }

                    query = 'INSERT INTO veliz SET ?';
                    keys = [_veliz];

                    connection.query(query, keys, (error, result) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                        else {

                            // UPDATE A CHOFER DEUDA LIQUIDACIÓN
                            query = 'UPDATE chofer SET deudaveliz = deudaveliz + ? WHERE idchofer = ?';
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

Veliz.insert = (Veliz, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO veliz SET ?';
    keys = [Veliz];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Veliz cread@' });
    });
};

Veliz.update = (Veliz, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE veliz SET ? WHERE idveliz = ? AND created_by = ?';
        keys = [Veliz, Veliz.idveliz, created_by];
    } else {
        query = 'UPDATE veliz SET ? WHERE idveliz = ?';
        keys = [Veliz, Veliz.idveliz];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz actualizad@' });
    });
};

Veliz.remove = (idveliz, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM veliz WHERE idveliz = ? AND created_by = ?';
        keys = [idveliz, created_by];
    } else {
        query = 'DELETE FROM veliz WHERE idveliz = ?';
        keys = [idveliz];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz eliminad@' });
    });
};

Veliz.logicRemove = (idveliz, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE veliz SET baja = 1 WHERE idveliz = ? AND created_by = ?';
        keys = [idveliz, created_by];
    } else {
        query = 'UPDATE veliz SET baja = 1 WHERE idveliz = ?';
        keys = [idveliz];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Veliz eliminad@' });
    });
};

Veliz.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Veliz;
