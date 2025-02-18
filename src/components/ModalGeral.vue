<script setup lang="ts">
import type Aluno from '@/model/Aluno';
import { defineProps, defineEmits, ref, watch } from 'vue';
import axios from 'axios';
import validarDados from '@/util/validacao-service';

const props = defineProps<{
  showModal: boolean,
  alunoSelecionado: Aluno | null,
  isEdit: boolean
}>();


const emit = defineEmits(["close", "emitUpdateAlunoSelecionado","emitAlunoAdicionado"]);

// Estado reativo para o aluno sendo editado
const formAluno = ref<Aluno | null>(null);
const validacao = ref<Error[]>([]);

//sempre que o aluno selecionado mudar no componente pai os dados são alterados no formAluno
watch(() => props.alunoSelecionado, (novoAluno) => {
  formAluno.value = novoAluno ? { ...novoAluno } : {nome:'', primeiraNota: 0, segundaNota: 0};
  console.log(formAluno.value, props.isEdit);
}, { immediate: true });

function close() {
  validacao.value = [];
  emit('close');
}


function salvar() {
  validacao.value = [];
  if(validarDados(formAluno.value,validacao)){
    if(props.isEdit){
        axios.put(`http://localhost:3001/alunos/${formAluno.value?.id}`, formAluno.value)
      .then(() => {
        console.log("Aluno salvo com sucesso!");
        emit('emitUpdateAlunoSelecionado', formAluno.value);
      })
      .catch((error) => {
        console.error("Erro ao salvar aluno:", error);
      });
    }else{
      axios.post(`http://localhost:3001/alunos`, formAluno.value)
        .then((response) => {
          console.log("Aluno adicionado com sucesso!", response.data);
          emit('emitAlunoAdicionado', response.data); // Emitir o novo aluno
        })
        .catch((error) => {
          console.error("Erro ao adicionar aluno:", error);
        });
    }
    validacao.value = [];
    close();
  }else {
    return;
  }
}
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" :class="{ show: props.showModal }"
       :style="{ display: props.showModal ? 'block' : 'none' }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"> {{ props.isEdit?"Alterar Aluno":"Cadastrar Aluno" }}</h5>
            <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form v-if="formAluno">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome Completo</label>
                <input type="text" v-model="formAluno.nome" class="form-control" id="nome">
              </div>
              <div class="mb-3">
                <label for="nota1" class="form-label">Nota 1</label>
                <input type="number" v-model="formAluno.primeiraNota" class="form-control" id="nota1">
              </div>
              <div class="mb-3">
                <label for="nota2" class="form-label">Nota 2</label>
                <input type="number" v-model="formAluno.segundaNota" class="form-control" id="nota2">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div>
              <ol v-if="validacao.length>0" class="alert alert-danger">
                <li v-for="error in validacao" :key="error.message">{{ error.message }}</li>
              </ol>
            </div>
            <button type="button" class="btn btn-secondary" @click="close">Fechar</button>
            <button type="button" class="btn btn-primary" @click="salvar">Salvar</button>
          </div>
        </div>
      </div>
  </div>
</template>
