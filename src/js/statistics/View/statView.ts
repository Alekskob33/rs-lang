import { StatData } from '../Model/statData';
import { Agregator } from '../Model/agregator';
import { StatDataType, GameNameType, AnswerObj, AnswersHistory, ViewData } from '../types';

const elements = {
  date: document.querySelector('[data-stat="date"]') as HTMLElement,
  newWords: document.querySelector('[data-stat="new-words"]') as HTMLElement,
  audiocall: {
    // newWords: document.querySelector('[data-audiocall="new-words"]') as HTMLElement,
    percent: document.querySelector('[data-audiocall="percent"]') as HTMLElement,
    maxSequence: document.querySelector('[data-audiocall="max"]') as HTMLElement,
  },
  sprint: {
    // newWords: document.querySelector('[data-sprint="new-words"]') as HTMLElement,
    percent: document.querySelector('[data-sprint="percent"]') as HTMLElement,
    maxSequence: document.querySelector('[data-sprint="max"]') as HTMLElement,
  },
} as const;

class StatView {
  // constructor() {}
  async agregateData() {
    try {
      const stat = new StatData();
      const data = (await stat.getStat()) as StatDataType;
      const agregator = new Agregator(data);

      const { wordsHistory } = data.optional;

      const viewData: ViewData = {
        date: agregator.currentDate,
        newWords: agregator.getNewWords(),
        audioCall: {
          max: 0,
          percent: '0%',
        },
        sprint: {
          max: 0,
          percent: '0%',
        },
      };

      // Record<string, AnswerObj[]>
      // type AnswerObj = {
      //   wordId: string;
      //   correctness: boolean;
      // };

      const acDayAnswers = agregator.getDayAnswers('audioCall');
      const spDayAnswers = agregator.getDayAnswers('sprint');

      if (acDayAnswers.length > 0) {
        viewData.audioCall.max = agregator.getMaxCorrectAnswersChain(acDayAnswers);
        viewData.audioCall.percent = agregator.getPercent(acDayAnswers);
      }
      if (spDayAnswers.length > 0) {
        viewData.sprint.max = agregator.getMaxCorrectAnswersChain(spDayAnswers);
        viewData.sprint.percent = agregator.getPercent(spDayAnswers);
      }
      return viewData;
    } catch (err) {
      console.warn(err);
    }
  }

  async showStatResults() {
    const data = (await this.agregateData()) as ViewData;
    if (data) {
      elements.date.textContent = data.date;
      elements.newWords.textContent = data.newWords.toString();

      elements.audiocall.percent.textContent = data.audioCall.percent;
      elements.audiocall.maxSequence.textContent = data.audioCall.max.toString();
      // elements.sprint.newWords.textContent = '';
      elements.sprint.percent.textContent = data.sprint.percent;
      elements.sprint.maxSequence.textContent = data.sprint.max.toString();
    }
  }
}

const view = new StatView();
view.showStatResults().catch((err) => console.warn(err));
