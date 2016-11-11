export class Event {
  constructor(ressource_id:string,post:string) {
    this.ressource_id = ressource_id
    this.post = post
  }
  /*$ events/model@generate_if */
  id: string;
  ressource_id: string;
  date: string;
  post: string;
  /*$  */
}
