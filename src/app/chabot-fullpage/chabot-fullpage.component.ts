import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chabot-fullpage',
  templateUrl: './chabot-fullpage.component.html',
  styleUrls: ['./chabot-fullpage.component.scss']
})
export class ChabotFullpageComponent implements OnInit {

  widgetConfig: { name: string, logo: string, primaryColor: string } = {
    name: 'Quantum Bot',
    logo: `https://static.wixstatic.com/media/6e187b_a9d74aeb2d354b7b8a68bbdca47f3db8~mv2.png/v1/fill/w_94,h_94,fp_0.08_0.09,q_85,usm_0.66_1.00_0.01,enc_auto/ask-ai2.png`,
    primaryColor: '#bd24fa'
  }; // Default config
  showChatWidget = false;
  messages: any[] = [];
  processingAnswer = false;

  ngOnInit(): void {
    // pass the client here: get it from queryparam
    this.getClientConfig('quantum-edge');
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
    const baseUrl = 'https://ask-al-staging.brownleefitness.com/answer_chunked/'; //REplace with our backend url

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

  getClientConfig(client: string) {
    // get client config from backend

    if (client === 'quantum-edge') {
      this.widgetConfig = {
        name: 'Quantum Bot',
        logo: `https://static.wixstatic.com/media/6e187b_a9d74aeb2d354b7b8a68bbdca47f3db8~mv2.png/v1/fill/w_94,h_94,fp_0.08_0.09,q_85,usm_0.66_1.00_0.01,enc_auto/ask-ai2.png`,
        primaryColor: '#bd24fa'
      }
    }
    // Add other clients config here
  }

}

