//TODO move jade rendering out
import * as pug from 'pug'

abstract class fl_renderer {
  abstract render_text(str: string): string

  local_render_text(str: string): string {
    return this.render_text(str)
  }

  abstract render_elem(elem: string, classes: string, attrs: any): string

  local_render_elem(elem: string, classes: string, attrs: any): string {
    if (typeof attrs === 'string')
      attrs = [attrs]
    return this.render_elem(elem, classes, attrs)
  }

  render_finalize(text: string): string {
    throw ('calling virtual')
  }
}

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
    let str = ""
    if (attrs.length) {
      str = '(' + attrs.join(', ') + ')';
    }

    return str
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

abstract class fl_renderable {
  abstract render(renderer: fl_renderer, level: number);

  indentStr(level: number): string {
    return " ".repeat(level * 2)
  }

  add(
    elem: fl_renderable | string = null,
    classes: string = null,
    attrs: string[] = [],
    data: string = null): fl_container {

    console.trace("Here I am!")
    throw ("Sorry can't call on a renderable (must be at least a container)")

  }
}

export class fl_container extends fl_renderable {

  elems: fl_renderable[] = []
  origin: fl_container = this

  constructor() {
    super()
  }

  addRaw(elem: fl_renderable): fl_container {
    this.elems.push(elem)
    return this
  }

  addSelf(
    elem: fl_renderable | string,
    classes: string = "",
    attrs: string[] = [],
    data: string = null): fl_container {

    let debug = function() {
      console.dir(this)
      console.log("elem:")
      console.dir(elem)
      console.log("classes:")
      console.dir(classes)
      console.log("attrs:")
      console.dir(attrs)
      console.log("data:")
      console.dir(data)
      console.trace("Here I am!")
    }

    if (elem instanceof fl_renderable) {
      if (classes.length || attrs.length || data) {
        debug()
        throw ('no data field allowed when adding a renderable element')
      }
    }
    else //if (classes != null)
      elem = new fl_element(elem, classes, attrs, data)

    this.addRaw(elem)

    return this
  }


  add(
    elem: fl_renderable | string | fl_renderable[],
    classes: string = "",
    attrs: string[] = [],
    data: string = null): fl_container {

    if(elem instanceof Array) {
      elem.forEach(e=>this.add(e))
    } else if (this != this.origin) {
      this.origin.addSelf(elem, classes, attrs, data)
    }  else {
      this.addSelf(elem, classes, attrs, data)
    }

    return this
  }

  addSub(
    elem: fl_renderable | string,
    classes: string = "",
    attrs: string[] = [],
    data: string = null): fl_container {

    if (this != this.origin) {
      this.origin.addSub(elem, classes, attrs, data)
    }
    else {
      this.last().add(elem, classes, attrs, data)
    }

    return this
  }

  last() {
    if (!this.elems.length) {
      console.trace("Here I am!")
      throw ("Sorry no element")
    }
    return this.elems[this.elems.length - 1]
  }

  setForOrigin(): fl_container {
    let last = this.last()
    if (!(last instanceof fl_container)) {
      console.trace("Here I am!")
      throw ("Sorry not a container")
    }
    return this.setOrigin(last)
  }

  setOrigin(origin: fl_container = null) {
    if (!origin) {
      console.trace("Here I am!")
      throw ("Sorry no renderable element")
    }
    return this.origin = origin
  }

  render(renderer: fl_renderer, level: number = 0) {
    let renderedString = this.elems.map(elem => elem.render(renderer, level)).join("\n")
    if (!level) {
      renderedString = renderer.render_finalize(renderedString)
    }
    return renderedString
  }
}

export class fl_element extends fl_container {

  constructor(
    private elem: string = "",
    private classes = "",
    private attrs: string[] = [],
    private data: string|fl_container = null) {
    super()
    if( this.data && typeof this.data === 'object' ) {
      this.add(data)
      delete this.data
    }
  }

  render(renderer: fl_renderer, level: number = 0): string {
    let indentStr = this.indentStr(level);
    let str = ""
    let subs = []

    let indentLevel = level

    if (this.elem.length + this.classes.length) {
      str = indentStr + renderer.local_render_elem(this.elem, this.classes, this.attrs);
      indentLevel++
    }

    if (this.elems.length)
      subs = this.elems.map(elem => elem.render(renderer, indentLevel))
    if (this.data)
      str += " " + this.data

    if (str.length)
      subs.unshift(str)

    let renderedString = subs.join("\n")

    if (!level)
      renderedString = renderer.render_finalize(renderedString)

    return renderedString
  }
}

export class fl_text extends fl_renderable {

  constructor(private text: string = "") {
    super()
  }

  render(renderer: fl_renderer, level: number = 0): string {

    let renderedString = this.indentStr(level) + renderer.local_render_text(this.text);

    if (!level)
      renderedString = renderer.render_finalize(renderedString)

    return renderedString
  }
}
