import {fl_container, fl_element, fl_jadeRenderer, fl_text} from './fl_comp'
import * as fl_c from './fl_common'
import * as fl_m from './fl_manager_comp'
import * as fl_j from './fl_jobs'
import * as folder from './fl_folders'
import * as path from "path"

let g_element_table = 'servers'
let g_local_object = 'server'
let g_angular_detail_comp = 'Server'
let g_title = "Servers"
let g_title_singular = "Server"
let g_small_title = "servers"
let g_small_title_singular = "server"
let g_list_route = '#/servers'
let g_edit_route = '/server/new'

let g_new_button_title = `Add new ${g_title_singular}`

export class ServersList extends fl_m.ListFromModel {
  constructor(config) {
    super(config.servers.model)

    let headers = this.getHeaders();
    headers.push('Edit')

    let table = new fl_c.Table('table', [`*ngIf="servers?.length"`]).
      setHeaders(headers).
      addRow(["ServerDetail", `*ngFor="let i of servers"`, "'[server]'='i'"])

    let menuBar = new fl_c.BoxFooter().add(
      new fl_m.Button([`routerLink="/server/new"`], "Add new Server"))

    this.add(menuBar)
      .add(
      new fl_c.Box()
        .add(table)
        .add(new fl_c.BoxInfo(`There are no servers yet. Feel free to add your first server using the "New Server" button.`, "", [`*ngIf!="servers && !servers?.length"`]))
        .add(new fl_c.BoxInfo(`Loading...`, "", [`*ngIf="!servers"`]))
      )
      .add(menuBar)
  }
}

export class ServersListPage extends fl_c.MainCol {
  constructor(config) {
    super();
    this.add(new fl_m.PageHeaders(
      'Servers', [{
        name: 'Servers',
        isactive: true
      }])
    ).add(new ServersList(config))
  }

  tohtml(renderer): string {
    return this.render(renderer)
  }
}

export class ServerDetail extends fl_m.ListDetail {
  constructor(config) {
    super('server', fl_m.getFields(config.servers))
  }

  tohtml(renderer): string {
    return this.render(renderer)
  }
}

export class ServersEdit extends fl_m.ListFromModel {
  constructor(config) {
    super(config.servers.model)

    let fieldSet = new fl_element('fieldset')
      .add(new fl_c.Legend('Server details'))

    let formContainer = new fl_c.Box()
      .add(fieldSet)


    let capitalize = s =>
      s.toLowerCase().replace(/\b./g, a => a.toUpperCase())

    let menuBar = new fl_c.BoxFooter()
      .add(fl_m.submitButton([`'(click)'="onSubmit()"`, `'[disabled]'="!serverForm.form.valid"`]))
      .add(new fl_c.Span('', [`'[hidden]'="!server || !server.id"`])
        .add(fl_m.deleteButton([`'(click)'="onDelete()"`]))
      )


    config.servers.model.filter(server => !server.index)
      .forEach(function(server) {
        if (!server.name)
          server.name = capitalize(server.field)

        let formGroup = new fl_c.FormGroup()
          .add(new fl_m.Label(server.name, []))
          .add(new fl_text(" " + server.description))



        let attr = []
        if (server.required)
          attr.push('required')

        if (server.type === "option") {
          attr.push(`name="${server.field}"`)
          attr.push([`'[(ngModel)]'='server.${server.field}'`])

          let option = function(val, desc, selected) {
            let attr = [`value="${val}"`]
            if (selected)
              attr.push(`selected`)
            return new fl_element('option', '', attr, desc)
          }

          let select = new fl_element('select', 'form-control', attr)

          server.options.forEach(opt => select.add(option(opt.value, opt.value, !!opt.selected)))

          formGroup.add(select)

        }
        else
          formGroup.add(new fl_m.ModelInput('server', server.field, attr))

        fieldSet.add(formGroup)

      })

    this.add(
      new fl_element('form', 'form', [`'#serverForm'="ngForm"`])
        .add(formContainer)
    ).add(menuBar)
  }
}

export class ServerEditPage extends fl_c.MainCol {
  constructor(config) {
    super();
    this.add(new fl_m.PageHeaders(
      'Edit Server', [{
        name: 'Servers',
        isactive: false,
        link: '#/servers'
      }, {
          name: 'Edit Server',
          isactive: true
        }])
    ).add(new ServersEdit(config))
  }

  tohtml(renderer): string {
    return this.render(renderer)
  }
}

let servers_component_html = path.join(folder.f_templates, 'servers.component.html')
let server_detail_html = path.join(folder.f_templates, 'server-detail.component.html')
let server_edit_html = path.join(folder.f_templates, 'server-edit.component.html')

export function doJob(config,renderer) {
  let jobs:fl_j.IHtmlJob[] = [
    {
      file: servers_component_html,
      html: new ServersListPage(config,'servers').tohtml(renderer),
      desc: 'server template'
    },
    {
      file: server_detail_html,
      html: new ServerDetail(config,'servers').tohtml(renderer),
      desc: 'server detail'
    },
    {
      file: server_edit_html,
      html: new ServerEditPage(config,'servers').tohtml(renderer),
      desc: 'server edit'
    }
  ]

  let j =new fl_j.HtmlJobs()
  j.jobs = jobs
  j.run()

}
