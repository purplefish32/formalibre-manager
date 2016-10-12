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

export class ElementsList extends fl_m.ListFromModel {
  constructor(config,element) {
    super(config[element].model)

    let headers = this.getHeaders();
    headers.push('Edit')

    let table = new fl_c.Table('table', [`*ngIf="${g_element_table}?.length"`]).
      setHeaders(headers).
      addRow([`${g_angular_detail_comp}Detail`, `*ngFor="let i of ${g_element_table}"`, `'[${g_local_object}]'='i'`])

    let menuBar = new fl_c.BoxFooter().add(
      new fl_m.Button([`routerLink="${g_edit_route}"`], g_new_button_title))

    this.add(menuBar)
      .add(
      new fl_c.Box()
        .add(table)
        .add(new fl_c.BoxInfo(`There are no ${g_small_title} yet. Feel free to add your first ${g_small_title_singular} using the "${g_new_button_title}" button.`, "", [`*ngIf!="${g_element_table} && !${g_element_table}?.length"`]))
        .add(new fl_c.BoxInfo(`Loading...`, "", [`*ngIf="!${g_element_table}"`]))
      )
      .add(menuBar)
  }
}

export class ElementsListPage extends fl_c.MainCol {
  constructor(config,element) {
    super();
    this.add(new fl_m.PageHeaders(
      g_title, [{
        name: g_title,
        isactive: true
      }])
    ).add(new ElementsList(config,element))
  }

  tohtml(renderer): string {
    return this.render(renderer)
  }
}

export class ElementDetail extends fl_m.ListDetail {
  constructor(config,element) {
    super(g_local_object, fl_m.getFields(config[element]))
  }

  tohtml(renderer): string {
    return this.render(renderer)
  }
}

export class ElementsEdit extends fl_m.ListFromModel {
  constructor(config,element) {
    super(config[element].model)

    let fieldSet = new fl_element('fieldset')
      .add(new fl_c.Legend(`${g_title_singular} details`))

    let formContainer = new fl_c.Box()
      .add(fieldSet)


    let capitalize = s =>
      s.toLowerCase().replace(/\b./g, a => a.toUpperCase())

    let menuBar = new fl_c.BoxFooter()
      .add(fl_m.submitButton([`'(click)'="onSubmit()"`, `'[disabled]'="!elementForm.form.valid"`]))
      .add(new fl_c.Span('', [`'[hidden]'="!${g_local_object} || !${g_local_object}.id"`])
        .add(fl_m.deleteButton([`'(click)'="onDelete()"`]))
      )


    config[element].model.filter(element => !element.index)
      .forEach(function(element) {
        if (!element.name)
          element.name = capitalize(element.field)

        let formGroup = new fl_c.FormGroup()
          .add(new fl_m.Label(element.name, []))
          .add(new fl_text(" " + element.description))



        let attr = []
        if (element.required)
          attr.push('required')

        if (element.type === "option") {
          attr.push(`name="${element.field}"`)
          attr.push([`'[(ngModel)]'='${g_local_object}.${element.field}'`])

          let option = function(val, desc, selected) {
            let attr = [`value="${val}"`]
            if (selected)
              attr.push(`selected`)
            return new fl_element('option', '', attr, desc)
          }

          let select = new fl_element('select', 'form-control', attr)

          element.options.forEach(opt => select.add(option(opt.value, opt.value, !!opt.selected)))

          formGroup.add(select)

        }
        else
          formGroup.add(new fl_m.ModelInput(g_local_object, element.field, attr))

        fieldSet.add(formGroup)

      })

    this.add(
      new fl_element('form', 'form', [`'#elementForm'="ngForm"`])
        .add(formContainer)
    ).add(menuBar)
  }
}

export class ElementEditPage extends fl_c.MainCol {
  constructor(config,element) {
    super();
    this.add(new fl_m.PageHeaders(
      'Edit '+g_title_singular, [{
        name: g_title,
        isactive: false,
        link: g_list_route
      }, {
          name: 'Edit '+g_title_singular,
          isactive: true
        }])
    ).add(new ElementsEdit(config,element))
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
      html: new ElementsListPage(config,'servers').tohtml(renderer),
      desc: 'server template'
    },
    {
      file: server_detail_html,
      html: new ElementDetail(config,'servers').tohtml(renderer),
      desc: 'server detail'
    },
    {
      file: server_edit_html,
      html: new ElementEditPage(config,'servers').tohtml(renderer),
      desc: 'server edit'
    }
  ]

  let j =new fl_j.HtmlJobs()
  j.jobs = jobs
  j.run()

}
