import { carrinho, removerItem } from './carrinho.js'
import { pratosMenu } from './pratos.js'

let pedidoCarrinhoHTML = ''

carrinho.forEach((itemCarrinho) => {
  const idDoPrato = itemCarrinho.idDoPrato

  let matchingPrato;

  pratosMenu.forEach((prato) => {
    if (prato.id === idDoPrato) {
      matchingPrato = prato
    }
  })

pedidoCarrinhoHTML += `<div class="item-carrinho container-item-carrinho-${matchingPrato.id}">
      <h2 class="nome-prato-carrinho">${matchingPrato.nome}</h2>
      <p class="valor-prato">$${matchingPrato.precoCentavos / 100}</p>
      <p class="quantidade-prato">Quantidade: ${itemCarrinho.quantidade}</p>
      <span class="btn-deletar-js" data-id-prato="${matchingPrato.id}">Excluir</span>
    </div>
`
})

document.querySelector('.pedido-carrinho-js').innerHTML = pedidoCarrinhoHTML


//função para deixar o botão de remover funcional
document.querySelectorAll('.btn-deletar-js').forEach((link) => {
  link.addEventListener('click', () => {
    const idPrato = link.dataset.idPrato
    removerItem(idPrato)

    const container = document.querySelector(`.container-item-carrinho-${idPrato}`)

    container.remove()
    atualizarResumoCompra();
    atualizarQuantidadeCarrinho();
  })
})

//parte do código que atuliza o html do resumo da compra de acordo com o numero e valor dos itens no carrinho
//.find é utilizado para encontrar um elemento em um array que satisfaça a condição especificada em uma função de retorno
function atualizarResumoCompra() {
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  const valorItens = carrinho.reduce((total, item) => total + item.quantidade * (pratosMenu.find(prato => prato.id === item.idDoPrato).precoCentavos / 100), 0);
  const valorEntrega = 8;
  const valorTotal = valorItens + valorEntrega;

  const resumoCompraHTML = `
    <div class="linha1">
      <p>Itens: (${totalItens})</p>
      <p>Valor: R$${valorItens.toFixed(2)}</p>
    </div>

    <div class="linha2">
      <p>Valor entrega:</p>
      <p>R$${valorEntrega.toFixed(2)}</p>
    </div>

    <div class="linha3">
      <p>Valor Total:</p>
      <p>R$${valorTotal.toFixed(2)}</p>
    </div>
  `;

  document.querySelector('.resumo-compra').innerHTML = resumoCompraHTML;
}
atualizarResumoCompra();



//atualizar numero de itens no carrinho do header
function atualizarQuantidadeCarrinho() {
  const quantidadeCarrinho = carrinho.reduce((total, item) => total + item.quantidade, 0);
  document.querySelector('.js-quantidade').innerHTML = quantidadeCarrinho
}
atualizarQuantidadeCarrinho();