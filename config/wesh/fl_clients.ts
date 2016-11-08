import * as folder from './fl_folders'
import * as path from "path"
import * as fl_j from './fl_jobs'
import {ElementsListPage, ElementDetail, ElementEditPage} from './fl_table_list'

let base = 'client'
let Base = 'Client'

import {Env} from './env'
let env = new Env(base)

let component_html = path.join(folder.f_templates, `${base}s.component.html`)
let detail_html = path.join(folder.f_templates, `${base}-detail.component.html`)
let edit_html = path.join(folder.f_templates, `${base}-edit.component.html`)

export function doJob(config, renderer) {
  let jobs: fl_j.IHtmlJob[] = [
    {
      file: component_html,
      html: new ElementsListPage(config, env).tohtml(renderer),
      desc: `${base} template`
    },
    {
      file: detail_html,
      html: new ElementDetail(config, env).tohtml(renderer),
      desc: `${base} detail`
    },
    {
      file: edit_html,
      html: new ElementEditPage(config, env).tohtml(renderer),
      desc: `${base} edit`
    }
  ]

  let j = new fl_j.HtmlJobs()
  j.jobs = jobs
  j.run()

}
