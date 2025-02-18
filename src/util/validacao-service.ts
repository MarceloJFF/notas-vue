import type Aluno from "@/model/Aluno";

export default function validarDados(formAluno:Aluno, validacao: {value: Error[]}){

  if(!formAluno){
    validacao.value.push(new Error('Preencha os dados do aluno'));
  }else if(formAluno.nome == ''){
    validacao.value.push(new Error('Nome não pode ser vazio'));
  } else if (formAluno.primeiraNota > 10 || formAluno.primeiraNota < 0 || formAluno.segundaNota > 10 || formAluno.segundaNota < 0) {
    validacao.value.push(new Error('Nota deve ser entre 0 e 10'));
  }
  return validacao.value.length == 0;
}
