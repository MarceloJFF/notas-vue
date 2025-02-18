<script setup lang="ts">
import type Aluno from '@/model/Aluno';
import axios from 'axios';

const emit = defineEmits(["close","aluno-deletado"]);

const props = defineProps<{
  showModalDelete: boolean,
  alunoSelecionado: Aluno | null,
}>();

function deletarAluno(){
  if(props.alunoSelecionado != null){
    axios.delete(`http://localhost:3001/alunos/${props.alunoSelecionado.id}`)
      .then(() => {
        console.log("Aluno deletado com sucesso!");
        emit('aluno-deletado', props.alunoSelecionado);
        close()
      })
      .catch((error) => {
        console.error("Erro ao deletar aluno:", error);
      });
  }else{
    console.log("props é null")
  }
}

function close() {
  emit('close');
}
</script>

<template>
  <div :class="{ show: props.showModalDelete }"  class="modal" tabindex="-1" :style="{ display: props.showModalDelete ? 'block' : 'none' }">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Deletar</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"  @click="close" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h1 class="text-danger"> Tem certeza que deseja deletar o aluno? </h1>
        <p>Nome: {{ props.alunoSelecionado?.nome }}</p>
        <p>Nota 1: {{ props.alunoSelecionado?.primeiraNota }}</p>
        <p>Nota 2: {{ props.alunoSelecionado?.segundaNota}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Cancelar</button>
        <button type="button" class="btn btn-danger" @click="deletarAluno">Deletar</button>
      </div>
    </div>
  </div>
</div>
</template>
