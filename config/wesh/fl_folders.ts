import fs = require('fs')
import path = require('path')

export let rootDir = path.join(path.dirname(process.cwd()), '../..')
export let configDir = path.join(rootDir, 'config')
export let configFile = path.join(configDir, 'model.json')
export let files = path.join(rootDir, 'files')
export let frontend = path.join(files, 'frontend_angular2')
export let f_webroot = path.join(frontend, 'webroot')
export let f_templates = path.join(f_webroot, 'templates')