import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {

  widgetConfig: any;
  showChatWidget = false;
  messages: any[] = [];
  processingAnswer = false;

  constructor(private httpClient: HttpClient) {
    // Initialize your component, if needed
  }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.widgetConfig = {
      name: 'ASK AL',
      logo: `https://static.wixstatic.com/media/6e187b_a9d74aeb2d354b7b8a68bbdca47f3db8~mv2.png/v1/fill/w_94,h_94,fp_0.08_0.09,q_85,usm_0.66_1.00_0.01,enc_auto/ask-ai2.png`,
    }
  }

  sendMessage(question: any, event: any) {
    if (this.processingAnswer) {
      return;
    }
    event.value = '';
    this.messages.push({
      text: question,
      type: 'sent'
    });
    this.handleScroll();
    requestAnimationFrame(this.handleScroll);
    this.processingAnswer = true;
    this.messages.push({
      text: '...',
      type: 'received'
    });
    this.handleScroll();
    requestAnimationFrame(this.handleScroll);
    this.fetchAnswer(question);
  }

  fetchAnswer(question: string) {
    const loggedInUser = {
      loginEmail: 'm.saeedarshad95@gmail.com',
      contactDetails: {
        firstName: 'Saeed'
      }
    };
    const that = this;
    const xmlhttp = new XMLHttpRequest();
    const baseUrl = 'https://ask-al-staging.brownleefitness.com/answer_chunked/';

    // Ensure question and loggedInUser are properly sanitized and validated
    const encodedQuestion = encodeURIComponent(question);
    const encodedUser = encodeURIComponent(JSON.stringify(loggedInUser));

    // Construct the final URL
    const url = `${baseUrl}?question=${encodedQuestion}&memberdata=${encodedUser}`;

    xmlhttp.removeEventListener('progress', this.updateAnswer, false);
    xmlhttp.addEventListener('progress', this.updateAnswer, false);
    xmlhttp.addEventListener('readystatechange', function () {
      if (xmlhttp.readyState === 4) {
        console.log('Request is closed.');
        that.processingAnswer = false;
      }
    });
    xmlhttp.open('get', url, true);
    xmlhttp.send();
  }

  updateAnswer = (oEvent: any) => {
    /* console.log('messages', this.messages);
     console.log('os event', oEvent);
     console.log('os event', oEvent.target.responseText);
     console.log('os event', oEvent.total);*/
    const jsonArrayString = "[" + oEvent.target.responseText.replace(/}{/g, "},{") + "]";
    const jsonArray = JSON.parse(jsonArrayString);
    const contentValues = jsonArray.map((item: { content: any; }) => item.content);
    let answer = contentValues.join('');
    // console.log('answer--', answer);
    answer = `${answer.replace(/\n/g, '<br>')}`;
    this.messages.pop();
    this.messages.push({
      text: answer,
      type: 'received'
    });
    this.handleScroll();
    requestAnimationFrame(this.handleScroll);
  }

  handleScroll() {
    const scrollableDiv = document.getElementById('podium-chat-scrollable-container');
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight + 10;
    }
  }

  makeHttpRequest(url: string) {
    this.processingAnswer = true;

    this.httpClient.get(url, {observe: 'events', responseType: 'text'}).subscribe(
      (event: any) => {
        console.log('event', event?.body);
        console.log('type', event?.type);
        if (event.type === 4) { // 4 corresponds to the 'response' event in Angular
          console.log('Request is closed.');
          this.processingAnswer = false;
          // Handle the response
          this.updateAnswer(event);
        } else {
          console.log('else');
        }
      },
      error => {
        console.error('Error occurred:', error);
        this.processingAnswer = false;
      }
    );
  }
}
