import { Respostas } from "./Respostas"

export class Pergunta{
  public id: number
  public nomePessoa: string
  public textoPergunta: string
  public titulo: string
  public respostas: Respostas[]
}
