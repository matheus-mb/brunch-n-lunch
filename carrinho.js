export let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

//local storage só salva strings, para isso devemos converter o carrinho para uma string usando JSON
function salvarPedido() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho))
}

export function addAoCarrinho(idDoPrato) {
  let itemRepetido

  carrinho.forEach((itemCarrinho) => {
    if (idDoPrato === itemCarrinho.idDoPrato) {
      itemRepetido = itemCarrinho
    }
  })

  if (itemRepetido) {
    itemRepetido.quantidade += 1
  } else {
    carrinho.push({
      idDoPrato: idDoPrato,
      quantidade: 1
    })
  }

  salvarPedido()
}



// Função para remover itens da array do carrinho
export function removerItem(idPrato) {
 const carrinhoAtualizado = []
 
 carrinho.forEach((itemCarrinho) => {
  if (itemCarrinho.idDoPrato !== idPrato) {
    carrinhoAtualizado.push(itemCarrinho)
  }
 })

 carrinho = carrinhoAtualizado

 salvarPedido()
}

