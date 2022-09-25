import { StatDataType, AnswerObj, GameNameType } from '../types';

export class Agregator {
  data: StatDataType;
  currentDate: string;
  // correctAnswers: void;

  constructor(data: StatDataType) {
    this.data = data;
    this.currentDate = new Date().toLocaleDateString();
  }

  getDayAnswers(gameName: GameNameType) {
    const { answersHistory } = this.data.optional.learning[gameName];
    const dayAnswers = answersHistory[this.currentDate];
    return dayAnswers ? dayAnswers : [];
  }

  getNewWords(): number {
    return this.data.optional.wordsHistory.newWordsByDate?.[this.currentDate]?.length || 0;
  }

  getCorrectAnswers(dayAnswers: Array<AnswerObj>): Array<AnswerObj> {
    return dayAnswers.filter((item) => item.correctness);
  }

  getWrongAnswers(dayAnswers: Array<AnswerObj>): Array<AnswerObj> {
    return dayAnswers.filter((item) => !item.correctness);
  }

  getMaxCorrectAnswersChain(dayAnswers: Array<AnswerObj>): number {
    const maxArr: Array<number> = [];
    dayAnswers.reduce((rowCount, item, index, arr) => {
      if (item.correctness) {
        rowCount += 1;
        if (index === arr.length - 1) maxArr.push(rowCount);
        return rowCount;
      } else {
        maxArr.push(rowCount);
        return (rowCount = 0);
      }
    }, 0);
    return Math.max(...maxArr);
  }

  getPercent(dayAnswers: Array<AnswerObj>): string {
    const corrects = this.getCorrectAnswers(dayAnswers).length;
    return dayAnswers.length === 0 ? '0%' : `${((corrects / dayAnswers.length) * 100).toFixed(0)}%`;
  }
}

// const testAnswersArray: AnswerObj[] = [
//   { wordId: '9', correctness: true },
//   { wordId: '4', correctness: true },
//   { wordId: '12', correctness: true },
//   { wordId: '7', correctness: false },
//   { wordId: '8', correctness: false },
//   { wordId: '52', correctness: true },
//   { wordId: '15', correctness: true },
// ];

// const testStatData = {
//   learnedWords: 0,
//   optional: {
//     wordsHistory: {
//       passedWords: [],
//       newWordsPerDay: [],
//     },
//     learning: {
//       audioCall: {
//         dayAnswers: testAnswersArray,
//       },
//       sprint: {
//         dayAnswers: testAnswersArray,
//       },
//     },
//   },
// };

// const agregator = new Agregator(testStatData);

// const answers = agregator.getGameAnswersPerDay('audioCall');
// console.log(agregator.getPercent(answers));
