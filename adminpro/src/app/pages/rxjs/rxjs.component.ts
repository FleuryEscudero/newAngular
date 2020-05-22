import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line: import-blacklist
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObs().subscribe(
      (numero) => console.log('subs', numero),
      (error) => console.error('Error en el obs', error),
      () => console.log('el observador termino!')
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    console.log('la pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  returnObs(): Observable<any> {
    return new Observable((observer) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;

        const exit = {
          value: contador,
        };

        /*  observer.next(exit);
      /*   if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */
        /*   if (contador === 2) {
          // clearInterval(intervalo);
          observer.error('Auxilio');
        } 
      }, 1000);
    }).pipe(
      map(res => res.value),
      filter((value, index) => {
       // console.log('filter', value, index);
       if ((value % 2) === 1){
        //  impar
        return true;
       }else {
        //  par
        return false;
       }*/
      });
    });
  }
}
