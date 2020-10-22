import { Component } from '@angular/core';


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
  count = [0, 1, 2]
  dictionary: String[][]
  done: String[] = []
  message: String = "Press the button to start learning."


  constructor() {
    this.word = this.message
    this.dictionary = [this.getDer(), this.getDie(), this.getDas()]
    this.count[0] = this.dictionary[0].length
    this.count[1] = this.dictionary[1].length
    this.count[2] = this.dictionary[2].length
    console.log(`Total word count: ${this.count[0] + this.count[1] + this.count[2]} \nDer: ${this.count[0]} Die: ${this.count[1]} Das: ${this.count[2]}`)
  }

  start() {
    this.started = true
    this.word = this.getWord()
  }

  reset() {
    this.started = false
    this.word = this.message
    this.correct = this.incorrect = 0
    this.done = []
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
      this.done.push(this.word)
    } else {
      document.getElementById(this.colors[answer]).classList.add('incorrect')
      this.incorrect += 1
    }
    let newWord = this.getWord()
    while (this.word == newWord || this.done.includes(newWord)) {
      newWord = this.getWord()
      if (this.done.length == this.count[0] + this.count[1] + this.count[2]) {
        this.done = []
      }
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

  getDer() {
    return ['Teppich', 'Sittich', 'Abgleich', 'Bereich', 'Teich', 'Ventilator', 'Motor', 'Marmor', 'König', 'Honig', 'Essig', 'Schmetterling', 'Frühling', 'Lehrling', 'Zwilling', 'Optimismus', 'Magnetismus', 'Expressionismus', 'Feudalismus', 'Kapitalismus', 'Bär', 'Veterinär', 'Aktionär', 'Sekretär', 'Diamant', 'Fabrikant', 'Elefant', 'Lieferant', 'Musiker', 'Techniker', 'Spezialist', 'Artist', 'Amateur', 'Friseur', 'Schlüssel', 'Löffel', 'Mantel', 'Apfel', 'Montag', 'Mittwoch', 'Oktober', 'Dezember', 'Sommer', 'Herbst', 'Winter', 'Frühling', 'Held', 'Sänger', 'Koch', 'Lehrer', 'Norden', 'Süden', 'Westen', 'Osten', 'Regen', 'Schnee', 'Wind', 'Blitz', 'Dollar', 'Euro', 'Rauch', 'Tanz', 'Hass', 'Neffe', 'Kunde', 'Löwe', 'Affe', 'Franzose', 'Schwede', 'Buchstabe', 'Friede', 'Funke', 'Gedanke', 'Glaube', 'Haufen', 'Name', 'Samen', 'Wille', 'Schaden', 'Sauerstoff']
  }

  getDie() {
    return ['Blondine', 'Gardine', 'Mine', 'Kette', 'Manschette', 'Limette', 'Kritik', 'Politik', 'Elektrik', 'Skepsis', 'Basis', 'Identität', 'Aktivität', 'Realität', 'Polizei', 'Abtei', 'Konditorei', 'Leckerei', 'Datei', 'Zeitung', 'Dichtung', 'Empfehlung', 'Erfahrung', 'Lehrerin', 'Darstellerin', 'Eignerin', 'Australierin', 'Chefin', 'Freiheit', 'Neuheit', 'Sicherheit', 'Trägheit', 'Gefährlichkeit', 'Höflichkeit', 'Langsamkeit', 'Häufigkeit', 'Produktion', 'Funktion', 'Kanalisation', 'Nation', 'Geografie', 'Garantie', 'Fantasie', 'Galerie', 'Astronomie', 'Freundschaft', 'Gemeinschaft', 'Wirtschaft', 'Wissenschaft', 'Kultur', 'Natur', 'Diktatur', 'Agentur', 'Marmelade', 'Limonade', 'Schokolade', 'Schublade', 'Frau', 'Mutter', 'Schwester', 'Tanne', 'Eiche', 'Linde', 'Rose', 'Tulpe', 'Orchidee', 'Birne', 'Banane', 'Pflaume', 'Zahl', 'Null']
  }

  getDas() {
    return ['Auto', 'Radio', 'Klima', 'Thema', 'Drama', 'Aquarium', 'Basilikum', 'Zentrum', 'Mädchen', 'Pfännchen', 'Maskottchen', 'Märchen', 'Päckchen', 'Häuslein', 'Vöglein', 'Bächlein', 'Büchlein', 'Bett', 'Ballett', 'Büfett', 'Omelett', 'Brett', 'Datum', 'Wachstum', 'Ultimatum', 'Heiligtum', 'Votum', 'Niveau', 'Plateau', 'Kind', 'Lamm', 'A', 'B', 'Grün', 'Blau', 'Deutsch', 'Französisch', 'Spanisch', 'Baby', 'Handy', 'Image', 'moderne Deutschland', 'schöne London', 'Gold', 'Kupfer', 'Gebirge', 'Gemüse', 'Gute', 'Böse', 'Wichtige', 'Neue', 'Leben', 'Essen', 'Reisen', 'Lachen']
  }
}
