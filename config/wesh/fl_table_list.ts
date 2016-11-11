import {fl_container, fl_element, fl_text} from './fl_comp'
import * as fl_c from './fl_common'
import * as fl_m from './fl_manager_comp'
import * as fl_p from './fl_ng_prime'

function __chain(obj,field: string, ...restOfFields: string[]) {
  if(obj.hasOwnProperty(field)) {
    if(restOfFields.length) {
      restOfFields.unshift(obj[field])
      return __chain.apply(null,restOfFields)
    } else {
      return obj[field]
    }
  }
  return undefined
}

function addNgRow(name: string, obj_name: string, ...args:any[]) {
  // template inside binding to the current element
  // that contains the provided obj
  console.dir(args)
  let template = new fl_element("template", "", [`let-${obj_name}="rowData"`, `pTemplate`, `type="body"`])

  args.forEach(arg=>template.add(arg))

  return new fl_element(
    "p-column", "", [`"header"="${name}"`, `'[style]'="{'width':'0px'}"`]
  ).add(template)
}

export class ElementsList extends fl_m.ListFromModel {
  constructor(config, env) {
    super(config[env.g_conf_element].model)

    let table = null;

    let headers = this.getPrimeHeaders();

    let editButtonVisible = !!__chain(config[env.g_conf_element], "crud", "edit")
    let viewButtonVisible = !!__chain(config[env.g_conf_element], "crud", "view")

    if(config.config.usePrimeNg) {
      // create a table from headers
      table = new fl_p.PrimeTable(`${env.g_element_table}`,'',[],headers)

      let buttons = []

      if (editButtonVisible)
        buttons.push(fl_m.editButton(env.g_local_object))
      if (viewButtonVisible)
        buttons.push(fl_m.viewButton(env.g_local_object))

      // add edit button if necessary
      if (editButtonVisible || viewButtonVisible) {
        table.add(addNgRow.call(this,'',env.g_local_object,...buttons))
      }
    }
    else {
      if(editButtonVisible) {
        headers.push({name:'Edit',field:'edit'})
      }

      table = new fl_c.Table('table', [`*ngIf="${env.g_element_table}?.length"`]).
        setHeaders(headers.map(header=>header.name)).
        addRow([`${env.g_angular_detail_comp}Detail`, `*ngFor="let i of ${env.g_element_table}"`, `'[${env.g_local_object}]'='i'`])
    }

    let menuBar = new fl_c.BoxFooter().add(
      new fl_m.Button([`routerLink="${env.g_edit_route}"`], env.g_new_button_title))

    this.add(menuBar)
      .add(
      new fl_c.Box()
        .add(table)
        .add(new fl_c.BoxInfo(`There are no ${env.g_small_title} yet. Feel free to add your first ${env.g_small_title_singular} using the "${env.g_new_button_title}" button.`, "", [`*ngIf!="${env.g_element_table} && !${env.g_element_table}?.length"`]))
        .add(new fl_c.BoxInfo(`Loading...`, "", [`*ngIf="!${env.g_element_table}"`]))
      )
      .add(menuBar)
  }
}

export class ElementsListPage extends fl_m.MainCol {
  constructor(config, env) {
    super();
    this.add(new fl_m.PageHeaders(
      env.g_title, [{
        name: env.g_title,
        isactive: true
      }])
    ).add(new ElementsList(config, env))
  }

  tohtml(renderer): string {
    return this.render(renderer)
  }
}

export class ElementDetail extends fl_m.ListDetail {
  constructor(config, env) {
    super(env.g_local_object, fl_m.getFields(env.g_local_object, config[env.g_conf_element]))
  }

  tohtml(renderer): string {
    return this.render(renderer)
  }
}

export class ElementsEdit extends fl_m.ListFromModel {
  constructor(config, env) {
    super(config[env.g_conf_element].model)

    let fieldSet = new fl_element('fieldset')
      .add(new fl_c.Legend(`${env.g_title_singular} details`))

    let formBody = new fl_c.BoxBody("", fieldSet)
    let formContainer = new fl_c.Box("", formBody)

    let capitalize = s =>
      s.toLowerCase().replace(/\b./g, a => a.toUpperCase())

    let menuBar = new fl_c.BoxFooter()
      .add(fl_m.submitButton([`'(click)'="onSubmit()"`, `'[disabled]'="!elementForm.form.valid"`]))
      .add(new fl_c.Span('', [`'[hidden]'="!${env.g_local_object} || !${env.g_local_object}.id"`])
        .add(fl_m.deleteButton([`'(click)'="onDelete()"`]))
      )

    config[env.g_conf_element].model
      .filter(element => !element.index && !__chain(element, "crud", "edit"))
      .forEach(function(element) {
        if (!element.name)
          element.name = capitalize(element.field)

        let formGroup = new fl_c.FormGroup()
          .add(new fl_m.Label(element.name, []))

        if (element.description)
          formGroup.add(new fl_text(" " + element.description))

        let attr = []
        if (element.required)
          attr.push('required')

        if (element.type === "option") {
          attr.push(`name="${element.field}"`)
          attr.push([`'[(ngModel)]'='${env.g_local_object}.${element.field}'`])

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
          formGroup.add(new fl_m.ModelInput([env.g_local_object, element.field], attr))

        fieldSet.add(formGroup)

      })

    this.add(
      new fl_element('form', 'form', [`'#elementForm'="ngForm"`])
        .add(formContainer)
    ).add(menuBar)
  }
}

export class ElementEditPage extends fl_m.MainCol {
  constructor(config, env) {
    super();
    this.add(new fl_m.PageHeaders(
      'Edit ' + env.g_title_singular, [{
        name: env.g_title,
        isactive: false,
        link: env.g_list_route
      }, {
          name: 'Edit ' + env.g_title_singular,
          isactive: true
        }])
    ).add(new ElementsEdit(config, env))
  }

  tohtml(renderer): string {
    return this.render(renderer)
  }
}

export class ElementsView extends fl_m.ListFromModel {
  constructor(config, env) {
    super(config[env.g_conf_element].model)

    let boxDetail = new fl_c.Box("",
      new fl_c.Legend(`${env.g_title_singular} Details`)
    )

    let capitalize = s =>
      s.toLowerCase().replace(/\b./g, a => a.toUpperCase())

    let menuBar = new fl_c.BoxFooter()
      //.add(fl_m.editButton([`'(click)'="onSubmit()"`, `'[disabled]'="!elementForm.form.valid"`]))
      .add(new fl_c.Span('', [`'[hidden]'="!${env.g_local_object} || !${env.g_local_object}.id"`])
        .add(fl_m.deleteButton([`'(click)'="onDelete()"`]))
      )

    config[env.g_conf_element].model
      .filter(element => !element.index)
      .forEach(function(element) {
        if (!element.name)
          element.name = capitalize(element.field)

        boxDetail.add(new fl_m.Label(element.name, []))

        if (element.description)
          boxDetail.add(new fl_text(" " + element.description))

        boxDetail.add(new fl_m.ModelText(env.g_local_object, element.field))
      })

    let boxHistory = new fl_c.Box()

    this.add([
      boxDetail,
      menuBar])
  }
}

