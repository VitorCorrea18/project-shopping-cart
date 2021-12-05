const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  
  it('Testa se, ao executar saveCartItems com o argumento "item", o método localStorage.setItem é chamado', () => {
    saveCartItems('<li>Item</li>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  it('Testa se, ao executar saveCartItems o método "localStorage.setItem" é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems('<li>Item</li>')
  })

  // Seguindo a forma como o Rod ensinou.
  // it('Testa se, ao executar saveCartItems o método "localStorage.setItem" é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
  //   let array = [];
  //   saveCartItems("MLB1615760527"); 
  //   array = [...array, "MLB1615760527"];
  //   expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', [...array, "MLB1615760527"]);
  // })
});
