import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Contato } from './contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private db: AngularFireDatabase) { }

  insert(contato: Contato) {
    this.db.list('contato').push(contato).then(result => console.log(result.key));
  }

  update(contato: Contato, key: string) {
    this.db.list('contato').update(key, contato).catch(error => console.log(error));
  }

  getAll() {
    return this.db.list('contato').snapshotChanges().pipe(
      map(changes => changes.map(res => ({ key: res.payload.key, ...(res.payload.val()) as object }))));
  }

  delete(key: string) {
    this.db.object(`contato/${key}`).remove();
  }
}
