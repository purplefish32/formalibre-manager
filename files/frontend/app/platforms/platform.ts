export class Platform {
  /*$ platforms@generate_constructor */
  fromPlatformSerial(obj) {
    this.id= obj.id
    this.name= obj.name
    this.subdomain= obj.subdomain
    this.description= obj.description
    this.plan= obj.plan
    this.end_date= new Date(obj.end_date)
    this.max_users= obj.max_users
    this.max_disk_space= obj.max_disk_space
    this.contact_name= obj.contact_name
    this.contact_email= obj.contact_email
    this.contact_phone= obj.contact_phone
  }
  /*$  */
  /*$ platforms@generate_if */
  id: string;
  name: string;
  subdomain: string;
  description: string;
  plan: string;
  end_date: Date;
  max_users: string;
  max_disk_space: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  /*$  */
}

export class PlatformSerial {
  /*$ platforms@generate_ser_constructor */
  static fromPlatform(obj) {
    let serverialized = new PlatformSerial
    serverialized.id= obj.id
    serverialized.name= obj.name
    serverialized.subdomain= obj.subdomain
    serverialized.description= obj.description
    serverialized.plan= obj.plan
    serverialized.end_date= obj.end_date.toISOString()
    serverialized.max_users= obj.max_users
    serverialized.max_disk_space= obj.max_disk_space
    serverialized.contact_name= obj.contact_name
    serverialized.contact_email= obj.contact_email
    serverialized.contact_phone= obj.contact_phone
    return serverialized
  }
  /*$  */
  /*$ platforms@generate_ser_if */
  id: string;
  name: string;
  subdomain: string;
  description: string;
  plan: string;
  end_date: date;
  max_users: string;
  max_disk_space: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  /*$  */
}
