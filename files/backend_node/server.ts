let portNumber = 80

import * as express from 'express'

//var Sequelize = require('sequelize');
import * as bodyParser from 'body-parser'
import * as methodOverride from 'method-override'

//import * as mongoose from 'mongoose'
import * as mongodb from 'mongodb'
import * as path from 'path'

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
// MONGO COLLECTION BASE CLASS

class collection {
  private accessor
  constructor(public db, public name: string, validator = {}) {
    this.accessor = this.collection(name, validator)
  }

  collection(col: string, validator = {}) {
    this.db.createCollection(col, validator)
    return this.db.collection(col)
  }

  fetch(param: Object = {}) {
    return this.accessor.find(param)
  }

  create(data: Object, cb) {
    this.accessor.insertOne(data, cb)
  }

  read(id: string, cb) {
    this.accessor.findOne({ _id: mongodb.ObjectID(id) }, cb)
  }

  update(id: string, data: Object, cb) {
    this.accessor.findOneAndUpdate({ _id: mongodb.ObjectID(id) }, { $set: data }, cb)
  }

  delete(id: string, cb) {
    console.log(`Deleting ${id}`)
    this.accessor.deleteOne({ _id: mongodb.ObjectID(id) }, cb)
  }
}

/////////////////////////////////////////////////////////////////////
// EVENT COLLECTION

class Event extends collection {
  constructor(db, name, validator = {}) {
    super(db, name, validator)
  }

  all(req, res) {
    super.fetch().sort({ 'date': -1 }).toArray(function(err, result) {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.send(result)
      }
    })
  }

  create(req, res) {
    let obj = req.body
    obj.date = Date.now()
    super.create(req.body, function(err, result) {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.status(201).send(result)
      }
    })
  }

  read(req, res) {
    super.read(req.params.id, function(err, result) {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.status(200).send(result)
      }
    })
  }

  getRessourceRelated(req, res) {
    super.fetch({ ressource_id: req.params.id }).sort({'date': -1}).toArray(function(err, result) {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.send(result)
      }
    })
  }

  update(req, res) {
    let data = req.body
    if (data._id) delete data._id
    if (data.date) delete data.date
    super.update(req.params.id, data, function(err, result) {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.status(204).send(result)
      }
    })
  }

  delete(req, res) {
    super.delete(req.params.id, function(err, result) {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.status(204).send(result)
      }
    })
  }
}

/////////////////////////////////////////////////////////////////////
// DB DEFINITION & MGT

let mongoClient = mongodb.MongoClient

mongoClient.connect('mongodb://db_mongo:27017/flm', function(err, db) {
  if (err) {
    console.log(`connection error:`)
    console.dir(err)
    throw err
  }

  let events = new Event(db, 'events', {
    validator: {
      '$and':
      [
        { 'ressource_id': { '$type': "string" } },
        { 'post': { '$type': "string" } }
      ]
    },
    validationAction: "error"
  })

  router(app,events)
})

/////////////////////////////////////////////////////////////////////
// ROUTER DEFINITION

function router(app, events) {

  let eventRoute = `/events`

  app.get(eventRoute, debugRoute, serverCommonCheck, function(req, res) {
    events.all(req, res)
  });

  app.get(path.join(eventRoute, ':id'), debugRoute, serverCommonCheck, function(req, res) {
    events.read(req, res)
  });

  app.get(path.join(eventRoute, 'ressource', ':id'), debugRoute, serverCommonCheck, function(req, res) {
    events.getRessourceRelated(req, res)
  });

  app.post(eventRoute, debugRoute, serverCommonCheck, function(req, res) {
    events.create(req, res)
  });

  app.put(path.join(eventRoute, ':id'), debugRoute, serverCommonCheck, function(req, res) {
    events.update(req, res)
  });

  app.delete(path.join(eventRoute, ':id'), debugRoute, serverCommonCheck, function(req, res) {
    events.delete(req, res)
  });

  setDefaultRoutes(app)
}
