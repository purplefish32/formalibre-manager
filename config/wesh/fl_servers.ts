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
