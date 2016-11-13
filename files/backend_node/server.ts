let portNumber = 80

import * as express from 'express'

import * as bodyParser from 'body-parser'
import * as methodOverride from 'method-override'

import InitMongo from './mongo'

import router from './router'

/////////////////////////////////////////////////////////////////////
// APP DEFINITION

var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(methodOverride())

app.use(function(req, res, next) {
  console.log('Time:', (new Date(Date.now())).toUTCString())
  next()
})

app.listen(portNumber, function() {
  console.log(`Example app listening on port ${portNumber}!`);
});

/////////////////////////////////////////////////////////////////////
// ERROR HANDLERS

// Console log
function logErrors(err, req, res, next) {
  console.error("Error :")
  if (typeof err == 'String') {
    console.error(err)
  } else if (err.stack) {
    console.error(err.stack)
  } else {
    console.dir(err)
  }
  next(err)
}

// Xhr error
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(err.status || 500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

// Internal server exception
function errorHandler(err, req, res, next) {
  res.status(err.status || 500)
  res.send(`Server error : ${err}`)
}

/////////////////////////////////////////////////////////////////////
// ROUTE HELPERS

function serverCommonCheck(req, res, next) {
  console.log('common check : ok')
  next();
}

function debugRoute(req, res, next) {
  console.log('**************************************************************');
  console.log("Received " + req.method + " request at " + req.url);
  console.log("Content follows :");
  console.dir(req.body);
  console.log('**************************************************************');
  next();
};

function setDefaultRoutes(app) {
  if (!app) throw new Error("Missing app parameter");

  app.all('*', debugRoute, function(req, res) {
    console.log('404');
    res.status(404).send();
  });

  app.use(logErrors)
  app.use(clientErrorHandler)
  app.use(errorHandler)
}

/////////////////////////////////////////////////////////////////////
// INIT DB
InitMongo('flm',mainRouter)

/////////////////////////////////////////////////////////////////////
// ROUTER DEFINITION

function loadRoute(basePath,router) {
  try {
    app.use(basePath, debugRoute, serverCommonCheck, router.routes())
  } catch(e) {
    console.log(`Failed to mount ${basePath} router with error :`)
    console.dir(e)
  }
}

function mainRouter(db) {
  router(loadRoute,db)
  setDefaultRoutes(app)
}
