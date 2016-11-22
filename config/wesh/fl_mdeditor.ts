/*
  fl_comp support for SimpleMDE markdown editor

  Requirement follows
*/

import {fl_element, fl_text, Attributes, ElementData} from './fl_comp'
import * as fl_c from './fl_common'

/*
   Usage example :

    let timeline = new fl_md.MDEditor()

*/


// Timeline container
// contains TimelineElement herited element
export default class fl_mdeditor extends fl_element {
  constructor(text) {
    super("mdeditor", "", [`'[(content)]'="${text}"`])
  }
}
