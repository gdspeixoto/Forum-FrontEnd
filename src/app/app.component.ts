import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pergunta } from 'src/model/Pergunta';
import { PerguntasService } from 'src/services/perguntas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Forum-FrontEnd';
}
