import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

  msgs = []

  constructor() {
    console.log('Messages - constructor')
  }

  add(msg) {
    this.msgs.push(msg)
  }
}
