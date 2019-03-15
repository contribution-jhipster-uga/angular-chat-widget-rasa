import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;

  constructor() {

  }

  public connect(url: string){
    this.socket = io(url);
    this.socket.on('connect', () => {
      this.socket.emit('session_request', {'session_id':this.socket.id})
    });
    this.socket.on('session_confirm', (remote_id) => {
    })
    this.socket.on('connect_error', (error) => {
      console.log(error);
    });

    this.socket.on('error', (error) => {
      console.log(error);
    });

    this.socket.on('disconnect', (reason) => {
      console.log(reason);
    });
  }

  public sendMessage(message) {
    this.socket.emit('user_uttered', {'message':message});
  }

  public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('bot_uttered', (message) => {
                observer.next(message);
            });
        });
  }
}
