export type StatDataType = {
  id?: number;
  learnedWords: number;
  optional: {
    wordsHistory: {
      passedWords: Array<string>; // word id
      newWordsPerDay: Array<string>; // word id
    };
    learning: {
      audioCall: {
        answersHistory: AnswersHistory | EmptyAnswersHirstory;
      };
      sprint: {
        answersHistory: AnswersHistory | EmptyAnswersHirstory;
      };
    };
  };
};
export type GameNameType = 'audioCall' | 'sprint';

export type AnswerObj = {
  wordId: string;
  correctness: boolean;
};

type AnswersHistory = Record<string, AnswerObj[]>; // {'12.10.2022': [answerObj, answerObj]}
type EmptyAnswersHirstory = Record<string, never>; // empty obj -> {}

// const answers: Record<string, AnswerObj[]> = {
//   '12.10.2022': [
//     { wordId: '234234234', correctness: true },
//     { wordId: '645352324', correctness: false },
//   ],
//   '13.10.2022': [
//     { wordId: '234234234', correctness: true },
//     { wordId: '645352324', correctness: false },
//   ],
//   // '14.03.2022'
//   // '15.03.2022'
//   // e.t.c
// };

// Object.defineProperty(answers, '14.10.2022', {
//   value: [{ wordId: '80983049', correctness: true }],
// });
