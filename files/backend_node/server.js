var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser')

/////////////////////////////////////////////////////////////////////
// DB DEFINITION

var sequelize = new Sequelize('db', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',//|'mariadb'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  //storage: 'path/to/database.sqlite'
});

var Server = sequelize.define('server', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ip: {
      type: Sequelize.STRING,
      allowNull: false
    },
    provider: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    indexes: [
      // Create a unique index on email
      // {
      //   unique: true,
      //   fields: ['id']
      // }
    ]
  });

Server.sync({force: false}).then(function () {
  console.log("Tables created");
});


/////////////////////////////////////////////////////////////////////
// APP DEFINITION

var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.listen(80, function () {
  console.log('Example app listening on port 3000!');
});

/////////////////////////////////////////////////////////////////////
// ROUTES DEFINITIONS

//
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

serverError = function(res,e) {
  console.log('Error')
  console.dir(e);
  res.status(500).send(e);
}

secure = function(func) {
  try {
    func();
  } catch (e) {
    serverError(res,e);
  } finally {
  }
}

sendResult = function(res,promise) {
  promise.then(function(result){
    res.send(result);
  }).error(function(e){
    serverError(res,e);
  }).catch(function(e){
    serverError(res,e);
  });
}

debugRoute = function(req,res,next) {
  console.log('**************************************************************');
  console.log("Received "+req.method+" request at "+req.url);
  console.log("Content follows :");
  console.dir(req.body);
  console.log('**************************************************************');
  next();
};

///////
// Server routes
///////

serverCommonCheck = function(req,res,next) {
  next();
}

app.get('/servers', debugRoute, serverCommonCheck, function (req, res) {
  secure(function() {
    promise = Server.findAll({});
    sendResult(res,promise);
  });
});

app.get('/server/:id', debugRoute, serverCommonCheck, function (req, res) {
  secure(function(){
    promise = Server.findOne({id:req.param('id')});
    sendResult(res,promise)
  });
});

app.post('/servers', debugRoute, serverCommonCheck, function (req, res) {
  secure(function(){
    console.dir(req.body);
    promise = Server.create(req.body);
    console.log('test');
    sendResult(res,promise);
  });
});


///////
// default route
///////

app.all('*', debugRoute, function(req,res){
  console.dir(req);
  res.status(404).send();
});
