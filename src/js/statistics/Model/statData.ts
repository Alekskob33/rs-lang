// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const _ = require('lodash');

// console.log('stat');
import { getStatistics, setStatistics } from '../../api/api';
import { StatDataType, AnswerObj, GameNameType, AnswersHistory, EmptyHistory } from '../types';

export class StatData {
  dataStructure: StatDataType = {
    learnedWords: 0,
    optional: {
      wordsHistory: {
        passedWords: [],
        newWordsByDate: {},
      },
      learning: {
        audioCall: {
          answersHistory: {},
        },
        sprint: {
          answersHistory: {},
        },
      },
    },
  };

  stat: StatDataType;

  constructor() {
    this.stat = this.dataStructure;
    this.getStat().catch((err) => console.warn(err));
  }

  isEmpty(data: StatDataType) {
    return data.optional && Object.keys(data.optional).length < 1;
  }

  async initStat(): Promise<StatDataType> {
    return (await setStatistics(this.stat)) as StatDataType;
  }

  async getStat() {
    try {
      let data = (await getStatistics()) as StatDataType;
      const dataStructure = JSON.parse(JSON.stringify(this.dataStructure)) as StatDataType;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      data = _.merge(dataStructure, data) as StatDataType; // merge with default structure
      // if (this.isEmpty(data)) data = await this.initStat();
      delete data.id;
      return (this.stat = data);
    } catch (err) {
      console.log(err);
    }
  }

  addAnswer(gameName: GameNameType, answerObj: AnswerObj) {
    const date = new Date().toLocaleDateString('ru');
    const { answersHistory } = this.stat.optional.learning[gameName];
    // initial structure
    // let answersHistory: AnswersHistory | EmptyHistory;
    // if (this.stat.optional?.learning?.[gameName]?.answersHistory) {
    //   answersHistory = this.stat.optional.learning[gameName].answersHistory;
    // } else {
    //   this.stat.optional.learning = { [gameName]: { answersHistory: {} } };
    //   answersHistory = this.stat.optional.learning[gameName].answersHistory;
    // }

    if (answersHistory[date]) {
      answersHistory[date].push(answerObj);
    } else {
      answersHistory[date] = [];
      answersHistory[date].push(answerObj);
    }
    console.log('answer has been added:', answersHistory[date]);
  }

  addWordsHistory(gameName: GameNameType, answerObj: AnswerObj) {
    const date = new Date().toLocaleDateString();
    const { passedWords } = this.stat.optional.wordsHistory;
    const wordsHistory = this.stat.optional.wordsHistory;
    const newWordsByDate = wordsHistory.newWordsByDate ? wordsHistory.newWordsByDate : {};
    const { wordId } = answerObj;
    if (passedWords.includes(wordId)) return; // already passed

    // console.log(newWordsByDate);
    // add in NewWords
    if (!(date in newWordsByDate)) {
      newWordsByDate[date] = [wordId];
    } else {
      newWordsByDate[date].push(wordId);
    }

    // add in PassedWords
    passedWords.push(wordId);
  }

  resetDayAnswers(gameName: GameNameType) {
    this.stat.optional.learning[gameName].answersHistory = {};
  }

  resetAllStat() {
    this.stat = {
      learnedWords: 0,
      optional: {
        wordsHistory: {
          passedWords: [],
          newWordsByDate: {},
        },
        learning: {
          audioCall: {
            answersHistory: {},
          },
          sprint: {
            answersHistory: {},
          },
        },
      },
    };
    this.saveStat()
      .then(() => this.getStat())
      .then((data) => console.log(data))
      .catch((err) => console.warn(err));
  }

  async saveStat() {
    const data = this.stat;
    console.log('отправляем на сервер такие данные:');
    console.dir(data);
    try {
      const body = (await setStatistics<StatDataType>(data)) as StatDataType;
      console.log('The Statistics has been successfully saved:');
      console.log('от сервера ответ с такими данными:');
      console.dir(body);
    } catch (err) {
      console.log(err);
    }
  }
}

// const statData = new StatData();
// statData
//   .saveStat()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// .getStat()
// .then(() => statData.saveStat())
