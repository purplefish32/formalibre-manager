_ = require 'underscore'

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
    debug:(str,obj,meta)->
      console.dir str
      console.dir obj
      console.dir meta

    rc:'\n'

    capitalize:(s)->
      s.toLowerCase().replace( /\b./g, (a) -> a.toUpperCase()  )

    input_text_elem:(modelName,fieldName,required) ->
      required = if required? and required is 'true' then "required" else ""
      "<input type='text' name='#{fieldName}' #{required}  [(ngModel)]='#{modelName}.#{fieldName}' class='form-control'>"

    option_elem:(modelName,fieldName,required,options) ->
      required = if required? and required is 'true' then "required" else ""
      ret=options.map (option)=>
        selected = if option.selected? and option.selected is 'true' then "selected" else ""
        "  <option value=#{option.value} #{selected}>#{option.value}</option>"+@rc
      ret.unshift "<select name='#{fieldName}' required [(ngModel)]='#{modelName}.#{fieldName}' class='form-control'>\n"
      ret.push "</select>"
      ret

    generate_form:(str,obj,meta)->
        #@debug str,obj,meta
        obj.forEach (elem) =>
          return if elem.index?
          str += @rc if str isnt ''
          str += meta.indent
          str += '<div class="form-group">'+@rc
          if elem.name?
            name = elem.name
          else
            name = elem.field
            name = @capitalize name if name.length
          str += meta.indent+"  "
          str += "<label for='#{elem.field}'>#{name}</label>"
          str += elem.description if elem.description?
          str += @rc
          if !elem.type?
            str += meta.indent+"  "+@input_text_elem meta.param[0],elem.field,elem.required
          else if elem.type = 'option'
            str += ( (@option_elem meta.param[0],elem.field,elem.required,elem.options).map (line)-> meta.indent+'  '+line).join ''
          else
            str+='unsuported'

          str += @rc+meta.indent+"</div>"

        str

    extract:(elem,meta)->
      elem[meta.param[1]]

    getName:(elem,meta)->
        if elem.name?
          name = elem.name
        else
          name = elem.field
          name = @capitalize name if name.length
        name

    prefix:(elem,meta)->
      pref = meta.param[1].replace('/','.')
      pref+elem

    forEach:(str,obj,meta)->
        if _.isObject str
          obj = str.obj
          str = str.str
        str:str
        obj:obj.map (name) =>
              @[meta.param[0]] name,meta

    removeIdx:(str,obj,meta)->
        if _.isObject str
          obj = str.obj
          str = str.str
        str:str
        obj:obj.filter (elem) =>
              !elem.index? or !elem.index


      #capitalize:(str,obj,meta)->
      #    obj.map (name) ->

    list:(str,obj,meta)->
          if _.isObject str
            obj = str.obj
            str = str.str
          obj.forEach (elem) =>
            #return if elem.index?
            str += @rc if str isnt ''

            s = meta.param[0].replace '#',elem

            str += meta.indent+s

          str
