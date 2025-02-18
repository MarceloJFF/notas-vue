
<script setup lang="ts">
import { ref, watch } from 'vue';
import ModalGeral from './ModalGeral.vue';
const search = ref<string>('');



const emit = defineEmits(['filteredValue','emit-aluno-adicionado']);
const showModal = ref(false);
const isEdit = ref(false);

function closeModal(){
  showModal.value = !showModal.value;
}
function emitAlunoAdd(aluno: Aluno){
  console.log(aluno+ "aluno add em emitido")
  emit('emit-aluno-adicionado', aluno);
}


watch(search,(filteredValue =>{
    emit('filteredValue',filteredValue)
}))


function addAluno(){
  showModal.value = !showModal.value;
  isEdit.value = false;
}

</script>
<template>
    <ModalGeral :isEdit="isEdit" :showModal="showModal"  @close="closeModal" @emitAlunoAdicionado="emitAlunoAdd" />
  <div class="container row mb-4 justify-content-between">
          <h3 class="col-5">Listagem de Alunos</h3>
          <input v-model="search" type="text" class="col-4">
          <button class="col-2 mx-1 text-bg-primary" @click="addAluno">Add</button>
  </div>
</template>
