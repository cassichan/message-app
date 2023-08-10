import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnDestroy {
  messages = new Observable((observer) => {
    observer.next('Hello');
    observer.next('Hello again');
    observer.error('Error receiving the message');
    return {
      unsubscribe() {
        console.log('No more messages');
      },
    };
  });

  messageSubscription = this.messages.subscribe({
    next(message) {
      console.log(`Message: ${message}`);
    },
    error(err) {
      console.log(`Error: ${err}`);
    },
  });

 ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
