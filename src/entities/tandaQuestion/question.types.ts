export interface SkillScore {
  [key: string]: number;
}

export interface Option {
  value: string;
  text: string;
  skills: SkillScore;
}

export interface Question {
  question: string;
  options: Option[];
}

export interface QuestionsData {
  questions: Question[];
}
