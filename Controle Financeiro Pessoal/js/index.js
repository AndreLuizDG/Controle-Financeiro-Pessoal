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
    var categoria = $("#categoria_receita").val().trim();
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
    var categoria = $("#categoria_gasto").val().trim();

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

  listaFiltrada.forEach((item) => {
    const tipoClasse = item.tipo === "receita" ? "tipo-receita" : "tipo-gasto";
    const row = `
      <tr>
        <td>${item.descricao}</td>
        <td>${parseFloat(item.valor).toFixed(2)}</td>
        <td>${item.categoria}</td>
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
