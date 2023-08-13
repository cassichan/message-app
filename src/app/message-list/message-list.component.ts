import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnDestroy {
  messages = new Observable((observer) => {
    try {
      observer.next('Hello');
      observer.next('Hello again');
    } catch (err) {
      observer.error(err);
    }
    return {
      unsubscribe() {
        observer.complete();
        console.log('No more messages!');
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
    complete() {
      console.log('Read all messages!');
    },
  });

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}

// Use the catchError() rxjs operator to handle errors in the observable
