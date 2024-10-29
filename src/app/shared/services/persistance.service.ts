import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceServise {
  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving to localStorage ${e}`);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) || ''); // or (... as string)
    } catch (e) {
      console.error(`Error getting from localStorage ${e}`);
      return null;
    }
  }
}
