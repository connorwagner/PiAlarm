// Utilities and helpers
var Gpio = require('pigpio').Gpio;

var ledRed = new Gpio(27, {mode: Gpio.OUTPUT});
var ledGreen = new Gpio(17, {mode: Gpio.OUTPUT});
var ledBlue = new Gpio(22, {mode: Gpio.OUTPUT});
var ledWhite = new Gpio(23, {mode: Gpio.OUTPUT});

var currentRed = 0;
var currentGreen = 0;
var currentBlue = 0;
var currentWhite = 0;

function setColor(red, green, blue, white) {
    if (red < 0 || green < 0 || blue < 0 || white < 0 || red > 255 || green > 255 || blue > 255 || white > 255) return false;

    currentRed = red;
    currentGreen = green;
    currentBlue = blue;
    currentWhite = white;

    /*ledRed.pwmWrite(red);
    ledGreen.pwmWrite(green);
    ledBlue.pwmWrite(blue);
    ledWhite.pwmWrite(white);*/

    return true;
}

function setRed(red) {
    return setColor(red, currentGreen, currentBlue);
}

function setGreen(green) {
    return setColor(currentRed, green, currentBlue);
}

function setBlue(blue) {
    return setColor(currentRed, currentGreen, blue);
}

var mysql = require('mysql');
var conn = mysql.createConnection({host: 'localhost', user: 'alarm', password: 'alarmpassword', database: 'Alarm'});

// Query every 5 seconds to ensure that the database connection remains alive
setInterval(function () {
    conn.query('SELECT 1');
}, 5000);

////////////////////////////////////////////////////////////////
// Hapi Server

// Require the Hapi module
const Hapi = require('hapi');
const Joi = require('joi');
const Boom = require('boom');

// Create a new Hapi server
const server = new Hapi.Server();

// Configure the port on which the server will listen
server.connection({ port: 3000 });

// Define routes
server.route([
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('server is running');
        }
    },
    {
        method: 'GET',
        path: '/alarms',
        handler: function(request, reply) {
            conn.query("SELECT * FROM Alarm", function(err, result, fields) {
                if (err) reply(Boom.badRequest());
                else reply(JSON.stringify(result));
            });
        }
    },
    {
        method: 'GET',
        path: '/alarms/{alarm}',
        config: {
            validate: {
                params: {
                    alarm: Joi.number().integer().min(0).required()
                }
            }
        },
        handler: function(request, reply) {
            conn.query("SELECT * FROM Alarm WHERE ID=" + request.params.alarm, function(err, result, fields) {
                if (err) reply(Boom.badRequest());
                else reply(JSON.stringify(result[0]));
            });
        }
    },
    {
        method: 'POST',
        path: '/alarms',
        config: {
            validate: {
                payload: {
                    days: Joi.string().regex(/^[MTWRFSU]{1,7}$/).min(1).max(7).required(),
                    hour: Joi.number().integer().min(0).max(23).required(),
                    minute: Joi.number().integer().min(0).max(59).required()
                }
            }
        },
        handler: function(request, reply) {
            conn.query("INSERT INTO Alarm (Days, Hour, Minute) VALUES ('" + request.payload.days + "', " + request.payload.hour + ", " + request.payload.minute + ")", function(err, result, fields) {
                if (err) reply(Boom.badRequest());
                else reply("Success");
            });
        }
    },
    {
        method: 'PUT',
        path: '/alarms/{alarm}',
        config: {
            validate: {
                params: {
                    alarm: Joi.number().integer().min(0).required()
                }
            }
        },
        handler: function(request, reply) {
            conn.query("UPDATE Alarm SET Active=!Active WHERE ID=" + request.params.alarm, function(err, result, fields) {
                if (err) reply(Boom.badRequest());
                else reply("Success");
            });
        }
    },
    {
        method: 'DELETE',
        path: '/alarms/{alarm}',
        config: {
            validate: {
                params: {
                    alarm: Joi.number().integer().min(0).required()
                }
            }
        },
        handler: function(request, reply) {
            conn.query("DELETE FROM Alarm WHERE ID=" + request.params.alarm, function(err, result, fields) {
                if (err) reply(Boom.badRequest());
                else reply("Success");
            });
        }
    },
    {
        method: 'GET',
        path: '/leds',
        handler: function(request, reply) {
            reply(JSON.stringify({red: currentRed, green: currentGreen, blue: currentBlue, white: currentWhite}));
        }
    },
    {
        method: 'GET',
        path: '/leds/red',
        handler: function(request, reply) {
            reply(currentRed);
        }
    },
    {
        method: 'GET',
        path: '/leds/green',
        handler: function(request, reply) {
            reply(currentGreen);
        }
    },
    {
        method: 'GET',
        path: '/leds/blue',
        handler: function(request, reply) {
            reply(currentBlue);
        }
    },
    {
        method: 'GET',
        path: '/leds/white',
        handler: function(request, reply) {
            reply(currentWhite);
        }
    },
    {
        method: 'PUT',
        path: '/leds',
        config: {
            validate: {
                payload: {
                    red: Joi.number().integer().min(0).max(255).required(),
                    green: Joi.number().integer().min(0).max(255).required(),
                    blue: Joi.number().integer().min(0).max(255).required(),
                    white: Joi.number().integer().min(0).max(255).required()
                }
            }
        },
        handler: function(request, reply) {
            setColor(request.payload.red, request.payload.green, request.payload.blue);
            reply("Success");
        }
    },
    {
        method: 'PUT',
        path: '/leds/red',
        config: {
            validate: {
                payload: {
                    red: Joi.number().integer().min(0).max(255).required()
                }
            }
        },
        handler: function(request, reply) {
            setRed(request.payload.red);
            reply("Success");
        }
    },
    {
        method: 'PUT',
        path: '/leds/green',
        config: {
            validate: {
                payload: {
                    green: Joi.number().integer().min(0).max(255).required()
                }
            }
        },
        handler: function(request, reply) {
            setGreen(request.payload.green);
            reply("Success");
        }
    },
    {
        method: 'PUT',
        path: '/leds/blue',
        config: {
            validate: {
                payload: {
                    blue: Joi.number().integer().min(0).max(255).required()
                }
            }
        },
        handler: function(request, reply) {
            setBlue(request.payload.blue);
            reply("Success");
        }
    },
    {
        method: 'PUT',
        path: '/leds/white',
        config: {
            validate: {
                payload: {
                    white: Joi.number().integer().min(0).max(255).required()
                }
            }
        },
        handler: function(request, reply) {
            setWhite(request.payload.white);
            reply("Success");
        }
    },
    {
        method: 'PUT',
        path: '/leds/power',
        config: {
            validate: {
                payload: {
                    power: Joi.number().integer().min(0).max(1).required()
                }
            }
        },
        handler: function(request, reply) {
            setColor(currentRed * request.payload.power, currentGreen * request.payload.power, currentBlue * request.payload.power, currentWhite * request.payload.power);
            reply("Success");
        }
    }
]);

// Serve!
server.start(err => {
    if (err) {
        throw err;
    }
    console.log('Server running at', server.info.uri);
});
