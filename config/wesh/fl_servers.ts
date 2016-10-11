import {fl_container, fl_element, fl_jadeRenderer, fl_text} from './fl_comp'
import * as fl_c from './fl_common'
import * as fl_m from './fl_manager_comp'

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
