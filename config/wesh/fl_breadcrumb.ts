import {fl_element, fl_container, fl_jadeRenderer} from './fl_comp'
import * as fl_c from './fl_common'
import * as fl_m from './fl_manager_comp'

export interface IBreadCrumbElement {
  name: string;
  isactive?: boolean;
  link?: string;
  logo?: string;
};

export class BreadCrumbs extends fl_element {
  constructor(elements: IBreadCrumbElement[]) {
    super("ol","breadcrumb")
    let o = this.createElem({
      name: 'Dashboard',
      isactive: false,
      link: "#/",
      logo: 'dashboard'
    });
    this.add(o)
    elements.forEach(element => this.add(this.createElem(element)))
  }

  createElem(element: IBreadCrumbElement): fl_element {
    let {name, isactive, link, logo} = element;

    let classes = ''

    if (isactive) classes += 'active'

    let setName = null

    if (!link)
      setName = name

    let o = new fl_element('li', classes, [], setName)

    if (link) {
      setName = name
      o.add(new fl_m.Link(setName,[`href="${link}"`])).setForOrigin()
    }

    if (logo) {
      o.add('i', `fa fa-${logo} `, [], "")
    }

    let renderer = new fl_jadeRenderer(true,true)
    console.log(o.render(renderer))

    return o;
  }
}
