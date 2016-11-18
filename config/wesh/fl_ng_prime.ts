import * as fl_c from './fl_common'
import * as fl_bc from './fl_breadcrumb'
import * as fl_m from './fl_manager_comp'
import {fl_container, fl_element} from './fl_comp'




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


export class Prime extends fl_element {
  constructor(elem, classes = '', attr = []) {
    if (!elem.length)
      throw "Missing element name for ng-prime component"
    super(`p-` + elem, classes, attr)
  }
}

export class PrimeTableRow extends Prime {
  constructor(classes = '', attr = [], field = "", header = "", filter = false, type = 'string') {
    if (!field.length || !header.length)
      throw "Missing element name or field for PrimeTableRow component"

    attr.push(`field="${field}"`)
    attr.push(`header="${header}"`)

    if (filter) {
      attr.push(`'[filter]'="true"`)
      attr.push(`filterMatchMode="contains"`)
      attr.push(`filterPlaceholder="Search"`)
    }

    super(`column`, classes, attr)
    if (type == 'date') {
      let template = new fl_element("template", "", [`'let-col'=''`, `let-row="rowData"`, `pTemplate`, `type="body"`], `{{date(row[col.field])}}`)
      this.add(template)
    } else if (type == 'markdown') {
      let template = new fl_element("template", "", [`let-server="rowData"`, `pTemplate`, `type="body"`],
        new fl_element('div', '', [`'[innerHTML]'="server.description|MarkdownToHtml"`])
      )
      this.add(template)
    }
  }
}

export class PrimeTable extends Prime {
  constructor(value = '', classes = '', attr = [], headers) {
    if (!value.length)
      throw "Missing binding value for PrimeTable"
    attr.push(`'[value]'="${value}"`)
    super(`dataTable`, classes, attr)
    if (headers)
      this.setHeaders(headers);
  }

  addHeaderCol(attr: string[] = [], field = "", header = "", filter = false, type = "string") {
    return this.add(new PrimeTableRow('', attr, field, header, filter, type))
  }

  // addCol(attr: string[] = [], data = "") {
  //   this.add(new TableCol("", attr, data))
  // }
  //
  // addCols(elems: string[], attr: string[] = []) {
  //   elems.forEach(elem => this.addCol(attr, elem))
  // }

  setHeaders(headers: any[]) {
    if (!headers.length)
      return

    headers.forEach(
      header => {
        let filter = header.hasOwnProperty('filter') && header.filter
        this.addHeaderCol([], header.field, header.name, filter, header.type || 'string')
      })

    return this
  }
}
