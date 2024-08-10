import { ClassGrade } from "@/enums";

export const parseStringify = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

export const classGradeOptions = [
  {
    value: ClassGrade.Grade1,
    label: ClassGrade.Grade1,
  },
  {
    value: ClassGrade.Grade2,
    label: ClassGrade.Grade2,
  },
  {
    value: ClassGrade.Grade3,
    label: ClassGrade.Grade3,
  },
  {
    value: ClassGrade.Grade4,
    label: ClassGrade.Grade4,
  },
  {
    value: ClassGrade.Grade5,
    label: ClassGrade.Grade5,
  },
  {
    value: ClassGrade.Grade6,
    label: ClassGrade.Grade6,
  },
  {
    value: ClassGrade.Grade7,
    label: ClassGrade.Grade7,
  },
  {
    value: ClassGrade.Grade8,
    label: ClassGrade.Grade8,
  },
  {
    value: ClassGrade.Grade9,
    label: ClassGrade.Grade9,
  },
  {
    value: ClassGrade.Grade10,
    label: ClassGrade.Grade10,
  },
  {
    value: ClassGrade.Grade11,
    label: ClassGrade.Grade11,
  },
  {
    value: ClassGrade.Grade12,
    label: ClassGrade.Grade12,
  },
];

export const itemsPerPage = 10;
