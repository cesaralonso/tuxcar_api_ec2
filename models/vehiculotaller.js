const connection = require('../config/db-connection');

const Vehiculotaller = {};

Vehiculotaller.goOutVehicle = (Vehiculotaller, connection, next) => {
    if( !connection )
        return next('Connection refused');

    // MODIFICAR VEHICULOREPARANDO PARA ASIGNAR FECHA Y HORA DE SALIDA
    let query = 'UPDATE vehiculotaller SET fechaSalida = DATE(NOW()), horaSalida = TIME(NOW()), estado_idestado = 16 WHERE idvehiculotaller = ?';
    let keys = [Vehiculotaller.idvehiculotaller];

    connection.query(query, keys, (error, resultVehRep) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaban registros' });
        else if (resultVehRep.affectedRows === 0)
            return next(null, { success: false, result: resultVehRep, message: 'Solo es posible actualizar registros propios' });
        else {

            // BUSCAR SI LLEGA enviotaller PARA CALCULAR BONIFICACIÓN SI NO FINALIZA
            if (Vehiculotaller.enviotaller_idenviotaller !== null) {

                // PRIMERO SACAR EL LA RESTA DE HORA_SALIDA MENOS LA HORA_ENTRADA
                let query = 'SELECT TIMEDIFF(horaSalida, horaIngresa) as horas, WEEKDAY(fechaSalida) as dia, DATE(NOW()) as now FROM vehiculotaller WHERE idvehiculotaller = ?';
                let keys = [Vehiculotaller.idvehiculotaller];

                connection.query(query, keys, (error, resultVR) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                    else if (resultVR.affectedRows === 0)
                        return next(null, { success: false, result: resultVR, message: 'Solo es posible leer registros propios' });
                    else {

                        const now = resultVR[0].now;
                        let horasBonificadas = resultVR[0].horas;
                        const hrsSplit = horasBonificadas.split(":");
                        horasBonificadas = +hrsSplit[0] + (+hrsSplit[1] / 60);;

                        const diaBonificar = resultVR[0].dia;

                        // SACAR SI LA FECHA ES UN DÍA LUNES Y SI ESTA ENVIADO DE TALLER PARA APLICAR LA BONIFICACION
                        if (Vehiculotaller.enviotaller_idenviotaller) {

                            let query = '';
                            if (diaBonificar === 6) {
                                query = 'SELECT pt.liquidezDom as liquidez, pta.chofer_idchofer as idchofer, pt.vehiculo_idvehiculo as idvehiculo, pt.idpermisotaxi FROM vehiculotaller as vr LEFT JOIN enviotaller as et ON vr.enviotaller_idenviotaller = et.idenviotaller INNER JOIN permisotaxiasignado as pta ON pta.idpermisotaxiasignado = et.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE vr.idvehiculotaller = ?';
                            } else {
                                query = 'SELECT pt.liquidez as liquidez, pta.chofer_idchofer as idchofer, pt.vehiculo_idvehiculo as idvehiculo, pt.idpermisotaxi FROM vehiculotaller as vr LEFT JOIN enviotaller as et ON vr.enviotaller_idenviotaller = et.idenviotaller INNER JOIN permisotaxiasignado as pta ON pta.idpermisotaxiasignado = et.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE vr.idvehiculotaller = ?';
                            }

                            // SACAR LIQUIDEZ CORRESPONDIENTE DE TABLA PERMISOTAXI SEGÚN permisotaxiasignado
                            let keys = [Vehiculotaller.idvehiculotaller];

                            connection.query(query, keys, (error, resultPermAsig) => {
                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                                else if (resultPermAsig.affectedRows === 0)
                                    return next(null, { success: false, result: resultPermAsig, message: 'Solo es posible leer registros propios' });
                                else {
                                    let liquidez = resultPermAsig[0].liquidez;

                                    // SACAR FÓRMULA LIQUIDEZ / 24 * HORAS
                                    const montoBonificar = ((liquidez / 24) * horasBonificadas);
                                    const idchofer = resultPermAsig[0].idchofer;
                                    const idvehiculo = resultPermAsig[0].idvehiculo;
                                    const idpermisotaxi = resultPermAsig[0].idpermisotaxi;

                                    // CREAR BONIFICACION A CHOFER CON LA FECHA DE SALIDA
                                    let query = "INSERT INTO bonificacion SET cantidad = ?, validado = '0', fecha = DATE(NOW()), estado_idestado = 6, concepto = 'BONIFICACIÓN POR TIEMPO EN TALLER', chofer_idchofer = ?";
                                    let keys = [montoBonificar, idchofer];

                                    connection.query(query, keys, (error, resultBoni) => {
                                        if(error) 
                                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                                        else if (resultBoni.affectedRows === 0)
                                            return next(null, { success: false, result: resultBoni, message: 'Solo es posible leer registros propios' });
                                        else {
                                            return next(null, { success: true, result: {'montoBonificar': montoBonificar, 'idchofer': idchofer, idvehiculo: idvehiculo, idpermisotaxi: idpermisotaxi} , message: 'Vehiculotaller ha salido del taller correctamente, se ha creado una bonificación de: $' + montoBonificar +' para el día: ' + now });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            } else {
                return next(null, { success: true, result: resultVehRep, message: 'El registro se ha actualizado' });
            }
        }
    });
};

Vehiculotaller.findByIdEmpleado = (idEmpleado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " " , _vehiculo_idvehiculo.modelo, " " , _vehiculo_idvehiculo.anio, " " , _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.empleado_idempleado = ? AND vehiculotaller.created_by = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [idEmpleado, created_by];
    } else {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " " , _vehiculo_idvehiculo.modelo, " " , _vehiculo_idvehiculo.anio, " " , _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.empleado_idempleado = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [idEmpleado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller encontrad@' });
    });
};

Vehiculotaller.findByIdEstado = (idEstado, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,   vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " " , _vehiculo_idvehiculo.modelo, " " , _vehiculo_idvehiculo.anio, " " , _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.estado_idestado = ? AND vehiculotaller.created_by = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " " , _vehiculo_idvehiculo.modelo, " " , _vehiculo_idvehiculo.anio, " " , _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.estado_idestado = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller encontrad@' });
    });
};

Vehiculotaller.findByIdTaller = (idTaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " " , _vehiculo_idvehiculo.modelo, " " , _vehiculo_idvehiculo.anio, " " , _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.taller_idtaller = ? AND vehiculotaller.created_by = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [idTaller, created_by];
    } else {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " " , _vehiculo_idvehiculo.modelo, " " , _vehiculo_idvehiculo.anio, " " , _vehiculo_idvehiculo.placa) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.taller_idtaller = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [idTaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller encontrad@' });
    });
};

Vehiculotaller.findByIdVehiculo = (idVehiculo, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller AND (ote.baja IS NULL OR ote.baja = false) ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa ) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.vehiculo_idvehiculo = ? AND vehiculotaller.created_by = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [idVehiculo, created_by];
    } else {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller AND (ote.baja IS NULL OR ote.baja = false) ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa ) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.vehiculo_idvehiculo = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [idVehiculo];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller encontrad@' });
    });
};

Vehiculotaller.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller AND (ote.baja IS NULL OR ote.baja = false) ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa ) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  WHERE vehiculotaller.created_by = ? HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT  (SELECT es.nombre FROM vehiculotaller as ot INNER JOIN vehiculotalleredo as ote on ot.idvehiculotaller = ote.vehiculotaller_idvehiculotaller INNER JOIN estadoscrum as es on es.idestadoscrum = ote.estadoscrum_idestadoscrum WHERE ot.idvehiculotaller = vehiculotaller.idvehiculotaller AND (ote.baja IS NULL OR ote.baja = false) ORDER BY ote.created_at DESC LIMIT 0,1) as estado_estado_idestado,  vehiculotaller.*, _taller_idtaller.nombre as taller_taller_idtaller , CONCAT(_persona.nombre, " ", _persona.apellidoPaterno, " ", _persona.apellidoMaterno ) as empleado_empleado_idempleado , CONCAT(_vehiculo_idvehiculo.marca, " ", _vehiculo_idvehiculo.modelo, " ", _vehiculo_idvehiculo.anio, " ", _vehiculo_idvehiculo.placa ) as vehiculo_vehiculo_idvehiculo FROM vehiculotaller INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculotaller.estado_idestado INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculotaller.taller_idtaller INNER JOIN empleado as _empleado_idempleado ON _empleado_idempleado.idempleado = vehiculotaller.empleado_idempleado INNER JOIN vehiculo as _vehiculo_idvehiculo ON _vehiculo_idvehiculo.idvehiculo = vehiculotaller.vehiculo_idvehiculo INNER JOIN persona as _persona ON _persona.idpersona = _empleado_idempleado.persona_idpersona  HAVING vehiculotaller.baja IS NULL OR vehiculotaller.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller leíd@' });
    });
};

Vehiculotaller.findById = (idVehiculotaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM vehiculotaller WHERE idvehiculotaller = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculotaller, created_by];
    } else {
        query = 'SELECT * FROM vehiculotaller WHERE idvehiculotaller = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller encontrad@' });
    });
};

Vehiculotaller.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idvehiculotaller) AS count FROM vehiculotaller';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller contabilizad@' });
    });
};

Vehiculotaller.exist = (idVehiculotaller, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM vehiculotaller WHERE idvehiculotaller = ?) AS exist';
    keys = [idVehiculotaller];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller verificad@' });
    });
};

Vehiculotaller.insert = (Vehiculotaller, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO vehiculotaller SET ?';
    keys = [Vehiculotaller];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else {
            if (result.affectedRows){

                // AL AGREGAR VEHICULOTALLER TAREA TAMBIÉN AGREGAR UN ESTADO SCRUM 1 POR HACERSE
                const vehiculotalleredo = {
                    'vehiculotaller_idvehiculotaller':  result.insertId,
                    'estadoscrum_idestadoscrum': 1,
                    'fecha': Vehiculotaller.fechaIngresa,
                    'hora': Vehiculotaller.horaIngresa
                };

                query = 'INSERT INTO vehiculotalleredo SET ?';
                keys = [vehiculotalleredo];

                connection.query(query, keys, (error, result) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                    else {

                        // AGREGAR EMPLEADO ENCARGADO DE RECIBIR VEHICULO EN TALLER
                        result['idempleado'] = +Vehiculotaller.empleado_idempleado;
                        result['fecha'] = Vehiculotaller.fechaIngresa;
                        result['hora'] = Vehiculotaller.horaIngresa;
                        return next(null, { success: true, result: result, message: 'Vehiculo Ingresado a Taller' });
                    }
                });
            } else {
                return next(null, { success: false, result: result, message: 'VehiculoTaller no ingresado' });
            }
        }
    });
};

Vehiculotaller.update = (Vehiculotaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculotaller SET ? WHERE idvehiculotaller = ? AND created_by = ?';
        keys = [Vehiculotaller, Vehiculotaller.idvehiculotaller, created_by];
    } else {
        query = 'UPDATE vehiculotaller SET ? WHERE idvehiculotaller = ?';
        keys = [Vehiculotaller, Vehiculotaller.idvehiculotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller actualizad@' });
    });
};

Vehiculotaller.remove = (idvehiculotaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM vehiculotaller WHERE idvehiculotaller = ? AND created_by = ?';
        keys = [idvehiculotaller, created_by];
    } else {
        query = 'DELETE FROM vehiculotaller WHERE idvehiculotaller = ?';
        keys = [idvehiculotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller eliminad@' });
    });
};

Vehiculotaller.logicRemove = (idvehiculotaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculotaller SET baja = 1 WHERE idvehiculotaller = ? AND created_by = ?';
        keys = [idvehiculotaller, created_by];
    } else {
        query = 'UPDATE vehiculotaller SET baja = 1 WHERE idvehiculotaller = ?';
        keys = [idvehiculotaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculotaller eliminad@' });
    });
};

Vehiculotaller.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Vehiculotaller;
