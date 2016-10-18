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
    obj.forEach (elem) =>
      str += @rc if str isnt ''
      str += meta.indent+elem.field
      str += ": "
      if !(elem.type?)
        str+='string'
      else if elem.type is 'option'
        str+='string'
      else if elem.type is 'joint'
        str+='string'
      else
        str+='unsuported'
      str += ";"
    str
