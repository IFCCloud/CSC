import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages : string[] = [];
  class : string;
  constructor() { }

  add(type : string, message : string) {
    if (this.messages.length > 0) {
      this.messages[0] = message;
    } else {
      this.messages.push(message);
    }

    this.class = "alert alert-" + type + " alert-dismissible";
  }

  clear() {
    this.messages = [];
  }
}

