<script setup lang=ts>
import ModalGeral from './ModalGeral.vue';
import type Aluno from '@/model/Aluno';
import { computed, ref } from 'vue';
import ModalDelete from './ModalDelete.vue';
const props = defineProps<{
  alunos: Aluno[]
  nome: string,
  searchedValue: string
}>();

const emit  = defineEmits(["update-aluno-selecionado","update-aluno-deletado"]);
const showModal = ref(false);
const showModalDelete = ref(false);

const alunoSelecionado = ref <Aluno | null> (null);

const isEdit = ref(false);
function closeModal(){
  showModal.value = !showModal.value;
}

function closeModalDelete(){
  showModalDelete.value = !showModalDelete.value;
}

function updateAluno(aluno: Aluno){
  showModal.value = !showModal.value;
  isEdit.value = true;
  alunoSelecionado.value = aluno;
}
function emitAlunoDeletado(aluno: Aluno){
  emit('update-aluno-deletado', aluno);
}

function emitUpdateAlunoSelecionado(aluno: Aluno){
  emit('update-aluno-selecionado', aluno);
}

function deleteAluno(aluno){
  alunoSelecionado.value = aluno;
  showModalDelete.value = !showModalDelete.value;
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
  <ModalGeral :isEdit="isEdit" :showModal="showModal" :alunoSelecionado="alunoSelecionado" @close="closeModal" @emitUpdateAlunoSelecionado="emitUpdateAlunoSelecionado"  />

  <ModalDelete :showModalDelete="showModalDelete" :alunoSelecionado="alunoSelecionado" @close="closeModalDelete"  @aluno-deletado="emitAlunoDeletado"/>

    <table class="container table table-striped table-hover table-bordered">
          <thead>
          {{ props.searchedValue }}
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Nota 1</th>
              <th scope="col">Nota 2</th>
              <th scope="col">Media</th>
              <th scope="col">Situacao</th>
              <th scope="col">Ação</th>

            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(aluno, index) in alunosFiltrados" :key="index" class=".text-light" >
              <td >{{aluno.nome}}</td>
              <td>{{aluno.primeiraNota}}</td>
              <td>{{aluno.segundaNota}}</td>
              <td>{{aluno.media.toFixed(2) }}</td>
              <td :class="{'table-success': aluno.situacao === 'Aprovado', 'table-danger': aluno.situacao === 'Reprovado', 'table-warning': aluno.situacao === 'Recuperacao'}">{{aluno.situacao}}</td>
              <td class="row justify-content-center">
                  <button  @click="updateAluno(aluno)" class="col-4 mx-1 text-bg-success">Edit</button>

                  <button @click="deleteAluno(aluno)" class="col-4 mx-1 text-bg-danger">Del</button>
              </td>

            </tr>
          </tbody>
    </table>
  </section>
</template>
