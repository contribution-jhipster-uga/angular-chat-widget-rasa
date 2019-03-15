import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import { ChatService } from '../chatbot-rasa.service';

const rand = max => Math.floor(Math.random() * max)

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('bottom') bottom: ElementRef
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'
  @Input() public botName: string = 'Bot';
  @Input() public botAvatar: string = `https://cdn.dribbble.com/users/275794/screenshots/3128598/gbot_800.png`
  @Input() public userAvatar: string = `https://storage.proboards.com/6172192/images/gKhXFw_5W0SD4nwuMev1.png`
  @Input() public url: string = 'http://localhost:5002'

  public _visible = false

  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
    this.chatService.connect(this.url);
  }

  public get visible() {
    return this._visible
  }

  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  }

  public focus = new Subject()

  public operator;

  public client;

  public messages = []

  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    })
    this.scrollToBottom()
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

  ngOnInit() {
    this.client = {
      name: 'Guest User',
      status: 'online',
      avatar: this.userAvatar,
    };

    this.operator  = {
      name: this.botName,
      status: 'online',
      avatar: this.botAvatar,
    };
    setTimeout(() => this.visible = true, 1000)
    setTimeout(() => {
      this.addMessage(this.operator, 'Hi, how can we help you?', 'received')
    }, 1500)
    this.chatService
      .getMessages()
      .subscribe((message) => {
        setTimeout(()=> {this.addMessage(this.operator, message.text, 'received')},1000);
      });
  }

  public toggleChat() {
    this.visible = !this.visible
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }
    this.addMessage(this.client, message, 'sent')
    this.chatService.sendMessage(message)
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }

}
