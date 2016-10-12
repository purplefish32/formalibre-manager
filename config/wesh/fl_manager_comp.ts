import * as fl_c from './fl_common'
import * as fl_bc from './fl_breadcrumb'
import * as fl_m from './fl_manager_comp'
import {fl_container, fl_element, fl_jadeRenderer} from './fl_comp'

export function getFields(data) {
  return data.model
    .filter(column => !column.index)
    .map(column => `{{server.${column.field}}}`)
}

export class PageHeaders extends fl_c.Section {
  constructor(
    title: string,
    elements: fl_bc.IBreadCrumbElement[]) {
    super("content-header")
    this.add("h1", "", [], title)
      .add(new fl_bc.BreadCrumbs(elements))
  }
}


export class ListFromModel extends fl_c.SectionContent {
  protected model: any;
  constructor(model) {
    super();
    this.model = model;
  }

  getHeaders() {
    let list = this.model
      .filter(server => !server.index)
      .map(function(server) {
        if (server.name)
          return server.name
        else
          return server.field.toLowerCase().replace(/\b./g, a => a.toUpperCase())
      })
    return list;
  }

}

export function editButton(type) {
  let linkAttr = [
    `routerLink="/server/edit/{{${type}.id}}"`,
    `*ngIf="server.hasOwnProperty('id')"`
  ]

  let link = new fl_m.Button(linkAttr, "","edit","btn-default btn-xs")

  return link
}

export class ListDetail extends fl_container {
  constructor(private type:string, private details:string[]){
    super()

    this.details.forEach(field => this.add(new fl_c.TableCol('', [], field)))

    this.add(new fl_c.TableCol().add(fl_m.editButton(type)))
  }
}

export class Link extends fl_c.Link {
  constructor(data = null, attr = [], classes = "") {
    super(classes,attr,data)
  }
}

export class Button extends fl_c.Button {
  constructor(attrs: string[] = [], data = "", logo = null, classes = "btn-primary") {
    super(classes, attrs, data,logo)
  }
}
