import { Component, OnInit } from '@angular/core';
import { Cursos } from '../nomeCursos';
import { CursoService } from '../curso.service';
import { MensagemService } from '../mensagem.service';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  //selecioneCurso?: Cursos;
  
  nomeCursos: Cursos[] = [];

  constructor(private cursoService: CursoService, private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.getCursos();
  }

  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.cursoService.addCurso({ nome } as Cursos)
      .subscribe(curso => {
        this.nomeCursos.push(curso);
      });
  }

  delete(curso: Cursos): void{ //atualiza a lista de cursos mas quem exclui mesmo é o curso service
    this.nomeCursos = this.nomeCursos.filter(h => h !== curso);
  this.cursoService.deleteCurso(curso.id).subscribe();
  }

  //selecione(curso: Cursos): void{
    //this.selecioneCurso = curso;
    //this.mensagemService.add("Cursos: Selecione curso nome=${Cursos.nome}")
  //}

  getCursos():void {
    this.cursoService.getCursos().subscribe(nomeCursos => this.nomeCursos = nomeCursos);
  }
  

}
