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
        path: '/alarm',
        handler: function(request, reply) {
            const result = readFile("alarm.txt");
            if (!result) {
                reply("No alarm set");
            } else {
                reply(result);
            }
        }
    },
    {
        method: 'POST',
        path: '/alarm',
        config: {
            validate: {
                payload: {
                    hour: Joi.number().integer().min(0).max(23).required(),
                    minute: Joi.number().integer().min(0).max(59).required(),
                }
            }
        },
        handler: function(request, reply) {
            reply("Success");
        }
    },
]);

// Serve!
server.start(err => {
    if (err) {
        throw err;
    }
    console.log('Server running at', server.info.uri);
});
