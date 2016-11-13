import {fl_container, fl_element} from './fl_comp'

export class Section extends fl_element {
  constructor(sectionName) {
    super("section", sectionName)
  }
}

export class MainCol extends fl_element {
  constructor(screen = 'md', len = 12) {
    super('div', 'row')
    this.add("div", `col-${screen}-${len}`).setForOrigin()
  }
}

export class SectionContent extends Section {
  constructor() { super('content') }
}

export class Link extends fl_element {
  constructor(classes = "", attr = [], data = null) {
    super('a', classes, attr, data)
  }
}

export class Ol extends fl_element {
  constructor(classes = "", attr = [], data = null) {
    super("ol", classes, attr, data)
  }
}

export class Logo extends fl_element {
  constructor(logo, attr = [], data = "") {
    super('i', `fa fa-${logo}`, attr, data)
  }
}

export class BoxGeneric extends fl_element {
  constructor(classes = "",type='box',...args=[]) {
    if(typeof classes != 'string') {
      args.unshift(classes)
      classes=""
    }
    super('div', `box ${classes}`, [])
    this.add(args)
  }
}

export class Box extends BoxGeneric {
  constructor(classes = "",...args=[]) {
    super(classes,'box',args)
  }
}

export class BoxBody extends BoxGeneric {
  constructor(classes = "",...args=[]) {
    super(classes,'box-body',args)
  }
}

export class BoxFooter extends BoxGeneric {
  constructor(classes = "",...args=[]) {
    super(classes, 'box-footer',args)
  }
}

export class BoxInfo extends fl_element {
  constructor(data, classes = "", attrs: string[] = []) {
    super('div', 'callout callout-info ', attrs)
    this.add('p', classes, [], data).setForOrigin()
  }
}

export class Span extends fl_element {
  constructor(classes = "", attr = []) {
    super('span', classes, attr)
  }
}

export class Button extends fl_element {
  constructor(classes = "btn-primary", attrs: string[] = [], data = "", logo = null) {
    super('button', 'btn ' + classes, attrs, logo ? "" : data)
    if (logo)
      this.add(new Logo(logo, [], data)).setForOrigin()
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
  constructor(classes, attr) {
    attr.push(`type='text'`)
    super(classes, attr)
  }
}

export class Text extends fl_element {
  constructor(data = "", classes = "", attr = []) {
    super('p', classes, attr, data)
  }
}

export class ModelInput extends TextInput {
  constructor(model, name, classes, attr) {
    attr.push(`name ='${name}'`)
    attr.push(`'[(ngModel)]'='${model}.${name}'`)
    classes += " form-control"
    super(classes, attr)
  }
}

export class ModelText extends Text {
  constructor(model, name, classes, attr) {
    super(`{{${model}.${name}}}`,classes, attr)
  }
}

export class TableHeader extends fl_element {
  constructor(classes = "", attr = [], data: string = null) {
    super(`th`, classes, attr, data)
  }
}

export class TableRow extends fl_element {
  constructor(classes = "", attr = [], data = "") {
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
  constructor(classes = "", attr = [], data = "") {
    super(`td`, classes, attr, data)
  }
}

export class Table extends fl_element {
  constructor(classes = '', attr = []) {
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
        header => row.addHeader("sorting",['tabindex="0"','aria-controls="example2"','rowspan="1"','colspan="1"','aria-label="Rendering engine: activate to sort column ascending"'], header))
    }
    else {
      let h: fl_element[] = <fl_element[]>headers;
      h.forEach(
        header => row.addHeader("sorting",['tabindex="0"','aria-controls="example2"','rowspan="1"','colspan="1"','aria-label="Rendering engine: activate to sort column ascending"'], header))
    }

    return this
  }
}
