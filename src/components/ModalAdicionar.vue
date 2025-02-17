<template>

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
