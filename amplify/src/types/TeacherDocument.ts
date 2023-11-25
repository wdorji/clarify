export type TeacherDocument = {
  textContent: string;
  userEmail: string;
  imageBucket: string[];
  imageUrl: string[];
  textName: string;
  date?: Date;
  textId?: string;
  grammarPrompt?: string;
  question?: string;
  refAnswer?: string;
  palmRes?: string;
};
