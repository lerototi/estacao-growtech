import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempArService {


  temps = [];

  constructor() { }


  listarTemperatura() {
    return this.temps;
  }

  listarUmidade() {

  }
}
