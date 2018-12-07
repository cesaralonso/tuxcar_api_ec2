const connection = require('../config/db-connection');
const webpush = require('web-push');


const Api = {};

Api.notifications = (pushSubscriber, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    console.log('pushSubscriber', JSON.stringify(pushSubscriber));

    query = 'INSERT INTO suscriber SET ?';
    keys = [pushSubscriber];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro de subscripción' });
        else
            return next(null, { success: true, result: result, message: 'Subcriptor creado' });
    });
};

Api.newsletter = (pushSubscriber, connection, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    query = 'SELECT * FROM suscriber';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else {

            // notification payload
            const notificationPayload = {
                "notification": {
                    "title": "Tuxcar notificación",
                    "body": "Tienes un nuevo servicio",
                    "icon": "https://tuxcar-pwa.firebaseapp.com/assets/main-page-logo-small-hat.png",
                    "vibrate": [100, 50, 100],
                    "data": {
                        "dateOfArrival": Date.now(),
                        "primaryKey": 1
                    },
                    "actions": [{
                        "action": "explore",
                        "title": "Tomar Viaje"
                    }]
                }
            };

            console.log('suscribers result', JSON.stringify(result));

            Promise.all(result.map(sub => webpush.sendNotification(
                sub, JSON.stringify(notificationPayload) )))
                .then(() => {
                    return next(null, { success: true, result: result, message: 'Notificaciones enviadas correctamente' });
                })
                .catch(err => {
                    return next({ success: false, error: error, message: "Error sending notification, reason: ", err });
                    console.error("Error sending notification, reason: ", err);
                });
        }
    });
};

Api.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Api;
