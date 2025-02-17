<script setup lang=ts>
import ModalEditar from './ModalEditar.vue';
import type Aluno from '@/model/Aluno';
import { computed, ref } from 'vue';

const props = defineProps<{
  alunos: Aluno[]
  nome: string,
  searchedValue: string
}>();

const emit  = defineEmits(["update-aluno-selecionado"]);


function closeModal(){
  showModal.value = !showModal.value;
}
const showModal = ref(false);
const alunoSelecionado = ref <Aluno | null> (null);

function updateAluno(aluno: Aluno){
  showModal.value = !showModal.value;
  alunoSelecionado.value = aluno;
}
function updateAlunoSelecionado(aluno: Aluno){
  emit('update-aluno-selecionado', aluno);
}


const alunosFiltrados = computed(()=>{
  if(!props.searchedValue){
    return props.alunos.map(aluno => ({
      ...aluno,
      media: aluno.calcularMedia(),
      situacao: aluno.verificarSituacao()
    }));
  }
  return props.alunos.filter(aluno => aluno.nome.toLowerCase().includes(props.searchedValue.toLowerCase())).map(aluno => ({
    ...aluno,
    media: aluno.calcularMedia(),
    situacao: aluno.verificarSituacao()
  }));
});



</script>
<template>
<section class="tabela">
  <ModalEditar :showModal="showModal" :alunoSelecionado="alunoSelecionado" @close="closeModal" @updateAlunoSelecionado="updateAlunoSelecionado" />

    <table class="container table table-striped table-hover table-bordered">
          <thead>
          {{ props.searchedValue }}
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Nota 1</th>
              <th scope="col">Nota 2</th>
              <th scope="col">Media</th>
              <th scope="col">Situacao</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(aluno, index) in alunosFiltrados" :key="index" class=".text-light"  @click="updateAluno(aluno)" >
              <td >{{aluno.nome}}</td>
              <td>{{aluno.primeiraNota}}</td>
              <td>{{aluno.segundaNota}}</td>
              <td>{{aluno.media.toFixed(2) }}</td>
              <td :class="{'table-success': aluno.situacao === 'Aprovado', 'table-danger': aluno.situacao === 'Reprovado', 'table-warning': aluno.situacao === 'Recuperacao'}">{{aluno.situacao}}</td>
            </tr>
          </tbody>
    </table>
  </section>
</template>
