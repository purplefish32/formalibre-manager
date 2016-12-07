module.exports =
  ###
  debug:(str,obj,meta)->
    console.dir str
    console.dir meta.path
    console.dir obj

  #this command add a semicolon to a previously piped command or to the object
  decl:(str,obj,meta)->
    if str is ""
      obj+";"
    else
      str+";"

  # this command trim the passed object.
  trim:(str,obj)-> obj.trim()

  # this command concat the two fields of the passed object
  filter:(str,obj,meta)->
      obj[param1]+obj[param2]
  ###
  rc:'\n'

  generate_if:(str,obj,meta)->
    #@debug str,obj,meta
    obj.model.forEach (elem) =>
      str += @rc if str isnt ''
      str += meta.indent+elem.field
      str += ": "
      if !(elem.type?)
        str+='string'
      else if elem.type is 'option'
        str+='string'
      else if elem.type is 'joint'
        str+='string'
      else if elem.type is 'markdown'
        str+='string'
      else if elem.type is 'date'
        str+='Date'
      else
        str+='unsuported'
      str += ";"
    str

  generate_ser_if:(str,obj,meta)->
    #@debug str,obj,meta
    obj.model.forEach (elem) =>
      str += @rc if str isnt ''
      str += meta.indent+elem.field
      str += ": "
      if !(elem.type?)
        str+='string'
      else if elem.type is 'option'
        str+='string'
      else if elem.type is 'joint'
        str+='string'
      else if elem.type is 'markdown'
        str+='string'
      else if elem.type is 'date'
        str+='string'
      else
        str+='unsuported'
      str += ";"
    str

  generate_constructor:(str,obj,meta)->
    ##@debug str,obj,meta
    str += @rc if str isnt ''
    indent = meta.indent
    str += indent + "from"+obj.type+"Serial(obj) {"
    obj.model.forEach (elem) =>
      str += @rc if str isnt ''
      str += meta.indent+"  this."+elem.field
      str += "= "
      if !(elem.type?)
        str+='obj.'+elem.field
      else if elem.type is 'option'
        str+='obj.'+elem.field
      else if elem.type is 'joint'
        str+='obj.'+elem.field
      else if elem.type is 'markdown'
        str+='obj.'+elem.field
      else if elem.type is 'date'
        str+='new Date(obj.'+elem.field+")"
      else
        str+='unsuported'
    str += @rc if str isnt ''
    str += meta.indent+"}"
    str

  generate_ser_constructor:(str,obj,meta)->
    ##@debug str,obj,meta
    str += @rc if str isnt ''
    indent = meta.indent
    str += indent + "from"+obj.type+"(obj) {"
    obj.model.forEach (elem) =>
      str += @rc if str isnt ''
      str += meta.indent+"  this."+elem.field
      str += "= "
      if !(elem.type?)
        str+='obj.'+elem.field
      else if elem.type is 'option'
        str+='obj.'+elem.field
      else if elem.type is 'joint'
        str+='obj.'+elem.field
      else if elem.type is 'markdown'
        str+='obj.'+elem.field
      else if elem.type is 'date'
        str+='obj.'+elem.field+".toISOString()"
      else
        str+='unsuported'
    str += @rc if str isnt ''
    str += meta.indent+"}"
    str

  capitalize:(word)->word.charAt(0).toUpperCase() + word.slice 1

  import_modules:(str,obj,meta)->
    plural = meta.path[0]
    singular = plural.slice 0,-1
    Plural = @capitalize plural
    Singular = @capitalize singular

    import_cmd=(obj,file)->
      "import { #{obj}Component } from './#{file}.component'"

    import_cmd_action=(action)=>
      import_cmd Singular+@capitalize(action),singular+"-#{action}"

    str += import_cmd Plural,plural

    action_list = ["detail","edit"]

    action_list.push("view") if obj.crud?.view

    actions = action_list.map(import_cmd_action).join(@rc)
    if(actions.length)
      str += @rc + actions
    str

  list_modules:(str,obj,meta)->
    @debug str,obj,meta
    plural = meta.path[0]
    singular = plural.slice 0,-1
    Plural = @capitalize plural
    Singular = @capitalize singular

    import_cmd=(obj)->
      "#{obj}Component,"

    import_cmd_action=(action)=>
      import_cmd Singular+@capitalize(action)

    str += import_cmd Plural

    action_list = ["detail","edit"]


    action_list.push("view") if obj.crud?.view

    actions = action_list.map(import_cmd_action).join(@rc)
    if(actions.length)
      str += @rc + actions
    str
