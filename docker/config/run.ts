import * as yaml from "js-yaml";
import * as fs from "fs"
import * as _ from "lodash"
import * as tmp from "tmp"
import * as exec from 'child_process'
//import * as mustache from 'mustache'

let errors = []

try {
  var doc = yaml.safeLoad(fs.readFileSync('../../docker-compose_.yml', 'utf8'));

  let servicesRemoved = []

  let run: string[] = doc.hasOwnProperty('run') && Array.isArray(doc.run) ? doc.run : []

  let params: string[] = doc.hasOwnProperty('tags_params') ? doc.tags_params : []

  let variables: any = doc.hasOwnProperty('variables') ? doc.variables : {}

  delete doc.tags_params

  delete doc.run

  delete doc.variables

  // Remove unused services
  if (run.length) {
    _.forEach(doc.services, function(service, name) {
      if (!service.tags) {
        delete doc.services[name]
        servicesRemoved.push(name)
      }
      else {
        let tagUsed = _.intersection(run, service.tags)
        if (tagUsed.length) {
          //delete service.tags
        }
        else {
          delete doc.services[name]
          servicesRemoved.push(name)
        }
      }
    });
  }

  let compileTemplate = function(env:any) : any {
    env = JSON.stringify(env)
    let compiled = _.template(env);
    env = compiled(variables);
    return JSON.parse(env)
  }

  let addProperties = function(propName, serviceName, service, env) {
    env = compileTemplate(env)


    if (service.hasOwnProperty(propName)) {
      if (typeof service[propName] != typeof env)
        throw `${propName} as a type different than the one in ${serviceName} (${typeof service[propName]} vs ${typeof env})`
    }

    if (_.isArray(env)) {
      if (!service.hasOwnProperty(propName))
        service[propName] = []

      env.forEach(elem => service[propName].push(_.clone(elem, true)))
    } else if (typeof env === "object") {
      if (!service.hasOwnProperty(propName))
        service[propName] = {}

      service[propName] =
        _.extend(service[propName], env)
    } else if (typeof env === "string") {
      service[propName] = env
    } else {
      throw `Invalide type for ${propName} : ${typeof env}`
    }
  }

  let addTagProperties = function(tagName, serviceName, service) {
    _.forEach(params[tagName], (val, key) => {
      try {
        addProperties(key, serviceName, service, val)
      }
      catch (e) {
        errors.push(e)
      }
    })
  }

  _.forEach(doc.services, function(service, name) {

    // Remove links to suppressed services
    if (service.links)
      doc.services[name].links = _.difference(service.links, servicesRemoved)

    // Add parameters from common tags_params. see following section
    // tags_params:
    //  common:
    addTagProperties('common', name, service)

    // Add parameters from other tags_params. see following section
    // tags_params:
    //  ?:
    _.forEach(service.tags, (val, key) => addTagProperties(val, name, service))

    // remove any traces of tags in services
    delete doc.services[name].tags
  });

  doc = compileTemplate(doc)

  //console.dir(doc.services)

  let ymlStr = yaml.safeDump(doc)

  try {
    fs.writeFile("../../docker-compose.yml", ymlStr, function(err) {
      if (err) throw err
      console.log(ymlStr)
      if (errors.length) {
        console.log('Generation ended with the following errors')
        console.dir(errors)
      }
    })
  }
  catch (e) {
    console.dir(e)
  }

} catch (e) {
  console.log(e);
}
