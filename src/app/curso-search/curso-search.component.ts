import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Cursos } from '../nomeCursos';
import { CursoService } from '../curso.service';

@Component({
  selector: 'app-curso-search',
  templateUrl: './curso-search.component.html',
  styleUrls: [ './curso-search.component.css' ]
})
export class CursoSearchComponent implements OnInit {
  cursos$: Observable<Cursos[]>;
  private searchTerms = new Subject<string>();

  constructor(private cursoService: CursoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cursos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.cursoService.searchCursos(term)),
    );
  }
}
