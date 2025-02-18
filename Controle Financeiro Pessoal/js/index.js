let listaItens = [];

$(document).ready(function () {
  $("#adicionar_receita").on("click", function () {
    $("#modal_receita").modal("show");
  });
  $("#adicionar_gasto").on("click", function () {
    $("#modal_gasto").modal("show");
  });

  $(".Confirma_Receita").click(function () {
    const descricao = $("#descricao_receita").val().trim();
    const valor = $("#valor_receita").val().trim();

    if (descricao && valor) {
      listaItens.push({
        descricao: descricao,
        valor: parseFloat(valor),
        data: obterDataAtual(),
        tipo: "receita",
      });

      renderizarLista();
      atualizarBalanco();

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

  $(".Confirma_Gasto").click(function () {
    const descricao = $("#descricao_gasto").val().trim();
    const valor = $("#valor_gasto").val().trim();

    if (descricao && valor) {
      listaItens.push({
        descricao: descricao,
        valor: parseFloat(valor),
        data: obterDataAtual(),
        tipo: "gasto",
      });

      renderizarLista();
      atualizarBalanco();

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

  $(".Cancela_Receita, .Cancela_Gasto").on("click", function () {
    $(".ui.modal").modal("hide");
  });

  // Exemplo simples de "tabs": alternar cor de fundo dos botões (opcional)
  $("#btn-gastos").click(function () {
    $(this).addClass("red").siblings().removeClass("green");
    renderizarLista('gasto');
  });
  $("#btn-receitas").click(function () {
    $(this).addClass("green").siblings().removeClass("red");
    renderizarLista('receita');

  });
});


function renderizarLista(filtroTipo) {
  const tbody = $("#tabela-transacoes tbody");
  tbody.empty();

  // Filtra a lista com base no tipo selecionado
  const listaFiltrada = listaItens.filter((item) => {
    // Se não houver filtro, mostra tudo
    if (!filtroTipo) return true;
    // Se houver filtro, compara com o tipo do item
    return item.tipo === filtroTipo;
  });

  // Renderiza a lista filtrada
  listaFiltrada.forEach((item) => {
    const tipoClasse = item.tipo === "receita" ? "tipo-receita" : "tipo-gasto";
    const row = `
      <tr>
        <td>${item.descricao}</td>
        <td>${parseFloat(item.valor).toFixed(2)}</td>
        <td>${item.data}</td>
        <td class="${tipoClasse}">${item.tipo}</td>
      </tr>
    `;
    tbody.append(row);
  });
}


function atualizarBalanco() {
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

  $("#valor-receitas").text(totalReceitas.toFixed(2));
  $("#valor-gastos").text(totalGastos.toFixed(2));
  $("#valor-balanco").text(balanco.toFixed(2));

  const cardBalanco = $("#card-balanco");
  if (balanco >= 0) {
    cardBalanco.removeClass("negativo").addClass("positivo");
  } else {
    cardBalanco.removeClass("positivo").addClass("negativo");
  }
}

function obterDataAtual() {
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
