import * as fl_c from './fl_common'
import * as fl_bc from './fl_breadcrumb'
import {fl_container, fl_element, fl_renderable, ElementData} from './fl_comp'

export function getFields(type, data) {
  return data.model
    .filter(column => !column.index)
    .map(column => `{{${type}.${column.field}}}`)
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
  constructor(model, data: ElementData = []) {
    super(data);
    this.model = model;
  }

  getHeaders() {
    let list = this.model
      .filter(element => !element.index)
      .map(function(element) {
        if (element.name)
          return element.name
        else
          return element.field.toLowerCase().replace(/\b./g, a => a.toUpperCase())
      })
    return list;
  }

  getPrimeHeaders() {
    let list = this.model
      .filter(element => !element.index)
      .map(function(element) {
        if (!element.name)
          element.name = element.field.toLowerCase().replace(/\b./g, a => a.toUpperCase())
        return element
      })
    return list;
  }

}

export function viewButton(type) {
  let linkAttr = [
    `routerLink="/${type}/{{${type}.id}}"`,
    `*ngIf="${type}.hasOwnProperty('id')"`
  ]

  let link = new Button(linkAttr, "", "eye", "btn-default btn-xs")

  return link
}

export function editButton(type) {
  let linkAttr = [
    `routerLink="/${type}/edit/{{${type}.id}}"`,
    `*ngIf="${type}.hasOwnProperty('id')"`
  ]

  let link = new Button(linkAttr, "", "edit", "btn-default btn-xs")

  return link
}

export function deleteButton(linkAttr) {
  let link = new Button(linkAttr, "Delete", null, "btn-danger")

  return link
}

export function submitButton(linkAttr) {
  let link = new Button(linkAttr, "Submit")

  return link
}

export class ListDetail extends fl_container {
  constructor(private type: string, private details: string[]) {
    super()

    this.details.forEach(field => this.add(new fl_c.TableCol('', [], field)))

    this.add(new fl_c.TableCol().add(editButton(type)))
  }
}

export class ModelInput extends fl_c.ModelInput {
  constructor(model, attr = []) {
    super(model, "", attr)
  }
}

export class ModelText extends fl_c.ModelText {
  constructor(model, name, attr = []) {
    super(model, name, "", attr)
  }
}

export class Label extends fl_c.Label {
  constructor(data, attrs = []) { super('', attrs, data) }
}

export class Link extends fl_c.Link {
  constructor(data = null, attr = [], classes = "") {
    super(classes, attr, data)
  }
}

export class Ol extends fl_c.Ol {
  constructor(classes = "", attr = [], data = null) {
    super(classes, attr, data)
  }
}

export class Button extends fl_c.Button {
  constructor(attrs: string[] = [], data = "", logo = null, classes = "btn-primary") {
    super(classes, attrs, data, logo)
  }
}

export class EditButton extends Button {
  constructor(classes = "", type: string) {
    let linkAttr = [
      `routerLink="/${type}/edit/{{${type}.id}}"`,
      `*ngIf="${type}.hasOwnProperty('id')"`
    ]
    super(linkAttr, "", "pencil", `btn-primary ${classes}`)
  }
}

export class DeleteButton extends Button {
  constructor(classes = "") {
    let linkAttr = [
      `'(click)'="onDelete()"`
    ]

    super(linkAttr, "", "trash-o", `btn-danger ${classes}`)
  }
}

export class MainCol extends fl_c.MainCol {
  constructor() {
    super()
    this.addSelf(new ProgressLoader)
  }
}

export class ListGroup extends fl_c.Ul {
  constructor(classes = "", attrs = [], data: ElementData = null) {
    super(`list-group ${classes}`, attrs, data)
  }
}

export class ListGroupUnbordered extends ListGroup {
  constructor(classes: string | fl_element | fl_element[] = "",
    attrs = [], data: ElementData = null) {
    if (typeof classes != 'string') {
      data = classes
      classes = ""
    }
    super(`list-group-unbordered ${classes}`, attrs, data)
  }
}

export class ListGroupItem extends fl_c.Li {
  constructor(classes = "", attrs = [], data: ElementData = null) {
    super(`list-group-item ${classes}`, attrs, data)
  }
}

export class ProgressLoader extends fl_element {
  constructor() {
    super("ng2-slim-loading-bar", "", `'[color]'="'blue'"`)
  }
}
