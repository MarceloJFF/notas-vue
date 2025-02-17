<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeaderTabela from '@/components/HeaderTabela.vue';
import NavBar from '@/components/nav-bar.vue';
import TabelaHome from '@/components/Tabela-Home.vue';
import Aluno from '@/model/Aluno';
import axios from 'axios';

const alunosInfor = ref<Aluno[] | null>(null); // Inicialmente nulo
const nome = "Marcelo";

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/alunos");

    alunosInfor.value = response.data.map((aluno:Aluno)=>{
      const novoAluno =  new Aluno();
      novoAluno.nome = aluno.nome;
      novoAluno.primeiraNota = aluno.primeiraNota;
      novoAluno.segundaNota = aluno.segundaNota;
      return novoAluno;
    })
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
  }
});

const searchedValue = ref<string | null>(null);
const filterValue = (filteredValue)=>{
  searchedValue.value = filteredValue;
}
</script>

<template>
  <NavBar />
  <main>
    <section class="container-lg my-4">
      <HeaderTabela @filteredValue = filterValue />

      <div v-if="alunosInfor === null">Carregando alunos...</div>
      <div v-else>
        <TabelaHome :alunos="alunosInfor" :nome="nome" :searchedValue="searchedValue ?? ''" />
      </div>
    </section>

  </main>
</template>
