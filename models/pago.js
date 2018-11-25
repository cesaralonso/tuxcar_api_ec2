const connection = require('../config/db-connection');

const Pago = {};

Pago.findByIdChofer = (idChofer, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.chofer_idchofer = ? AND pago.created_by = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.chofer_idchofer = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago encontrad@' });
    });
};

Pago.findByIdEstado = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.estado_idestado = ? AND pago.created_by = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.estado_idestado = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago encontrad@' });
    });
};

Pago.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.created_by = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago leíd@' });
    });
};

Pago.findById = (idPago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM pago WHERE idpago = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPago, created_by];
    } else {
        query = 'SELECT * FROM pago WHERE idpago = ? HAVING baja IS NULL OR baja = false';
        keys = [idPago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago encontrad@' });
    });
};

Pago.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpago) AS count FROM pago';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pago contabilizad@' });
    });
};

Pago.exist = (idPago, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM pago WHERE idpago = ?) AS exist';
    keys = [idPago];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pago verificad@' });
    });
};

Pago.insert = (Pago, connection, next) => {
    if( !connection )
        return next('Connection refused');

    // VERIFICA KILOMETRAJE
    const pagoKilometraje = +Pago.kilometraje;

    // VERIFICA IDPERMISOTAXIASIGNADO A CHOFER CON ESTADO DE ASIGNADO
    let query = '';
    let keys = [];
    query = 'SELECT pta.idpermisotaxiasignado, pt.vehiculo_idvehiculo FROM permisotaxiasignado as pta INNER JOIN  permisotaxi as pt on pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE pta.chofer_idchofer = ? AND (pta.estado_idestado = 12 OR pta.estado_idestado = 21) AND (pta.baja IS NULL OR pta.baja = false) LIMIT 0,1';
    keys = [Pago.chofer_idchofer];

    connection.query(query, keys, (error, permisotaxiasignado) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leia el registro relación vehículo con estado activo' });
        else {

            if (permisotaxiasignado[0]) {

                const idpermisotaxiasignado = permisotaxiasignado[0].idpermisotaxiasignado;
                const idvehiculo = permisotaxiasignado[0].vehiculo_idvehiculo;

                console.log('idpermisotaxiasignado', idpermisotaxiasignado);

                // BUSCA EN VEHICULOTALLER EL ÚLTIMO REGISTRO CON MOTIVO MANTENIMIENTO PARA ESTE VEHÍCULO
                // COMPARAR EL KILOMETRAJE ENCONTRADO CON EL KILOMETRAJE DEL PAGO INGRESANDO, 
                query = 'SELECT IF((vt.kilometraje + 7000) < ?, "ENVIAR", "NO ENVIAR") as mantenimiento, vt.kilometraje, vt.fechaIngresa FROM vehiculotaller as vt WHERE vt.vehiculo_idvehiculo = ? AND vt.motivo = "MANTENIMIENTO" AND (vt.baja IS NULL OR vt.baja = false) ORDER BY vt.created_at DESC LIMIT 0,1';
                keys = [pagoKilometraje, idvehiculo];

                console.log('pagoKilometraje', pagoKilometraje);
                console.log('idvehiculo', idvehiculo);
                connection.query(query, keys, (error, vehiculotaller) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leia el registro relación vehículo con estado activo' });
                    else {

                        console.log('vehiculotaller', vehiculotaller);
                        if (vehiculotaller[0]) {

                            const kilometraje = vehiculotaller[0].kilometraje;
                            const fechaIngresa = vehiculotaller[0].fechaIngresa;
                            const mantenimiento = vehiculotaller[0].mantenimiento;

                            if (mantenimiento === 'ENVIAR') {

                                // LE CAMBIA  A PERMISOTAXIASIGNADO EL ESTATUS A ACTIVO-ALERTAMANTENIMIENTO
                                query = 'UPDATE permisotaxiasignado SET estado_idestado = 21 WHERE idpermisotaxiasignado = ?';
                                keys = [idpermisotaxiasignado];

                                connection.query(query, keys, (error, result) => {
                                    if(error) 
                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro relación vehículo' });
                                    else {
                                        console.log("El vehículo debe enviarse a mantenimiento");

                                        // CREA PAGO
                                        query = 'INSERT INTO pago SET ?';
                                        keys = [Pago];

                                        connection.query(query, keys, (error, result) => {
                                            if(error) 
                                                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                            else {

                                                // ACTUALIZA KILOMETRAJE EN VEHICULOTALLER
                                                query = 'UPDATE vehiculo SET kilometraje = ? WHERE idvehiculo = ?';
                                                keys = [pagoKilometraje, idvehiculo];

                                                connection.query(query, keys, (error, result) => {
                                                    if(error) 
                                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                                    else
                                                        return next(null, { success: true, result: result, message: 'Ruta creada' });
                                                });

                                            }
                        
                                        });
                                    }
                                });

                            } else {
                                console.log('EL VEHÍCULO AÚN NO DEBE ENVIARSE A MANTENIMIENTO');
                                // CREA PAGO
                                query = 'INSERT INTO pago SET ?';
                                keys = [Pago];

                                connection.query(query, keys, (error, result) => {
                                    if(error) 
                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                    else {
                                        
                                                // ACTUALIZA KILOMETRAJE EN VEHICULOTALLER
                                                query = 'UPDATE vehiculo SET kilometraje = ? WHERE idvehiculo = ?';
                                                keys = [pagoKilometraje, idvehiculo];

                                                connection.query(query, keys, (error, result) => {
                                                    if(error) 
                                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                                    else
                                                        return next(null, { success: true, result: result, message: 'Ruta creada' });
                                                });
                                    }
                                });
                            }

                        } else { 
                            console.log('NO HAY UN MANTENIMIENTO PREVIO DE ESTE VEHÍCULO');
                            // CREA PAGO
                            query = 'INSERT INTO pago SET ?';
                            keys = [Pago];

                            connection.query(query, keys, (error, result) => {
                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                else {

                                                // ACTUALIZA KILOMETRAJE EN VEHICULOTALLER
                                                query = 'UPDATE vehiculo SET kilometraje = ? WHERE idvehiculo = ?';
                                                keys = [pagoKilometraje, idvehiculo];

                                                connection.query(query, keys, (error, result) => {
                                                    if(error) 
                                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                                                    else
                                                        return next(null, { success: true, result: result, message: 'Ruta creada' });
                                                });
                                }
                            });
                        }
                    }
                
                });

            } else {
                console.log("NO HAY PERMISO TAXI ASIGNADO A CHOFER CON ESTADO ACTIVO");
                return next({ success: false, error: error, message: '"NO HAY VEHÍCULO ASIGNADO A CHOFER CON ESTADO ACTIVO"' });
            }
        }
    });

};

Pago.update = (Pago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pago SET ? WHERE idpago = ? AND created_by = ?';
        keys = [Pago, Pago.idpago, created_by];
    } else {
        query = 'UPDATE pago SET ? WHERE idpago = ?';
        keys = [Pago, Pago.idpago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago actualizad@' });
    });
};

Pago.remove = (idpago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM pago WHERE idpago = ? AND created_by = ?';
        keys = [idpago, created_by];
    } else {
        query = 'DELETE FROM pago WHERE idpago = ?';
        keys = [idpago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago eliminad@' });
    });
};

Pago.logicRemove = (idpago, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pago SET baja = 1 WHERE idpago = ? AND created_by = ?';
        keys = [idpago, created_by];
    } else {
        query = 'UPDATE pago SET baja = 1 WHERE idpago = ?';
        keys = [idpago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago eliminad@' });
    });
};

Pago.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Pago;
