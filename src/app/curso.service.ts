import { Injectable } from '@angular/core';
import { Cursos } from './nomeCursos';
import { Observable, of } from 'rxjs';
import { MensagemService } from './mensagem.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private cursosURL = 'api/cursos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private mensagemService: MensagemService) { }

  getCurso(id: number): Observable<Cursos> { //constroi uma url de solicitação para o heroi desejado 
    const url = `${this.cursosURL}/${id}`; //quando usar string literal usar sempre o dolar antes da variavel pq a string literal é uma concatenacao
    return this.http.get<Cursos>(url)//troquei tudo de baixo para aplicar o httclient, troquei o of() pelo http.get() para pegar dados do servidor, com o http podemos realizar requisições e receber uma unica resposta 
    .pipe(
      tap(_ => this.log(`Buscando cursos id=${id}`)), //olha os valores observable e envia uma msg atraves do metodo log declarado abaixo
      catchError(this.handleError<Cursos>(`getCursos id=${id}`)) //ve o observable que falhou e passa para a função handleerror lidar com ela e dar uma resposta 
    );
    //const cursos = of(CURSOS);
    //this.mensagemService.add('Fui clicado');
    //return cursos;
  }
  /** GET cursos from the server */
getCursos(): Observable<Cursos[]> {
  return this.http.get<Cursos[]>(this.cursosURL)
    .pipe(
      tap(_ => this.log('teste')),
      catchError(this.handleError<Cursos[]>('getCursos', []))
    );
}
/** PUT: update the curso on the server */
updateCurso(curso: Cursos): Observable<any> {
  return this.http.put(this.cursosURL, curso, this.httpOptions).pipe(
    tap(_ => this.log(`updated curso id=${curso.id}`)),
    catchError(this.handleError<any>('updateCurso'))
  );
}
/** POST: add a new curso to the server */
addCurso(curso: Cursos): Observable<Cursos> {
  return this.http.post<Cursos>(this.cursosURL, curso, this.httpOptions).pipe(
    tap((novoCurso: Cursos) => this.log(`added curso w/ id=${novoCurso.id}`)),
    catchError(this.handleError<Cursos>('addCurso'))
  );
}
/** DELETE: delete the curso from the server */
deleteCurso(id: number): Observable<Cursos> {
  const url = `${this.cursosURL}/${id}`;
  return this.http.delete<Cursos>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted curso id=${id}`)),
    catchError(this.handleError<Cursos>('deleteCurso'))
  );
}
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); 
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
  private log(mensagem: string){
    this.mensagemService.add(`CursoService: ${mensagem}`);
  }
 /* GET cursos whose name contains search term */
searchCursos(term: string): Observable<Cursos[]> {
  if (!term.trim()) {
    // if not search term, return empty cursos array.
    return of([]);
  }
  //conforme o usuario digita um nome, ele faz solicitações http para dar match com algum nome ja existente
  return this.http.get<Cursos[]>(`${this.cursosURL}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found cursos matching "${term}"`) :
       this.log(`no cursos matching "${term}"`)),
    catchError(this.handleError<Cursos[]>('searchCursos', []))
  );
}

}

