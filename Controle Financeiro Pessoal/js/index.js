let listaItens = [];

$(document).ready(function () {

  $("#adicionar_receita").on("click", function () {
    const descricao = $("#descricao").val().trim();
    const valor = $("#valor").val().trim();
    var categoria = $("#categoria").val().trim();
    console.log(categoria)
    if (descricao && valor) {
      listaItens.push({
        descricao: descricao,
        valor: parseFloat(valor),
        categoria: categoria,
        data: obterDataAtual(),
        tipo: "receita",
      });

      renderizarLista();
      atualizarBalanco();

      $("#descricao").val("");
      $("#valor").val("");
      $("#modal").modal("hide");
    } else {
      Swal.fire({
        title: "Preencha todos os campos",
        icon: "warning",
        confirmButtonColor: "red",
      });
    }

  });
  $("#adicionar_gasto").on("click", function () {
    const descricao = $("#descricao").val().trim();
    const valor = $("#valor").val().trim();
    var categoria = $("#categoria").val().trim();

    if (descricao && valor) {
      listaItens.push({
        descricao: descricao,
        valor: parseFloat(valor),
        categoria: categoria,
        data: obterDataAtual(),
        tipo: "gasto",
      });

      renderizarLista();
      atualizarBalanco();

      $("#descricao").val("");
      $("#valor").val("");
      $("#modal").modal("hide");
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

  $("#btn-gastos").click(function () {
    $(this).addClass("red").siblings().removeClass("green grey");
    renderizarLista('gasto');
  });

  $("#btn-receitas").click(function () {
    $(this).addClass("green").siblings().removeClass("red grey");
    renderizarLista('receita');
  });

  $("#btn-todos").click(function () {
    $(this).addClass("grey").siblings().removeClass("red green");
    renderizarLista('');

  });

});


function renderizarLista(filtroTipo) {
  const tbody = $("#tabela-transacoes tbody");
  tbody.empty();

  const listaFiltrada = listaItens.filter((item) => {
    if (!filtroTipo) return true;
    return item.tipo === filtroTipo;
  });

  listaFiltrada.forEach((item, index) => {
    const tipoClasse = item.tipo === "receita" ? "tipo-receita" : "tipo-gasto";
    const row = `
      <tr>
        <td>${item.descricao}</td>
        <td>${parseFloat(item.valor).toFixed(2)}</td>
        <td>${item.categoria}</td>
        <td class="${tipoClasse}">${item.tipo}</td>
        <td>
          <button class="ui red icon button btn-excluir" data-index="${index}">
            <i class="trash icon"></i>
          </button>
        </td>
      </tr>
    `;
    tbody.append(row);
  });

  // Adicionar evento de clique para remover item
  $(".btn-excluir").on("click", function () {
    const index = $(this).data("index");
    removerTransacao(index);
  });
}


function removerTransacao(index) {
  listaItens.splice(index, 1); // Remove o item pelo índice
  renderizarLista(); // Atualiza a tabela
  atualizarBalanco(); // Atualiza o saldo
}


function atualizarBalanco() {
  let totalReceitas = 0;
  let totalGastos = 0;

  listaItens.forEach((item) => {
    if (item.tipo === "receita") {
      totalReceitas += item.valor;
    } else if (item.tipo === "gasto") {
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
