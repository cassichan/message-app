import { Component } from '@angular/core';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'message-app';
  // messages = new Observable((observer) => {
  //   observer.next('Hello');
  //   observer.error('Error receiving the message');
  //   return {
  //     unsubscribe() {
  //       console.log('No more messages');
  //     },
  //   };
  // });

  // messageSubscription = this.messages.subscribe({
  //   next(message) {
  //     console.log(`Message: ${message}`);
  //   },
  //   error(err) {
  //     console.log(`Error: ${err}`);
  //   },
  // });


}

    // setTimeout(() => {
    //   messageSubscription.unsubscribe();
    // }, 10000);


