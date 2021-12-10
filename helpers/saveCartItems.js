// O requisito do projeto pede para dar como parâmetro a <ol> em si, fiz da forma que pedia o requisito.
// O Rod ensinou na revisão esta forma que vou deixar comentado, e explicou que a vantagem é a facilidade 
// quando se quer salvar um objeto por exemplo. E esta forma vai adicionando os items sem a necessidade de um .push.

// let array = [];
const saveCartItems = (item) => {
  // array = [...array, { produto: item }];
  // localStorage.setItem('cartItems', JSON.stringify(array));
  localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
