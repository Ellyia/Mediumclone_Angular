import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  range(start: number, end: number): number[] {
    // let arr: number[] = [];
    // for (let i = start; i >= end; i++) arr.push(i);
    // return arr; // or:
    return [...Array(end).keys()].map((el) => el + start);
  }
}
