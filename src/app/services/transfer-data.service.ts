import { outputAst } from '@angular/compiler';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferDataService {
  @Output() myTrigger: EventEmitter<any> = new EventEmitter();
  constructor() {}
}
