import { fl_renderer } from './fl_comp'

export class fl_htmlRenderer extends fl_renderer {
  constructor() { super() }

  render_finalize(text: string) {
    return text;
  }

  render_text(str: string): string {
    return str
  }

  render_elem(subs: string[], elem: string, classes: string = "", attrs: string[] = [], indentStr: string): string {
    let open = `<${elem}`
    if (classes.length) {
      attrs.push('class="' + classes + '"')
      open += " " + attrs.join(' ')
    }
    open += ">"

    subs.unshift(open)

    subs.push(`${indentStr}</${elem}>`)

    return subs.join('\n')
  }
}
