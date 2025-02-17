
<script setup lang="ts">
import { ref, watch } from 'vue';
const search = ref<string>('');

const emit = defineEmits(['filteredValue']);

watch (search,(filterValue(){
  if(filterValue.length > 4){
    emit('filteredValue')
  }
}))
</script>
<template>
  <div class="container row mb-4 position-relative">
          <h3 class="col-6">Listagem de Alunos</h3>
          <input v-model="search" type="text" class="col-4">
          <button :disabled="search.length < 4" type="button" class="btn btn-primary col-2">Buscar</button>
  </div>
</template>
