import { Event } from '../events/event';
export class ClientProfile {
  /*$ clients/model@generate_if */
  id: string;
  name: string;
  lastname: string;
  organisation: string;
  email: string;
  phone: string;
  address: string;
  /*$  */
  events:Event[]
}
