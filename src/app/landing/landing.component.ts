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
  dictionary: String[][]

  constructor() {
    this.word = 'Press the button to start.'
    this.dictionary = [this.getDer(), this.getDie(), this.getDas()]
    console.log(`Word count\nDer: ${this.dictionary[0].length} Die: ${this.dictionary[1].length} Das: ${this.dictionary[2].length}`)
  }

  start() {
    this.started = true
    this.word = this.getWord()
  }

  reset() {
    this.started = false
    this.word = 'Press the button to start.'
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

  getDer() {
    return ['Teppich', 'Sittich', 'Abgleich', 'Bereich', 'Teich', 'Ventilator', 'Motor', 'Marmor', 'König', 'Honig', 'Essig', 'Schmetterling', 'Frühling', 'Lehrling', 'Zwilling', 'Optimismus', 'Magnetismus', 'Expressionismus', 'Feudalismus', 'Kapitalismus', 'Bär', 'Veterinär', 'Aktionär', 'Sekretär', 'Diamant', 'Fabrikant', 'Elefant', 'Lieferant', 'Musiker', 'Techniker', 'Spezialist', 'Artist', 'Amateur', 'Friseur', 'Schlüssel', 'Löffel', 'Mantel', 'Apfel', 'Montag', 'Mittwoch', 'Oktober', 'Dezember', 'Sommer', 'Herbst', 'Winter', 'Frühling', 'Held', 'Sänger', 'Koch', 'Lehrer', 'Norden', 'Süden', 'Westen', 'Osten', 'Regen', 'Schnee', 'Wind', 'Blitz', 'Dollar', 'Euro', 'Rauch', 'Tanz', 'Hass', 'Neffe', 'Kunde', 'Löwe', 'Affe', 'Franzose', 'Schwede', 'Buchstabe', 'Friede', 'Funke', 'Gedanke', 'Glaube', 'Haufen', 'Name', 'Samen', 'Wille', 'Schaden', 'Sauerstoff']
  }

  getDie() {
    return ['Blondine', 'Gardine', 'Mine', 'Kette', 'Manschette', 'Limette', 'Kritik', 'Politik', 'Elektrik', 'Skepsis', 'Basis', 'Identität', 'Aktivität', 'Realität', 'Polizei', 'Abtei', 'Konditorei', 'Leckerei', 'Datei', 'Zeitung', 'Dichtung', 'Empfehlung', 'Erfahrung', 'Lehrerin', 'Darstellerin', 'Eignerin', 'Australierin', 'Chefin', 'Freiheit', 'Neuheit', 'Sicherheit', 'Trägheit', 'Gefährlichkeit', 'Höflichkeit', 'Langsamkeit', 'Häufigkeit', 'Produktion', 'Funktion', 'Kanalisation', 'Nation', 'Geografie', 'Garantie', 'Fantasie', 'Galerie', 'Astronomie', 'Freundschaft', 'Gemeinschaft', 'Wirtschaft', 'Wissenschaft', 'Kultur', 'Natur', 'Diktatur', 'Agentur', 'Marmelade', 'Limonade', 'Schokolade', 'Schublade', 'Frau', 'Mutter', 'Schwester', 'Tanne', 'Eiche', 'Linde', 'Rose', 'Tulpe', 'Orchidee', 'Birne', 'Banane', 'Pflaume', 'Zahl', 'Null']
  }

  getDas() {
    return ['Auto', 'Radio', 'Klima', 'Thema', 'Drama', 'Aquarium', 'Basilikum', 'Zentrum', 'Mädchen', 'Pfännchen', 'Maskottchen', 'Märchen', 'Päckchen', 'Häuslein', 'Vöglein', 'Bächlein', 'Büchlein', 'Bett', 'Ballettt', 'Büfett', 'Omelett', 'Brett', 'Datum', 'Wachstum', 'Ultimatum', 'Heiligtum', 'Votum', 'Niveau', 'Plateau', 'Kind', 'Lamm', 'A', 'B', 'Grün', 'Blau', 'Deutsch', 'Französisch', 'Spanisch', 'Baby', 'Handy', 'Image', 'moderne Deutschland', 'schöne London', 'Gold', 'Kupfer', 'Gebirge', 'Gemüse', 'Gute', 'Böse', 'Wichtige', 'Neue', 'Leben', 'Essen', 'Reisen', 'Lachen']
  }
}
