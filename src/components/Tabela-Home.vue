<script setup lang=ts>
import Aluno from '@/model/Aluno'

const props = defineProps<{
  alunos: Aluno[]
  nome: string
}>();

console.log(props.alunos)
</script>
<template>
<section class="tabela">
    <table class="container table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Nota 1</th>
              <th scope="col">Nota 2</th>
              <th scope="col">Media</th>
              <th scope="col">Situacao</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for = "aluno in props.alunos">
              <th scope="row">{{aluno.id}}</th>
              <td>{{aluno.nome}}</td>
              <td>{{aluno.primeiraNota}}</td>
              <td>{{aluno.segundaNota}}</td>
              <td>{{aluno.primeiraNota}}</td>
              <td>{{aluno.segundaNota}}</td>
            </tr>

          </tbody>
    </table>
  </section>
</template>
