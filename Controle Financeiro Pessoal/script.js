let listaItens = [];

//Verifica se o arquivo foi carregado
$(document).ready(function () {
    
    //Adicionar Receita
    $('#adicionar_receita').on( "click", function() {
    $('#modal_receita')
    .modal('show')
    });

    //Adicionar Gasto
    $('#adicionar_gasto').on( "click", function() {
        $('#modal_gasto')
        .modal('show')
        });

// Adiciona um novo item à lista
$('#confirma_receita').click(function() {
    // Obtém os valores dos campos
    var descricao = $('#descricao').val();
    var valor = $('#Valor').val();

let dataAtual = new Date();
let dia = String(dataAtual.getDate()).padStart(2, '0');  // Garante 2 dígitos para o dia
let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');  // Mes começa do 0, então somamos 1
let ano = dataAtual.getFullYear();
var data = `${dia}/${mes}/${ano}`;
  
    // Verifica se os campos estão preenchidos
    if (descricao && valor) {
      // Adiciona o novo item ao array
      listaItens.push({
        descricao: descricao,
        valor: valor,
        data: data
      });
  
      // Renderiza a lista novamente
      renderizarLista();
  
      // Limpa os campos e fecha o modal
      $('#descricao').val('');
      $('#valor').val('');
      $('#data').val('');
      $('#modal_adicionar').modal('hide');
    } else {
      alert('Preencha todos os campos!');
    }
  });


});

function renderizarLista() {
    // Limpa a lista antes de renderizar novamente
    $('#receitas').empty();
  
    // Para cada item no array, cria-se uma nova linha na interface
    listaItens.forEach(function(item) {
      var novoItem = `
                       <div id="meu-modal" class="ui items">
                         <div class="item">
                           <div class="content">
                             <div class="header">${item.descricao}</div>
                             <div class="meta">
                               <span class="price">R$${item.valor}</span>
                               <span class="date">${item.data}</span>
                             </div>
                           </div>
                         </div>
                      `;
      // Adiciona o item à lista
      $('#receitas').append(novoItem);
    });
  }
