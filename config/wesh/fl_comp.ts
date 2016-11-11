
// Union type for possible attributes values
// You can pass a string like " src='myimg.jpg' " or an array if you need to
// pass more than one attributes
export type Attributes = string | string[]


// Possible renderable parameters (a renderable or an array of renderable)
export type RenderableParam = fl_renderable | (fl_renderable|string)[]

// Union type for possible container data
// Could be either a free text that will be converted to a fl_text object
// A renderable element (or a list of) : fl_container, fl_element or anyone
// inheriting
export type ElementData = string | RenderableParam

// Union type for possible first parameter of function
// A string can be used to represent the type of element : 'div', 'img'
//(in that case other parameters are expected)
// Or you can pass directly a renderable element or an array of renderable
export type ElementParam = string | RenderableParam

// Abstract renderer
// This is the contract that need to fulfill any renderer
export abstract class fl_renderer {

  // Render some text from a text
  abstract render_text(str: string): string

  local_render_text(str: string): string {
    return this.render_text(str)
  }

  // Render some text from an element
  abstract render_elem(elem: string, classes: string, attrs: string[]): string

  local_render_elem(elem: string, classes: string, attrs: Attributes): string {
    if (typeof attrs === 'string')
      attrs = [attrs]
    return this.render_elem(elem, classes, attrs)
  }

  // Called at the end of the rendering process
  // (must be overloaded by the renderer)
  render_finalize(text: string): string {
    throw ('calling virtual')
  }
}

// Abstract renderable element
export abstract class fl_renderable {

  // A renderable element shall implement a render function that
  // uses the provided renderer and a provided depth and returns
  // the rendered string
  abstract render(renderer: fl_renderer, level: number): string;

  // Helper function for indenting according to the provided depth
  indentStr(level: number): string {
    return " ".repeat(level * 2)
  }

  // The add function must be overloaded. This function add an element
  // inside the current renderable element.
  // Either the user only provides an renderable element or a list of renderable
  // element (and no other parameters) either the user provides
  // a strings for the element (eg. 'div'), an optional classes parameter,
  // some optional attributes, and one or many internal data
  add(
    elem: ElementParam,
    classes: string = "",
    attrs: string[] = [], //TBD should be an Attributes type
    //TBD should be an ElementData type
    //TBD consider using also varargs
    data: string = null): fl_container {

    console.trace("Here I am!")
    throw ("Sorry can't call on a renderable (must be at least a container)")

  }
}

// Container element.
// This element as no other function than holding renderable elements
export class fl_container extends fl_renderable {

  // List of the holded renderable elements
  elems: fl_renderable[] = []

  // Point onto which element new element shall be added
  // The current one by default
  origin: fl_container = this

  // Nothing to do in the constructor
  constructor() {
    super()
  }

  // Raw function for adding one or several elements inside the container
  private addRaw(elem: RenderableParam): fl_container {
    if (Array.isArray(elem))
      this.elems.concat(<fl_renderable[]>elem)
    else
      this.elems.push(<fl_renderable>elem)
    return this
  }

  // Add an element to this object (ignore origin class attribute)
  // elem - a string or a elements or a list of elements
  // if elem is a string only
  // classes - the optional classes to use for this element
  // attrs - optional list of attributes
  // data - optional inner element data
  addSelf(
    elem: ElementParam,
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

    let renderable: RenderableParam

    // If the elem parameter is a renderable or an array nothing shall be done
    // except checking no other parameters where passed
    if (elem instanceof fl_renderable || Array.isArray(elem)) {
      if (classes.length || attrs.length || data) {
        debug()
        throw ('no data field allowed when adding renderable element(s)')
      }
      renderable = elem as RenderableParam
    }
    else // Otherwise create a full new element
      renderable = new fl_element(elem, classes, attrs, data)

    // Add the element to this object
    this.addRaw(renderable)

    return this
  }

  // Add an element (using origin class attribute)
  // elem - a string or a elements or a list of elements
  // if elem is a string only
  // classes - the optional classes to use for this element
  // attrs - optional list of attributes
  // data - optional inner element data
  //
  // Possible calls are :
  // add('div')
  // add('div','footer')
  // add('div','footer',['style="width:100%"'])
  // add('div','footer',['style="width:100%"'],'hello')
  // add('div','footer',['style="width:100%"'],new fl_element('div'))
  // add('div','footer',['style="width:100%"'],[new fl_element('div'),...])
  // add(new fl_element('div'))
  // add([new fl_element('div'),'text',element])
  add(
    elem: ElementParam,
    classes: string = "",
    attrs: string[] = [],
    data: string = null): fl_container {

    // if this is a list of element then recursive call for each of them
    // otherwise add to the origin element
    if (elem instanceof Array) {
      elem.forEach(e => {
        if(typeof e == 'string')
          this.addText(<string>e)
        else
          this.add(e)
      })
    } else /*if (this != this.origin)*/ {
      this.origin.addSelf(elem, classes, attrs, data)
    } /*else {
      this.addSelf(elem, classes, attrs, data)
    }*/

    return this
  }

  // Add simple text
  addText(str: string): fl_container {
    this.add(new fl_text(str))
    return this
  }

  // Same as add exepc that it adds inside the last added element (using origin)
  addSub(
    elem: fl_renderable | string,
    classes: string = "",
    attrs: string[] = [],
    data: string = null): fl_container {

    this.origin.last().add(elem, classes, attrs, data)
    /*if (this != this.origin) {
      this.origin.addSub(elem, classes, attrs, data)
    }
    else {
      this.last().add(elem, classes, attrs, data)
    }*/

    return this
  }

  // Add simple text in sub element
  addSubText(str: string): fl_container {
    this.addSub(new fl_text(str))
    return this
  }

  // return the last added element if any
  last(): fl_renderable {
    if (!this.elems.length) {
      console.trace("Here I am!")
      throw ("Sorry no element")
    }
    return this.elems[this.elems.length - 1]
  }

  // Set the last added element for origin
  setForOrigin(): fl_container {
    let last = this.last()
    if (!(last instanceof fl_container)) {
      console.trace("Here I am!")
      throw ("Sorry not a container")
    }
    return this.setOrigin(last as fl_container)
  }

  // Set a specific container for origin
  setOrigin(origin: fl_container = null): fl_container {
    if (!origin) {
      console.trace("Here I am!")
      throw ("Sorry no renderable element")
    }
    return this.origin = origin
  }

  // The mandatory render function
  render(renderer: fl_renderer, level: number = 0) {
    //Render the internal elements
    let renderedString = this.elems.map(elem => elem.render(renderer, level)).join("\n")
    //Call finalize on the outermost element
    if (!level) {
      renderedString = renderer.render_finalize(renderedString)
    }
    return renderedString
  }
}

//function isString()

// The base element
export class fl_element extends fl_container {

  // Attribute list
  private attrs: string[] = []

  // An element is made of the following
  // elem - the type of the element ('div', 'h1',...)
  // classes - an optional classes string
  // attrs - an optional list of Attributes
  // data - an optional list of inner elements
  constructor(
    private elem: string = "",
    private classes = "",
    attrs: Attributes = [],
    data: ElementData = []) {
    super()

    if ((!elem) || (!elem.length)) {
      throw "Invalid element name (elem parameter can't be empty)"
    }

    if (typeof classes != 'string') {
      console.trace()
      throw "Invalid element classes (classes must be a string or an empty string)"
    }

    // Initialize the attrs attribute
    if (!attrs) attrs = []
    if (typeof attrs === 'string') {
      this.attrs = [<string>attrs]
    } else {
      this.attrs = attrs
    }

    // if some data are provided
    if (data) {
      // Create a array of elements from it
      let local_data: RenderableParam
      if (typeof data === "string") {
        local_data = [new fl_text(data as string)]
      }
      else if (typeof data === "object" && data instanceof fl_renderable)
        local_data = [<fl_renderable>data]
      else
        local_data = data as RenderableParam

      // Add it inside the current element
      this.add(local_data)
    }
  }

  // the mandatory rendering function
  render(renderer: fl_renderer, level: number = 0): string {
    let indentStr = this.indentStr(level);
    let str = ""
    let subs = []

    let indentLevel = level

    // Render the current element
    //if (this.elem.length /*+ this.classes.length*/) {
    str = indentStr + renderer.local_render_elem(this.elem, this.classes, this.attrs);
    indentLevel++
    //}

    // render the sub elments
    //if (this.elems.length)
    subs = this.elems.map(elem => elem.render(renderer, indentLevel))


    //if (str.length)
    subs.unshift(str)

    let renderedString = subs.join("\n")

    if (!level)
      renderedString = renderer.render_finalize(renderedString)

    return renderedString
  }
}

// Render text
export class fl_text extends fl_renderable {

  // Some text must be provided
  constructor(private text: string = "") {
    super()
    if (typeof text != 'string')
      throw 'Invalid text parameter in fl_text (must be at least empty string)'
  }

  // the mandatory rendering function
  render(renderer: fl_renderer, level: number = 0): string {

    let renderedString = this.indentStr(level) + renderer.local_render_text(this.text);

    if (!level)
      renderedString = renderer.render_finalize(renderedString)

    return renderedString
  }
}
