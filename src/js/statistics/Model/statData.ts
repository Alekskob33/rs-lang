// console.log('stat');
import { getStatistics, setStatistics } from '../../api/api';
import { StatDataType, AnswerObj, GameNameType } from '../types';

export class StatData {
  stat: StatDataType = {
    learnedWords: 0,
    optional: {
      wordsHistory: {
        passedWords: [],
        newWordsPerDay: [],
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

  constructor() {
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
      if (this.isEmpty(data)) data = await this.initStat();
      delete data.id;
      return (this.stat = data);
    } catch (err) {
      console.log(err);
    }
  }

  addAnswer(gameName: GameNameType, answerObj: AnswerObj) {
    const date = new Date().toLocaleDateString('ru');
    const { answersHistory } = this.stat.optional.learning[gameName];

    if (answersHistory[date]) {
      answersHistory[date].push(answerObj);
    } else {
      answersHistory[date] = [];
      answersHistory[date].push(answerObj);
    }
    console.log('answer has been added:', answersHistory[date]);
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
          newWordsPerDay: [],
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
  }

  async saveStat() {
    const data = this.stat;
    try {
      await setStatistics<StatDataType>(data);
      console.log('The Statistics has been successfully saved:');
      console.dir(this.stat.optional.learning.audioCall.answersHistory);
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
