-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2018 a las 19:08:11
-- Versión del servidor: 10.1.9-MariaDB
-- Versión de PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vieliquidaciones3001_5_5abfda2dc4b2c`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `abono`
--

CREATE TABLE `abono` (
  `idabono` int(11) NOT NULL COMMENT '0|',
  `orden_idorden` int(11) NOT NULL COMMENT '1|Número de Orden|idorden',
  `adeudoAnterior` float NOT NULL COMMENT '1|Adeudo Anterior',
  `montoPagado` float NOT NULL COMMENT '1|Monto Abonando',
  `adeudoActual` float NOT NULL COMMENT '1|Adeudo Actual',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Abono||fecha.Fecha';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alerta`
--

CREATE TABLE `alerta` (
  `idalerta` int(11) NOT NULL COMMENT '0|',
  `empleado_idempleado` int(11) NOT NULL COMMENT '1|Dirigido a Empleado|**nombre persona.idpersona empleado.persona_idpersona',
  `tipoalerta_idtipoalerta` int(11) NOT NULL COMMENT '1|Tipo de Alerta|nombre',
  `mensaje` varchar(345) NOT NULL COMMENT '1|Mensaje',
  `vista` tinyint(1) DEFAULT NULL COMMENT '1|Vista',
  `leida` tinyint(1) DEFAULT NULL COMMENT '1|Leida',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Alerta||empleado_empleado_idempleado.Empleado,tipoalerta_tipoalerta_idtipoalerta.Tipo de Alerta';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `idarea` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Área||nombre.Nombre';

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`idarea`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'MECANICO', NULL, 1, '2018-03-31 20:57:26', '2018-03-31 20:57:26'),
(2, 'CAJA LIQUIDACIONES', NULL, 1, '2018-03-31 20:57:57', '2018-04-25 04:42:14'),
(47, 'ADMINISTRACIÓN TALLER', NULL, 1, '2018-04-02 19:12:42', '2018-04-02 19:12:42'),
(48, 'CAJA TALLER', NULL, 1, '2018-04-25 04:42:01', '2018-04-25 04:42:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bonificacion`
--

CREATE TABLE `bonificacion` (
  `idbonificacion` int(11) NOT NULL COMMENT '0|',
  `cantidad` float DEFAULT NULL COMMENT '1|Cantidad',
  `validado` tinyint(4) DEFAULT NULL COMMENT '1|Validado',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `concepto` varchar(45) DEFAULT NULL COMMENT '1|Concepto',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Bonificaciones||chofer_chofer_idchofer.Nombre del Chofer,estado_estado_idestado.Estado,concepto.Concepto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chofer`
--

CREATE TABLE `chofer` (
  `idchofer` int(11) NOT NULL COMMENT '0|',
  `licencia` varchar(40) DEFAULT NULL COMMENT '1|Licencia',
  `fianza` int(11) DEFAULT NULL COMMENT '1|Fianza',
  `estado_idestado_fianza` int(3) NOT NULL COMMENT '1|Estado Fianza|nombre',
  `chofer` int(11) NOT NULL COMMENT '1|Chofer|nombre',
  `aval1` int(11) NOT NULL COMMENT '1|Aval 1|nombre',
  `aval2` int(11) NOT NULL COMMENT '1|Aval 2|nombre',
  `aval3` int(11) NOT NULL COMMENT '1|Aval 3|nombre',
  `aval4` int(11) NOT NULL COMMENT '1|Aval 4|nombre',
  `deudafianza` float DEFAULT NULL COMMENT '1|Monto Pagado a Fianza',
  `deudaliquidacion` float DEFAULT NULL COMMENT '1|Deuda Liquidación',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|2|Choferes||persona_chofer.Nombre de Chofer,estado_estado_idestado_fianza.Estado de la Fianza';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `choferestado`
--

CREATE TABLE `choferestado` (
  `idchoferestado` int(11) NOT NULL COMMENT '0|',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|nombre',
  `estadoactividad_idestadoactividad` int(11) NOT NULL COMMENT '1|Estado|nombre',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Chofer Estado||chofer_chofer_idchofer.Chofer,estadoactividad_estadoactividad_idestadoactividad.Estado';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `idciudad` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Ciudad',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Ciudad||';

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`idciudad`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(2, 'GUADALAJARA', NULL, 1, '2018-03-31 20:58:33', '2018-03-31 20:58:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idcliente` int(11) NOT NULL COMMENT '0|',
  `persona_idpersona` int(11) NOT NULL COMMENT '1|Datos Personales|nombre',
  `rfc` varchar(45) DEFAULT NULL COMMENT '1|RFC',
  `razonsocial` varchar(45) DEFAULT NULL COMMENT '1|Razón Social',
  `email` varchar(45) DEFAULT NULL COMMENT '1|Email',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Cliente||persona_persona_idpersona.Cliente,rfc.RFC,razonsocial.Razón Social,email.Email';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concepto`
--

CREATE TABLE `concepto` (
  `idconcepto` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|3|Conceptos||nombre.Concepto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corralon`
--

CREATE TABLE `corralon` (
  `idcorralon` int(11) NOT NULL COMMENT '0|',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha de Ingreso',
  `hora` time DEFAULT NULL COMMENT '1|Hora de Ingreso',
  `fechaSalida` date DEFAULT NULL COMMENT '1|Fecha de Salida',
  `horaSalida` time DEFAULT NULL COMMENT '1|Hora de Salida',
  `infraccionNumero` int(11) DEFAULT NULL COMMENT '1|No. Infracción',
  `corralonNombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre Corralon',
  `motivo` varchar(150) DEFAULT NULL COMMENT '1|Motivo',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `permisotaxi_idpermisotaxi` int(11) NOT NULL COMMENT '1|Permiso|numero',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|5|Corralones||motivo.Motivo,corralonNombre.Corralón,fecha.Fecha de Ingreso';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corte`
--

CREATE TABLE `corte` (
  `idcorte` int(11) NOT NULL COMMENT '0|Id Corte',
  `montoInicial` float NOT NULL COMMENT '1|Monto Inicial',
  `montoFinal` float DEFAULT NULL COMMENT '1|Monto Final',
  `ganancia` float DEFAULT NULL COMMENT '1|Ganancia Sin Iva',
  `inicia_idempleado` int(11) NOT NULL COMMENT '1|Cajero Inicia|**nombre persona.idpersona empleado.persona_idpersona',
  `finaliza_idempleado` int(11) DEFAULT NULL COMMENT '1|Cajero Finaliza|**nombre persona.idpersona empleado.persona_idpersona',
  `fechaInicia` date NOT NULL COMMENT '1|Fecha de Corte Inicial',
  `horaInicia` time NOT NULL COMMENT '1|Hora de Corte Inicial',
  `fechaFInaliza` date DEFAULT NULL COMMENT '1|Fecha de Corte Final',
  `horaFinaliza` time DEFAULT NULL COMMENT '1|Hora de Corte Final',
  `seccion` enum('LIQUIDACIONES','TALLER') CHARACTER SET utf8 NOT NULL DEFAULT 'TALLER' COMMENT '1|Caja Destino',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='1|1|Caja||fechaInicia.Fecha Inicia';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresoconcepto`
--

CREATE TABLE `egresoconcepto` (
  `idegresoconcepto` int(11) NOT NULL COMMENT '0|',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `taller_idtaller` int(11) NOT NULL DEFAULT '0' COMMENT '1|Taller|nombre',
  `concepto_idconcepto` int(11) NOT NULL COMMENT '1|Concepto|nombre',
  `precioSinIva` float DEFAULT NULL COMMENT '1|Precio Sin Iva',
  `precioConIva` float DEFAULT NULL COMMENT '1|Precio Con Iva',
  `cantidad` int(4) DEFAULT NULL COMMENT '1|Cantidad',
  `subtotal` float DEFAULT NULL COMMENT '1|Subtotal',
  `total` float NOT NULL COMMENT '1|Total',
  `empleado_idempleado` int(11) NOT NULL COMMENT '1|Empleado Que Realiza|**nombre persona.idpersona empleado.persona_idpersona',
  `comentarios` varchar(500) DEFAULT NULL COMMENT '1|Comentarios',
  `seccion` enum('LIQUIDACIONES','TALLER') NOT NULL DEFAULT 'TALLER' COMMENT '1|Caja Destino',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|6|Egreso Conceptos||fecha.Fecha,taller_taller_idtaller.Nombre del Taller,concepto_concepto_idconcepto.Concepto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idempleado` int(11) NOT NULL COMMENT '0|',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `area_idarea` int(11) NOT NULL COMMENT '1|Área|nombre',
  `persona_idpersona` int(11) NOT NULL COMMENT '1|Datos Personales|nombre',
  `idlector` varchar(16) DEFAULT NULL COMMENT '1|ID de Lector',
  `fechaIngreso` date NOT NULL COMMENT '1|Fecha de Ingreso',
  `eficiencia` float DEFAULT NULL COMMENT '1|Eficiencia 0-5',
  `si_user_idsi_user` int(4) NOT NULL COMMENT '1|Usuario del Sistema|email',
  `horaEntrada` time NOT NULL COMMENT '1|Hora de Entrada a Laborar',
  `horaSalida` time NOT NULL COMMENT '1|Hora de Salida de Laborar',
  `horaComidaInicia` time DEFAULT NULL COMMENT '1|Hora de Inicio de Comida',
  `horaComidaTermina` time DEFAULT NULL COMMENT '1|Hora de Fin de Comida',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Empleado||fechaIngreso.Fecha de Ingreso,persona_persona_idpersona.Empleado,area_area_idarea.Área,taller_taller_idtaller.Nombre de Taller';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleadotarea`
--

CREATE TABLE `empleadotarea` (
  `idempleadotarea` int(11) NOT NULL COMMENT '0|',
  `empleado_idempleado` int(11) NOT NULL COMMENT '1|Empleado|**nombre persona.idpersona empleado.persona_idpersona',
  `ordentarea_idordentarea` int(11) NOT NULL COMMENT '1|Tarea|**nombre tarea.idtarea ordentarea.tarea_idtarea',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Empleado Tarea||empleado_empleado_idempleado.Empleado,ordentarea_ordentarea_idordentarea.Tarea';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleadotareaestado`
--

CREATE TABLE `empleadotareaestado` (
  `idempleadotareaestado` int(11) NOT NULL COMMENT '0|',
  `empleadotarea_idempleadotarea` int(11) NOT NULL COMMENT '1|Empleado Tarea|idempleadotarea',
  `estadoscrum_idestadoscrum` int(11) NOT NULL COMMENT '1|Estado de Tarea|nombre',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Empleado Tarea Estado||fecha.Fecha,estado_estado_idestado.Estado,empleadotarea_empleadotarea_idempleadotarea.Especificaciones de Orden Tarea';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idestado` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Estado||nombre.Estado';

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idestado`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'FUERA', NULL, NULL, '2018-01-18 23:45:06', '2018-01-18 23:45:06'),
(5, 'ACTIVO', NULL, 1, '2018-01-17 14:47:18', '2018-01-17 14:47:18'),
(6, 'NOAPLICADA', NULL, 1, '2018-01-17 14:59:01', '2018-01-17 14:59:01'),
(7, 'APLICADA', NULL, 1, '2018-01-17 14:59:07', '2018-01-17 14:59:07'),
(8, 'PAGADA', NULL, 1, '2018-01-17 17:20:05', '2018-01-17 17:20:05'),
(9, 'ADEUDANDO', NULL, 1, '2018-01-17 17:20:11', '2018-01-17 17:20:11'),
(10, 'INACTIVO', NULL, 1, '2018-01-18 10:17:28', '2018-01-18 10:17:28'),
(11, 'REPARANDO', NULL, 1, '2018-01-18 10:31:58', '2018-01-18 10:31:58'),
(12, 'ASIGNADO', NULL, 1, '2018-01-18 10:56:44', '2018-01-18 10:56:44'),
(13, 'NOASIGNADO', NULL, 1, '2018-01-18 10:56:51', '2018-01-18 10:56:51'),
(14, 'ASIGNADO-REPARANDO', NULL, 1, '2018-01-18 10:58:06', '2018-01-18 10:58:06'),
(15, 'TALLER', NULL, 1, '2018-01-18 11:02:51', '2018-01-18 11:02:51'),
(16, 'REPARADO', NULL, 1, '2018-01-18 11:39:18', '2018-01-18 11:39:18'),
(17, 'ASIGNADO-CORRALÓN', NULL, 1, '2018-01-18 11:54:57', '2018-01-18 11:54:57'),
(18, 'CORRALON', NULL, 1, '2018-01-18 12:00:16', '2018-01-19 00:02:59'),
(19, 'DISPONIBLE', NULL, 1, '2018-01-18 12:01:54', '2018-01-18 12:01:54'),
(20, 'ACTIVO', NULL, 1, '2018-02-13 08:29:32', '2018-02-13 08:29:32'),
(21, 'ASIGNADO - HACER SERVICIO', NULL, 1, '2018-02-14 07:39:16', '2018-04-22 18:52:32'),
(22, 'NODISPONIBLE', NULL, 1, '2018-02-14 07:39:28', '2018-02-14 07:39:49'),
(23, 'SEBAJAACHOFER', NULL, NULL, '2018-02-15 04:12:13', '2018-02-15 04:12:13'),
(24, 'ENVIADOATALLER', NULL, NULL, '2018-02-16 04:57:03', '2018-02-16 04:57:03'),
(25, 'FORANEO', NULL, NULL, '2018-02-24 03:11:25', '2018-02-24 03:11:25'),
(26, 'FLOTILLA', NULL, 1, '2018-04-05 03:48:23', '2018-04-05 03:48:23'),
(27, 'CHOCADO', NULL, 1, '2018-04-06 16:28:32', '2018-04-06 16:28:32'),
(28, 'MANTENIMIENTO', NULL, 1, '2018-04-06 20:14:58', '2018-04-06 20:14:58'),
(29, 'CORRALON FUERA', NULL, 1, '2018-04-07 01:21:38', '2018-04-07 01:21:38'),
(30, 'CHOCADO FUERA', NULL, 1, '2018-04-07 01:21:46', '2018-04-07 01:21:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoactividad`
--

CREATE TABLE `estadoactividad` (
  `idestadoactividad` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Estado Tareas||nombre.Estado';

--
-- Volcado de datos para la tabla `estadoactividad`
--

INSERT INTO `estadoactividad` (`idestadoactividad`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(6, 'ACTIVO', NULL, 1, '2018-04-01 00:08:08', '2018-04-01 00:08:08'),
(7, 'ACTIVO ASIGNADO', NULL, 1, '2018-04-01 00:08:20', '2018-04-01 00:08:20'),
(8, 'DISPONIBLE', NULL, 1, '2018-04-01 00:08:27', '2018-04-01 00:08:27'),
(9, 'TALLER NO DISPONIBLE', NULL, 1, '2018-04-01 00:08:47', '2018-04-01 00:08:47'),
(10, 'CORRALON NO DISPONIBLE', NULL, 1, '2018-04-01 00:09:06', '2018-04-01 00:09:06'),
(11, 'TALLER DISPONIBLE', NULL, 1, '2018-04-01 00:09:16', '2018-04-01 00:09:16'),
(12, 'CORRALON DISPONIBLE', NULL, 1, '2018-04-01 00:09:30', '2018-04-01 00:09:30'),
(13, 'MANTENIMIENTO NO DISPONIBLE', NULL, 1, '2018-04-07 01:23:24', '2018-04-07 01:23:24'),
(14, 'MANTENIMIENTO DISPONIBLE', NULL, 1, '2018-04-07 01:23:37', '2018-04-07 01:23:37'),
(15, 'CHOCADO NO DISPONIBLE', NULL, 1, '2018-04-07 01:23:59', '2018-04-07 01:23:59'),
(16, 'CHOCADO DISPONIBLE', NULL, 1, '2018-04-07 01:24:08', '2018-04-07 01:24:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadopago`
--

CREATE TABLE `estadopago` (
  `idestadopago` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Estado Pago||nombre.Estado';

--
-- Volcado de datos para la tabla `estadopago`
--

INSERT INTO `estadopago` (`idestadopago`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'ADEUDANDO SIN ENTREGAR', NULL, 1, '2018-02-05 08:58:09', '2018-02-06 23:45:44'),
(2, 'PAGADO SIN ENTREGAR', NULL, 1, '2018-02-05 09:16:16', '2018-02-06 23:45:48'),
(3, 'CANCELADA', NULL, 1, '2018-02-05 10:18:38', '2018-02-05 10:18:38'),
(4, 'SIN COSTO', NULL, 1, '2018-02-05 11:05:31', '2018-03-02 02:27:19'),
(5, 'SOBREPAGADO', NULL, 1, '2018-02-05 11:10:02', '2018-02-05 11:10:02'),
(6, 'ADEUDANDO ENTREGADO', NULL, 1, '2018-02-06 23:46:39', '2018-02-06 23:46:39'),
(7, 'PAGADO ENTREGADO', NULL, 1, '2018-02-06 23:46:47', '2018-02-06 23:46:47'),
(8, 'ADEUDANDO FINALIZADO', NULL, 1, '2018-02-06 23:51:26', '2018-02-06 23:51:26'),
(9, 'PAGADO FINALIZADO', NULL, 1, '2018-02-06 23:51:37', '2018-02-06 23:51:37'),
(10, 'REALIZADO SIN ENTREGAR', NULL, 1, '2018-03-02 02:26:11', '2018-03-02 02:26:11'),
(11, 'FINALIZADO', NULL, 1, '2018-03-02 02:26:39', '2018-03-02 02:26:39'),
(12, 'ENTREGADO', NULL, 1, '2018-03-08 00:21:15', '2018-03-08 00:21:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoscrum`
--

CREATE TABLE `estadoscrum` (
  `idestadoscrum` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Estado Tareas||nombre.Estado';

--
-- Volcado de datos para la tabla `estadoscrum`
--

INSERT INTO `estadoscrum` (`idestadoscrum`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'POR HACERSE', NULL, 1, '2018-03-01 20:05:10', '2018-03-01 20:05:10'),
(2, 'TRABAJANDO', NULL, 1, '2018-03-01 20:05:18', '2018-03-01 20:05:18'),
(3, 'HECHA', NULL, 1, '2018-03-01 20:05:25', '2018-03-01 20:05:25'),
(4, 'FINALIZADA', NULL, 1, '2018-03-07 15:04:52', '2018-03-07 15:04:52'),
(5, 'CANCELADA', NULL, 1, '2018-03-07 15:04:57', '2018-03-07 15:04:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formula`
--

CREATE TABLE `formula` (
  `idformula` int(11) NOT NULL COMMENT '0|',
  `formula` varchar(145) NOT NULL COMMENT '1|Fórmula',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Fórmula||formula.Fórmula';

--
-- Volcado de datos para la tabla `formula`
--

INSERT INTO `formula` (`idformula`, `formula`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'NINGUNA', NULL, 1, '2018-02-06 16:02:43', '2018-03-24 01:22:55'),
(2, 'ANCHO POR ALTO POR PRECIO', 1, 1, '2018-02-06 20:36:42', '2018-04-05 04:21:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liquidacion`
--

CREATE TABLE `liquidacion` (
  `idliquidacion` int(11) NOT NULL COMMENT '0|',
  `permisotaxiasignado_idpermisotaxiasignado` int(11) NOT NULL COMMENT '1|Permiso Chofer|idpermisotaxiasignado',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `saldoanterior` float DEFAULT NULL COMMENT '1|Saldo Anterior',
  `saldoactual` float NOT NULL COMMENT '1|Saldo Actual',
  `montopagado` float NOT NULL COMMENT '1|Monto Pagado',
  `bonificado` float DEFAULT NULL COMMENT '1|Cantidad Bonificada',
  `h_corte` time NOT NULL COMMENT '1|Hora de Corte',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|nombre',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Liquidaciones||chofer_chofer_idchofer.Chofer,estado_estado_idestado.Estado,fecha.Fecha';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento`
--

CREATE TABLE `mantenimiento` (
  `idmantenimiento` varchar(25) NOT NULL COMMENT '1|Mantenimiento',
  `kminicial` int(11) DEFAULT NULL COMMENT '1|Kilometraje Inicial',
  `kmfinal` int(11) DEFAULT NULL COMMENT '1|Kilometraje Final',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|20|Mantenimientos||';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `idorden` int(11) NOT NULL COMMENT '0|',
  `cliente_idcliente` int(11) NOT NULL COMMENT '1|Cliente|**nombre persona.idpersona cliente.persona_idpersona',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `fechaEntregaEstimada` date DEFAULT NULL COMMENT '1|Fecha Estimada de Entrega',
  `horaEntregaEstimada` time DEFAULT NULL COMMENT '1|Hora Estimada de Entrega',
  `fechaEntregaReal` date DEFAULT NULL COMMENT '1|Fecha Real de Entrega',
  `horaEntregaReal` time DEFAULT NULL COMMENT '1|Hora Real de Entrega',
  `fechaInicioEstimada` date DEFAULT NULL COMMENT '1|Fecha Estimada de Inicio',
  `horaInicioEstimada` time DEFAULT NULL COMMENT '1|Hora Estimada de Inicio',
  `manoObra` int(11) DEFAULT NULL COMMENT '1|Mano de Obra',
  `subtotal` float NOT NULL DEFAULT '0' COMMENT '1|Subtotal',
  `total` float NOT NULL DEFAULT '0' COMMENT '1|Total',
  `cubierto` float DEFAULT NULL COMMENT '1|Monto Cubierto',
  `abonado` float DEFAULT NULL COMMENT '1|Monto Abonado',
  `adeudo` float DEFAULT NULL COMMENT '1|Monto Adeudado',
  `factura` tinyint(1) DEFAULT NULL COMMENT '1|Factura',
  `vehiculotaller_idvehiculotaller` int(11) NOT NULL COMMENT '1|Vehículo Reparando|motivo',
  `comentarios` varchar(355) DEFAULT NULL COMMENT '1|Comentarios',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Orden|ordenproducto.orden_idorden.producto_idproducto.producto.idproducto.nombre.Producto,orden_has_refaccion.orden_idorden.refaccion_idrefaccion.refaccion.idrefaccion.nombre.Refacciones|fecha.Fecha,fechaEntregaEstimada.Fecha Estimada de Entrega,fechaEntregaReal.Fecha Real de Entrega,fechaInicioEstimada.Fecha de Inicio Estimada,cliente_cliente_idcliente.Cliente,vehiculotaller_vehiculotaller_idvehiculotaller.Motivo de Reparación';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenestado`
--

CREATE TABLE `ordenestado` (
  `idordenestado` int(11) NOT NULL COMMENT '0|',
  `orden_idorden` int(11) NOT NULL COMMENT '1|Número de Orden|idorden',
  `estadopago_idestadopago` int(11) NOT NULL COMMENT '1|Estado|nombre',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Orden Estado||fecha.Fecha,estadopago_estadopago_idestadopago.Estado';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenproducto`
--

CREATE TABLE `ordenproducto` (
  `idordenproducto` int(11) NOT NULL COMMENT '0|',
  `orden_idorden` int(11) NOT NULL COMMENT '1|Número de Orden|idorden',
  `producto_idproducto` int(11) NOT NULL COMMENT '1|Producto|nombre',
  `cantidad` int(4) DEFAULT NULL COMMENT '1|Cantidad Unidades',
  `ancho` float DEFAULT NULL COMMENT '1|Ancho en Metros',
  `alto` float DEFAULT NULL COMMENT '1|Alto en Metros',
  `tipoprecio_idtipoprecio` int(11) NOT NULL COMMENT '1|Precio Para|nombre',
  `precio` float NOT NULL COMMENT '1|Precio',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Orden Producto||tipoPrecio.Precio Para,producto_producto_idproducto.Producto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordentarea`
--

CREATE TABLE `ordentarea` (
  `idordentarea` int(11) NOT NULL COMMENT '0|',
  `tarea_idtarea` int(11) NOT NULL COMMENT '1|Tarea|nombre',
  `ordenproducto_idordenproducto` int(11) NOT NULL COMMENT '1|Orden Producto|**nombre producto.idproducto ordenproducto.producto_idproducto',
  `especificaciones` varchar(245) DEFAULT NULL COMMENT '1|Especificaciones',
  `fechaInicio` date DEFAULT NULL COMMENT '1|Fecha de Inicio',
  `horaInicio` time DEFAULT NULL COMMENT '1|Hora de Inicio',
  `fechaTermina` date DEFAULT NULL COMMENT '1|Fecha de Término',
  `horaTermina` time DEFAULT NULL COMMENT '1|Hora de Término',
  `fechaEstimada` date DEFAULT NULL COMMENT '1|Fecha Estimada de Entrega',
  `horaEstimada` time DEFAULT NULL COMMENT '1|Hora Estimada de Entrega',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Orden Tarea||ordenproducto_ordenproducto_idordenproducto.Producto,especificaciones.Especificaciones,tarea_tarea_idtarea.Tarea';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordentareaestado`
--

CREATE TABLE `ordentareaestado` (
  `idordentareaestado` int(11) NOT NULL COMMENT '0|',
  `ordentarea_idordentarea` int(11) NOT NULL COMMENT '1|Tarea|**nombre tarea.idtarea ordentarea.tarea_idtarea',
  `estadoscrum_idestadoscrum` int(11) NOT NULL COMMENT '1|Estado de Tarea|nombre',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Orden Tarea Estado||fecha.Fecha,estado_estado_idestado.Estado,ordentarea_ordentarea_idordentarea.Tarea';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_has_refaccion`
--

CREATE TABLE `orden_has_refaccion` (
  `idorden_has_refaccion` int(11) NOT NULL COMMENT '0|Id Orden Refacción',
  `orden_idorden` int(11) NOT NULL COMMENT '1|Orden|idorden',
  `refaccion_idrefaccion` varchar(11) NOT NULL COMMENT '1|Refacción|nombre',
  `cantidad` int(11) DEFAULT NULL COMMENT '1|Cantidad',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Refacciones de ordenes||refaccion_refaccion_idrefaccion.Nombre de Refacción';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `idpago` int(11) NOT NULL COMMENT '0|',
  `cantidadRecibida` int(11) NOT NULL COMMENT '1|Cantidad Recibida',
  `cambio` int(11) NOT NULL COMMENT '1|Cambio',
  `kilometraje` int(11) NOT NULL COMMENT '1|Kilometraje',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `nota` varchar(60) NOT NULL COMMENT '1|Nota',
  `cantPagada` int(11) NOT NULL COMMENT '1|Cantidad Pagada',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `descripcion` varchar(200) DEFAULT NULL COMMENT '1|Descripción',
  `folio` varchar(30) NOT NULL COMMENT '1|Folio Liquidación',
  `liquidacion` float NOT NULL COMMENT '1|Liquidación',
  `foliofianza` varchar(30) DEFAULT NULL COMMENT '1|Folio Fianza',
  `fianza` float DEFAULT NULL COMMENT '1|Fianza',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|10|Pagos||chofer_chofer_idchofer.Chofer,fecha.Fecha,nota.Nota,estado_estado_idestado.Estado';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagofianza`
--

CREATE TABLE `pagofianza` (
  `idpagofianza` int(11) NOT NULL COMMENT '0|',
  `saldoanterior` float DEFAULT NULL COMMENT '1|Saldo Anterior',
  `montopagado` float DEFAULT NULL COMMENT '1|Monto Pagado',
  `saldoactual` float DEFAULT NULL COMMENT '1|Saldo Actual',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Pago de Fianzas||';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagoliquidacion`
--

CREATE TABLE `pagoliquidacion` (
  `idpagoliquidacion` int(11) NOT NULL COMMENT '0|',
  `saldoanterior` float DEFAULT NULL COMMENT '1|Saldo Anterior',
  `montopagado` float DEFAULT NULL COMMENT '1|Monto Pagado',
  `saldoactual` float DEFAULT NULL COMMENT '1|Saldo Actual',
  `pago_idpago` int(11) NOT NULL COMMENT '1|Pago|folio',
  `liquidacion_idliquidacion` int(11) NOT NULL COMMENT '1|Liquidación|fecha',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Pago de Liquidaciones||';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisotaxi`
--

CREATE TABLE `permisotaxi` (
  `idpermisotaxi` int(11) NOT NULL COMMENT '0|',
  `numero` varchar(45) NOT NULL COMMENT '1|Número',
  `fechaAlta` date DEFAULT NULL COMMENT '1|Fecha Alta',
  `vigencia` date DEFAULT NULL COMMENT '1|Vigencia',
  `liquidez` int(11) DEFAULT NULL COMMENT '1|Liquidez',
  `liquidezDom` int(11) DEFAULT NULL COMMENT '1|Liquidez Domingo',
  `propietario` int(11) NOT NULL COMMENT '1|Propietario|nombre',
  `vehiculo_idvehiculo` int(11) NOT NULL COMMENT '1|Vehículo|marca',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|13|Permisos Taxi||numero.Número,persona_propietario.Nombre del Propietario';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisotaxiasignado`
--

CREATE TABLE `permisotaxiasignado` (
  `idpermisotaxiasignado` int(11) NOT NULL COMMENT '0|',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `permisotaxi_idpermisotaxi` int(11) NOT NULL COMMENT '1|Permiso Taxi|numero',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|14|Asignador Vehículo a Chofer||vehiculo_vehiculo_idvehiculo.Placa de Vehiculo,permisotaxi_permisotaxi_idpermisotaxi.Número de Permiso,chofer_chofer_idchofer.Nombre de Chofer,fecha.Fecha,estado_estado_idestado.Estado';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisotaxiestado`
--

CREATE TABLE `permisotaxiestado` (
  `idpermisotaxiestado` int(11) NOT NULL COMMENT '0|',
  `permisotaxi_idpermisotaxi` int(11) NOT NULL COMMENT '1|Permiso|numero',
  `estadoactividad_idestadoactividad` int(11) NOT NULL COMMENT '1|Estado|nombre',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Permiso Taxi Estado';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idpersona` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `apellidoPaterno` varchar(45) NOT NULL COMMENT '1|Apellido Paterno',
  `apellidoMaterno` varchar(45) DEFAULT NULL COMMENT '1|Apellido Materno',
  `emailPersonal` varchar(45) DEFAULT NULL COMMENT '1|Email Personal',
  `telefonoCasa` varchar(45) DEFAULT NULL COMMENT '1|Teléfono de Casa',
  `telefonoOficina` varchar(45) DEFAULT NULL COMMENT '1|Teléfono de Oficina',
  `edad` int(2) DEFAULT NULL COMMENT '1|Edad',
  `sexo_idsexo` int(11) NOT NULL COMMENT '1|Sexo|nombre',
  `ciudad_idciudad` int(11) NOT NULL COMMENT '1|Ciudad|nombre',
  `direccion` varchar(65) NOT NULL COMMENT '1|Dirección',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Persona||nombre.Nombre,apellidoPaterno.Apellido Paterno,apellidoMaterno.Apellido Materno,emailPersonal.Email,telefonoCasa.Teléfono Casa,telefonoOficina.Teléfono Oficina,sexo.Sexo,ciudad.Ciudad';

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idpersona`, `nombre`, `apellidoPaterno`, `apellidoMaterno`, `emailPersonal`, `telefonoCasa`, `telefonoOficina`, `edad`, `sexo_idsexo`, `ciudad_idciudad`, `direccion`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(79, 'César Alonso', 'Gavilanes', 'Magaña', 'cesar_alonso_m_g@hotmail.com', '013411242492', '2435324', 35, 2, 2, 'XXXXXXXXXXXXXXXXX', NULL, 1, '2018-04-01 00:11:55', '2018-04-20 04:48:35'),
(80, 'José', 'Mecanico', 'Mecanico', 'Mecanico@ugugu.com', '34643', '435646', 34, 2, 2, '', NULL, 1, '2018-04-01 00:14:34', '2018-04-01 00:14:34'),
(81, 'Agustín', 'Ramirez', 'Pérez', 'agustin@liquidaciones.com', '56234r6546', '765324234', 45, 2, 2, '', NULL, 1, '2018-04-01 00:16:42', '2018-04-01 00:16:42'),
(82, 'jennifer', 'felix', 'campos', 'na', '6871329708', '3321667063', 22, 3, 2, '', NULL, 1, '2018-04-02 21:27:05', '2018-04-02 21:27:05'),
(83, 'Juan', 'Martinez', 'Magaña', 'juan@liquidaciones.com', '24564325', '324532532', 56, 2, 2, '', NULL, 1, '2018-04-03 17:15:42', '2018-04-03 17:15:42'),
(84, 'TEST DIRECCION', 'TEST DIRECCION', 'TEST DIRECCION', 'TEST DIRECCION', 'TEST DIRECCION', 'TEST DIRECCION', 45, 2, 2, 'TEST DIRECCION', NULL, 1, '2018-04-20 04:35:29', '2018-04-20 04:35:29'),
(85, 'Jennyfer Anahí', 'Felix', 'Campos', 'jenny@na.com', '87628768', '876876876', 12, 3, 2, 'Colón #21342143214', NULL, 1, '2018-04-21 18:34:52', '2018-04-21 18:34:52'),
(86, 'PEDRO', 'ALBERTINI', 'SANCHEZ', 'X', 'X', 'X', 50, 2, 2, 'X', NULL, 1, '2018-04-25 14:01:32', '2018-04-25 14:01:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idproducto` int(11) NOT NULL COMMENT '0|',
  `formula_idformula` int(11) NOT NULL COMMENT '1|Fórmula|formula',
  `nombre` varchar(55) NOT NULL COMMENT '1|Nombre',
  `area_idarea` int(11) NOT NULL COMMENT '1|Área|nombre',
  `duracionEstimada` float DEFAULT NULL COMMENT '1|Duración Estimada en Hrs.',
  `precioPublico` float DEFAULT NULL COMMENT '1|Precio Para Público',
  `precioMayoreo` float DEFAULT NULL COMMENT '1|Precio Para Mayoreo',
  `precioMaquila` float DEFAULT NULL COMMENT '1|Precio Para Maquila',
  `extraPor` varchar(45) DEFAULT NULL COMMENT '1|Costo Extra Por',
  `extraPrecio` float DEFAULT NULL COMMENT '1|Costo Extra',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Producto||nombre.Nombre,extraPor.Costo Extra Por,formula_formula_idformula.Fórmula,area_area_idarea.Área';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refaccion`
--

CREATE TABLE `refaccion` (
  `idrefaccion` varchar(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `precioCompra` int(11) DEFAULT NULL COMMENT '1|Precio Compra',
  `precioVenta` int(11) DEFAULT NULL COMMENT '1|Precio Venta',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `estante` int(11) NOT NULL COMMENT '1|Estante',
  `cantidad` int(11) NOT NULL COMMENT '1|Cantidad',
  `descripcion` varchar(150) DEFAULT NULL COMMENT '1|Descripción',
  `proveedor` varchar(45) NOT NULL COMMENT '1|Proveedor',
  `fecha` date NOT NULL COMMENT '1|Fecha de Compra',
  `tipoPago` enum('CREDITO','DE CONTADO') NOT NULL DEFAULT 'DE CONTADO' COMMENT '1|Tipo de Pago',
  `estadoPago` enum('PAGADA','PENDIENTE') NOT NULL DEFAULT 'PAGADA' COMMENT '1|Estado del Pago',
  `fechaPago` date DEFAULT NULL COMMENT '1|Fecha de Pago',
  `nota` int(9) NOT NULL DEFAULT '0' COMMENT '1|Número de Nota',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|16|Refacciones||nombre.Nombre de Refacción,taller_taller_idtaller.Nombre de Taller';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registradora`
--

CREATE TABLE `registradora` (
  `idregistradora` int(11) NOT NULL COMMENT '0|Id Registradora',
  `montoPagando` float NOT NULL COMMENT '1|Monto Pagando',
  `montoIngresa` float NOT NULL COMMENT '1|Monto Ingresando a Caja',
  `montoEgresa` float NOT NULL COMMENT '1|Monto Egresando a Caja',
  `fecha` date NOT NULL COMMENT '1|Fecha de Corte Inicial',
  `hora` time NOT NULL COMMENT '1|Hora de Corte Inicial',
  `empleado_idempleado` int(11) NOT NULL COMMENT '1|Cajero Realiza|**nombre persona.idpersona empleado.persona_idpersona',
  `destino` enum('LIQUIDACIONES','TALLER') NOT NULL DEFAULT 'TALLER' COMMENT '1|Caja Destino',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='1|1|Registradora';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidastock`
--

CREATE TABLE `salidastock` (
  `idsalidastock` int(11) NOT NULL COMMENT '0|',
  `ordentarea_idordentarea` int(11) NOT NULL COMMENT '1|Tarea de Orden|idordentarea',
  `stock_idstock` int(11) NOT NULL COMMENT '1|Producto en Stock|nombre',
  `cantidad` int(5) NOT NULL COMMENT '1|Cantidad Restada a Stock',
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Salidas de Stock||';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sexo`
--

CREATE TABLE `sexo` (
  `idsexo` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Sexo||';

--
-- Volcado de datos para la tabla `sexo`
--

INSERT INTO `sexo` (`idsexo`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(2, 'MASCULINO', NULL, 1, '2018-02-06 15:59:48', '2018-02-06 15:59:48'),
(3, 'FEMENINO', NULL, 1, '2018-02-28 16:58:38', '2018-02-28 16:58:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_modulo`
--

CREATE TABLE `si_modulo` (
  `idsi_modulo` int(4) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Módulos||nombre.Módulo';

--
-- Volcado de datos para la tabla `si_modulo`
--

INSERT INTO `si_modulo` (`idsi_modulo`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(186, 'permisotaxis/bitacora-pagos', 0, 1, '2018-02-20 01:27:16', '2018-02-20 01:27:16'),
(187, 'change-password', 0, 1, '2018-03-09 21:23:53', '2018-03-09 21:23:53'),
(188, 'dashboard', 0, 1, '2018-03-07 20:47:49', '2018-03-07 20:47:49'),
(189, 'abono', 0, NULL, '2018-04-01 00:58:07', '2018-04-01 00:58:07'),
(190, 'area', 0, NULL, '2018-04-01 00:58:07', '2018-04-01 00:58:07'),
(191, 'bonificacion', 0, NULL, '2018-04-01 00:58:07', '2018-04-01 00:58:07'),
(192, 'chofer', 0, NULL, '2018-04-01 00:58:07', '2018-04-01 00:58:07'),
(193, 'choferestado', 0, NULL, '2018-04-01 00:58:07', '2018-04-01 00:58:07'),
(194, 'ciudad', 0, NULL, '2018-04-01 00:58:08', '2018-04-01 00:58:08'),
(195, 'cliente', 0, NULL, '2018-04-01 00:58:08', '2018-04-01 00:58:08'),
(196, 'concepto', 0, NULL, '2018-04-01 00:58:08', '2018-04-01 00:58:08'),
(197, 'corralon', 0, NULL, '2018-04-01 00:58:08', '2018-04-01 00:58:08'),
(198, 'corte', 0, NULL, '2018-04-01 00:58:08', '2018-04-01 00:58:08'),
(199, 'egresoconcepto', 0, NULL, '2018-04-01 00:58:08', '2018-04-01 00:58:08'),
(200, 'empleado', 0, NULL, '2018-04-01 00:58:08', '2018-04-01 00:58:08'),
(201, 'empleadotarea', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(202, 'empleadotareaestado', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(203, 'estado', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(204, 'estadoactividad', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(205, 'estadopago', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(206, 'estadoscrum', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(207, 'formula', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(208, 'liquidacion', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(209, 'mantenimiento', 0, NULL, '2018-04-01 00:58:09', '2018-04-01 00:58:09'),
(210, 'orden', 0, NULL, '2018-04-01 00:58:10', '2018-04-01 00:58:10'),
(211, 'ordenestado', 0, NULL, '2018-04-01 00:58:10', '2018-04-01 00:58:10'),
(212, 'ordenproducto', 0, NULL, '2018-04-01 00:58:10', '2018-04-01 00:58:10'),
(213, 'ordentarea', 0, NULL, '2018-04-01 00:58:10', '2018-04-01 00:58:10'),
(214, 'ordentareaestado', 0, NULL, '2018-04-01 00:58:10', '2018-04-01 00:58:10'),
(215, 'orden_has_refaccion', 0, NULL, '2018-04-01 00:58:11', '2018-04-01 00:58:11'),
(216, 'pago', 0, NULL, '2018-04-01 00:58:11', '2018-04-01 00:58:11'),
(217, 'pagofianza', 0, NULL, '2018-04-01 00:58:11', '2018-04-01 00:58:11'),
(218, 'pagoliquidacion', 0, NULL, '2018-04-01 00:58:11', '2018-04-01 00:58:11'),
(219, 'permisotaxi', 0, NULL, '2018-04-01 00:58:11', '2018-04-01 00:58:11'),
(220, 'persona', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(221, 'producto', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(222, 'refaccion', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(223, 'registradora', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(224, 'salidastock', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(225, 'sexo', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(226, 'si_modulo', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(227, 'si_permiso', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(228, 'si_rol', 0, NULL, '2018-04-01 00:58:12', '2018-04-01 00:58:12'),
(229, 'si_user', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(230, 'stock', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(231, 'taller', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(232, 'tarea', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(233, 'tipoprecio', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(234, 'vehiculo', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(235, 'vehiculoestado', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(236, 'vehiculotaller', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(237, 'vehiculotalleredo', 0, NULL, '2018-04-01 00:58:13', '2018-04-01 00:58:13'),
(238, 'si_reporte', 0, NULL, '2018-04-01 00:58:14', '2018-04-01 00:58:14'),
(239, 'alerta', 0, 1, '2018-04-02 02:47:08', '2018-04-02 02:47:08'),
(240, 'reporte', 0, 1, '2018-04-02 05:26:33', '2018-04-02 05:26:33'),
(241, 'permisotaxiasignado', 0, 1, '2018-04-02 15:59:35', '2018-04-02 15:59:35'),
(242, 'permisotaxiestado', 0, 1, '2018-04-03 05:50:08', '2018-04-03 05:50:08'),
(243, 'tipoalerta', 0, 1, '2018-04-05 22:43:34', '2018-04-05 22:43:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_permiso`
--

CREATE TABLE `si_permiso` (
  `idsi_permiso` int(4) NOT NULL COMMENT '0|',
  `acceso` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Acceso',
  `si_rol_idsi_rol` int(4) NOT NULL COMMENT '1|Rol|nombre',
  `si_modulo_idsi_modulo` int(4) NOT NULL COMMENT '1|Módulo|nombre',
  `readable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Lectura',
  `writeable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Escritura',
  `updateable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Edición',
  `deleteable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Eliminación',
  `read_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Leer Propios',
  `write_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Escribir Propios',
  `update_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Editar Propios',
  `delete_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Eliminar Propios',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|2|Permisos||si_rol_si_rol_idsi_rol.Rol,si_modulo_si_modulo_idsi_modulo.Módulo';

--
-- Volcado de datos para la tabla `si_permiso`
--

INSERT INTO `si_permiso` (`idsi_permiso`, `acceso`, `si_rol_idsi_rol`, `si_modulo_idsi_modulo`, `readable`, `writeable`, `updateable`, `deleteable`, `read_own`, `write_own`, `update_own`, `delete_own`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(73, 1, 7, 187, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, '2018-04-01 06:04:35', '2018-04-05 22:23:01'),
(74, 1, 7, 239, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, '2018-04-05 22:22:15', '2018-04-05 22:22:15'),
(75, 0, 7, 200, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-05 22:42:20', '2018-04-05 22:42:20'),
(76, 0, 7, 220, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-05 22:42:35', '2018-04-05 22:42:35'),
(77, 0, 7, 243, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-05 22:43:43', '2018-04-05 22:43:43'),
(78, 1, 7, 201, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, '2018-04-05 22:57:22', '2018-04-05 22:57:22'),
(79, 0, 7, 202, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, '2018-04-05 22:57:50', '2018-04-05 22:57:50'),
(80, 0, 7, 204, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-05 22:58:18', '2018-04-05 22:58:18'),
(81, 0, 7, 234, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-05 22:59:09', '2018-04-05 22:59:09'),
(82, 0, 7, 195, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-05 22:59:19', '2018-04-05 22:59:19'),
(83, 0, 7, 213, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-05 23:27:45', '2018-04-05 23:27:45'),
(84, 1, 3, 236, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, '2018-04-10 22:21:36', '2018-04-10 22:21:36'),
(85, 1, 3, 239, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, '2018-04-10 22:22:09', '2018-04-19 17:13:11'),
(86, 1, 3, 188, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-19 17:13:26', '2018-04-19 17:13:26'),
(87, 1, 3, 200, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, '2018-04-19 17:16:09', '2018-04-19 17:16:09'),
(88, 1, 3, 231, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, '2018-04-19 17:17:08', '2018-04-19 17:17:08'),
(89, 1, 3, 234, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, '2018-04-19 17:17:24', '2018-04-21 18:11:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_rol`
--

CREATE TABLE `si_rol` (
  `idsi_rol` int(4) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|3|Roles||nombre.Rol';

--
-- Volcado de datos para la tabla `si_rol`
--

INSERT INTO `si_rol` (`idsi_rol`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'ADMINISTRADOR', 0, NULL, '2018-02-13 01:20:08', '2018-02-13 01:20:08'),
(2, 'LIQUIDACIONES', 0, 1, '2018-02-14 21:34:17', '2018-02-14 21:34:17'),
(3, 'TALLER', 0, 1, '2018-02-14 21:35:03', '2018-02-14 21:35:03'),
(4, 'EMPLEADO', 0, 1, '2018-03-02 11:20:33', '2018-03-02 11:20:33'),
(5, 'CAJA', 0, 1, '2018-03-24 20:52:26', '2018-03-24 20:52:26'),
(6, 'ADMINISTRADOR', 0, NULL, '2018-04-01 00:58:14', '2018-04-01 00:58:14'),
(7, 'MECANICO', 0, 1, '2018-04-01 03:00:15', '2018-04-01 03:00:15'),
(8, 'TEST', 0, 1, '2018-04-19 02:28:18', '2018-04-19 02:28:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_user`
--

CREATE TABLE `si_user` (
  `idsi_user` int(4) NOT NULL COMMENT '0|',
  `usuario` varchar(45) DEFAULT NULL COMMENT '1|Usuario',
  `email` varchar(60) NOT NULL COMMENT '1|Email',
  `password` binary(60) DEFAULT NULL COMMENT '1|Password',
  `si_rol_idsi_rol` int(4) NOT NULL COMMENT '1|Rol|nombre',
  `super` tinyint(1) DEFAULT '0' COMMENT '0|',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|4|Usuarios||usuario.Usuario,email.Email,si_rol_si_rol_idsi_rol.Rol';

--
-- Volcado de datos para la tabla `si_user`
--

INSERT INTO `si_user` (`idsi_user`, `usuario`, `email`, `password`, `si_rol_idsi_rol`, `super`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'SuperUsuario', 'admin@liquidacion1601.com', 0x24326124313024546938682f72706565385575566b4847374e5679392e4a3258756a65574d59424b787141334475337531386a4274366c6b35783432, 1, 1, 0, NULL, '2018-02-06 20:41:47', '2018-04-02 06:22:49'),
(2, 'taller', 'taller@liquidaciones.com', 0x2432612431302465332f5378547755346e514d5749464952665a615575394e43562e5277436a4b4973314f6278564a4b2e6f757a4b50334a79453661, 3, 0, 0, 1, '2018-03-04 08:37:19', '2018-04-19 17:12:33'),
(3, 'Jessy', 'jessy@liquidaciones.com', 0x243261243130246a32764c526144446c684571534e6176684b33516d654253417342426144544c54734944756f2e5848537854466b463066336a6332, 4, 0, 0, 1, '2018-03-04 08:39:06', '2018-03-04 08:39:06'),
(4, 'caja', 'caja@liquidaciones.com', 0x24326124313024426b2e324f586c486e61784248724a54673954783165462e6f4d6e44534c78732f4b794e73774230332f7549354a535a6732633647, 5, 0, 0, 1, '2018-03-24 21:06:47', '2018-03-24 21:06:47'),
(5, 'SuperUsuario', 'admin@vie-liquidaciones 3001_5.com', 0x243261243130246362766c3943474b4d525146327a564a4a577945747549676c4f4651384f5056517951436c4c6d344e50314e386e4d4a6175476b47, 1, 1, 0, NULL, '2018-04-01 00:58:14', '2018-04-01 00:58:14'),
(6, 'mecanico', 'mecanico@liquidaciones.com', 0x2432612431302442486d6336645a6e417833465a76485470796b566275372f47514d6368617a4352613443374e50752f53383632534b4853326d5357, 0, 0, 0, 1, '2018-04-01 03:00:18', '2018-04-01 03:00:18'),
(7, 'Pablo Mecanico 2', 'mecanico2@liquidaciones.com', 0x2432612431302442426a2f7575564c6f5a6b2f775a4463327370446c6539386b316e3266356b6475702f4269364f37762f6a6e6f4d586b654e30444f, 7, 0, 0, 1, '2018-04-05 22:36:10', '2018-04-05 22:36:10'),
(8, 'Mario mecánico 2', 'mecanico1@liquidaciones.com', 0x24326124313024553272355a4651715a794d59634864443539464c484f734a584d454c52545173376670726f434e30676c64542f796f535851555947, 7, 0, 0, 1, '2018-04-05 22:55:33', '2018-04-05 22:55:33'),
(9, 'testxxxxxx', 'test2@x.comxxx', 0x243261243130244344306b50516a5a4b6f366475337745485a6c33734f75747a30684b6b6a364f54557146477962744b562e4f4e302f2f4241673643, 7, 0, 0, 1, '2018-04-19 02:28:21', '2018-04-21 18:04:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE `stock` (
  `idstock` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre del Producto o Material',
  `cantidad` int(5) DEFAULT NULL COMMENT '1|Cantidad en Stock',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Stock||';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller`
--

CREATE TABLE `taller` (
  `idtaller` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `direccion` varchar(80) DEFAULT NULL COMMENT '1|Dirección',
  `telefono` varchar(20) DEFAULT NULL COMMENT '1|Teléfono',
  `descripcion` varchar(80) DEFAULT NULL COMMENT '1|Descripción',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|17|Talleres||nombre.Nombre,direccion.Dirección';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idtarea` int(11) NOT NULL COMMENT '0|',
  `producto_idproducto` int(11) NOT NULL COMMENT '1|Producto|nombre',
  `area_idarea` int(11) NOT NULL COMMENT '1|Área|nombre',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `duracionEstimada` float DEFAULT NULL COMMENT '1|Duración Estimada en Hrs.',
  `costoEstimado` float DEFAULT NULL COMMENT '1|Costo Estimado',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Tarea||nombre.Tarea,area_area_idarea.Área,producto_producto_idproducto.Producto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoalerta`
--

CREATE TABLE `tipoalerta` (
  `idtipoalerta` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(25) NOT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Tipo de Alerta||nombre.Tipo de Alerta';

--
-- Volcado de datos para la tabla `tipoalerta`
--

INSERT INTO `tipoalerta` (`idtipoalerta`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'TAREA', NULL, 1, '2018-04-02 04:46:34', '2018-04-02 04:46:34'),
(2, 'AVISO', NULL, 1, '2018-04-04 17:47:25', '2018-04-04 17:47:25'),
(3, 'TALLER', NULL, 1, '2018-04-06 17:30:14', '2018-04-06 17:30:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoprecio`
--

CREATE TABLE `tipoprecio` (
  `idtipoprecio` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) NOT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Tipo de Precios||';

--
-- Volcado de datos para la tabla `tipoprecio`
--

INSERT INTO `tipoprecio` (`idtipoprecio`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'FLOTILLA', NULL, 1, '2018-02-06 16:34:44', '2018-04-05 04:20:54'),
(2, 'PUBLICO', NULL, NULL, '2018-02-28 18:17:06', '2018-02-28 18:17:06'),
(3, 'MAQUILA', 1, NULL, '2018-02-28 18:17:06', '2018-04-04 06:15:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `idvehiculo` int(11) NOT NULL COMMENT '0|',
  `marca` varchar(20) DEFAULT NULL COMMENT '1|Marca',
  `modelo` varchar(20) DEFAULT NULL COMMENT '1|Modelo',
  `anio` int(11) DEFAULT NULL COMMENT '1|Año',
  `serie` varchar(30) DEFAULT NULL COMMENT '1|Serie',
  `serieMotor` varchar(40) DEFAULT NULL COMMENT '1|Serie Motor',
  `placa` varchar(10) DEFAULT NULL COMMENT '1|Placa',
  `kilometraje` int(11) DEFAULT NULL COMMENT '1|Kilometraje',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `poliza` varchar(15) DEFAULT NULL COMMENT '1|Póliza',
  `polizaTipo` varchar(15) DEFAULT NULL COMMENT '1|Póliza Tipo',
  `color` varchar(20) DEFAULT NULL COMMENT '1|Color',
  `propietario` int(11) NOT NULL COMMENT '1|Propietario|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|18|Vehículos||marca.Marca,modelo.Modelo,placa.Placa,color.Color,persona_propietario.Nombre de Propietario';

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`idvehiculo`, `marca`, `modelo`, `anio`, `serie`, `serieMotor`, `placa`, `kilometraje`, `estado_idestado`, `poliza`, `polizaTipo`, `color`, `propietario`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(15, 'NISSAN', 'KICKS', 2018, '2319837', '845039382508', 'HJS-ACB-DE', 0, 26, 'MAFRE', 'COMPLETA', 'ROJO', 81, NULL, 1, '2018-04-22 19:56:58', '2018-04-22 19:56:58'),
(16, 'RENAULT', 'LOGAN', 2018, '325424', '12434214', '34124214', 2134124, 25, 'X', 'X', 'VERDE', 86, NULL, 1, '2018-04-25 14:01:39', '2018-04-25 14:01:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculoestado`
--

CREATE TABLE `vehiculoestado` (
  `idvehiculoestado` int(11) NOT NULL COMMENT '0|',
  `vehiculo_idvehiculo` int(11) NOT NULL COMMENT '1|Vehículo|placa',
  `estadoactividad_idestadoactividad` int(11) NOT NULL COMMENT '1|Estado|nombre',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculotaller`
--

CREATE TABLE `vehiculotaller` (
  `idvehiculotaller` int(11) NOT NULL COMMENT '0|',
  `fechaIngresa` date DEFAULT NULL COMMENT '1|Fecha Ingreso',
  `horaIngresa` time DEFAULT NULL COMMENT '1|Hora Ingresa',
  `fechaSalida` date DEFAULT NULL COMMENT '1|Fecha Salida',
  `horaSalida` time DEFAULT NULL COMMENT '1|Hora Salida',
  `fechaEstimada` date DEFAULT NULL COMMENT '1|Fecha Estimada de Salida',
  `horaEstimada` time DEFAULT NULL COMMENT '1|Hora Estimada de Salida',
  `inventario` varchar(80) DEFAULT NULL COMMENT '1|Inventario',
  `motivo` varchar(80) DEFAULT NULL COMMENT '1|Motivo',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `empleado_idempleado` int(11) NOT NULL COMMENT '1|Mecánico|**nombre persona.idpersona empleado.persona_idpersona',
  `vehiculo_idvehiculo` int(11) DEFAULT NULL COMMENT '1|Vehículo|placa',
  `kilometraje` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '1|Kilometraje',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|19|Vehículos Reparando||fechaIngresa.Fecha Ingreso,fechaSalida.Fecha Salida,inventario.Inventario,motivo.Motivo de Reparación,empleado_empleado_idempleado.Mecánico,estado_estado_idestado.Estado,vehiculo_vehiculo_idvehiculo.Placa';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculotalleredo`
--

CREATE TABLE `vehiculotalleredo` (
  `idvehiculotalleredo` int(11) NOT NULL COMMENT '0|',
  `vehiculotaller_idvehiculotaller` int(11) NOT NULL COMMENT '1|Vehículo en Taller|idvehiculotaller',
  `estadoscrum_idestadoscrum` int(11) NOT NULL COMMENT '1|Estado|nombre',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Vehiculo en Taller Estados||estadoscrum_estadoscrum_idestadoscrum.Estado';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `abono`
--
ALTER TABLE `abono`
  ADD PRIMARY KEY (`idabono`),
  ADD UNIQUE KEY `idabono_UNIQUE` (`idabono`),
  ADD KEY `fk_abono_orden1_idx` (`orden_idorden`);

--
-- Indices de la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD PRIMARY KEY (`idalerta`),
  ADD UNIQUE KEY `idalerta_UNIQUE` (`idalerta`),
  ADD KEY `fk_alerta_empleado1_idx` (`empleado_idempleado`),
  ADD KEY `fk_alerta_tipoalerta1_idx` (`tipoalerta_idtipoalerta`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`idarea`),
  ADD UNIQUE KEY `idarea_UNIQUE` (`idarea`),
  ADD UNIQUE KEY `unico1` (`nombre`);

--
-- Indices de la tabla `bonificacion`
--
ALTER TABLE `bonificacion`
  ADD PRIMARY KEY (`idbonificacion`),
  ADD KEY `fk_bonificacion_chofer1_idx` (`chofer_idchofer`),
  ADD KEY `fk_bonificacion_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD PRIMARY KEY (`idchofer`),
  ADD KEY `fk_chofer_persona1_idx` (`chofer`),
  ADD KEY `fk_chofer_persona2_idx` (`aval1`),
  ADD KEY `fk_chofer_persona3_idx` (`aval2`),
  ADD KEY `fk_chofer_persona4_idx` (`aval3`),
  ADD KEY `fk_chofer_persona5_idx` (`aval4`),
  ADD KEY `fk_chofer_estado2_idx` (`estado_idestado_fianza`);

--
-- Indices de la tabla `choferestado`
--
ALTER TABLE `choferestado`
  ADD PRIMARY KEY (`idchoferestado`),
  ADD KEY `fk_chofer_has_estadoactividad_estadoactividad1_idx` (`estadoactividad_idestadoactividad`),
  ADD KEY `fk_chofer_has_estadoactividad_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`idciudad`),
  ADD UNIQUE KEY `idciudad_UNIQUE` (`idciudad`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idcliente`),
  ADD UNIQUE KEY `idcliente_UNIQUE` (`idcliente`),
  ADD KEY `fk_cliente_persona1_idx` (`persona_idpersona`);

--
-- Indices de la tabla `concepto`
--
ALTER TABLE `concepto`
  ADD PRIMARY KEY (`idconcepto`);

--
-- Indices de la tabla `corralon`
--
ALTER TABLE `corralon`
  ADD PRIMARY KEY (`idcorralon`),
  ADD KEY `fk_corralon_estado1_idx` (`estado_idestado`),
  ADD KEY `fk_corralon_permisotaxi1_idx` (`permisotaxi_idpermisotaxi`);

--
-- Indices de la tabla `corte`
--
ALTER TABLE `corte`
  ADD PRIMARY KEY (`idcorte`),
  ADD UNIQUE KEY `idcaja_UNIQUE` (`idcorte`),
  ADD KEY `fk_caja_empleado1_idx` (`inicia_idempleado`),
  ADD KEY `fk_caja_empleado2_idx` (`finaliza_idempleado`);

--
-- Indices de la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  ADD PRIMARY KEY (`idegresoconcepto`),
  ADD KEY `fk_egresoconcepto_taller1_idx` (`taller_idtaller`),
  ADD KEY `fk_egresoconcepto_concepto1_idx` (`concepto_idconcepto`),
  ADD KEY `fk_egresoconcepto_empleado1` (`empleado_idempleado`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idempleado`),
  ADD KEY `fk_empleado_area1_idx` (`area_idarea`),
  ADD KEY `fk_empleado_persona1_idx` (`persona_idpersona`),
  ADD KEY `fk_empleado_taller1_idx` (`taller_idtaller`),
  ADD KEY `fk_empleado_si_user1_idx` (`si_user_idsi_user`);

--
-- Indices de la tabla `empleadotarea`
--
ALTER TABLE `empleadotarea`
  ADD PRIMARY KEY (`idempleadotarea`),
  ADD UNIQUE KEY `idempleadotarea_UNIQUE` (`idempleadotarea`),
  ADD KEY `fk_empleado_has_tarea_empleado1_idx` (`empleado_idempleado`),
  ADD KEY `fk_empleadoordentarea_ordentarea1_idx` (`ordentarea_idordentarea`);

--
-- Indices de la tabla `empleadotareaestado`
--
ALTER TABLE `empleadotareaestado`
  ADD PRIMARY KEY (`idempleadotareaestado`),
  ADD KEY `fk_empleadotareaestado_empleadotarea1_idx` (`empleadotarea_idempleadotarea`),
  ADD KEY `fk_empleadotareaestado_estadoscrum1_idx` (`estadoscrum_idestadoscrum`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idestado`),
  ADD UNIQUE KEY `idestado_UNIQUE` (`idestado`);

--
-- Indices de la tabla `estadoactividad`
--
ALTER TABLE `estadoactividad`
  ADD PRIMARY KEY (`idestadoactividad`),
  ADD UNIQUE KEY `idestado_UNIQUE` (`idestadoactividad`);

--
-- Indices de la tabla `estadopago`
--
ALTER TABLE `estadopago`
  ADD PRIMARY KEY (`idestadopago`),
  ADD UNIQUE KEY `idestado_UNIQUE` (`idestadopago`);

--
-- Indices de la tabla `estadoscrum`
--
ALTER TABLE `estadoscrum`
  ADD PRIMARY KEY (`idestadoscrum`),
  ADD UNIQUE KEY `idestado_UNIQUE` (`idestadoscrum`);

--
-- Indices de la tabla `formula`
--
ALTER TABLE `formula`
  ADD PRIMARY KEY (`idformula`),
  ADD UNIQUE KEY `idformula_UNIQUE` (`idformula`);

--
-- Indices de la tabla `liquidacion`
--
ALTER TABLE `liquidacion`
  ADD PRIMARY KEY (`idliquidacion`),
  ADD UNIQUE KEY `UNIQUE1_fecha_pta` (`permisotaxiasignado_idpermisotaxiasignado`,`fecha`),
  ADD KEY `fk_liquidacion_estado2_idx` (`estado_idestado`),
  ADD KEY `fk_liquidacion_chofer2_idx` (`chofer_idchofer`),
  ADD KEY `fk_liquidacion_permisotaxiasignado_idx` (`permisotaxiasignado_idpermisotaxiasignado`);

--
-- Indices de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD PRIMARY KEY (`idmantenimiento`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`idorden`),
  ADD UNIQUE KEY `idorden_UNIQUE` (`idorden`),
  ADD KEY `fk_orden_cliente1_idx` (`cliente_idcliente`),
  ADD KEY `fk_orden_vehiculotaller1_idx` (`vehiculotaller_idvehiculotaller`);

--
-- Indices de la tabla `ordenestado`
--
ALTER TABLE `ordenestado`
  ADD PRIMARY KEY (`idordenestado`),
  ADD UNIQUE KEY `idordenestado_UNIQUE` (`idordenestado`),
  ADD KEY `fk_ordenestado_orden1_idx` (`orden_idorden`),
  ADD KEY `fk_ordenestado_estadopago1_idx` (`estadopago_idestadopago`);

--
-- Indices de la tabla `ordenproducto`
--
ALTER TABLE `ordenproducto`
  ADD PRIMARY KEY (`idordenproducto`),
  ADD UNIQUE KEY `idordenproducto_UNIQUE` (`idordenproducto`),
  ADD KEY `fk_orden_has_producto_producto1_idx` (`producto_idproducto`),
  ADD KEY `fk_orden_has_producto_orden1_idx` (`orden_idorden`),
  ADD KEY `fk_ordenproducto_tipoprecio1_idx` (`tipoprecio_idtipoprecio`);

--
-- Indices de la tabla `ordentarea`
--
ALTER TABLE `ordentarea`
  ADD PRIMARY KEY (`idordentarea`),
  ADD UNIQUE KEY `idordentarea_UNIQUE` (`idordentarea`),
  ADD KEY `fk_orden_has_tarea_tarea1_idx` (`tarea_idtarea`),
  ADD KEY `fk_ordentarea_ordenproducto1_idx` (`ordenproducto_idordenproducto`);

--
-- Indices de la tabla `ordentareaestado`
--
ALTER TABLE `ordentareaestado`
  ADD PRIMARY KEY (`idordentareaestado`),
  ADD UNIQUE KEY `idordentareaestado_UNIQUE` (`idordentareaestado`),
  ADD KEY `fk_ordentareaestado_ordentarea1_idx` (`ordentarea_idordentarea`),
  ADD KEY `fk_ordentareaestado_estadoscrum1_idx` (`estadoscrum_idestadoscrum`);

--
-- Indices de la tabla `orden_has_refaccion`
--
ALTER TABLE `orden_has_refaccion`
  ADD PRIMARY KEY (`idorden_has_refaccion`),
  ADD KEY `fk_ordenrefaccion_orden1_idx` (`orden_idorden`),
  ADD KEY `fk_ordenrefaccion_refaccion1_idx` (`refaccion_idrefaccion`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idpago`),
  ADD KEY `fk_liquidacion_chofer1_idx` (`chofer_idchofer`),
  ADD KEY `fk_liquidacion_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `pagofianza`
--
ALTER TABLE `pagofianza`
  ADD PRIMARY KEY (`idpagofianza`),
  ADD KEY `fk_pagofianza_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `pagoliquidacion`
--
ALTER TABLE `pagoliquidacion`
  ADD PRIMARY KEY (`idpagoliquidacion`),
  ADD KEY `fk_pagoliquidacion_pago1_idx` (`pago_idpago`),
  ADD KEY `fk_pagoliquidacion_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `permisotaxi`
--
ALTER TABLE `permisotaxi`
  ADD PRIMARY KEY (`idpermisotaxi`),
  ADD UNIQUE KEY `vehiculo_idvehiculo_UNIQUE` (`vehiculo_idvehiculo`,`numero`),
  ADD KEY `fk_permisotaxi_persona1_idx` (`propietario`),
  ADD KEY `fk_permisotaxi_vehiculo1_idx` (`vehiculo_idvehiculo`);

--
-- Indices de la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
  ADD PRIMARY KEY (`idpermisotaxiasignado`),
  ADD KEY `fk_permisotaxiasignado_chofer1_idx` (`chofer_idchofer`),
  ADD KEY `fk_permisotaxiasignado_permisotaxi1_idx` (`permisotaxi_idpermisotaxi`),
  ADD KEY `fk_permisotaxiasignado_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `permisotaxiestado`
--
ALTER TABLE `permisotaxiestado`
  ADD PRIMARY KEY (`idpermisotaxiestado`),
  ADD KEY `fk_permisotaxi_has_estadoactividad_estadoactividad1_idx` (`estadoactividad_idestadoactividad`),
  ADD KEY `fk_permisotaxi_has_estadoactividad_permisotaxi1_idx` (`permisotaxi_idpermisotaxi`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idpersona`),
  ADD UNIQUE KEY `idpersona_UNIQUE` (`idpersona`),
  ADD KEY `fk_persona_sexo1_idx` (`sexo_idsexo`),
  ADD KEY `fk_persona_ciudad1_idx` (`ciudad_idciudad`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idproducto`),
  ADD UNIQUE KEY `idproducto_UNIQUE` (`idproducto`),
  ADD KEY `fk_producto_formula1_idx` (`formula_idformula`),
  ADD KEY `fk_producto_area1_idx` (`area_idarea`);

--
-- Indices de la tabla `refaccion`
--
ALTER TABLE `refaccion`
  ADD PRIMARY KEY (`idrefaccion`),
  ADD KEY `fk_refaccion_taller1_idx` (`taller_idtaller`);

--
-- Indices de la tabla `registradora`
--
ALTER TABLE `registradora`
  ADD PRIMARY KEY (`idregistradora`),
  ADD KEY `fk_registradora_empleado1_idx` (`empleado_idempleado`);

--
-- Indices de la tabla `salidastock`
--
ALTER TABLE `salidastock`
  ADD PRIMARY KEY (`idsalidastock`,`ordentarea_idordentarea`,`stock_idstock`),
  ADD UNIQUE KEY `idsalidastockcol_UNIQUE` (`idsalidastock`),
  ADD KEY `fk_ordentarea_has_stock_stock1_idx` (`stock_idstock`),
  ADD KEY `fk_ordentarea_has_stock_ordentarea1_idx` (`ordentarea_idordentarea`);

--
-- Indices de la tabla `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`idsexo`),
  ADD UNIQUE KEY `idsexo_UNIQUE` (`idsexo`);

--
-- Indices de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  ADD PRIMARY KEY (`idsi_modulo`);

--
-- Indices de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD PRIMARY KEY (`idsi_permiso`),
  ADD KEY `si_fk_Permiso_Rol1_idx` (`si_rol_idsi_rol`),
  ADD KEY `si_fk_Permiso_Modulo1_idx` (`si_modulo_idsi_modulo`);

--
-- Indices de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  ADD PRIMARY KEY (`idsi_rol`);

--
-- Indices de la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD PRIMARY KEY (`idsi_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `si_fk_User_Rol_idx` (`si_rol_idsi_rol`);

--
-- Indices de la tabla `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`idstock`),
  ADD UNIQUE KEY `idstock` (`idstock`);

--
-- Indices de la tabla `taller`
--
ALTER TABLE `taller`
  ADD PRIMARY KEY (`idtaller`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idtarea`),
  ADD UNIQUE KEY `idtarea_UNIQUE` (`idtarea`),
  ADD KEY `fk_tarea_producto1_idx` (`producto_idproducto`),
  ADD KEY `fk_tarea_area1_idx` (`area_idarea`);

--
-- Indices de la tabla `tipoalerta`
--
ALTER TABLE `tipoalerta`
  ADD PRIMARY KEY (`idtipoalerta`),
  ADD UNIQUE KEY `idtipoalerta_UNIQUE` (`idtipoalerta`);

--
-- Indices de la tabla `tipoprecio`
--
ALTER TABLE `tipoprecio`
  ADD PRIMARY KEY (`idtipoprecio`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`idvehiculo`),
  ADD KEY `fk_vehiculo_persona_idx` (`propietario`),
  ADD KEY `fk_vehiculo_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `vehiculoestado`
--
ALTER TABLE `vehiculoestado`
  ADD PRIMARY KEY (`idvehiculoestado`),
  ADD KEY `fk_vehiculo_has_estadoactividad_estadoactividad1_idx` (`estadoactividad_idestadoactividad`),
  ADD KEY `fk_vehiculo_has_estadoactividad_vehiculo1_idx` (`vehiculo_idvehiculo`);

--
-- Indices de la tabla `vehiculotaller`
--
ALTER TABLE `vehiculotaller`
  ADD PRIMARY KEY (`idvehiculotaller`),
  ADD KEY `fk_vehiculotaller_taller1_idx` (`taller_idtaller`),
  ADD KEY `fk_vehiculotaller_empleado1_idx` (`empleado_idempleado`),
  ADD KEY `fk_vehiculotaller_estado1_idx` (`estado_idestado`),
  ADD KEY `fk_vehiculotaller_vehiculo1` (`vehiculo_idvehiculo`);

--
-- Indices de la tabla `vehiculotalleredo`
--
ALTER TABLE `vehiculotalleredo`
  ADD PRIMARY KEY (`idvehiculotalleredo`),
  ADD KEY `fk_vehiculotalleredo_vehiculotaller1_idx` (`vehiculotaller_idvehiculotaller`),
  ADD KEY `fk_vehiculotalleredo_estadoscrum1_idx` (`estadoscrum_idestadoscrum`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `abono`
--
ALTER TABLE `abono`
  MODIFY `idabono` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT de la tabla `alerta`
--
ALTER TABLE `alerta`
  MODIFY `idalerta` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=169;
--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `idarea` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT de la tabla `bonificacion`
--
ALTER TABLE `bonificacion`
  MODIFY `idbonificacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT de la tabla `chofer`
--
ALTER TABLE `chofer`
  MODIFY `idchofer` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `choferestado`
--
ALTER TABLE `choferestado`
  MODIFY `idchoferestado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=170;
--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `idciudad` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idcliente` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `concepto`
--
ALTER TABLE `concepto`
  MODIFY `idconcepto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `corralon`
--
ALTER TABLE `corralon`
  MODIFY `idcorralon` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `corte`
--
ALTER TABLE `corte`
  MODIFY `idcorte` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|Id Corte', AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT de la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  MODIFY `idegresoconcepto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idempleado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=102;
--
-- AUTO_INCREMENT de la tabla `empleadotarea`
--
ALTER TABLE `empleadotarea`
  MODIFY `idempleadotarea` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=140;
--
-- AUTO_INCREMENT de la tabla `empleadotareaestado`
--
ALTER TABLE `empleadotareaestado`
  MODIFY `idempleadotareaestado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=498;
--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idestado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT de la tabla `estadoactividad`
--
ALTER TABLE `estadoactividad`
  MODIFY `idestadoactividad` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `estadopago`
--
ALTER TABLE `estadopago`
  MODIFY `idestadopago` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `estadoscrum`
--
ALTER TABLE `estadoscrum`
  MODIFY `idestadoscrum` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `formula`
--
ALTER TABLE `formula`
  MODIFY `idformula` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `liquidacion`
--
ALTER TABLE `liquidacion`
  MODIFY `idliquidacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=210;
--
-- AUTO_INCREMENT de la tabla `ordenestado`
--
ALTER TABLE `ordenestado`
  MODIFY `idordenestado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=234;
--
-- AUTO_INCREMENT de la tabla `ordenproducto`
--
ALTER TABLE `ordenproducto`
  MODIFY `idordenproducto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT de la tabla `ordentarea`
--
ALTER TABLE `ordentarea`
  MODIFY `idordentarea` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT de la tabla `ordentareaestado`
--
ALTER TABLE `ordentareaestado`
  MODIFY `idordentareaestado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=498;
--
-- AUTO_INCREMENT de la tabla `orden_has_refaccion`
--
ALTER TABLE `orden_has_refaccion`
  MODIFY `idorden_has_refaccion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|Id Orden Refacción', AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idpago` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=120;
--
-- AUTO_INCREMENT de la tabla `pagofianza`
--
ALTER TABLE `pagofianza`
  MODIFY `idpagofianza` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2324;
--
-- AUTO_INCREMENT de la tabla `pagoliquidacion`
--
ALTER TABLE `pagoliquidacion`
  MODIFY `idpagoliquidacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=234;
--
-- AUTO_INCREMENT de la tabla `permisotaxi`
--
ALTER TABLE `permisotaxi`
  MODIFY `idpermisotaxi` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT de la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
  MODIFY `idpermisotaxiasignado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT de la tabla `permisotaxiestado`
--
ALTER TABLE `permisotaxiestado`
  MODIFY `idpermisotaxiestado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=594;
--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idpersona` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=87;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `registradora`
--
ALTER TABLE `registradora`
  MODIFY `idregistradora` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|Id Registradora', AUTO_INCREMENT=122;
--
-- AUTO_INCREMENT de la tabla `salidastock`
--
ALTER TABLE `salidastock`
  MODIFY `idsalidastock` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `sexo`
--
ALTER TABLE `sexo`
  MODIFY `idsexo` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  MODIFY `idsi_modulo` int(4) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=244;
--
-- AUTO_INCREMENT de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  MODIFY `idsi_permiso` int(4) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  MODIFY `idsi_rol` int(4) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `si_user`
--
ALTER TABLE `si_user`
  MODIFY `idsi_user` int(4) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `stock`
--
ALTER TABLE `stock`
  MODIFY `idstock` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `taller`
--
ALTER TABLE `taller`
  MODIFY `idtaller` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idtarea` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `tipoalerta`
--
ALTER TABLE `tipoalerta`
  MODIFY `idtipoalerta` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tipoprecio`
--
ALTER TABLE `tipoprecio`
  MODIFY `idtipoprecio` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `idvehiculo` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `vehiculotaller`
--
ALTER TABLE `vehiculotaller`
  MODIFY `idvehiculotaller` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT de la tabla `vehiculotalleredo`
--
ALTER TABLE `vehiculotalleredo`
  MODIFY `idvehiculotalleredo` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=243;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `abono`
--
ALTER TABLE `abono`
  ADD CONSTRAINT `fk_abono_orden1` FOREIGN KEY (`orden_idorden`) REFERENCES `orden` (`idorden`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD CONSTRAINT `fk_alerta_empleado1` FOREIGN KEY (`empleado_idempleado`) REFERENCES `empleado` (`idempleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_alerta_tipoalerta1` FOREIGN KEY (`tipoalerta_idtipoalerta`) REFERENCES `tipoalerta` (`idtipoalerta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD CONSTRAINT `fk_chofer_persona1` FOREIGN KEY (`chofer`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona2` FOREIGN KEY (`aval1`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona3` FOREIGN KEY (`aval2`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona4` FOREIGN KEY (`aval3`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona5` FOREIGN KEY (`aval4`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `choferestado`
--
ALTER TABLE `choferestado`
  ADD CONSTRAINT `fk_chofer_has_estadoactividad_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_has_estadoactividad_estadoactividad1` FOREIGN KEY (`estadoactividad_idestadoactividad`) REFERENCES `estadoactividad` (`idestadoactividad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_cliente_persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `corralon`
--
ALTER TABLE `corralon`
  ADD CONSTRAINT `fk_corralon_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_corralon_permisotaxi1` FOREIGN KEY (`permisotaxi_idpermisotaxi`) REFERENCES `permisotaxi` (`idpermisotaxi`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `corte`
--
ALTER TABLE `corte`
  ADD CONSTRAINT `fk_caja_empleado1` FOREIGN KEY (`inicia_idempleado`) REFERENCES `empleado` (`idempleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_caja_empleado2` FOREIGN KEY (`finaliza_idempleado`) REFERENCES `empleado` (`idempleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  ADD CONSTRAINT `fk_egresoconcepto_concepto1` FOREIGN KEY (`concepto_idconcepto`) REFERENCES `concepto` (`idconcepto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_egresoconcepto_empleado1` FOREIGN KEY (`empleado_idempleado`) REFERENCES `empleado` (`idempleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_egresoconcepto_taller1` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `empleadotarea`
--
ALTER TABLE `empleadotarea`
  ADD CONSTRAINT `fk_empleado_has_tarea_empleado1` FOREIGN KEY (`empleado_idempleado`) REFERENCES `empleado` (`idempleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_empleadoordentarea_ordentarea1` FOREIGN KEY (`ordentarea_idordentarea`) REFERENCES `ordentarea` (`idordentarea`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `empleadotareaestado`
--
ALTER TABLE `empleadotareaestado`
  ADD CONSTRAINT `fk_empleadotareaestado_empleadotarea1` FOREIGN KEY (`empleadotarea_idempleadotarea`) REFERENCES `empleadotarea` (`idempleadotarea`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_empleadotareaestado_estadoscrum1` FOREIGN KEY (`estadoscrum_idestadoscrum`) REFERENCES `estadoscrum` (`idestadoscrum`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `liquidacion`
--
ALTER TABLE `liquidacion`
  ADD CONSTRAINT `fk_liquidacion_chofer2` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_liquidacion_estado2` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `fk_orden_cliente1` FOREIGN KEY (`cliente_idcliente`) REFERENCES `cliente` (`idcliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orden_vehiculotaller1` FOREIGN KEY (`vehiculotaller_idvehiculotaller`) REFERENCES `vehiculotaller` (`idvehiculotaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ordenestado`
--
ALTER TABLE `ordenestado`
  ADD CONSTRAINT `fk_ordenestado_estadopago1` FOREIGN KEY (`estadopago_idestadopago`) REFERENCES `estadopago` (`idestadopago`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ordenproducto`
--
ALTER TABLE `ordenproducto`
  ADD CONSTRAINT `fk_orden_has_producto_producto1` FOREIGN KEY (`producto_idproducto`) REFERENCES `producto` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordenproducto_tipoprecio1` FOREIGN KEY (`tipoprecio_idtipoprecio`) REFERENCES `tipoprecio` (`idtipoprecio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ordentarea`
--
ALTER TABLE `ordentarea`
  ADD CONSTRAINT `fk_orden_has_tarea_tarea1` FOREIGN KEY (`tarea_idtarea`) REFERENCES `tarea` (`idtarea`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordentarea_ordenproducto1` FOREIGN KEY (`ordenproducto_idordenproducto`) REFERENCES `ordenproducto` (`idordenproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ordentareaestado`
--
ALTER TABLE `ordentareaestado`
  ADD CONSTRAINT `fk_ordentareaestado_estadoscrum1` FOREIGN KEY (`estadoscrum_idestadoscrum`) REFERENCES `estadoscrum` (`idestadoscrum`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordentareaestado_ordentarea1` FOREIGN KEY (`ordentarea_idordentarea`) REFERENCES `ordentarea` (`idordentarea`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagofianza`
--
ALTER TABLE `pagofianza`
  ADD CONSTRAINT `fk_pagofianza_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagoliquidacion`
--
ALTER TABLE `pagoliquidacion`
  ADD CONSTRAINT `fk_pagoliquidacion_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pagoliquidacion_pago1` FOREIGN KEY (`pago_idpago`) REFERENCES `pago` (`idpago`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permisotaxi`
--
ALTER TABLE `permisotaxi`
  ADD CONSTRAINT `fk_permisotaxi_persona1` FOREIGN KEY (`propietario`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permisotaxi_vehiculo1` FOREIGN KEY (`vehiculo_idvehiculo`) REFERENCES `vehiculo` (`idvehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
  ADD CONSTRAINT `fk_permisotaxiasignado_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permisotaxiasignado_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permisotaxiasignado_permisotaxi1` FOREIGN KEY (`permisotaxi_idpermisotaxi`) REFERENCES `permisotaxi` (`idpermisotaxi`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permisotaxiestado`
--
ALTER TABLE `permisotaxiestado`
  ADD CONSTRAINT `fk_permisotaxi_has_estadoactividad_estadoactividad1` FOREIGN KEY (`estadoactividad_idestadoactividad`) REFERENCES `estadoactividad` (`idestadoactividad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permisotaxi_has_estadoactividad_permisotaxi1` FOREIGN KEY (`permisotaxi_idpermisotaxi`) REFERENCES `permisotaxi` (`idpermisotaxi`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `fk_persona_ciudad1` FOREIGN KEY (`ciudad_idciudad`) REFERENCES `ciudad` (`idciudad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_persona_sexo1` FOREIGN KEY (`sexo_idsexo`) REFERENCES `sexo` (`idsexo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_area1` FOREIGN KEY (`area_idarea`) REFERENCES `area` (`idarea`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_producto_formula1` FOREIGN KEY (`formula_idformula`) REFERENCES `formula` (`idformula`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `refaccion`
--
ALTER TABLE `refaccion`
  ADD CONSTRAINT `fk_refaccion_taller1` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `registradora`
--
ALTER TABLE `registradora`
  ADD CONSTRAINT `fk_registradora_empleado1` FOREIGN KEY (`empleado_idempleado`) REFERENCES `empleado` (`idempleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `salidastock`
--
ALTER TABLE `salidastock`
  ADD CONSTRAINT `fk_ordentarea_has_stock_ordentarea1` FOREIGN KEY (`ordentarea_idordentarea`) REFERENCES `ordentarea` (`idordentarea`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordentarea_has_stock_stock1` FOREIGN KEY (`stock_idstock`) REFERENCES `stock` (`idstock`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD CONSTRAINT `si_fk_Permiso_Modulo1` FOREIGN KEY (`si_modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `si_fk_Permiso_Rol1` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `fk_tarea_area1` FOREIGN KEY (`area_idarea`) REFERENCES `area` (`idarea`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tarea_producto1` FOREIGN KEY (`producto_idproducto`) REFERENCES `producto` (`idproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `fk_vehiculo_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculo_persona` FOREIGN KEY (`propietario`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehiculoestado`
--
ALTER TABLE `vehiculoestado`
  ADD CONSTRAINT `fk_vehiculo_has_estadoactividad_estadoactividad1` FOREIGN KEY (`estadoactividad_idestadoactividad`) REFERENCES `estadoactividad` (`idestadoactividad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculo_has_estadoactividad_vehiculo1` FOREIGN KEY (`vehiculo_idvehiculo`) REFERENCES `vehiculo` (`idvehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehiculotaller`
--
ALTER TABLE `vehiculotaller`
  ADD CONSTRAINT `fk_vehiculotaller_empleado1` FOREIGN KEY (`empleado_idempleado`) REFERENCES `empleado` (`idempleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculotaller_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculotaller_taller1` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculotaller_vehiculo1` FOREIGN KEY (`vehiculo_idvehiculo`) REFERENCES `vehiculo` (`idvehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehiculotalleredo`
--
ALTER TABLE `vehiculotalleredo`
  ADD CONSTRAINT `fk_vehiculotalleredo_estadoscrum1` FOREIGN KEY (`estadoscrum_idestadoscrum`) REFERENCES `estadoscrum` (`idestadoscrum`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculotalleredo_vehiculotaller1` FOREIGN KEY (`vehiculotaller_idvehiculotaller`) REFERENCES `vehiculotaller` (`idvehiculotaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
