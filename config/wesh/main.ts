let pretty = true


import * as config from '../../model.json'
import * as fl_servers from './fl_servers'
import {fl_container, fl_element, fl_jadeRenderer} from './fl_comp'

import fs = require('fs')
import path = require('path')

let rootDir = path.join(path.dirname(process.cwd()), '../..')
let configDir = path.join(rootDir, 'config')
let configFile = path.join(configDir, 'model.json')
let files = path.join(rootDir, 'files')
let frontend = path.join(files, 'frontend_angular2')
let f_webroot = path.join(frontend, 'webroot')
let f_templates = path.join(f_webroot, 'templates')
let servers_component_html = path.join(f_templates, 'servers.component.html')
let server_detail_html = path.join(f_templates, 'server-detail.component.html')
let server_edit_html = path.join(f_templates, 'server-edit.component.html')

interface String {
  repeat(count: number): string
  substr(from: number, length?: number): string
}

let renderer = new fl_jadeRenderer(true,false)

let jobs = [
  {
    file: servers_component_html,
    html: new fl_servers.ServersListPage(config).tohtml(renderer),
    desc: 'server template'
  },
  {
    file:server_detail_html,
    html:new fl_servers.ServerDetail(config).tohtml(renderer),
    desc:'server detail'
  },
  {
    file:server_edit_html,
    html:new fl_servers.ServerEditPage(config).tohtml(renderer),
    desc:'server edit'
  }
]

jobs.forEach(job => fs.writeFile(
  job.file,
  job.html,
  err => {
    if (err)
      console.log("Failed to create " + job.desc, err)
  })
)
