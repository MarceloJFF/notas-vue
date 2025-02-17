<script setup lang=ts>
import type Aluno from '@/model/Aluno';
import { computed } from 'vue';

const props = defineProps<{
  alunos: Aluno[]
  nome: string,
  searchedValue: string
}>();


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
            <tr v-for="(aluno, index) in alunosFiltrados" :key="index">
              <td>{{aluno.nome}}</td>
              <td>{{aluno.primeiraNota}}</td>
              <td>{{aluno.segundaNota}}</td>
              <td>{{aluno.media.toFixed(2) }}</td>
              <td>{{aluno.situacao}}</td>
            </tr>

          </tbody>
    </table>
  </section>
</template>
