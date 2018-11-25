const connection = require('../config/db-connection');

const Dashboard = {};


Dashboard.all = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    query = 'SELECT c.*,p.nombre, pt.numero  FROM chofer as c INNER JOIN persona as p ON p.idpersona = c.chofer INNER JOIN permisotaxiasignado as pta ON pta.chofer_idchofer = c.idchofer INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE c.deudaliquidacion > c.deudafianza GROUP BY c.idchofer HAVING c.baja IS NULL OR c.baja = false';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Dashboard encontrad@' });
    });
};

Dashboard.findByChofer = (idChofer, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    query = 'SELECT c.*,p.nombre  FROM chofer as c INNER JOIN persona as p ON p.idpersona = c.chofer WHERE c.idchofer = ? AND c.deudaliquidacion > c.deudafianza';
    keys = [idChofer];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Dashboard encontrad@' });
    });
};

Dashboard.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Dashboard;
