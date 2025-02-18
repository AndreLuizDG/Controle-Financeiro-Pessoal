
    // Armazena todas as transações (Receitas e Gastos) em um só array
    let listaItens = [];

    // Quando o documento estiver pronto
    $(document).ready(function () {
      // Botões para abrir os modais
      $("#adicionar_receita").on("click", function () {
        $("#modal_receita").modal("show");
      });
      $("#adicionar_gasto").on("click", function () {
        $("#modal_gasto").modal("show");
      });

      // Confirmar Receita
      $(".Confirma_Receita").click(function () {
        const descricao = $("#descricao_receita").val().trim();
        const valor = $("#valor_receita").val().trim();

        if (descricao && valor) {
          // Adiciona nova RECEITA
          listaItens.push({
            descricao: descricao,
            valor: parseFloat(valor),
            data: obterDataAtual(),
            tipo: "Receita"
          });

          // Renderiza e atualiza valores
          renderizarLista();
          atualizarBalanco();

          // Limpa campos e fecha modal
          $("#descricao_receita").val("");
          $("#valor_receita").val("");
          $("#modal_receita").modal("hide");
        } else {
          Swal.fire({
            title: "Preencha todos os campos",
            icon: "warning",
            confirmButtonColor: "red",
          });
        }
      });

      // Confirmar Gasto
      $(".Confirma_Gasto").click(function () {
        const descricao = $("#descricao_gasto").val().trim();
        const valor = $("#valor_gasto").val().trim();

        if (descricao && valor) {
          // Adiciona novo GASTO
          listaItens.push({
            descricao: descricao,
            valor: parseFloat(valor),
            data: obterDataAtual(),
            tipo: "Gasto"
          });

          // Renderiza e atualiza valores
          renderizarLista();
          atualizarBalanco();

          // Limpa campos e fecha modal
          $("#descricao_gasto").val("");
          $("#valor_gasto").val("");
          $("#modal_gasto").modal("hide");
        } else {
          Swal.fire({
            title: "Preencha todos os campos",
            icon: "warning",
            confirmButtonColor: "red",
          });
        }
      });

      // Cancelar Receita/Gasto
      $(".Cancela_Receita, .Cancela_Gasto").on("click", function () {
        $(".ui.modal").modal("hide");
      });

      // Exemplo simples de "tabs": alternar cor de fundo dos botões (opcional)
      $("#btn-gastos").click(function(){
        $(this).addClass("red").siblings().removeClass("green");
      });
      $("#btn-receitas").click(function(){
        $(this).addClass("green").siblings().removeClass("red");
      });
    });

    // Função para renderizar a lista de transações na tabela
    function renderizarLista() {
      const tbody = $("#tabela-transacoes tbody");
      tbody.empty(); // limpa a tabela

      listaItens.forEach((item) => {
        const tipoClasse = item.tipo === "Receita" ? "tipo-receita" : "tipo-gasto";
        const row = `
          <tr>
            <td>${item.descricao}</td>
            <td>${item.valor.toFixed(2)}</td>
            <td>${item.data}</td>
            <td class="${tipoClasse}">${item.tipo}</td>
          </tr>
        `;
        tbody.append(row);
      });
    }

    // Função para atualizar o Balanço, Receitas e Gastos
    function atualizarBalanco() {
        alert('Chegou')
      let totalReceitas = 0;
      let totalGastos = 0;

      listaItens.forEach((item) => {
        if (item.tipo === "Receita") {
          totalReceitas += item.valor;
        } else if (item.tipo === "Gasto") {
          totalGastos += item.valor;
        }
      });

      const balanco = totalReceitas - totalGastos;

      // Atualiza textos
      $("#valor-receitas").text(totalReceitas.toFixed(2));
      $("#valor-gastos").text(totalGastos.toFixed(2));
      $("#valor-balanco").text(balanco.toFixed(2));

      // Altera cor do balanço (positivo/negativo)
      const cardBalanco = $("#card-balanco");
      if (balanco >= 0) {
        cardBalanco.removeClass("negativo").addClass("positivo");
      } else {
        cardBalanco.removeClass("positivo").addClass("negativo");
      }
    }

    // Função para obter a data atual no formato dd/mm/yyyy
    function obterDataAtual() {
      const dataAtual = new Date();
      const dia = String(dataAtual.getDate()).padStart(2, "0");
      const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
      const ano = dataAtual.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }