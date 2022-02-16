import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cursos } from './nomeCursos';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
//implements ele implementa a interface entao a classe tem que ter tudo que ela tem

  createDb() {
    const cursos = [
      {area: 'Sociais', nome: 'Letras', id: 0 },
      {area: 'Exatas', nome: 'Matematica', id: 1},
      {area: 'Humanas', nome: 'Psicologia ', id: 2},
      {area: 'Saúde', nome: 'Veterinária', id: 3},
      {area: 'Sociais', nome: 'Direito', id: 4 },
      {area: 'Sociais', nome: 'Filosofia', id: 5 },
      {area: 'Exatas', nome: 'Fisica', id: 6 },
      {area: 'Humanas', nome: 'Portugues', id: 7 },
      {area: 'Humanas', nome: 'História', id: 8 },
      {area: 'Exatas', nome: 'Biologia', id: 9 },
      {area: 'Sociais', nome: 'Recursos Humanos', id: 10 },
      {area: 'Humanas', nome: 'Ingles', id: 11 },
      {area: 'Exatas', nome: 'Agronomia', id: 12 }
    ];
    return {cursos};
  }
  genId(curso: Cursos[]): number {
    return curso.length > 0 ? Math.max(...curso.map(curso => curso.id)) + 1 : 11;
  }
  constructor() { }
}
