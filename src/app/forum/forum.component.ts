import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pergunta } from 'src/model/Pergunta';
import { PerguntasService } from 'src/services/perguntas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit{
  public list_perguntas: Pergunta[];

  constructor(private router: Router, private perguntaServices: PerguntasService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.GetDataPergunta();
  }

  //GET Perguntas
  public async GetDataPergunta(): Promise<void> {
    if (!this.list_perguntas) {
      try {
        let result = await this.perguntaServices.GetAllPerguntas();
        this.list_perguntas = result;
        console.log(this.list_perguntas);
        this.changeDetectorRef.detectChanges(); // Adicione esta linha
      } catch (error) {
        //trocar por toastr
      }
    }
  }

  pageTo(id: number){
    this.router.navigate(['/forum', id, 'respostas']);
  }
}
