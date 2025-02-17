export default class Aluno{
  public id:number;
  public nome:string;
  public primeiraNota:number;
  public segundaNota:number;

  constructor(){
    this.id =0;
    this.nome = '';
    this.primeiraNota = 0;
    this.segundaNota = 0;
  }

  public  calcularMedia():number{
    return (this.primeiraNota + this.segundaNota) / 2;
  }

  public verificarSituacao():string{
    const media = this.calcularMedia();
    if(media >= 7 && media <= 10){
      return "Aprovado";
    }else if(media >= 5 && media <= 6.9){
      return "Recuperacao";
    }else if(media >= 0 && media <= 4.9){
      return "Reprovado";
    }
    return "Nota invalida";
  }
}
