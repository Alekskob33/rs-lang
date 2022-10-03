import { wordType, answerData } from '../type';
import { game } from './game';

class LocalStat {
  answersStorage: Array<answerData> | [];

  constructor() {
    this.answersStorage = [];
  }
  registerAnswer(changeEvent: Event): { wordId: string; correctness: boolean } {
    const radioEl = changeEvent.target as HTMLInputElement;
    const form = radioEl.closest('form') as HTMLFormElement;
    const targetWordId = form.dataset.targetWordId as string;
    const answerWordId = radioEl.value;
    const isAnswerCorrect = targetWordId === answerWordId;

    this.saveAnswerResult(targetWordId, isAnswerCorrect);
    return { wordId: targetWordId, correctness: isAnswerCorrect };
  }

  saveAnswerResult(targetWordId: string, isCorrect: boolean) {
    const itemInStorage = this.answersStorage.find((item) => item.wordId === targetWordId);
    if (itemInStorage) {
      return isCorrect ? (itemInStorage.correctAnswers += 1) : (itemInStorage.wrongAnswers += 1);
    } else {
      (this.answersStorage as Array<answerData>).push({
        wordId: targetWordId,
        correctAnswers: isCorrect ? 1 : 0,
        wrongAnswers: isCorrect ? 0 : 1,
      });
    }
  }
}

export default LocalStat;
