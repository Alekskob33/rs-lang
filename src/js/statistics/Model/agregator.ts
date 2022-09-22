import { StatDataType, AnswerObj, GameNameType } from '../types';

class Agregator {
  data: StatDataType;
  // correctAnswers: void;

  constructor(data: StatDataType) {
    this.data = data;
  }

  getGameAnswersPerDay(gameName: GameNameType) {
    const { dayAnswers } = this.data.optional.learning[gameName];
    return dayAnswers;
  }

  getCorrectAnswers(answersArray: Array<AnswerObj>): Array<AnswerObj> {
    return answersArray.filter((item) => item.isAnswerCorrect);
  }

  getWrongAnswers(answersArray: Array<AnswerObj>): Array<AnswerObj> {
    return answersArray.filter((item) => !item.isAnswerCorrect);
  }

  getMaxCorrectsAtRow(answersArray: Array<AnswerObj>): number {
    const maxArr: Array<number> = [];
    answersArray.reduce((rowCount, item, index, arr) => {
      if (item.isAnswerCorrect) {
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

  getPercent(answersArray: Array<AnswerObj>): string {
    const corrects = this.getCorrectAnswers(answersArray).length;
    return answersArray.length === 0 ? '0%' : `${((corrects / answersArray.length) * 100).toFixed(0)}%`;
  }
}

const testAnswersArray: AnswerObj[] = [
  { id: 9, isAnswerCorrect: true },
  { id: 4, isAnswerCorrect: true },
  { id: 12, isAnswerCorrect: true },
  { id: 7, isAnswerCorrect: false },
  { id: 8, isAnswerCorrect: false },
  { id: 52, isAnswerCorrect: true },
  { id: 15, isAnswerCorrect: true },
];

const testStatData = {
  learnedWords: 0,
  optional: {
    wordsHistory: {
      passedWords: [],
      newWordsPerDay: [],
    },
    learning: {
      audioCall: {
        dayAnswers: testAnswersArray,
      },
      sprint: {
        dayAnswers: testAnswersArray,
      },
    },
  },
};

const agregator = new Agregator(testStatData);

const answers = agregator.getGameAnswersPerDay('audioCall');
// console.log(agregator.getPercent(answers));
