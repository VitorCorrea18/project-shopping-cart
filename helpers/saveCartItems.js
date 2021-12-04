// eu teria feito da forma como está comentado, pois o Rod explicou esta forma na revisão e achei melhor
// realmente, mas como no requsito 10 a estrutura de testes pede para importar a <ol> toda, vou fazer
// conforme os requisitos do projeto.

// let array = [];
const saveCartItems = (item) => {
  // array = [...array, item];
  // localStorage.setItem('cartItems', JSON.stringify(array));
  localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
