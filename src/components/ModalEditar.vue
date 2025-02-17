<script setup lang="ts">
import type Aluno from '@/model/Aluno';
import { defineProps, defineEmits, ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps<{
  showModal: boolean,
  alunoSelecionado: Aluno | null,
  indiceAluno: number
}>();

const emit = defineEmits(["close", "updateAlunoSelecionado"]);

// Estado reativo para o aluno sendo editado
const alunoAlterado = ref<Aluno | null>(null);

// Observa mudanças no aluno selecionado para garantir que os dados sejam atualizados corretamente no modal
watch(() => props.alunoSelecionado, (novoAluno) => {
  alunoAlterado.value = novoAluno ? { ...novoAluno } : null;
}, { immediate: true });

function close() {
  emit('close');
}

function salvar() {
  if (alunoAlterado.value) {
    axios.put(`http://localhost:3001/alunos/${alunoAlterado.value.id}`, alunoAlterado.value)
      .then(() => {
        console.log("Aluno salvo com sucesso!");
        emit('updateAlunoSelecionado', alunoAlterado.value, props.indiceAluno);
      })
      .catch((error) => {
        console.error("Erro ao salvar aluno:", error);
      });
  }
  close();
}
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" :class="{ show: props.showModal }"
       :style="{ display: props.showModal ? 'block' : 'none' }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Alterar Aluno</h5>
            <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form v-if="alunoAlterado">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome Completo</label>
                <input type="text" v-model="alunoAlterado.nome" class="form-control" id="nome">
              </div>
              <div class="mb-3">
                <label for="nota1" class="form-label">Nota 1</label>
                <input type="number" v-model="alunoAlterado.primeiraNota" class="form-control" id="nota1">
              </div>
              <div class="mb-3">
                <label for="nota2" class="form-label">Nota 2</label>
                <input type="number" v-model="alunoAlterado.segundaNota" class="form-control" id="nota2">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">Fechar</button>
            <button type="button" class="btn btn-primary" @click="salvar">Salvar</button>
          </div>
        </div>
      </div>
  </div>
</template>
