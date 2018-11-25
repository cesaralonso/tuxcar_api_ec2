const connection = require('../config/db-connection');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mySecretPass = process.env.SECRET_PASSWORD;

const Si_user = {};
Si_user.insert = (user, connection, next) => {
    if ( !connection )
        return next('Connection refused');
    // Hash password
    bcrypt.hash(user.password, saltRounds)
    .then( hash => {
        user.password = hash;

        // Insert into table
        connection.query('INSERT INTO si_user SET ?', [user], ( error, result ) => {
            if ( error ) {
                // WARNING: To take effect, user table must have the email field as unique column
                if (error.code === 'ER_DUP_ENTRY') {
                    return next( null, {
                        success: false,
                        error: error,
                        message: 'Este email ya esta en uso'
                    });
                } else
                    return next({ success: false, error: error });
            }

            return next( null, {
                success: true,
                result: result,
                message: '¡Registro exitoso!'
            });
        })
    })
    .catch( error => next({ success: false, error: error }) );
}

Si_user.login = ( email, password, next ) => {
    if ( !connection )
        return next('Connection refused');

    const query = connection.query(`SELECT a.nombre as area, idsi_user, usuario, email, password, si_rol_idsi_rol, super, si_user.baja, p.nombre, e.idempleado, e.horaEntrada, e.horaSalida FROM si_user 
                                    LEFT JOIN empleado as e on e.si_user_idsi_user = si_user.idsi_user
                                    LEFT JOIN area as a  on a.idarea = e.area_idarea
                                    LEFT JOIN persona as p on p.idpersona =  e.persona_idpersona
                                    WHERE email = ? HAVING si_user.baja IS NULL OR si_user.baja = false`, [email], (error, result) => {

        if ( error )
            return next( error );
        if ( result[0] ) {
            const hash = result[0].password.toString();
            bcrypt.compare(password, hash, ( error, res ) => {
                if ( res ) {
                    const payload = {
                        idsi_user: result[0].idsi_user,
                        usuario: result[0].usuario,
                        email: result[0].email,
                        si_rol_idsi_rol: result[0].si_rol_idsi_rol,
                        nombre: result[0].nombre,
                        idempleado: result[0].idempleado,
                        horaEntrada: result[0].horaEntrada,
                        horaSalida: result[0].horaSalida,
                        area: result[0].area || '',
                        super: result[0].super || 0
                    }
                    // Generate token
                    const token = jwt.sign(payload, mySecretPass, {
                        expiresIn: 60 * 60 * 24
                    });

                    let _super = result[0].super;
                    let _query = '';
                    
                    if (!_super) {
                        _query = `SELECT m.nombre, p.acceso, m.baja, p.writeable, p.deleteable, p.readable, p.updateable, p.write_own, p.delete_own, p.read_own, p.update_own
                                 FROM si_user as u 
                                 INNER JOIN si_rol as r ON r.idsi_rol = u.si_rol_idsi_rol 
                                 INNER JOIN si_permiso as p ON p.si_rol_idsi_rol = r.idsi_rol 
                                 INNER JOIN si_modulo as m ON m.idsi_modulo = p.si_modulo_idsi_modulo 
                                 WHERE u.idsi_user = ? HAVING m.baja IS NULL OR m.baja = false`;
                    } else {
                        _query = `SELECT m.nombre FROM si_modulo as m`;
                    }

                    const query = connection.query(_query, [result[0].idsi_user], (error, modules) => {

                        if ( error )
                            return next( error );

                        if (_super) {
                            modules.forEach(element => {
                                element.acceso = 1;
                                element.writeable = 1;
                                element.deleteable = 1;
                                element.readable = 1;
                                element.updateable = 1;
                                element.write_own = 0;
                                element.delete_own = 0;
                                element.read_own = 0;
                                element.update_own = 0;
                            });
                        }
                        
                        return next( null, {
                            success: true,
                            message: 'Has iniciado sesión correctamente',
                            token: token,
                            modules: modules,
                            iduser: result[0].idsi_user,
                            email: result[0].email,
                            idempleado: result[0].idempleado || 0,
                            nombre: result[0].nombre
                        });
                    });
                } else
                    return next(null, {
                        success: false,
                        message: 'Password incorrecto'
                    });
            });
        } else {
            return next(null, {
                success: false,
                message: 'El email y password no coinciden'
            })
        }
    });
}

Si_user.all = (created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT si_user.*, si_rol.nombre as si_rol_si_rol_idsi_rol FROM si_user INNER JOIN si_rol on si_rol.idsi_rol = si_user.si_rol_idsi_rol WHERE created_by = ? HAVING si_user.baja IS NULL OR si_user.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT si_user.*, si_rol.nombre as si_rol_si_rol_idsi_rol FROM si_user INNER JOIN si_rol on si_rol.idsi_rol = si_user.si_rol_idsi_rol HAVING si_user.baja IS NULL OR si_user.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user leíd@' });
    });
};

Si_user.findById = (idSi_user, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM si_user WHERE idsi_user = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_user, created_by];
    } else {
        query = 'SELECT * FROM si_user WHERE idsi_user = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_user];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user encontrad@' });
    });
};

Si_user.findBySiRol = (idSi_rol, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM si_user WHERE si_rol_idsi_rol = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_rol, created_by];
    } else {
        query = 'SELECT * FROM si_user WHERE si_rol_idsi_rol = ? HAVING baja IS NULL OR baja = false';
        keys = [idSi_rol];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user encontrad@' });
    });
};

Si_user.count = (connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idsi_user) AS count FROM si_user';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_user contabilizad@' });
    });
};

Si_user.exist = (idSi_user, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM si_user WHERE idsi_user = ?) AS exist';
    keys = [idSi_user];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Si_user verificad@' });
    });
};

Si_user.update = (Si_user, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');
    
    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_user SET ? WHERE idsi_user = ? AND created_by = ?';
        keys = [Si_user, Si_user.idsi_user, created_by];
    } else {
        query = 'UPDATE si_user SET ? WHERE idsi_user = ?';
        keys = [Si_user, Si_user.idsi_user];
    }

    if (Si_user.password) {

        // Hash password
        bcrypt.hash(Si_user.password, saltRounds)
        .then( hash => {
            Si_user.password = hash;

            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
                else if (result.affectedRows === 0)
                    return next(null, { success: false, result: result, message: 'Solo es posible editar registros propios' });
                else
                    return next(null, { success: true, result: result, message: 'Usuario actualizado' });
            });
        });
    } else {
        const user = {
            'idsi_user': Si_user.idsi_user,
            'email': Si_user.email,
            'usuario': Si_user.usuario,
            'si_rol_idsi_rol': Si_user.si_rol_idsi_rol
        };

        connection.query(query, [user, Si_user.idsi_user], (error, result) => {
            if(error) 
                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
            else if (result.affectedRows === 0)
                return next(null, { success: false, result: result, message: 'Solo es posible editar registros propios' });
            else {
                return next(null, { success: true, result: result, message: 'Usuario actualizado' });
            }
        });
    }
};

Si_user.remove = (idsi_user, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM si_user WHERE idsi_user = ? AND created_by = ?';
        keys = [idsi_user, created_by];
    } else {
        query = 'DELETE FROM si_user WHERE idsi_user = ?';
        keys = [idsi_user];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user eliminad@' });
    });
};

Si_user.logicRemove = (idsi_user, created_by, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE si_user SET baja = 1 WHERE idsi_user = ? AND created_by = ?';
        keys = [idsi_user, created_by];
    } else {
        query = 'UPDATE si_user SET baja = 1 WHERE idsi_user = ?';
        keys = [idsi_user];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Si_user eliminad@' });
    });
};

Si_user.response = (res, error, data) => {
    if (error)
        res.status(500).json(error);
    else
        res.status(200).json(data);
}

module.exports = Si_user;
