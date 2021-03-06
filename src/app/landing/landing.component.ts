import { Component } from '@angular/core';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent {
  word: String[]
  word_message: String = 'Press the button to start learning.'
  translation: String
  translation_message: String = 'Translate'
  translation_active: Boolean = false
  article: number
  correct: number = 0
  incorrect: number = 0
  started: Boolean = false
  colors = ['der', 'die', 'das']
  count = [0, 1, 2]
  dictionary: String[][][]
  done: String[] = []

  constructor() {
    this.word = [this.word_message, 'Translation']
    this.translation = this.translation_message
  }

  start() {
    this.started = true
    this.dictionary = [this.getDer(), this.getDie(), this.getDas()]
    this.count = [this.dictionary[0].length, this.dictionary[1].length, this.dictionary[2].length]
    this.article = this.getRandom(3)
    this.word = this.dictionary[this.article][this.getRandom(this.dictionary[this.article].length)]
    this.resetTranslation()
    this.done = []
    console.log(`Total word count: ${this.count[0] + this.count[1] + this.count[2]} \nDer: ${this.count[0]} Die: ${this.count[1]} Das: ${this.count[2]}`)
  }

  reset() {
    this.started = false
    this.word = [this.word_message, 'Translation']
    this.correct = this.incorrect = 0
    this.done = []
  }

  resetTranslation() {
    this.translation = this.translation_message
    this.translation_active = false
  }

  resetColors() {
    this.colors.forEach(color => {
      document.getElementById(color).style.pointerEvents = 'all'
      document.getElementById(color).classList.remove('correct')
      document.getElementById(color).classList.remove('incorrect')
    })
  }

  getRandom(max: number): number {
    return Math.max(Math.round(Math.random()*max - 1), 0)
  }

  translate(option: string) {
    switch (option) {
      case 'show':
        this.translation = this.word[1]
        this.translation_active = true
        break
      case 'hide':
        this.translation = this.translation_message
        this.translation_active = false
        break
      case 'toggle':
        this.translation = this.translation_active ? this.translation_message : this.word[1]
        this.translation_active = !this.translation_active
        break
    }
  }

  check(answer: number): void {
    document.getElementById(this.colors[this.article]).classList.add('correct')
    if (this.article == answer) {
      this.correct += 1
      this.done.push(this.word[0])
    } else {
      document.getElementById(this.colors[answer]).classList.add('incorrect')
      this.incorrect += 1
      this.dictionary[this.article].unshift(this.word)
    }

    let newWord: String[] = ['N/A', 'N/A']
    do {
      if (this.checkEmpty()) {
        this.resetColors()
        this.start()
        return
      } else {
        do {
          this.article = this.getRandom(3)
        } while (!this.dictionary[this.article].length)
        newWord = this.dictionary[this.article].pop()
        break
      }
    } while (this.word[0] == newWord[0] || this.done.includes(newWord[0]))

    this.sleep(250).then(() => {
      this.resetColors()
      this.resetTranslation()
      this.word = newWord
    })
  }

  checkEmpty(): Boolean {
    if (!(this.dictionary[0].length + this.dictionary[1].length + this.dictionary[2].length)) {
      return true
    } else {
      return false
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getDer() {
    return [['Teppich', 'Carpet'], ['Sittich', 'Parakeet'], ['Abgleich', 'Adjustment'], ['Bereich', 'Range'], ['Teich', 'Pond'], ['Ventilator', 'Fan'], ['Motor', 'Motor'], ['Marmor', 'Marble'], ['König', 'King'], ['Honig', 'Honey'], ['Essig', 'Vinegar'], ['Schmetterling', 'Butterfly'], ['Frühling', 'Spring'], ['Lehrling', 'Apprentice'], ['Zwilling', 'Twin'], ['Optimismus', 'Optimism'], ['Magnetismus', 'Magnetism'], ['Expressionismus', 'Expressionism'], ['Feudalismus', 'Feudalism'], ['Kapitalismus', 'Capitalism'], ['Bär', 'Bear'], ['Veterinär', 'Veterinarian'], ['Aktionär', 'Stockholder'], ['Sekretär', 'Secretary'], ['Diamant', 'Diamond'], ['Fabrikant', 'Manufacturer'], ['Elefant', 'Elephant'], ['Lieferant', 'Supplier'], ['Musiker', 'Musician'], ['Techniker', 'Technician'], ['Spezialist', 'Specialist'], ['Artist', 'Artist'], ['Amateur', 'Amateur'], ['Friseur', 'Hair dresser'], ['Schlüssel', 'Key'], ['Löffel', 'Spoon'], ['Mantel', 'Coat'], ['Apfel', 'Apple'], ['Montag', 'Monday'], ['Mittwoch', 'Wednesday'], ['Oktober', 'October'], ['Dezember', 'December'], ['Sommer', 'Summer'], ['Herbst', 'Autumn'], ['Winter', 'Winter'], ['Frühling', 'Spring'], ['Held', 'Hero'], ['Sänger', 'Singer'], ['Koch', 'Cook'], ['Lehrer', 'Teacher'], ['Norden', 'North'], ['Süden', 'South'], ['Westen', 'West'], ['Osten', 'East'], ['Regen', 'Rain'], ['Schnee', 'Snow'], ['Wind', 'Wind'], ['Blitz', 'Lightning'], ['Dollar', 'Dollar'], ['Euro', 'Euro'], ['Rauch', 'Smoke'], ['Tanz', 'Dance'], ['Hass', 'Hate'], ['Neffe', 'Nephew'], ['Kunde', 'Client'], ['Löwe', 'Lion'], ['Affe', 'Monkey'], ['Franzose', 'Frenchman'], ['Schwede', 'Swede'], ['Buchstabe', 'Letter (alphabet)'], ['Friede', 'Freedom'], ['Funke', 'Spark'], ['Gedanke', 'Idea, thought'], ['Glaube', 'Faith'], ['Haufen', 'Heap'], ['Name', 'Name'], ['Samen', 'Seed'], ['Wille', 'Will'], ['Schaden', 'Damage'], ['Sauerstoff', 'Oxygen']]
  }

  getDie() {
    return [['Blondine', 'Blonde'], ['Gardine', 'Curtain'], ['Mine', 'Mine'], ['Kette', 'Chain'], ['Manschette', 'Wristband'], ['Limette', 'Lime'], ['Kritik', 'Critisicm'], ['Politik', 'Politics'], ['Elektrik', 'Electrics'], ['Skepsis', 'Scepticism'], ['Basis', 'Base'], ['Identität', 'Identity'], ['Aktivität', 'Activity'], ['Realität', 'Reality'], ['Polizei', 'Police'], ['Abtei', 'Abbey'], ['Konditorei', 'Confectionery'], ['Leckerei', 'Delicacy'], ['Datei', 'File'], ['Zeitung', 'Newspaper'], ['Dichtung', 'Poetry'], ['Empfehlung', 'Recommendation'], ['Erfahrung', 'Experience'], ['Lehrerin', 'Female professor'], ['Darstellerin', 'Actress'], ['Eignerin', 'Female owner'], ['Australierin', 'Australian women'], ['Chefin', 'Female boss'], ['Freiheit', 'Freedom'], ['Neuheit', 'Novelty'], ['Sicherheit', 'Safety'], ['Trägheit', 'Laziness'], ['Gefährlichkeit', 'Dangerousness'], ['Höflichkeit', 'Politeness'], ['Langsamkeit', 'Slowness'], ['Häufigkeit', 'Frequency'], ['Produktion', 'Production'], ['Funktion', 'Function'], ['Kanalisation', 'Drainage'], ['Nation', 'Nation'], ['Geografie', 'Geography'], ['Garantie', 'Guarantee'], ['Fantasie', 'Fantasy'], ['Galerie', 'Gallery'], ['Astronomie', 'Astronomy'], ['Freundschaft', 'Friendship'], ['Gemeinschaft', 'Community'], ['Wirtschaft', 'Economy'], ['Wissenschaft', 'Science'], ['Kultur', 'Culture'], ['Natur', 'Nature'], ['Diktatur', 'Dictatorship'], ['Agentur', 'Agency'], ['Marmelade', 'Marmalade'], ['Limonade', 'Lemonade'], ['Schokolade', 'Chocolate'], ['Schublade', 'Drawer'], ['Frau', 'Woman'], ['Mutter', 'Mother'], ['Schwester', 'Sister'], ['Tanne', 'Fir'], ['Eiche', 'Oak'], ['Linde', 'Lime'], ['Rose', 'Rose'], ['Tulpe', 'Tulip'], ['Orchidee', 'Orchid'], ['Birne', 'Pear'], ['Banane', 'Banana'], ['Pflaume', 'Plum'], ['Zahl', 'Number'], ['Null', 'Zero']]
  }

  getDas() {
    return [['Auto', 'Car'], ['Radio', 'Radio'], ['Klima', 'Climate'], ['Thema', 'Topic'], ['Drama', 'Drama'], ['Aquarium', 'Aquarium'], ['Basilikum', 'Basil'], ['Zentrum', 'Centre'], ['Mädchen', 'Girl'], ['Pfännchen', 'Small frying pan'], ['Maskottchen', 'Mascot'], ['Märchen', 'Fairytale'], ['Päckchen', 'Small package'], ['Häuslein', 'Little house'], ['Vöglein', 'Little bird'], ['Bächlein', 'Brooklet'], ['Büchlein', 'Booklet'], ['Bett', 'Bed'], ['Ballett', 'The ballet'], ['Büfett', 'The buffet'], ['Omelett', 'The omelet'], ['Brett', 'The board'], ['Datum', 'Date'], ['Wachstum', 'Growth'], ['Ultimatum', 'Ultimatum'], ['Heiligtum', 'Relic'], ['Votum', 'Vote'], ['Niveau', 'Level'], ['Plateau', 'Plateau'], ['Kind', 'Child'], ['Lamm', 'Lamb'], ['A', 'The a'], ['B', 'The b'], ['Grün', 'Green'], ['Blau', 'Blue'], ['Deutsch', 'German'], ['Französisch', 'French'], ['Spanisch', 'Spanish'], ['Baby', 'Baby'], ['Handy', 'Phone'], ['Image', 'Image'], ['moderne Deutschland', 'Modern germany'], ['schöne London', 'Beautiful london'], ['Gold', 'Gold'], ['Kupfer', 'Copper'], ['Gebirge', 'Mountains'], ['Gemüse', 'Vegetable'], ['Gute', 'The good'], ['Böse', 'The bad'], ['Wichtige', 'The important'], ['Neue', 'The new'], ['Leben', 'Life'], ['Essen', 'Food'], ['Reisen', 'Travel'], ['Lachen', 'Laugh']]
  }

  debugWords() {
    return [
      [['Gedanke', 'Though'], ['Abgleich', 'Adjustment']],
      [['Null', 'Zero'], ['Kritik', 'Criticism']],
      [['Drama', 'Drama'], ['Zentrum', 'Center']],
    ]
  }
}