import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { Pergunta } from 'src/model/Pergunta';
import { Respostas } from 'src/model/Respostas';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {
  private baseUrl: string;

  constructor(private httpClient:HttpClient) {
    this.baseUrl = `${environment.baseUrl}`;
  }

  public async GetAllPerguntas(): Promise<Pergunta[]> {
    try {
      const Response = await lastValueFrom(this.httpClient.get<Pergunta[]>(this.baseUrl+'Perguntas/todas-as-perguntas'));
      return Response;
    } catch (error: any) {
      throw new HttpErrorResponse(error);
    }
  }

  public async GetPerguntaById(id: number): Promise<Pergunta> {
    try {
      const Response = await lastValueFrom(this.httpClient.get<Pergunta>(this.baseUrl+'Perguntas/'+id));
      return Response;
    } catch (error: any){
      throw new HttpErrorResponse(error);
    }
  }

  cadastrarResposta(id: number, Resposta: Respostas){
    return this.httpClient.post(this.baseUrl+'Perguntas/'+id+'/resposta', Resposta);
  }
}
