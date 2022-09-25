import { wordType, answerData } from '../type';
import { GameNameType } from '../../statistics/types';
import Step from './step';
import Chank from '../model/chank';
import LocalStat from './localStat';
import Render from './render';

import { StatData } from '../../statistics/Model/statData';
import { Agregator } from '../../statistics/Model/agregator';

class Game extends Step {
  gameName: GameNameType;
  collection: Array<wordType> | undefined;
  wrapper: HTMLElement;
  startButton: HTMLElement;
  startScreen: HTMLElement;
  localStat: LocalStat;
  statData: StatData;

  constructor() {
    super();
    this.gameName = 'audioCall';
    this.localStat = new LocalStat();
    this.statData = new StatData();
    this.wrapper = document.querySelector('.audioCall') as HTMLElement;
    this.startButton = document.querySelector('.audioCall__start-btn') as HTMLElement;
    this.startScreen = document.querySelector('.audioCall__start-container') as HTMLElement;

    this.listen();
  }

  async startGame(group: number, page: number) {
    try {
      this.hideStartScreen();
      this.collection = await new Chank(page, group).getCollection();
      this.next();

      // this.statData.resetDayAnswers(this.gameName); // temporarry
      // this.statData.resetAllStat(); // temporarry
    } catch (err) {
      console.warn(err);
    }
  }

  hideStartScreen() {
    if (this.startScreen) {
      this.startScreen.classList.add('is-hidden');
    }
  }

  next() {
    console.log('next');
    const collection = this.collection as Array<wordType>;
    const stepWords = this.getStepWords(collection);
    if (stepWords === null) console.warn('end of word collection');

    if (stepWords instanceof Array) {
      const targetWord = this.makeTargetWord(stepWords);
      this.showStep(stepWords, targetWord);
    }
  }

  showResults() {
    const gameStatistic = this.localStat.answersStorage as Array<answerData>;
    if (this.collection instanceof Array) {
      const collection = this.collection;
      Render.prototype.renderResults(this.wrapper, gameStatistic, collection);
    }
  }

  showTips() {
    const imgEl = this.wrapper.querySelector('.audioCall__wordImg') as HTMLImageElement;
    const wordEl = this.wrapper.querySelector('.audioCall__wordTranslate') as HTMLElement;
    if (imgEl && wordEl) {
      imgEl.classList.remove('is-hidden');
      wordEl.classList.remove('is-hidden');
    }
  }

  disableChoice() {
    const inputs = this.wrapper.querySelectorAll('input[type="radio"]');
    inputs.forEach((elem) => {
      (elem as HTMLInputElement).disabled = true;
    });
  }

  listen() {
    // play audio on click
    this.wrapper.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const audioWrapper = target.closest('[data-audio]') as HTMLElement;
      if (audioWrapper) {
        const audioEl = audioWrapper.querySelector('audio') as HTMLAudioElement;
        console.log(target);
        void audioEl.play();
      }
    });
    // start game on click
    this.startButton.addEventListener('click', () => {
      const selectorEl = this.startScreen.querySelector('select') as HTMLSelectElement;
      const wordsGroup = Number(selectorEl.value);
      const randomWordsPage = () => Math.floor(Math.random() * 29 + 1);
      this.startGame(wordsGroup, randomWordsPage()).catch((err) => console.warn(err));
    });
    // handle on choose word (radio button)
    this.wrapper.addEventListener('change', (e) => {
      if ((e.target as HTMLInputElement).name === 'choiceOption') {
        this.showTips();
        this.disableChoice();
        const answerData = this.localStat.registerAnswer(e);
        // write in history
        this.statData.addAnswer('audioCall', answerData);
        this.statData.addWordsHistory('audioCall', answerData);
        console.dir(this.statData.stat);

        setTimeout(() => {
          if (this.hasNext()) {
            this.next();
          } else {
            this.showResults();
            this.statData.saveStat().catch((err) => console.warn(err));

            // test agregator
            // const agregator = new Agregator(this.statData.stat);
            // const dayAnswers = agregator.getDayAnswers('audioCall');
            // console.log('dayAnswers: ', dayAnswers);
          }
        }, 1000);
      }
    });
  }
}

export const game = new Game();

// const stat = new StatData();
// stat.resetAllStat();
// stat.resetAllStat();

// stat
//   .saveStat()
//   .then((data) => console.dir(data))
//   .catch((err) => console.log(err));

// stat
//   .getStat()
//   .then((data) => console.dir(data))
//   .catch((err) => console.log(err));

// import { setStatistics, getStatistics } from '../../api/api';

// const data = {
//   learnedWords: 1,
//   optional: {},
// };

// setStatistics(data).then(
//   (body) => {
//     console.log(body);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// getStatistics().then(
//   (body) => {
//     console.log(body);
//   },
//   (err) => {
//     console.log(err);
//   }
// );
