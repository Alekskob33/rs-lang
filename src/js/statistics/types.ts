export type StatDataType = {
  learnedWords: number;
  optional: {
    wordsHistory: {
      passedWords: Array<string>; // word id
      newWordsPerDay: Array<string>; // word id
    };
    learning: {
      audioCall: {
        dayAnswers: Array<AnswerObj>;
      };
      sprint: {
        dayAnswers: Array<AnswerObj>;
      };
    };
  };
};

export type AnswerObj = { id: number; isAnswerCorrect: boolean };

export type GameNameType = 'audioCall' | 'sprint';
