let listaItens = [];
let index;

$(document).ready(function () {

  $(".btn_editar_gastos").hide();

  $("#adicionar_receita").on("click", function () {
    const descricao = $("#descricao").val().trim();
    const valor = $("#valor").val().trim();
    var categoria = $("#categoria").val().trim();
    var data = $("#data").val().trim();

    if (!data) {
      data = obterDataAtual();
    }    

    if (descricao && valor) {
      listaItens.push({
        descricao: descricao,
        valor: parseFloat(valor),
        categoria: categoria,
        data: data,
        tipo: "receita",
      });

      renderizarLista();
      atualizarBalanco();

      $("#descricao").val("");
      $("#valor").val("");
      $("#categoria").val("");
      $("#data").val("");
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
      $("#categoria").val("");
      $("#data").val("");
    } else {
      Swal.fire({
        title: "Preencha todos os campos",
        icon: "warning",
        confirmButtonColor: "red",
      });
    }
  });

  $("#valor").on("input", function(e){
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  })
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

  $("#Cancelar_edit").click(function () {

    $("#descricao").val("");
    $("#valor").val("");
    $("#categoria").val("");
    $("#data").val("");

    $(".btn_editar_gastos").hide();
    $(".btn_salvar_gastos").show();

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
        <td>${item.data}</td>
        <td>
          <button class="ui red icon button btn-excluir" data-index="${index}">
            <i class="trash icon"></i>
          </button>
          
          <button class="ui blue icon button btn-edit" data-index="${index}">
            <i class="pencil alternate icon"></i>
          </button>
        </td>
      </tr>
    `;
    tbody.append(row);
  });

  $(".btn-excluir").on("click", function () {
    const index = $(this).data("index");
    removerTransacao(index);
  });

  $(".btn-edit").on("click", function () {
    $(".btn_salvar_gastos").hide();
    $(".btn_editar_gastos").show();
  
    index = $(this).data("index"); // Atribui o índice à variável global
  
    $("#descricao").val(listaItens[index].descricao);
    $("#valor").val(listaItens[index].valor);
    $("#categoria").val(listaItens[index].categoria);
    $("#data").val(listaItens[index].data);
  });
  
  $("#edit_receita").on("click", function () {
    console.log(listaItens[index]);
  
    const descricao = $("#descricao").val().trim();
    const valor = $("#valor").val().trim();
    var categoria = $("#categoria").val().trim();
    var data = $("#data").val().trim();

    if (!data) {
      data = obterDataAtual();
    }    
  
    listaItens[index].descricao  = descricao;
    listaItens[index].valor = parseFloat(valor);
    listaItens[index].categoria = categoria;
    listaItens[index].data = data;

      renderizarLista();
      atualizarBalanco();

      $(".btn_salvar_gastos").show();
      $(".btn_editar_gastos").hide();

      $("#descricao").val("");
      $("#valor").val("");
      $("#categoria").val("");
      $("#data").val("");

  });
  
}


function removerTransacao(index) {
  listaItens.splice(index, 1);
  renderizarLista();
  atualizarBalanco();
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
