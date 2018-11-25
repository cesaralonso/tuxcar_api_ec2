const connection = require('../config/db-connection');

const Taller = {};


Taller.bitacoraIngresosEgresosFromTo = (idTaller, fechaDesde, fechaHasta, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    if (created_by) {
        query = 'SELECT nombre FROM taller WHERE taller.idtaller = ? AND taller.created_by = ? AND (taller.baja IS NULL OR taller.baja = false)';
        keys = [idTaller, created_by];
    } else {
        query = 'SELECT nombre FROM taller WHERE taller.idtaller = ? AND (taller.baja IS NULL OR taller.baja = false)';
        keys = [idTaller];
    }    
    
    connection.query(query, keys, (error, taller) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (taller.affectedRows === 0)
            return next(null, { success: false, result: taller, message: 'Solo es posible encontrar registros propios' });
        else {

            let _taller = '';
            if(taller[0]) {
                _taller = taller[0].nombre;

                query = 'SELECT (SELECT SUM(o.total) as total_orden_ingreso FROM taller LEFT JOIN vehiculotaller as vr on vr.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller =vr.idvehiculotaller WHERE taller.idtaller = ? AND o.total <= o.abonado AND o.adeudo <= 0 AND o.fecha BETWEEN ? AND ? AND (taller.baja IS NULL OR taller.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (vr.baja IS NULL OR vr.baja = false) ORDER BY taller.idtaller) as total_orden_ingreso, taller.nombre as taller, o.idorden, o.fecha as orden_fecha, o.manoObra as orden_manoObra, o.subtotal as orden_totalRefacciones, o.total as orden_total FROM taller LEFT JOIN vehiculotaller as vr on vr.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller =vr.idvehiculotaller WHERE taller.idtaller = ? AND o.total <= o.abonado AND o.adeudo <= 0 AND o.fecha BETWEEN ? AND ? AND (taller.baja IS NULL OR taller.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (vr.baja IS NULL OR vr.baja = false)';
                keys = [idTaller, fechaDesde, fechaHasta, idTaller, fechaDesde, fechaHasta];
            
                connection.query(query, keys, (error, orden) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                    else if (orden.affectedRows === 0)
                        return next(null, { success: false, result: orden, message: 'Solo es posible encontrar registros propios' });
                    else {

                        let total_orden_ingreso = 0;
                        if(orden[0]) {
                            total_orden_ingreso = orden[0].total_orden_ingreso;
                        }

                        if (created_by) {
                            query = 'SELECT (SELECT SUM(ec.total) as total_egresoconcepto_egreso FROM taller LEFT JOIN egresoconcepto as ec on ec.taller_idtaller = taller.idtaller INNER JOIN concepto as c on c.idconcepto = ec.concepto_idconcepto WHERE taller.idtaller = ? AND ec.fecha BETWEEN ? AND ?AND (taller.baja IS NULL OR taller.baja = false) AND (ec.baja IS NULL OR ec.baja = false) AND (c.baja IS NULL OR c.baja = false)) as total_egresoconcepto_egreso, taller.nombre as taller, ec.fecha as egresoconcepto_fecha, ec.total as egresoconcepto_total, c.nombre as egreso_nombre FROM taller LEFT JOIN egresoconcepto as ec on ec.taller_idtaller = taller.idtaller INNER JOIN concepto as c on c.idconcepto = ec.concepto_idconcepto WHERE taller.idtaller = ? AND ec.fecha BETWEEN ? AND ? AND created_by = ? AND (taller.baja IS NULL OR taller.baja = false) AND (ec.baja IS NULL OR ec.baja = false) AND (c.baja IS NULL OR c.baja = false)';
                            keys = [idTaller, fechaDesde, fechaHasta, idTaller, fechaDesde, fechaHasta, created_by];
                        } else {
                            query = 'SELECT (SELECT SUM(ec.total) as total_egresoconcepto_egreso FROM taller LEFT JOIN egresoconcepto as ec on ec.taller_idtaller = taller.idtaller INNER JOIN concepto as c on c.idconcepto = ec.concepto_idconcepto WHERE taller.idtaller = ? AND ec.fecha BETWEEN ? AND ?AND (taller.baja IS NULL OR taller.baja = false) AND (ec.baja IS NULL OR ec.baja = false) AND (c.baja IS NULL OR c.baja = false)) as total_egresoconcepto_egreso, taller.nombre as taller, ec.fecha as egresoconcepto_fecha, ec.total as egresoconcepto_total, c.nombre as egreso_nombre FROM taller LEFT JOIN egresoconcepto as ec on ec.taller_idtaller = taller.idtaller INNER JOIN concepto as c on c.idconcepto = ec.concepto_idconcepto WHERE taller.idtaller = ? AND ec.fecha BETWEEN ? AND ?  AND (taller.baja IS NULL OR taller.baja = false) AND (ec.baja IS NULL OR ec.baja = false) AND (c.baja IS NULL OR c.baja = false)';
                            keys = [idTaller, fechaDesde, fechaHasta, idTaller, fechaDesde, fechaHasta ];
                        }    
                                
                        connection.query(query, keys, (error, egresoconcepto) => {
                            if(error) 
                                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                            else if (egresoconcepto.affectedRows === 0)
                                return next(null, { success: false, result: egresoconcepto, message: 'Solo es posible encontrar registros propios' });
                            else {

                                let total_egresoconcepto_egreso = 0;
                                if(egresoconcepto[0]) {
                                    total_egresoconcepto_egreso = egresoconcepto[0].total_egresoconcepto_egreso;
                                }

                                if (created_by) {
                                    query = 'SELECT (SELECT SUM(r.precioCompra * ohr.cantidad) as total FROM taller INNER JOIN vehiculotaller as vt on vt.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller = vt.idvehiculotaller INNER JOIN orden_has_refaccion as ohr on ohr.orden_idorden = o.idorden INNER JOIN refaccion as r on r.idrefaccion = ohr.refaccion_idrefaccion WHERE taller.idtaller = ?  AND o.fecha BETWEEN ? AND ? AND o.total <= o.abonado AND o.adeudo = 0 AND (taller.baja IS NULL OR taller.baja = false) AND (r.baja IS NULL OR r.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (ohr.baja IS NULL OR ohr.baja = false)) as total_refaccion_egreso, o.idorden as folio, (r.precioCompra * ohr.cantidad) as total_por_refaccion, ohr.created_at as refaccion_orden, taller.nombre as taller, r.nombre as refaccion, r.precioCompra as refaccion_precioCompra, ohr.cantidad as refaccion_cantidad, r.proveedor as refaccion_preveedor FROM taller INNER JOIN vehiculotaller as vt on vt.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller = vt.idvehiculotaller INNER JOIN orden_has_refaccion as ohr on ohr.orden_idorden = o.idorden INNER JOIN refaccion as r on r.idrefaccion = ohr.refaccion_idrefaccion WHERE taller.idtaller = ? AND o.fecha BETWEEN ? AND ? AND created_by = ? AND o.total <= o.abonado AND o.adeudo <= 0 AND (taller.baja IS NULL OR taller.baja = false) AND (r.baja IS NULL OR r.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (ohr.baja IS NULL OR ohr.baja = false)';
                                    keys = [idTaller, fechaDesde, fechaHasta, idTaller, fechaDesde, fechaHasta, created_by];
                                } else {
                                    query = 'SELECT (SELECT SUM(r.precioCompra * ohr.cantidad) as total FROM taller INNER JOIN vehiculotaller as vt on vt.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller = vt.idvehiculotaller INNER JOIN orden_has_refaccion as ohr on ohr.orden_idorden = o.idorden INNER JOIN refaccion as r on r.idrefaccion = ohr.refaccion_idrefaccion WHERE taller.idtaller = ?  AND o.fecha BETWEEN ? AND ? AND o.total <= o.abonado AND o.adeudo = 0 AND (taller.baja IS NULL OR taller.baja = false) AND (r.baja IS NULL OR r.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (ohr.baja IS NULL OR ohr.baja = false)) as total_refaccion_egreso, o.idorden as folio, (r.precioCompra * ohr.cantidad) as total_por_refaccion, ohr.created_at as refaccion_orden, taller.nombre as taller, r.nombre as refaccion, r.precioCompra as refaccion_precioCompra, ohr.cantidad as refaccion_cantidad, r.proveedor as refaccion_preveedor FROM taller INNER JOIN vehiculotaller as vt on vt.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller = vt.idvehiculotaller INNER JOIN orden_has_refaccion as ohr on ohr.orden_idorden = o.idorden INNER JOIN refaccion as r on r.idrefaccion = ohr.refaccion_idrefaccion WHERE taller.idtaller = ?  AND o.fecha BETWEEN ? AND ? AND o.total <= o.abonado AND o.adeudo <= 0 AND (taller.baja IS NULL OR taller.baja = false) AND (r.baja IS NULL OR r.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (ohr.baja IS NULL OR ohr.baja = false)';
                                    keys = [idTaller, fechaDesde, fechaHasta, idTaller, fechaDesde, fechaHasta];
                                }    
                                        
                                connection.query(query, keys, (error, refaccion) => {
                                    if(error) 
                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                                    else if (refaccion.affectedRows === 0)
                                        return next(null, { success: false, result: refaccion, message: 'Solo es posible encontrar registros propios' });
                                    else {

                                        let total_refaccion_egreso = 0;
                                        if(refaccion[0]) {
                                            total_refaccion_egreso = refaccion[0].total_refaccion_egreso;
                                        }

                                        let result = {
                                            'taller': _taller,
                                            'orden': orden,
                                            'egresoconcepto': egresoconcepto,
                                            'refaccion': refaccion,
                                            'total_orden_ingreso': total_orden_ingreso,
                                            'total_egresoconcepto_egreso': total_egresoconcepto_egreso,
                                            'total_refaccion_egreso': total_refaccion_egreso,
                                            'total_ingreso': total_orden_ingreso,
                                            'total_egreso': (total_egresoconcepto_egreso + total_refaccion_egreso),
                                            'ganancia': total_orden_ingreso - (total_egresoconcepto_egreso + total_refaccion_egreso)
                                        };

                                        return next(null, { success: true, result: result, message: 'Bitácora taller cargada' });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro taller' });
            }
        }
    });
};

Taller.bitacoraIngresosEgresos = (idTaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    if (created_by) {
        query = 'SELECT nombre FROM taller WHERE taller.idtaller = ? AND taller.created_by = ? AND (taller.baja IS NULL OR taller.baja = false)';
        keys = [idTaller, created_by];
    } else {
        query = 'SELECT nombre FROM taller WHERE taller.idtaller = ? AND (taller.baja IS NULL OR taller.baja = false)';
        keys = [idTaller];
    }    
    
    connection.query(query, keys, (error, taller) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (taller.affectedRows === 0)
            return next(null, { success: false, result: taller, message: 'Solo es posible encontrar registros propios' });
        else {

            let _taller = '';
            if(taller[0]) {
                _taller = taller[0].nombre;

                query = 'SELECT (SELECT SUM(o.total) as total_orden_ingreso FROM taller LEFT JOIN vehiculotaller as vr on vr.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller =vr.idvehiculotaller WHERE taller.idtaller = ? AND o.total <= o.abonado AND o.adeudo <= 0  AND (taller.baja IS NULL OR taller.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (vr.baja IS NULL OR vr.baja = false) ORDER BY taller.idtaller) as total_orden_ingreso, taller.nombre as taller, o.idorden, o.fecha as orden_fecha, o.manoObra as orden_manoObra, o.subtotal as orden_totalRefacciones, o.total as orden_total FROM taller LEFT JOIN vehiculotaller as vr on vr.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller =vr.idvehiculotaller WHERE taller.idtaller = ? AND o.total <= o.abonado AND o.adeudo <= 0  AND o.fecha >= (DATE_FORMAT(o.fecha, "%Y-%m-01"))  AND (taller.baja IS NULL OR taller.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (vr.baja IS NULL OR vr.baja = false)';
                keys = [idTaller, idTaller];
            
                connection.query(query, keys, (error, orden) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                    else if (orden.affectedRows === 0)
                        return next(null, { success: false, result: orden, message: 'Solo es posible encontrar registros propios' });
                    else {

                        let total_orden_ingreso = 0;
                        if(orden[0]) {
                            total_orden_ingreso = orden[0].total_orden_ingreso;
                        }

                        if (created_by) {
                            query = 'SELECT (SELECT SUM(ec.total) as total_egresoconcepto_egreso FROM taller LEFT JOIN egresoconcepto as ec on ec.taller_idtaller = taller.idtaller INNER JOIN concepto as c on c.idconcepto = ec.concepto_idconcepto WHERE taller.idtaller = ? AND (taller.baja IS NULL OR taller.baja = false) AND (ec.baja IS NULL OR ec.baja = false) AND (c.baja IS NULL OR c.baja = false)) as total_egresoconcepto_egreso, taller.nombre as taller, ec.fecha as egresoconcepto_fecha, ec.total as egresoconcepto_total, c.nombre as egreso_nombre FROM taller LEFT JOIN egresoconcepto as ec on ec.taller_idtaller = taller.idtaller INNER JOIN concepto as c on c.idconcepto = ec.concepto_idconcepto WHERE taller.idtaller = ? AND created_by = ? AND ec.fecha >= (DATE_FORMAT(ec.fecha, "%Y-%m-01")) AND (taller.baja IS NULL OR taller.baja = false) AND (ec.baja IS NULL OR ec.baja = false) AND (c.baja IS NULL OR c.baja = false)';
                            keys = [idTaller, idTaller, created_by];
                        } else {
                            query = 'SELECT (SELECT SUM(ec.total) as total_egresoconcepto_egreso FROM taller LEFT JOIN egresoconcepto as ec on ec.taller_idtaller = taller.idtaller INNER JOIN concepto as c on c.idconcepto = ec.concepto_idconcepto WHERE taller.idtaller = ? AND (taller.baja IS NULL OR taller.baja = false) AND (ec.baja IS NULL OR ec.baja = false) AND (c.baja IS NULL OR c.baja = false)) as total_egresoconcepto_egreso, taller.nombre as taller, ec.fecha as egresoconcepto_fecha, ec.total as egresoconcepto_total, c.nombre as egreso_nombre FROM taller LEFT JOIN egresoconcepto as ec on ec.taller_idtaller = taller.idtaller INNER JOIN concepto as c on c.idconcepto = ec.concepto_idconcepto WHERE taller.idtaller = ? AND ec.fecha >= (DATE_FORMAT(ec.fecha, "%Y-%m-01")) AND (taller.baja IS NULL OR taller.baja = false) AND (ec.baja IS NULL OR ec.baja = false) AND (c.baja IS NULL OR c.baja = false)';
                            keys = [idTaller, idTaller];
                        }    
                                
                        connection.query(query, keys, (error, egresoconcepto) => {
                            if(error) 
                                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                            else if (egresoconcepto.affectedRows === 0)
                                return next(null, { success: false, result: egresoconcepto, message: 'Solo es posible encontrar registros propios' });
                            else {

                                let total_egresoconcepto_egreso = 0;
                                if(egresoconcepto[0]) {
                                    total_egresoconcepto_egreso = egresoconcepto[0].total_egresoconcepto_egreso;
                                }

                                if (created_by) {
                                    query = 'SELECT (SELECT SUM(r.precioCompra * ohr.cantidad) as total FROM taller INNER JOIN vehiculotaller as vt on vt.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller = vt.idvehiculotaller INNER JOIN orden_has_refaccion as ohr on ohr.orden_idorden = o.idorden INNER JOIN refaccion as r on r.idrefaccion = ohr.refaccion_idrefaccion WHERE taller.idtaller = ? AND o.fecha >= (DATE_FORMAT(o.fecha, "%Y-%m-01")) AND o.total <= o.abonado AND o.adeudo = 0 AND (taller.baja IS NULL OR taller.baja = false) AND (r.baja IS NULL OR r.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (ohr.baja IS NULL OR ohr.baja = false)) as total_refaccion_egreso, o.idorden as folio, (r.precioCompra * ohr.cantidad) as total_por_refaccion, ohr.created_at as refaccion_orden, taller.nombre as taller, r.nombre as refaccion, r.precioCompra as refaccion_precioCompra, ohr.cantidad as refaccion_cantidad, r.proveedor as refaccion_preveedor FROM taller INNER JOIN vehiculotaller as vt on vt.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller = vt.idvehiculotaller INNER JOIN orden_has_refaccion as ohr on ohr.orden_idorden = o.idorden INNER JOIN refaccion as r on r.idrefaccion = ohr.refaccion_idrefaccion WHERE taller.idtaller = ?  AND created_by = ? AND o.fecha >= (DATE_FORMAT(o.fecha, "%Y-%m-01")) AND o.total <= o.abonado AND o.adeudo <= 0 AND (taller.baja IS NULL OR taller.baja = false) AND (r.baja IS NULL OR r.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (ohr.baja IS NULL OR ohr.baja = false)';
                                    keys = [idTaller, idTaller, created_by];
                                } else {
                                    query = 'SELECT (SELECT SUM(r.precioCompra * ohr.cantidad) as total FROM taller INNER JOIN vehiculotaller as vt on vt.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller = vt.idvehiculotaller INNER JOIN orden_has_refaccion as ohr on ohr.orden_idorden = o.idorden INNER JOIN refaccion as r on r.idrefaccion = ohr.refaccion_idrefaccion WHERE taller.idtaller = ? AND o.fecha >= (DATE_FORMAT(o.fecha, "%Y-%m-01")) AND o.total <= o.abonado AND o.adeudo = 0 AND (taller.baja IS NULL OR taller.baja = false) AND (r.baja IS NULL OR r.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (ohr.baja IS NULL OR ohr.baja = false)) as total_refaccion_egreso, o.idorden as folio, (r.precioCompra * ohr.cantidad) as total_por_refaccion, ohr.created_at as refaccion_orden, taller.nombre as taller, r.nombre as refaccion, r.precioCompra as refaccion_precioCompra, ohr.cantidad as refaccion_cantidad, r.proveedor as refaccion_preveedor FROM taller INNER JOIN vehiculotaller as vt on vt.taller_idtaller = taller.idtaller INNER JOIN orden as o on o.vehiculotaller_idvehiculotaller = vt.idvehiculotaller INNER JOIN orden_has_refaccion as ohr on ohr.orden_idorden = o.idorden INNER JOIN refaccion as r on r.idrefaccion = ohr.refaccion_idrefaccion WHERE taller.idtaller = ? AND o.fecha >= (DATE_FORMAT(o.fecha, "%Y-%m-01")) AND o.total <= o.abonado AND o.adeudo <= 0 AND (taller.baja IS NULL OR taller.baja = false) AND (r.baja IS NULL OR r.baja = false) AND (o.baja IS NULL OR o.baja = false) AND (ohr.baja IS NULL OR ohr.baja = false)';
                                    keys = [idTaller, idTaller];
                                }    
                                        
                                connection.query(query, keys, (error, refaccion) => {
                                    if(error) 
                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                                    else if (refaccion.affectedRows === 0)
                                        return next(null, { success: false, result: refaccion, message: 'Solo es posible encontrar registros propios' });
                                    else {

                                        let total_refaccion_egreso = 0;
                                        if(refaccion[0]) {
                                            total_refaccion_egreso = refaccion[0].total_refaccion_egreso;
                                        }

                                        let result = {
                                            'taller': _taller,
                                            'orden': orden,
                                            'egresoconcepto': egresoconcepto,
                                            'refaccion': refaccion,
                                            'total_orden_ingreso': total_orden_ingreso,
                                            'total_egresoconcepto_egreso': total_egresoconcepto_egreso,
                                            'total_refaccion_egreso': total_refaccion_egreso,
                                            'total_ingreso': total_orden_ingreso,
                                            'total_egreso': (total_egresoconcepto_egreso + total_refaccion_egreso),
                                            'ganancia': total_orden_ingreso - (total_egresoconcepto_egreso + total_refaccion_egreso)
                                        };

                                        return next(null, { success: true, result: result, message: 'Bitácora taller cargada' });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro taller' });
            }
        }
    });
};

Taller.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT taller.* FROM taller    WHERE taller.created_by = ? HAVING taller.baja IS NULL OR taller.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT taller.* FROM taller    HAVING taller.baja IS NULL OR taller.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller leíd@' });
    });
};

Taller.findById = (idTaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM taller WHERE idtaller = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idTaller, created_by];
    } else {
        query = 'SELECT * FROM taller WHERE idtaller = ? HAVING baja IS NULL OR baja = false';
        keys = [idTaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller encontrad@' });
    });
};

Taller.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idtaller) AS count FROM taller';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Taller contabilizad@' });
    });
};

Taller.exist = (idTaller, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM taller WHERE idtaller = ?) AS exist';
    keys = [idTaller];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Taller verificad@' });
    });
};

Taller.insert = (Taller, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO taller SET ?';
    keys = [Taller];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Taller cread@' });
    });
};

Taller.update = (Taller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE taller SET ? WHERE idtaller = ? AND created_by = ?';
        keys = [Taller, Taller.idtaller, created_by];
    } else {
        query = 'UPDATE taller SET ? WHERE idtaller = ?';
        keys = [Taller, Taller.idtaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller actualizad@' });
    });
};

Taller.remove = (idtaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM taller WHERE idtaller = ? AND created_by = ?';
        keys = [idtaller, created_by];
    } else {
        query = 'DELETE FROM taller WHERE idtaller = ?';
        keys = [idtaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller eliminad@' });
    });
};

Taller.logicRemove = (idtaller, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE taller SET baja = 1 WHERE idtaller = ? AND created_by = ?';
        keys = [idtaller, created_by];
    } else {
        query = 'UPDATE taller SET baja = 1 WHERE idtaller = ?';
        keys = [idtaller];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Taller eliminad@' });
    });
};

Taller.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Taller;
