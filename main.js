import { carrinho, addAoCarrinho }  from './carrinho.js'
import { pratosMenu } from './pratos.js'

//adicionando na tela de forma dinâmica
let pratosHTML = ''

pratosMenu.forEach((prato) => {
  pratosHTML += `<div class="prato">
  <h2 class="cabecalho-card"><p class="number">${prato.numero}</p><button class="add add-js" data-id-do-prato="${prato.id}">+</button></h2>
  <h3 class="tipo-prato" style="background-color: ${prato.cor}">${prato.tipo}</h3>
  <p class="nome-prato">${prato.nome}</p>
  <p class="descricao-prato">${prato.descricao}</p>
  <div class="bottom-card">
    <p class="serve"><img src="assets/images/cloche (1).png" alt="">${prato.serve}</p>
    <p class="price-tag">R$${prato.precoCentavos / 100}</p>
  </div>
</div>`
})

document.querySelector('.js-pratos').innerHTML = pratosHTML

//atualizando o carrinho

function atualizarCarrinho() {
  let quantidadeCarrinho = 0

  carrinho.forEach((itemCarrinho) => {
    quantidadeCarrinho += itemCarrinho.quantidade
  })

  document.querySelector('.js-quantidade').innerHTML = quantidadeCarrinho
}


document.querySelectorAll('.add-js').forEach((button) => {
  button.addEventListener('click', () => {
    const idDoPrato = button.dataset.idDoPrato
    addAoCarrinho(idDoPrato)
    atualizarCarrinho()
  })
})

function atualizarQuantidadeCarrinho() {
  const quantidadeCarrinho = carrinho.reduce((total, item) => total + item.quantidade, 0);
  document.querySelector('.js-quantidade').innerHTML = quantidadeCarrinho
}
atualizarQuantidadeCarrinho();