const connection = require('../config/db-connection');
const Liquidacion = require('./liquidacion');

const Permisotaxiasignado = {};

Permisotaxiasignado.findByIdChofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.chofer_idchofer = ? AND permisotaxiasignado.created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.chofer_idchofer = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idChofer];
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

Permisotaxiasignado.findByIdEstado = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.estado_idestado = ? AND permisotaxiasignado.created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.estado_idestado = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
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

Permisotaxiasignado.findByIdPermisotaxi = (idPermisotaxi, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.permisotaxi_idpermisotaxi = ? AND permisotaxiasignado.created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idPermisotaxi, created_by];
    } else {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.permisotaxi_idpermisotaxi = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
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

Permisotaxiasignado.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT _permisotaxi_idpermisotaxi.vehiculo_idvehiculo as vehiculo_idvehiculo, permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT _permisotaxi_idpermisotaxi.vehiculo_idvehiculo as vehiculo_idvehiculo, permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
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

Permisotaxiasignado.findById = (idPermisotaxiasignado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxiasignado, created_by];
    } else {
        query = 'SELECT * FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxiasignado];
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

Permisotaxiasignado.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpermisotaxiasignado) AS count FROM permisotaxiasignado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permiso contabilizad@' });
    });
};

Permisotaxiasignado.exist = (idPermisotaxiasignado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM permisotaxiasignado WHERE idpermisotaxiasignado = ?) AS exist';
    keys = [idPermisotaxiasignado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permiso verificad@' });
    });
};

Permisotaxiasignado.insert = (Permisotaxiasignado, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO permisotaxiasignado SET ?';
    keys = [Permisotaxiasignado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {

            // OBTENER LISTADO DE FECHAS DESDE FECHA DE ASIGNACIÓN AL DÍA DE HOY CON JAVASCRIPT
            let listDate = [];
            let startDate = Permisotaxiasignado.fecha;
            let endDate = new Date();
            endDate = endDate.toISOString().slice(0,10);
            let dateMove = new Date(startDate);
            let strDate = startDate;
            
            if (strDate === endDate) {
                listDate.push(strDate);
            } else {
                while (strDate < endDate) {
                    strDate = dateMove.toISOString().slice(0,10);
                    if (listDate.indexOf(strDate) < 0) {
                        listDate.push(strDate);
                    }
                    dateMove.setDate(dateMove.getDate()+1);
                };
            }

            result['listDate'] = listDate;
            result['fecha'] = Permisotaxiasignado.fecha;
            result['hora'] = Permisotaxiasignado.hora;


            /*

            Probar con tiempo...

            let element: number = 0;
            let fechasCompletadas = [];
            async.each(listDate, (_fecha, nextIteration) => {


                console.log('fecha', _fecha);
                                            
                const liquidacion = {
                    fecha: _fecha,
                    hora: Permisotaxiasignado.hora,
                    permisotaxiasignado_idpermisotaxiasignado: result.insertId,
                    chofer_idchofer: Permisotaxiasignado.chofer_idchofer,
                };

                ....
                Liquidacion.insertWithIdpermisotaxi(Liquidacion, connection, next);
                ....
                query = 'INSERT INTO liquidacion SET ?';
                keys = [liquidacion];

                connection.query(query, keys, (error, result) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                    else {

                        fechasCompletadas.push(_fecha);
                        nextIteration();

                    }
                });


            }, (err) => {
                // if any of the file processing produced an error, err would equal that error
                if ( err ) {
                    console.log('Failed to process');
                    return next(err);
                } else {
                    return next(null, { success: true, result: fechasCompletadas, message: 'Permiso CREADO' });
                }
            });

            */


            return next(null, { success: true, result: result, message: 'Permiso CREADO' });
            // OTRO MÉTODO CON SQL
            // SELECT DATEDIFF(NOW(), '2018-04-01') AS dias;
            // SELECT DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), '%Y-%m-%d') AS fecha;
            // SET @num = -1; SELECT DATE_ADD(?, INTERVAL @num := @num+1 DAY) AS date_sequence FROM liquidacion HAVING DATE_ADD(?, INTERVAL @num DAY) < NOW();
            // HAVING @num  < DATE_DIFF ('FECH1', 'FECH2')...
        }
    });
};

Permisotaxiasignado.update = (permisotaxiasignado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxiasignado SET ? WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [permisotaxiasignado, permisotaxiasignado.idpermisotaxiasignado, created_by];
    } else {
        query = 'UPDATE permisotaxiasignado SET ? WHERE idpermisotaxiasignado = ?';
        keys = [permisotaxiasignado, permisotaxiasignado.idpermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else {

            // BUSCAR LIQUIDACIÓN PARA TERMINARLA SI EL ESTADO ES 23-SEBAJAACHOFER
            if (permisotaxiasignado.estado_idestado === 23 || // SE BAJA A CHOFER
                permisotaxiasignado.estado_idestado === 15 || // TALLER
                permisotaxiasignado.estado_idestado === 28 || // MANTENIMIENTO
                permisotaxiasignado.estado_idestado === 18 || // CORRALON
                permisotaxiasignado.estado_idestado === 27 // CHOCADO
            ) {

                // SACAR NÚMERO DE DÍA
                connection.query('SELECT WEEKDAY(?) AS dia', [permisotaxiasignado.fecha], (error, resultDay) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro de día' });
                    else {

                        let dia = resultDay[0].dia;
                        // SACAR SI LA FECHA ES UN DÍA DOMINGO
                        let query = '';
                        if (dia === 6) {
                            query = 'SELECT pt.liquidezDom as liquidez, (ROUND(TIME_TO_SEC(TIMEDIFF("23:59:59", ?))/60)) as minutosFaltan, (ROUND(TIME_TO_SEC(TIMEDIFF(?, "00:00:00"))/60)) as minutosPasan FROM permisotaxi as pt WHERE pt.idpermisotaxi = ?';
                        } else {
                            query = 'SELECT pt.liquidez as liquidez, (ROUND(TIME_TO_SEC(TIMEDIFF("23:59:59", ?))/60)) as minutosFaltan, (ROUND(TIME_TO_SEC(TIMEDIFF(?, "00:00:00"))/60)) as minutosPasan FROM permisotaxi as pt WHERE pt.idpermisotaxi = ?';
                        }

                        keys = [permisotaxiasignado.hora, permisotaxiasignado.hora, permisotaxiasignado.permisotaxi_idpermisotaxi];

                        connection.query(query, keys, (error, _liquidez) => {

                            if (_liquidez[0]) {

                                const fecha = permisotaxiasignado.fecha;
                                const idpermisotaxiasignado = permisotaxiasignado.idpermisotaxiasignado;
                                const idchofer = permisotaxiasignado.chofer_idchofer;
                                const liquidez = _liquidez[0].liquidez;
                                const minutosFaltan = _liquidez[0].minutosFaltan;
                                const minutosPasan = _liquidez[0].minutosPasan;

                                // FÓRMULA LIQUIDEZ
                                const saldoCierre = minutosPasan * liquidez / 1440;

                                const _liquidacion = {
                                    saldoanterior: saldoCierre,
                                    saldoactual: saldoCierre
                                };

                                // ACTUALIZAR LA LIQUIDACIÓN
                                query = 'UPDATE liquidacion SET ? WHERE chofer_idchofer = ? AND fecha = ?  AND permisotaxiasignado_idpermisotaxiasignado = ?';
                                keys = [_liquidacion, idchofer, fecha, idpermisotaxiasignado];

                                connection.query(query, keys, (error, result) => {
                                    if(error) 
                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
                                    else {

                                        // ELIMINAR TODAS LAS LIQUIDACIONES DE ESTE CHOFER Y PERMISO A PARTIR DE LA FECHA ENVIADA
                                        query = 'DELETE FROM liquidacion WHERE chofer_idchofer = ? AND fecha > ?  AND permisotaxiasignado_idpermisotaxiasignado = ?';
                                        keys = [idchofer, fecha, idpermisotaxiasignado];
                                        connection.query(query, keys, (error, eliminado) => {
                                            if(error) 
                                                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
                                            else {
                                                
                                                if (eliminado) {

                                                    // UPDATE A MONTO ADEUDADO DE CHOFER
                                                    query = ' SELECT SUM(l.saldoactual) as deuda FROM liquidacion as l WHERE l.chofer_idchofer = ? AND l.estado_idestado = 9 AND (l.baja IS NULL OR l.baja = false)';
                                                    keys = [idchofer];
                                                    connection.query(query, keys, (error, deuda) => {
                                                        if(error) 
                                                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
                                                        else {

                                                            if (deuda[0]) {

                                                                // UPDATE A CHOFER DEUDA LIQUIDACIÓN
                                                                query = 'UPDATE chofer SET deudaliquidacion = ? WHERE idchofer = ?';
                                                                keys = [deuda[0].deuda, idchofer];
                                                                connection.query(query, keys, (error, result) => {
                                                                    if(error) 
                                                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el chofer' });
                                                                    else {
                                                                         return next(null, { success: true, result: deuda, message: 'Permiso dado de baja correctamente, liquidaciones eliminadas.' });
                                                                    }
                                                                });
                                                            } else {

                                                                deuda['fecha'] = permisotaxiasignado.fecha;
                                                                deuda['hora'] = permisotaxiasignado.hora;
                                                                return next(null, { success: true, result: deuda, message: 'Permiso dado de baja correctamente' });
                                                            }
                                                        }
                                                    });
                                                   
                                                } else {
                                                    eliminado['fecha'] = permisotaxiasignado.fecha;
                                                    eliminado['hora'] = permisotaxiasignado.hora;
                                                    return next(null, { success: true, result: eliminado, message: 'Permiso dado de baja correctamente' });
                                                }
                                            }
                                        });

                                    }
                                });
                            } else {
                                return next(null, { success: false, result: _liquidez, message: 'No se encontraro registro de liquidez' });
                            }
                        });
                    }
                });
            } else {
                return next(null, { success: true, result: result, message: 'Permiso actualizado' });
            }
        }
    });
};

Permisotaxiasignado.remove = (idpermisotaxiasignado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [idpermisotaxiasignado, created_by];
    } else {
        query = 'DELETE FROM permisotaxiasignado WHERE idpermisotaxiasignado = ?';
        keys = [idpermisotaxiasignado];
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

Permisotaxiasignado.logicRemove = (idpermisotaxiasignado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxiasignado SET baja = 1 WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [idpermisotaxiasignado, created_by];
    } else {
        query = 'UPDATE permisotaxiasignado SET baja = 1 WHERE idpermisotaxiasignado = ?';
        keys = [idpermisotaxiasignado];
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

Permisotaxiasignado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Permisotaxiasignado;
