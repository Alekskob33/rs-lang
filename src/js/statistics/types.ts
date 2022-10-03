export type StatDataType = {
  id?: number;
  learnedWords: number;
  optional: {
    wordsHistory: {
      passedWords: Array<string>; // word id
      newWordsByDate: NewWords; // wordId by date
    };
    learning: {
      audioCall: {
        answersHistory: AnswersHistory | EmptyHistory;
      };
      sprint: {
        answersHistory: AnswersHistory | EmptyHistory;
      };
    };
  };
};
export type GameNameType = 'audioCall' | 'sprint';

export type AnswerObj = {
  wordId: string;
  correctness: boolean;
};

export type AnswersHistory = Record<string, AnswerObj[]>; // {'12.10.2022': [answerObj, answerObj]}
export type EmptyHistory = Record<string, never>; // empty obj -> {}
export type NewWords = Record<string, Array<string>>;

export type ViewData = {
  date: string;
  newWords: number;
  audioCall: {
    max: number;
    percent: string;
  };
  sprint: {
    max: number;
    percent: string;
  };
};
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
