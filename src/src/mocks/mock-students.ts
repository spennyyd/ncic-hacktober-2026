import { Student } from "../types/student";

export const createMockStudents: () => Student[] = (): Student[] => {
  return [
    {
      firstName: "Spencer",
      lastName: "Davis",
      absentTotal: 0,
      correctQuestionTotal: 0,
      incorrectQuestionTotal: 0,
    },
    {
      firstName: "Nathan",
      lastName: "Tompkins",
      absentTotal: 0,
      correctQuestionTotal: 0,
      incorrectQuestionTotal: 0,
    },
    {
      firstName: "Michael",
      lastName: "Dominguez",
      absentTotal: 0,
      correctQuestionTotal: 0,
      incorrectQuestionTotal: 0,
    },
    {
      firstName: "Marshall",
      lastName: "Smith",
      absentTotal: 0,
      correctQuestionTotal: 0,
      incorrectQuestionTotal: 0,
    },
    {
      firstName: "Micah",
      lastName: "Penney",
      absentTotal: 0,
      correctQuestionTotal: 0,
      incorrectQuestionTotal: 0,
    },
  ];
};
