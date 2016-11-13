"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('./collection');
var express = require('express');
var path = require('path');
/////////////////////////////////////////////////////////////////////
// EVENT COLLECTION
var Event = (function (_super) {
    __extends(Event, _super);
    function Event(db) {
        _super.call(this, db, 'events', {
            validator: {
                '$and': [
                    { 'ressource_id': { '$type': "string" } },
                    { 'post': { '$type': "string" } }
                ]
            },
            validationAction: "error"
        });
    }
    Event.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/', function (req, res) {
            _this.all(req, res);
        });
        router.get(path.join('/', ':id'), function (req, res) {
            _this.read(req, res);
        });
        router.get(path.join('/', 'ressource', ':id'), function (req, res) {
            _this.getRessourceRelated(req, res);
        });
        router.post('/', function (req, res) {
            _this.create(req, res);
        });
        router.put(path.join('/', ':id'), function (req, res) {
            _this.update(req, res);
        });
        router.delete(path.join('/', ':id'), function (req, res) {
            _this.delete(req, res);
        });
        return router;
    };
    Event.prototype.all = function (req, res) {
        _super.prototype.fetch.call(this).sort({ 'date': -1 }).toArray(function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(result);
            }
        });
    };
    Event.prototype.create = function (req, res) {
        var obj = req.body;
        obj.date = Date.now();
        _super.prototype.create.call(this, req.body, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(201).send(result);
            }
        });
    };
    Event.prototype.read = function (req, res) {
        _super.prototype.read.call(this, req.params.id, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send(result);
            }
        });
    };
    Event.prototype.getRessourceRelated = function (req, res) {
        _super.prototype.fetch.call(this, { ressource_id: req.params.id }).sort({ 'date': -1 }).toArray(function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(result);
            }
        });
    };
    Event.prototype.update = function (req, res) {
        var data = req.body;
        if (data._id)
            delete data._id;
        if (data.date)
            delete data.date;
        _super.prototype.update.call(this, req.params.id, data, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send(result);
            }
        });
    };
    Event.prototype.delete = function (req, res) {
        _super.prototype.delete.call(this, req.params.id, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send(result);
            }
        });
    };
    return Event;
}(collection_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Event;
//# sourceMappingURL=event.js.map