import { dateObjectInterface } from "@core/models/date-object.interface";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export const dateObjectToDateString = (dateObj: dateObjectInterface): string =>{
  //const dateObj = {year: 2023, month: 5, day: 5};
  const year = dateObj.year;
  const month = dateObj.month < 10 ? `0${dateObj.month}` : dateObj.month;
  const day = dateObj.day < 10 ? `0${dateObj.day}` : dateObj.day;
  const dateString = `${year}-${month}-${day}`;
  return dateString;
}

export const dateStringToDateObject = (dateString: string): dateObjectInterface => {
  //const dateString = '2023-05-05';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateObj = { year, month, day };

  return dateObj;
}

export const dateToNgbDateStruct =(date: Date): NgbDateStruct => {
  return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}
