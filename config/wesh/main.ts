let pretty = true

import * as config from '../../model.json'
import * as fl_servers from './fl_servers'
import * as fl_platforms from './fl_platforms'
import {fl_container, fl_element, fl_jadeRenderer} from './fl_comp'

interface String {
  repeat(count: number): string
  substr(from: number, length?: number): string
}

let renderer = new fl_jadeRenderer(pretty, false)

fl_servers.doJob(config,renderer)
fl_platforms.doJob(config,renderer)
