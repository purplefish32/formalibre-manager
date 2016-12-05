import * as pug from 'pug'
import { fl_renderer } from './fl_comp'

export class fl_jadeRenderer extends fl_renderer {
  constructor(private pretty = true, private jade = false) { super() }

  render_finalize(text: string) {
    if (this.jade)
      return text
    let html = "<p>error</p>"

    try {
      // Compile a function
      let fn = pug.compile(text, { pretty: this.pretty });

      // Render the function
      html = fn({});

    }
    catch (e) {
      console.log(e)
      console.log(text)
    }
    return html;
  }

  private static escapeAngular(attr: string): string {
    return attr.replace(/^([\[\(]+[^\)\]]*[\)\]]+)/gm, "'$1'")
  }

  private static armonizeAttr(attr: string): string {
    if(typeof attr != 'string') {
      console.log("Attribute is not a string:",attr)
      console.trace()
      throw("Attribute is not a string")
    }
    return fl_jadeRenderer.escapeAngular(attr.trim())
  }

  private static attr(attrs: string[]): string {
    return attrs.length ? '(' + attrs.map(fl_jadeRenderer.armonizeAttr).join(', ') + ')' : ""
  }

  private static clas(str): string {
    return str
      .split(' ')
      .filter(c => c.length)
      .reduce(function(a, c) { return a + '.' + c; });
  }

  render_text(str: string): string {
    return "| " + str
  }

  render_elem(subs: string[], elem: string, classes: string = "", attrs: string[] = [], indentSrt: string): string {
    if (classes)
      elem += "." + fl_jadeRenderer.clas(classes);
    if (attrs)
      elem += fl_jadeRenderer.attr(attrs);

    subs.unshift(elem)

    return subs.join("\n")
  }
}
