import { Component, OnInit } from '@angular/core';
import { chatMessages } from './chat-messages';
import { FormBuilder } from '@angular/forms';
import { JokeService } from './joke.service';
import { ActivatedRoute } from '@angular/router';



import mapping from '../_keywordMappings';
import { FirestoreService } from '../_service/firestore.service';


@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [JokeService],
})

export class ChatComponent implements OnInit {

  messages = [];
  totalOnline = 0;
  user = 1;

  messageForm;
  // messages: any;
  // status: any = 'idle';
  currentMessage: string;
  expectation = 'none';
  dailyQuestions = ['Intro for your day', 'describe ypur day', 'keywords or tags'];
  resourceQuestion = ['Enter title for your content', 'paste content', 'paste if any more content.', 'keywords or tags'];
  linkQuestion = ['enter title for link/s', 'paste links', 'keyword or tags'];
  todoQuestion = ['enter todo title', 'enter todo content', 'keyword ot tags'];

  answers = [];
  constructor(
    private formBuilder: FormBuilder,
    private jokeService: JokeService,
    private fireStore: FirestoreService
  ) {

    this.messages = chatMessages;
    this.messageForm = this.formBuilder.group({
      message: '',
    });
  }


  ngOnInit() {
    this.messages = chatMessages;
  }

  onSubmit(message) {
    this.currentMessage = message.message;
    // to print the question
    this.addMessage(message.message, 1);
    this.messageForm.reset();

    if (this.expectation === 'none') {
      const presentAction = mapping[message.message.toLowerCase()];
      // tslint:disable-next-line: no-eval
      eval('this.' + presentAction + '()');
    } else if (this.currentMessage === 'clear' || this.currentMessage === 'Clear') {
      this.clear();
    } else {
      // tslint:disable-next-line: no-eval
      eval('this.' + this.expectation + '()');

    }

  }

  addMessage(reply, userId) {
    const nd = new Date();
    const data2 = {
      message: reply,
      userId,
      time: nd.getHours() + ':' + nd.getMinutes()
    };
    this.messages = [...this.messages, data2];
  }


  private joke() {
    this.jokeService.getJoke().subscribe((response: any) => {

      const message = response.value.joke;
      this.addMessage(message, 2);
    });
  }
  loog(message) {
    console.log(message);
  }
  private clear() {
    this.answers = [];
    this.addMessage('cleared', 2);
    this.expectation = 'none';
  }
  private daily() {
    console.log(this.expectation);
    this.expectation = 'daily';


    if (this.answers.length === this.dailyQuestions.length) {
      this.answers.push(this.currentMessage);
      return this.fireStore.addDaily(this.answers).then(data => {
        this.expectation = 'none';
        this.addMessage('Daily Event Successfully saved.', 2);
        console.log(this.answers);
        this.answers = [];
        return;
      }).catch(err => {
        this.expectation = 'none';
        this.addMessage(err, 2);
        this.answers = [];
        return;
      });

    } else {
      this.addMessage(this.dailyQuestions[this.answers.length], 2);
    }

    if (this.answers.length === 0) {
      this.answers.push(new Date().toString());
    } else {
      this.answers.push(this.currentMessage);
    }

    console.log(this.answers);
  }

  private resource() {
    console.log(this.expectation);
    this.expectation = 'resource';


    if (this.answers.length === this.resourceQuestion.length) {
      this.answers.push(this.currentMessage);
      return this.fireStore.addKnowledgebase(this.answers).then(data => {
        this.expectation = 'none';
        this.addMessage('Resource Successfully saved.', 2);
        console.log(this.answers);
        this.answers = [];
        return;
      }).catch(err => {
        this.expectation = 'none';
        this.addMessage(err, 2);
        this.answers = [];
        return;
      });

    } else {
      this.addMessage(this.resourceQuestion[this.answers.length], 2);
    }

    if (this.answers.length === 0) {
      this.answers.push(new Date().toString());
    } else {
      this.answers.push(this.currentMessage);
    }

    console.log(this.answers);
  }

  private link() {
    console.log(this.expectation);
    this.expectation = 'link';


    if (this.answers.length === this.linkQuestion.length) {
      this.answers.push(this.currentMessage);
      return this.fireStore.addLink(this.answers).then(data => {
        this.expectation = 'none';
        this.addMessage('Link/s Successfully saved.', 2);
        console.log(this.answers);
        this.answers = [];
        return;
      }).catch(err => {
        this.expectation = 'none';
        this.addMessage(err, 2);
        this.answers = [];
        return;
      });

    } else {
      this.addMessage(this.linkQuestion[this.answers.length], 2);
    }

    if (this.answers.length === 0) {
      this.answers.push(new Date().toString());
    } else {
      this.answers.push(this.currentMessage);
    }

    console.log(this.answers);
  }

  private todo() {
    console.log(this.expectation);
    this.expectation = 'todo';


    if (this.answers.length === this.todoQuestion.length) {
      this.answers.push(this.currentMessage);
      return this.fireStore.addTodo(this.answers).then(data => {
        this.expectation = 'none';
        this.addMessage('Todo Successfully saved.', 2);
        console.log(this.answers);
        this.answers = [];
        return;
      }).catch(err => {
        this.expectation = 'none';
        this.addMessage(err, 2);
        this.answers = [];
        return;
      });

    } else {
      this.addMessage(this.todoQuestion[this.answers.length], 2);
    }

    if (this.answers.length === 0) {
      this.answers.push(new Date().toString());
    } else {
      this.answers.push(this.currentMessage);
    }

    console.log(this.answers);
  }
}




