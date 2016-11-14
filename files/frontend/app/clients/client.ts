import {ClientProfile} from './clientProfile'

export class Client {
  constructor(profile: ClientProfile = null) {
    if (profile) {
      for (var property in profile) {
        if (property != 'events') {
          if (profile && profile.hasOwnProperty(property)) {
            this[property] = profile[property]
          }
        }
      }
    }
  }
  /*$ clients/model@generate_if */
  id: string;
  name: string;
  lastname: string;
  organisation: string;
  email: string;
  phone: string;
  address: string;
  /*$  */
}
