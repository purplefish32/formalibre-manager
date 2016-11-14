import {fl_container, fl_element, Attributes, ElementData} from './fl_comp'

export class Section extends fl_element {
  constructor(sectionName, data: ElementData = []) {
    super("section", sectionName, [], data)
  }
}

export class MainCol extends fl_element {
  constructor(screen = 'md', len = 12) {
    super('div', 'row')
    this.add("div", `col-${screen}-${len}`).setForOrigin()
  }
}

export class SectionContent extends Section {
  constructor(data: ElementData = []) { super('content', data) }
}

export class Link extends fl_element {
  constructor(classes = "", attr: Attributes = null, data = null) {
    super('a', classes, attr, data)
  }
}

export class Ol extends fl_element {
  constructor(classes = "", attr: Attributes = null, data = null) {
    super("ol", classes, attr, data)
  }
}

export class Icon extends fl_element {
  constructor(logo, attr = [], bgcolor = "", data = "") {
    let classes = `fa fa-${logo}`
    if(bgcolor!="")
      classes+=` bg-${bgcolor}`
    super('i', classes, attr, data)
  }
}

export class BoxGeneric extends fl_element {
  constructor(classes: string | ElementData = "", type = 'box', data: ElementData = []) {
    if (typeof classes != 'string') {
      data = classes
      classes = ""
    }
    super('div', `${type} ${classes}`, [], data)
  }
}

export class Box extends BoxGeneric {
  constructor(classes: string | fl_element | fl_element[] = "", ...args) {
    super(classes, 'box', args)
  }
}

export class BoxBody extends BoxGeneric {
  constructor(classes: string | fl_element | fl_element[] = "", ...args) {
    super(classes, 'box-body', args)
  }
}

export class BoxFooter extends BoxGeneric {
  constructor(classes: string | fl_element | fl_element[] = "", ...args) {
    super(classes, 'box-footer', args)
  }
}

export class BoxInfo extends fl_element {
  constructor(data, classes = "", attrs: string[] = []) {
    super('div', 'callout callout-info ', attrs)
    this.add('p', classes, [], data).setForOrigin()
  }
}

export class Span extends fl_element {
  constructor(classes = "", attr: Attributes = null, data: ElementData = []) {
    super('span', classes, attr, data)
  }
}

export class Button extends fl_element {
  constructor(classes = "btn-primary", attrs: string[] = [], data = "", logo = null) {
    super('button', 'btn ' + classes, attrs, logo ? "" : data)
    if (logo)
      this.add(new Icon(logo, [], "", data)).setForOrigin()
  }
}

export class Legend extends fl_element {
  constructor(text) { super('legend', '', [], text) }
}

export class FormGroup extends fl_element {
  constructor() { super('div', 'form-group') }
}

export class Label extends fl_element {
  constructor(classes = "", attr: string[] = [], data = "") { super('label', classes, attr, data) }
}

export class Input extends fl_element {
  constructor(classes, attr) { super('input', classes, attr) }
}

export class TextInput extends Input {
  constructor(classes = "", attr: Attributes = []) {
    if (typeof attr == "string") {
      attr = [<string>attr]
    }
    attr.push(`type='text'`)
    super(classes, attr)
  }
}

export class Text extends fl_element {
  constructor(data = "", classes = "", attr: Attributes = null) {
    super('p', classes, attr, data)
  }
}

export class ModelInput extends TextInput {
  constructor(model: string | string[], classes, attr) {
    let name = model
    if (Array.isArray(model)) {
      name = model[model.length - 1]
      model = model.join('.')
    }
    attr.push(`name ='${name}'`)
    attr.push(`'[(ngModel)]'='${model}'`)
    classes += " form-control"
    super(classes, attr)
  }
}

export class ModelText extends Text {
  constructor(model, name, classes, attr) {
    super(`{{${model}.${name}}}`, classes, attr)
  }
}

export class TableHeader extends fl_element {
  constructor(classes = "", attr: Attributes = null, data: string = null) {
    super(`th`, classes, attr, data)
  }
}

export class TableRow extends fl_element {
  constructor(classes = "", attr: Attributes = null, data = "") {
    super(`tr`, classes, attr)
  }

  addHeader(classes = "", attr: string[] = [], data: fl_element | string = null) {
    let isDataAString = typeof data === 'string'
    let header =
      this.add(new TableHeader(
        classes,
        attr,
        isDataAString ? <string>data : null
      ))

    if (typeof data === 'object' && data instanceof fl_element)
      header.add(data)

    return this
  }
}

export class TableCol extends fl_element {
  constructor(classes = "", attr: Attributes = null, data = "") {
    super(`td`, classes, attr, data)
  }
}

export class Table extends fl_element {
  constructor(classes = '', attr: Attributes = null) {
    super(`table`, classes, attr)
  }

  addRow(attr: string[] = [], data = "") {
    return this.add(new TableRow("", attr, data))
  }

  addCol(attr: string[] = [], data = "") {
    this.add(new TableCol("", attr, data))
  }

  addCols(elems: string[], attr: string[] = []) {
    elems.forEach(elem => this.addCol(attr, elem))
  }

  setHeaders(headers: fl_element[] | string[]) {
    let row = <TableRow>this.add(new TableRow()).last()

    if (!headers.length)
      return

    if (typeof headers[0] == 'string') {
      let h: string[] = <string[]>headers;
      h.forEach(
        header => row.addHeader("sorting", ['tabindex="0"', 'aria-controls="example2"', 'rowspan="1"', 'colspan="1"', 'aria-label="Rendering engine: activate to sort column ascending"'], header))
    }
    else {
      let h: fl_element[] = <fl_element[]>headers;
      h.forEach(
        header => row.addHeader("sorting", ['tabindex="0"', 'aria-controls="example2"', 'rowspan="1"', 'colspan="1"', 'aria-label="Rendering engine: activate to sort column ascending"'], header))
    }

    return this
  }
}

export class Img extends fl_element {
  constructor(classes = "", attrs: Attributes = null) {
    super('img', classes, attrs)
  }
}

export class H extends fl_element {
  constructor(num: number, classes = "", attrs: Attributes = null, data: ElementData = []) {
    super(`h${num}`, classes, attrs, data)
  }
}

export class B extends fl_element {
  constructor(classes = "", attrs: Attributes = null, data: ElementData = []) {
    super(`b`, classes, [], data)
  }
}

export class Ul extends fl_element {
  constructor(classes = "", attrs: Attributes = null, data: ElementData = []) {
    super('ul', classes, attrs, data)
  }
}

export class Li extends fl_element {
  constructor(classes = "", attrs: Attributes = null, data: ElementData = []) {
    super('li', classes, attrs, data)
  }
}

export class Layout extends fl_element {
  constructor(type: string, width: number, classes = "", attrs: Attributes = null, data: ElementData = []) {
    super(`div`, `col-${type}-${width} ${classes}`, attrs, data)
  }
}
