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

  private static attr(attrs: string[]): string {
    return attrs.length ? '(' + attrs.join(', ') + ')' : ""
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

  render_elem(elem: string, classes: string = "", attrs: string[] = []): string {
    if (classes)
      elem += "." + fl_jadeRenderer.clas(classes);
    if (attrs)
      elem += fl_jadeRenderer.attr(attrs);

    return elem
  }
}
