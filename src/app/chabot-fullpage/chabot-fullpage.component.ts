import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from "@angular/router";

interface WidgetConfig {
  name: string,
  logo: string,
  welcomeMessage: string,
  FAQs: any[],
  primaryColor: string,
  borderColor: string,
  sendChatBackgroundColor: string,
  sendChatTextColor: string,
  receiveChatTextColor: string,
  headerBackgroundColor: string,
  chatAreaBackgroundColor: string,
  headerTextColor: string,
  FooterBackgroundColor: string,
  FooterTextColor: string,
  BotButtonBackgroundColor: string,
  BotButtonIconColor: string,
}

const STAGING_BACKEND_URL = 'https://chatbot-backend-1-cq8l.onrender.com/query';
const PRODUCTION_BACKEND_URL = 'https://chatbot-backend-e50l.onrender.com';

@Component({
  selector: 'app-chabot-fullpage',
  templateUrl: './chabot-fullpage.component.html',
  styleUrls: ['./chabot-fullpage.component.scss'],
  animations: [
    trigger('toggleChatWidget', [
      state(
        'void',
        style({
          opacity: 0,
        }),
      ),
      transition('void <=> *', animate(500)),
    ])
  ]
})
export class ChabotFullpageComponent implements OnInit {

  widgetConfig: WidgetConfig = {
    name: 'Quantum AI Bot',
    logo: `https://static.wixstatic.com/media/6e187b_a9d74aeb2d354b7b8a68bbdca47f3db8~mv2.png/v1/fill/w_94,h_94,fp_0.08_0.09,q_85,usm_0.66_1.00_0.01,enc_auto/ask-ai2.png`,
    welcomeMessage: 'Hey! how can I help you?',
    FAQs: ['What do you do?', 'What do you do?', 'What do you do?', 'What do you do?'],
    primaryColor: '#4b0f63',
    borderColor: '#4b0f63',
    sendChatBackgroundColor: '#e4e4e4',
    sendChatTextColor: '#4b0f63',
    receiveChatTextColor: '#FFFFFF',
    headerBackgroundColor: '#4b0f63',
    headerTextColor: '#FFFFFF',
    chatAreaBackgroundColor: '#f6f6f6',
    FooterBackgroundColor: '#4b0f63',
    FooterTextColor: '#FFFFFF',
    BotButtonBackgroundColor: '#4b0f63',
    BotButtonIconColor: '#FFFFFF',
  }; // Default config
  showChatWidget = false;
  messages: any[] = [];
  processingAnswer = false;
  clientId = 'quantum-edge';

  constructor(private activatedRoute: ActivatedRoute) {
    this.clientId  = this.activatedRoute.snapshot.params['clientId'] || this.clientId;
  }

  ngOnInit(): void {
    // pass the client here: get it from queryparam
    this.getClientConfig();
  }


  sendMessage(question: any, event: any) {
    if (this.processingAnswer || !question) {
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
    const that = this;
    const xmlhttp = new XMLHttpRequest();
    const baseUrl = STAGING_BACKEND_URL; //Replace with our backend url

    // Ensure question and loggedInUser are properly sanitized and validated
    const encodedQuestion = encodeURIComponent(question);
    const encodedClientId = encodeURIComponent(this.clientId);

    // Construct the final URL
    const url = `${baseUrl}?message=${encodedQuestion}&client_id=${encodedClientId}`;

    xmlhttp.removeEventListener('progress', this.updateAnswer, false);
    xmlhttp.addEventListener('progress', this.updateAnswer, false);
    xmlhttp.addEventListener('readystatechange', function () {
      if (xmlhttp.readyState === 4) {
        console.log('Request is closed.');
        that.processingAnswer = false;
        if (that.messages[that.messages.length - 1].text === '...') {
          that.renderErrorResponse();
        }
      }
    });
    xmlhttp.open('get', url, true);
    xmlhttp.send();
  }

  updateAnswer = (oEvent: any) => {
    console.log('os event', oEvent);
    console.log('os event', oEvent.target.responseText);
    console.log('os event', oEvent.total);
    //const jsonArrayString = "[" + oEvent.target.responseText.replace(/}{/g, "},{") + "]";
    // const jsonArray = JSON.parse(jsonArrayString);
    // const contentValues = jsonArray.map((item: { content: any; }) => item.content);
    // let answer = contentValues.join('');
    let answer = oEvent.target.responseText;
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

  renderErrorResponse() {
    this.messages.pop();
    this.messages.push({
      text: 'Our servers are currently down. Please try again later.',
      type: 'received'
    });
  }

  handleScroll() {
    const scrollableDiv = document.getElementById('quantum-chat-scrollable-container');
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight + 10;
    }
  }

  resetChat() {
    this.processingAnswer = false;
    this.messages = [];
  }

  openWidget() {
    this.showChatWidget = !this.showChatWidget;
    setTimeout(() => {
      document.getElementById('quantum-bot-chat-area')?.focus();
    }, 100);

  }

  getClientConfig() {
    // get client config from backend

    if (this.clientId === 'quantum-edge') {
      this.widgetConfig = {
        name: 'Quantum AI Bot',
        logo: `assets/IconOnly_Transparent.png`,
        welcomeMessage: 'Hey! how can I help you?',
        FAQs: ['What do you do?', 'What do you do?', 'What do you do?', 'What do you do?'],
        primaryColor: '#4b0f63',
        borderColor: '#4b0f63',
        sendChatBackgroundColor: '#e4e4e4',
        sendChatTextColor: '#4b0f63',
        receiveChatTextColor: '#FFFFFF',
        headerBackgroundColor: '#4b0f63',
        headerTextColor: '#FFFFFF',
        chatAreaBackgroundColor: '#f6f6f6',
        FooterBackgroundColor: '#4b0f63',
        FooterTextColor: '#FFFFFF',
        BotButtonBackgroundColor: '#4b0f63',
        BotButtonIconColor: '#FFFFFF',
      }
    }
    // Add other clients config here
  }

}

