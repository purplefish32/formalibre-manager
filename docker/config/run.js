"use strict";
var yaml = require("js-yaml");
var fs = require("fs");
var _ = require("lodash");
//import * as mustache from 'mustache'
var errors = [];
try {
    var doc = yaml.safeLoad(fs.readFileSync('../../docker-compose_.yml', 'utf8'));
    var servicesRemoved_1 = [];
    var run_1 = doc.hasOwnProperty('run') && Array.isArray(doc.run) ? doc.run : [];
    var params_1 = doc.hasOwnProperty('tags_params') ? doc.tags_params : [];
    var variables_1 = doc.hasOwnProperty('variables') ? doc.variables : {};
    delete doc.tags_params;
    delete doc.run;
    delete doc.variables;
    // Remove unused services
    if (run_1.length) {
        _.forEach(doc.services, function (service, name) {
            if (!service.tags) {
                delete doc.services[name];
                servicesRemoved_1.push(name);
            }
            else {
                var tagUsed = _.intersection(run_1, service.tags);
                if (tagUsed.length) {
                }
                else {
                    delete doc.services[name];
                    servicesRemoved_1.push(name);
                }
            }
        });
    }
    var compileTemplate_1 = function (env) {
        env = JSON.stringify(env);
        var compiled = _.template(env);
        env = compiled(variables_1);
        return JSON.parse(env);
    };
    var addProperties_1 = function (propName, serviceName, service, env) {
        env = compileTemplate_1(env);
        if (service.hasOwnProperty(propName)) {
            if (typeof service[propName] != typeof env)
                throw propName + " as a type different than the one in " + serviceName + " (" + typeof service[propName] + " vs " + typeof env + ")";
        }
        if (_.isArray(env)) {
            if (!service.hasOwnProperty(propName))
                service[propName] = [];
            env.forEach(function (elem) { return service[propName].push(_.clone(elem, true)); });
        }
        else if (typeof env === "object") {
            if (!service.hasOwnProperty(propName))
                service[propName] = {};
            service[propName] =
                _.extend(service[propName], env);
        }
        else if (typeof env === "string") {
            service[propName] = env;
        }
        else {
            throw "Invalide type for " + propName + " : " + typeof env;
        }
    };
    var addTagProperties_1 = function (tagName, serviceName, service) {
        _.forEach(params_1[tagName], function (val, key) {
            try {
                addProperties_1(key, serviceName, service, val);
            }
            catch (e) {
                errors.push(e);
            }
        });
    };
    _.forEach(doc.services, function (service, name) {
        // Remove links to suppressed services
        if (service.links)
            doc.services[name].links = _.difference(service.links, servicesRemoved_1);
        // Add parameters from common tags_params. see following section
        // tags_params:
        //  common:
        addTagProperties_1('common', name, service);
        // Add parameters from other tags_params. see following section
        // tags_params:
        //  ?:
        _.forEach(service.tags, function (val, key) { return addTagProperties_1(val, name, service); });
        // remove any traces of tags in services
        delete doc.services[name].tags;
    });
    doc = compileTemplate_1(doc);
    //console.dir(doc.services)
    var ymlStr_1 = yaml.safeDump(doc);
    try {
        fs.writeFile("../../docker-compose.yml", ymlStr_1, function (err) {
            if (err)
                throw err;
            console.log(ymlStr_1);
            if (errors.length) {
                console.log('Generation ended with the following errors');
                console.dir(errors);
            }
        });
    }
    catch (e) {
        console.dir(e);
    }
}
catch (e) {
    console.log(e);
}
//# sourceMappingURL=run.js.map