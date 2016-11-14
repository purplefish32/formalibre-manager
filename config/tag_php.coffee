module.exports =
  debug:(str,obj,meta)->
    console.dir str
    console.dir meta.path
    console.dir obj
    console.dir meta

    ###
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

  generate_ctrl:(str,obj,meta)->
    @debug str,obj,meta
    str = (obj.filter (elem) => !elem.index? or !elem.index)
      .map (elem) => meta.indent+"'#{elem.field}' => $#{meta.param[0]}->#{elem.field}"
      .join(',\n')
    str
