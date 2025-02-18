<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeaderTabela from '@/components/HeaderTabela.vue';
import NavBar from '@/components/nav-bar.vue';
import TabelaHome from '@/components/TabelaHome.vue';
import Aluno from '@/model/Aluno';
import axios from 'axios';

const alunosInfor = ref<Aluno[] | null>(null); // Inicialmente nulo
const nome = "Marcelo";


onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3001/alunos");

    alunosInfor.value = response.data.map((aluno:Aluno)=>{
      const novoAluno =  new Aluno();
      novoAluno.id = aluno.id;
      novoAluno.nome = aluno.nome;
      novoAluno.primeiraNota = aluno.primeiraNota;
      novoAluno.segundaNota = aluno.segundaNota;
      return novoAluno;
    })
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
  }
});


function updateAlunoSelecionado(aluno: Aluno) {

  if (alunosInfor.value) {
    const index = alunosInfor.value.findIndex(a => a.id === aluno.id);
    if (index !== -1) {
      alunosInfor.value[index] = Object.assign(new Aluno(), aluno); // Garante reatividade
    }
  }
}

function updateAlunoAdicionado(aluno: Aluno) {
  console.log(aluno+ "aluno add")
  if (alunosInfor.value) {
    alunosInfor.value.push(Object.assign(new Aluno(), aluno));
  }
}
function updateAlunoDeletado(aluno: Aluno) {
  if (alunosInfor.value) {
    const index = alunosInfor.value.findIndex(a => a.id === aluno.id);
    if (index !== -1) {
      alunosInfor.value.splice(index, 1);
    }
  }

}



const searchedValue = ref<string | null>(null);
const filterValue = (filteredValue)=>{
  searchedValue.value = filteredValue;
}
</script>

<template>
  <NavBar />
  <main>
    <section class="container-lg my-4">
      <HeaderTabela @filteredValue = filterValue   @emit-aluno-adicionado="updateAlunoAdicionado"/>

      <div v-if="alunosInfor === null">Carregando alunos...</div>
      <div v-else>
        <TabelaHome :alunos="alunosInfor" :nome="nome" :searchedValue="searchedValue ?? ''" @update-aluno-selecionado="updateAlunoSelecionado" @update-aluno-deletado="updateAlunoDeletado" />
      </div>
    </section>

  </main>
</template>
