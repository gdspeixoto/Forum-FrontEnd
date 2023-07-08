import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pergunta } from 'src/model/Pergunta';
import { PerguntasService } from 'src/services/perguntas.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Respostas } from 'src/model/Respostas';

@Component({
  selector: 'app-forum-view',
  templateUrl: './forum-view.component.html',
  styleUrls: ['./forum-view.component.css']
})
export class ForumViewComponent implements OnInit {

  public list_perguntas: Pergunta;
  public idPergunta: number;
  respostaForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private perguntaServices: PerguntasService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,) {
    this.respostaForm = this.formBuilder.group({
      nome: '',
      texto: ''
    });
    this.idPergunta = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.GetDataPerguntaById();
  }

  //GET Perguntas
  public async GetDataPerguntaById(): Promise<void> {
    if (!this.list_perguntas) {
      try {
        let result = await this.perguntaServices.GetPerguntaById(this.idPergunta);
        this.list_perguntas = result;
        console.log(this.list_perguntas);
        this.changeDetectorRef.detectChanges(); // Adicione esta linha
      } catch (error) {
        //trocar por toastr
      }
    }
  }

  cadastrarResposta(): void {
    if (this.respostaForm.valid) {
      const Resposta = new Respostas();
      Resposta.nome = this.respostaForm.get('nome').value;
      Resposta.textoResposta = this.respostaForm.get('texto').value;


      // Chame o serviço de cadastro de resposta passando as informações necessárias
      this.perguntaServices.cadastrarResposta(this.idPergunta, Resposta).subscribe(
        // Manipule a resposta do serviço, se necessário
        async (response) => {
          this.list_perguntas = null;
          await this.GetDataPerguntaById();
          console.log('Resposta cadastrada com sucesso!');
          this.respostaForm.reset();
        },
        (error) => {
          console.error('Erro ao cadastrar resposta:', error);
        }
      );
    }
  }
}
