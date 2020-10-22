import { Component } from '@angular/core';
import {delay} from "rxjs/operators";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent {
  word: String
  article: number
  correct: number = 0
  incorrect: number = 0
  started: Boolean = false
  colors = ['der', 'die', 'das']
  dictionary = [
    ['Hund', 'Mann'],
    ['Ameise', 'Leute'],
    ['Kind', 'Auto']
  ]

  constructor() {
    this.word = 'Press the button to start.'
  }

  start() {
    this.started = true
    this.word = this.getWord()
  }

  reset() {
    this.started = false
    this.correct = this.incorrect = 0
  }

  getWord(): String {
    this.article = this.getRandom(3)
    const len = this.dictionary[this.article].length
    return this.dictionary[this.article][this.getRandom(len)]
  }

  getRandom(max: number): number {
    return Math.max(Math.round(Math.random()*max - 1), 0)
  }

  check(answer: number): void {
    document.getElementById(this.colors[this.article]).classList.add('correct')
    if (this.article == answer) {
      this.correct += 1
    } else {
      document.getElementById(this.colors[answer]).classList.add('incorrect')
      this.incorrect += 1
    }
    let newWord = this.getWord()
    while (this.word == newWord) {
      newWord = this.getWord()
    }
    this.sleep(250).then(() => {
      this.colors.forEach(color => {
        document.getElementById(color).style.pointerEvents = 'all'
        document.getElementById(color).classList.remove('correct')
        document.getElementById(color).classList.remove('incorrect')
      })
      this.word = newWord
    })
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
