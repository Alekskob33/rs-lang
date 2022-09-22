// console.log('stat');
import { getStatistics, setStatistics } from '../../api/api';
import { StatDataType, AnswerObj } from '../types';

class StatData {
  stat: StatDataType = {
    learnedWords: 0,
    optional: {
      wordsHistory: {
        passedWords: [],
        newWordsPerDay: [],
      },
      learning: {
        audioCall: {
          dayAnswers: [],
        },
        sprint: {
          dayAnswers: [],
        },
      },
    },
  };
  // constructor() {}

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
      return (this.stat = data);
    } catch (err) {
      console.log(err);
    }
  }

  async saveStat() {
    const data = this.stat;
    try {
      console.log(data);
      await setStatistics<StatDataType>(data);
      console.log('The Statistics has been successfully saved');
    } catch (err) {
      console.log(err);
    }
  }
}

const statData = new StatData();
statData
  .saveStat()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
