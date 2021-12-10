const cartSection = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// subtrai o preço do item passado como parâmetro do total atual.
const subPriceInTotal = (item) => {
  const itemInfo = item.split('$'); // o split é usado para separar o numero que segue o $ na string passada como parâmetro.
  const price = Number(itemInfo[1]); // tranforma a string em numero.

  // Pegua o valor salvo no localStorage e subtrai o preço do item passado como parâmetro,
  // em seguida salva o novo valor no localStorage.
  const savedTotal = localStorage.getItem('total');
  const currTotal = Number(savedTotal);
  const newTotal = currTotal - price;
  localStorage.setItem('total', +newTotal.toFixed(2));
  return +newTotal.toFixed(2); // toFixed limita o numero de decimais para aparecer algo como 1,00014654985484.
};

// atualiza o valor total dos produtos no carrinho no <span>.
const updateSubTotalSpan = (total) => {
  const subTotalSpan = document.querySelector('.total-price');
  if (total > 0) {
    subTotalSpan.innerText = total;
  }
  if (total <= 0) subTotalSpan.innerText = '';
};

function cartItemClickListener({ target }) {
  localStorage.removeItem('cartItems');
  target.remove();
  saveCartItems(cartSection.innerHTML);
  updateSubTotalSpan(subPriceInTotal(target.innerText));
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// soma o preço do produto passado por parâmetro com o valor já salvo no localStorage.
// caso não tenha nada no localStorage(carrinho vazio) adiciona o valor do parâmetro.
// É a mesma lógica do SubPriceTotal mas inverso, ler os comentários lá.
const addPriceInTotal = (item) => {
  const itemInfo = item.split('$'); 
  const price = Number(itemInfo[1]);
  const savedTotal = localStorage.getItem('total');
  if (savedTotal) {
    const currTotal = Number(savedTotal);
    const newTotal = price + currTotal;
    localStorage.setItem('total', +newTotal.toFixed(2));
    return +newTotal.toFixed(2);
  }
  localStorage.setItem('total', price);
  return price;
};

// adiciona um event listener em cada botão "adicionar ao carrinho", que procura o id do item clicado
// usando a função getSkuFromProductItem e dando como argumento o parentNode do item, que é a section em que
// se encontra os dados do produto. Com o itemId uso a função (helper)fetchItem para buscar o objeto do produto
// que será passado como parâmetro para a função createCartItemElement.
function addItemClickListener() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', async ({ target }) => {
    const item = await fetchItem(await getSkuFromProductItem(target.parentNode));
    const cartElement = createCartItemElement(item);
    cartSection.appendChild(cartElement);
    saveCartItems(cartSection.innerHTML);
    updateSubTotalSpan(addPriceInTotal(cartElement.innerText));
  }));
}

// a função fetchedData busca de forma assincrona as informação do produto buscado (no caso 'computador'),
// o array desestruturado de data 'results' é onde estará todos os produtos retornados pela API.
// Ao rodar um loop (forEach) no array results, se insere na itemSection cada produto usando a função 'createProductItemElement'
// dentro da HOF 'appendChild'. 
const fetchedData = async () => {
  const data = await fetchProducts('computador');
  const { results } = await data;
  const itemSection = document.querySelector('.items');
  results.forEach((element) => itemSection.appendChild(createProductItemElement(element)));
};

// recuperando os itens salvos no localStorage para o cart, e adicionando eventListener em cada um novamente.
const reloadCart = () => {
  const data = getSavedCartItems();
  cartSection.innerHTML = data;
  document.querySelectorAll('.cart__item').forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
};

// limpa o cart e tbm os valores no localStorage.
const emptyCartClickListener = () => {
  const btnClearCart = document.querySelector('.empty-cart');
  btnClearCart.addEventListener('click', () => {
    const cartItems = document.querySelectorAll('.cart__item');
    cartItems.forEach((item) => {
      item.remove();
    });
    localStorage.removeItem('total');
    localStorage.removeItem('cartItems');
    document.querySelector('.total-price').innerText = '';
  });
};

window.onload = async () => {
  await fetchedData();
  addItemClickListener();
  reloadCart();
  updateSubTotalSpan(localStorage.getItem('total'));
  emptyCartClickListener();
};
