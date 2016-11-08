export class Env {
  public Base :string
  public g_conf_element:string
  public g_element_table:string
  public g_local_object:string
  public g_angular_detail_comp:string
  public g_title:string
  public g_title_singular:string
  public g_small_title:string
  public g_small_title_singular:string
  public g_list_route:string
  public g_edit_route:string
  public g_new_button_title:string

  constructor(public base:string) {
    this.Base = base.charAt(0).toUpperCase() + base.slice(1)
    this.g_conf_element= `${base}s`
    this.g_element_table= `${base}s`
    this.g_local_object= `${base}`
    this.g_angular_detail_comp= `${this.Base}`
    this.g_title= `${this.Base}s`
    this.g_title_singular= `${this.Base}`
    this.g_small_title= `${base}s`
    this.g_small_title_singular= `${base}`
    this.g_list_route= `#/${base}s`
    this.g_edit_route= `/${base}/new`
    this.g_new_button_title = `Add new ${this.g_title_singular}`
  }

  f(field:string):string {
    return `{{${this.g_local_object}.${field}}}`
  }
}
