// Utilities and helpers
const fs = require('fs');

function readFile(fileName) {
    try {
        return fs.readFileSync(__dirname + "/games/" + fileName, "utf8");
    } catch (err) {
        return false;
    }
}

function writeFile(fileName, contents) {
    fs.writeFileSync(__dirname + "/games/" + fileName, contents);
}

function deleteFile(fileName) {
    fs.unlinkSync(__dirname + "/games/" + fileName);
}

var Gpio = require('pigpio').Gpio;

var ledRed = new Gpio(27, {mode: Gpio.OUTPUT});
var ledGreen = new Gpio(17, {mode: Gpio.OUTPUT});
var ledBlue = new Gpio(22, {mode: Gpio.OUTPUT});

var currentRed = 0;
var currentGreen = 0;
var currentBlue = 0;

function setColor(red, green, blue) {
    if (red < 0 || green < 0 || blue < 0 || red > 255 || green > 255 || blue > 255) return false;

    currentRed = red;
    currentGreen = green;
    currentBlue = blue;

    /*ledRed.pwmWrite(red);
    ledGreen.pwmWrite(green);
    ledBlue.pwmWrite(blue);*/

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
                if (err) reply(Boom.badImplementation());

                reply(JSON.stringify(result));
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
                if (err) reply(Boom.badImplementation());

                reply(result[0]);
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
                if (err) reply(Boom.badImplementation());

                reply("Success");
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
            conn.query("UPDATE * SET Active=!Active WHERE ID=" + request.params.alarm, function(err, result, fields) {
                if (err) reply(Boom.badImplementation());

                reply(result[0]);
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
                if (err) reply(Boom.badImplementation());

                reply("Success");
            });
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
                    blue: Joi.number().integer().min(0).max(255).required()
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
        path: '/leds/power',
        config: {
            validate: {
                payload: {
                    power: Joi.number().integer().min(0).max(1).required()
                }
            }
        },
        handler: function(request, reply) {
            setColor(currentRed * request.payload.power, currentGreen * request.payload.power, currentBlue * request.payload.power);
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
