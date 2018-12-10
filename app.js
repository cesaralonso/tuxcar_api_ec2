const express = require('express');
const connection = require('./config/db-connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
var CronJob = require('cron').CronJob;
var sockjs  = require('sockjs');
var http    = require('http');
var compression = require('compression');
// const corsConfig = require('./config/cors');

// WebPush
const webpush = require('web-push');
const vapidKeys = {
    "publicKey": "BKDqvtj7FSHmb9yNWrj6MkTMK1KCPCD2N2iSPZfUCF6vB0lM_ms1hPK4EmrVIAblrJtaa02fHN0d2H501C8cF3k",
    "privateKey": "cgT7MIO70HEz0ex5FBK0ezP6AVUIB6rycu9rBVcEDJY"
}
webpush.setVapidDetails(
    'mailto:cesar_alonso_m_g@hotmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);



const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');


//Route importation.
const abono = require('./routes/abonos');
const alerta = require('./routes/alertas');
const area = require('./routes/areas');
const bonificacion = require('./routes/bonificacions');
const chofer = require('./routes/chofers');
const choferestado = require('./routes/choferestados');
const ciudad = require('./routes/ciudads');
const cliente = require('./routes/clientes');
const concepto = require('./routes/conceptos');
const corralon = require('./routes/corralons');
const corte = require('./routes/cortes');
const egresoconcepto = require('./routes/egresoconceptos');
const empleado = require('./routes/empleados');
const empleadotarea = require('./routes/empleadotareas');
const empleadotareaestado = require('./routes/empleadotareaestados');
const estado = require('./routes/estados');
const estadoactividad = require('./routes/estadoactividads');
const estadopago = require('./routes/estadopagos');
const estadoscrum = require('./routes/estadoscrums');
const formula = require('./routes/formulas');
const liquidacion = require('./routes/liquidacions');
const veliz = require('./routes/velizs');
const mantenimiento = require('./routes/mantenimientos');
const orden = require('./routes/ordens');
const ordenestado = require('./routes/ordenestados');
const ordenproducto = require('./routes/ordenproductos');
const ordentarea = require('./routes/ordentareas');
const ordentareaestado = require('./routes/ordentareaestados');
const orden_has_refaccion = require('./routes/orden_has_refaccions');
const pago = require('./routes/pagos');
const pagofianza = require('./routes/pagofianzas');
const pagoliquidacion = require('./routes/pagoliquidacions');
const permisotaxi = require('./routes/permisotaxis');
const persona = require('./routes/personas');
const producto = require('./routes/productos');
const refaccion = require('./routes/refaccions');
const registradora = require('./routes/registradoras');
const salidastock = require('./routes/salidastocks');
const sexo = require('./routes/sexos');
const si_modulo = require('./routes/si_modulos');
const si_permiso = require('./routes/si_permisos');
const si_rol = require('./routes/si_rols');
const si_user = require('./routes/si_users');
const stock = require('./routes/stocks');
const taller = require('./routes/tallers');
const tarea = require('./routes/tareas');
const tipoprecio = require('./routes/tipoprecios');
const tipoalerta = require('./routes/tipoalertas');
const vehiculo = require('./routes/vehiculos');
const vehiculoestado = require('./routes/vehiculoestados');
const vehiculotaller = require('./routes/vehiculotallers');
const vehiculotalleredo = require('./routes/vehiculotalleredos');
const si_reporte = require('./routes/si_reportes');
const permisotaxiasignado = require('./routes/permisotaxiasignados');
const dashboard = require('./routes/dashboard');
const permisotaxiestado = require('./routes/permisotaxiestados');
// Api WebPush
const api = require('./routes/apis');

// Express Instance
const app = express();


// NUEVO
var pool = mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit : 0,  
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    debug:  false,
    waitTimeOut : 28800,
});

// Middlewares
// gzip
app.use(compression())
app.use(cors({credentials: true, origin: 'http://35.167.255.93:8080'}));
app.use(cors({credentials: true, origin: 'https://tuxcar-pwa.firebaseapp.com'}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// POOL CONECTION
app.use(function (req, res, next) {
    req.mysql = pool;
    next();
});
// Initialize passport
app.use(passport.initialize());

// Call passport Strategy
require('./config/passport')(passport);


// Warehouses
app.use('/abono', abono);
app.use('/alerta', alerta);
app.use('/area', area);
app.use('/bonificacion', bonificacion);
app.use('/chofer', chofer);
app.use('/choferestado', choferestado);
app.use('/ciudad', ciudad);
app.use('/cliente', cliente);
app.use('/concepto', concepto);
app.use('/corralon', corralon);
app.use('/corte', corte);
app.use('/egresoconcepto', egresoconcepto);
app.use('/empleado', empleado);
app.use('/empleadotarea', empleadotarea);
app.use('/empleadotareaestado', empleadotareaestado);
app.use('/estado', estado);
app.use('/estadoactividad', estadoactividad);
app.use('/estadopago', estadopago);
app.use('/estadoscrum', estadoscrum);
app.use('/formula', formula);
app.use('/liquidacion', liquidacion);
app.use('/veliz', veliz);
app.use('/mantenimiento', mantenimiento);
app.use('/orden', orden);
app.use('/ordenestado', ordenestado);
app.use('/ordenproducto', ordenproducto);
app.use('/ordentarea', ordentarea);
app.use('/ordentareaestado', ordentareaestado);
app.use('/orden_has_refaccion', orden_has_refaccion);
app.use('/pago', pago);
app.use('/pagofianza', pagofianza);
app.use('/pagoliquidacion', pagoliquidacion);
app.use('/permisotaxi', permisotaxi);
app.use('/persona', persona);
app.use('/producto', producto);
app.use('/refaccion', refaccion);
app.use('/registradora', registradora);
app.use('/salidastock', salidastock);
app.use('/sexo', sexo);
app.use('/si_modulo', si_modulo);
app.use('/si_permiso', si_permiso);
app.use('/si_rol', si_rol);
app.use('/si_user', si_user);
app.use('/stock', stock);
app.use('/taller', taller);
app.use('/tarea', tarea);
app.use('/tipoprecio', tipoprecio);
app.use('/tipoalerta', tipoalerta);
app.use('/vehiculo', vehiculo);
app.use('/vehiculoestado', vehiculoestado);
app.use('/vehiculotaller', vehiculotaller);
app.use('/vehiculotalleredo', vehiculotalleredo);
app.use('/si_reporte', si_reporte);
app.use('/permisotaxiasignado', permisotaxiasignado);
app.use('/dashboard', dashboard);
app.use('/permisotaxiestado', permisotaxiestado);
// WebPush
app.use('/api', api);


// WEBSOCKET
var clients = {};

function broadcast(message){
  for (var client in clients){
    clients[client].write(JSON.stringify(message));
  }
}

var sockjs_opts = { 
    sockjs_url: "./sockjs.min.js", 
    disable_cors: true 
};

var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {

    clients[conn.id] = conn;

    conn.on('data', function(message) {
        broadcast(JSON.parse(message));
    });

    conn.on('close', function() {
        delete clients[conn.id];
    });

});

var server = http.createServer(app);

sockjs_echo.installHandlers(server, { prefix:'/echo' });

server.listen(3000, () => {
    console.log(' [*] Listening on 0.0.0.0:3000');
});
