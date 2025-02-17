
<script setup lang="ts">
import { ref, watch } from 'vue';

const search = ref<string>('');

const emit = defineEmits(['filteredValue']);

watch(search,(filteredValue =>{

    emit('filteredValue',filteredValue)

}))

</script>
<template>
  <div class="container row mb-4 position-relative">
          <h3 class="col-8">Listagem de Alunos</h3>
          <input v-model="search" type="text" class="col-4">
  </div>
</template>
