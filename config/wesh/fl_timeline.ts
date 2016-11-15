/*
  fl_comp support for Admin LTE timeline

  Requirement follows
*/

import {fl_element, fl_text, Attributes, ElementData} from './fl_comp'
import * as fl_c from './fl_common'

/*
   Usage example :

    let timeline = new fl_tl.Timeline()

    timeline.AddLabel('green').addText('10 fev 2014')

    // angular2 example
    timeline.AddItem('envelope', "blue", "", [`*ngFor="let event of ${env.g_local_object}.events"`]).addContent()
              .addHeader("{{date(event.date)}}", 'titel')
              .addBody("{{event.post}}")
              .addFooter(new fl_m.DeleteButton())

    // custom content
    timeline.AddItem('envelope', "blue", "", []).addContent()
              .add([new fl_element('h1','',[],'custom data'),'some data'])


    timeline
      .add(new fl_tl.TimelineLabel('green',[new fl_c.Icon('clock-o', [], 'orange'),'hello']))
      .add(new fl_tl.TimelineLabel('green',[new fl_c.Icon('clock-o', [], 'orange'),'hello']))
      .add(new fl_tl.TimelineIcon('plane', "yellow"))
    timeline.AddIcon('plane', "yellow")
    timeline.AddIcon('plane', "yellow")
    timeline.AddIcon("circle","gray")

*/


// Timeline container
// contains TimelineElement herited element
export class Timeline extends fl_c.Ul {
  constructor(data: TimelineElement[] = []) {
    super("timeline timeline-inverse", [], data)
  }

  AddLabel(color = "blue", data: ElementData = []) {
    let item = new TimelineLabel(color, data)
    this.add(item)
    return item
  }

  AddItem(icon = "circle", color = "blue", classes = "", attrs: Attributes = [], data: ElementData = []): TimelineItem {
    let item = new TimelineItem(icon, color, classes, attrs, data)
    this.add(item)
    return item
  }

  AddIcon(icon = "circle", color = "blue") {
    let item = new TimelineIcon(icon, color)
    this.add(item)
    return item
  }


  End(icon, color = "blue", classes = "", attrs: Attributes = []) {
    let item = new TimelineItem(icon, color, classes, attrs)
    this.add(item)
    return item
  }
}

// Base for element in the time line
export class TimelineElement extends fl_c.Li {
  constructor(classes = "", attrs: Attributes = [], data: ElementData = []) {
    super(`time-label ${classes}`, attrs, data)
  }
}

// A label on the timeline
export class TimelineLabel extends TimelineElement {
  constructor(color = "blue", data: ElementData = []) {
    super('', [], [])
    this.add(new fl_c.Span(`bg-${color}`)).setForOrigin()
    this.add(data)
  }
}

// Some data on the timeline
// use addContent to add the default content message
export class TimelineItem extends TimelineElement {
  constructor(icon = 'circle', color = "blue", classes = "", attrs: Attributes = [], data: ElementData = []) {
    super(classes, attrs, data)
    this.add(new fl_c.Icon(icon, [], color))
  }

  addContent(data: ElementData = []): TimelineItemContent {
    let content = new TimelineItemContent(data)
    this.add(content).setForOrigin()
    return content
  }
}

// Data contained into a Timeline Element (default format)
export class TimelineItemContent extends fl_element {
  constructor(data: ElementData = []) {
    super('div', 'timeline-item', [], data)
  }

  addHeader(date: string, data: ElementData = []) {
    this.add([
      new fl_c.Span("time", [], [new fl_c.Icon("clock-o", []), new fl_text(date)]),
      new fl_c.H(3, "timeline-header", [], data)
    ])
    return this
  }

  addBody(data: ElementData = []) {
    this.add(new fl_element('div', "timeline-body", [], data))
    return this
  }

  addFooter(data: ElementData = []) {
    this.add(new fl_element('div', "timeline-footer", [], data))
    return this
  }
}

// A icon alone on the timeline
export class TimelineIcon extends TimelineItem {
  constructor(icon = "circle", color = "blue") {
    super(icon, color, '', [], '&nbsp;')
  }
}
