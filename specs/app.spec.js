// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";



describe('test of getTotal function', () => {
  it('imported without errors', () => {
    expect(typeof getTotal).toBe('function');
  });

  it('test of The discount percentage cannot be more than 100', () => {
    expect( () => getTotal([{ price: 10, quantity: 10 }], 101)).toThrowError('Процент скидки не может быть больше 100');
  });

  it('test of The discount percentage cannot be negative', () => {
    expect( () => getTotal([{ price: 10, quantity: 10 }], -1)).toThrowError('Процент скидки не может быть отрицательным');
  });
  it('test of The discount must be a number', () => {
    expect( () => getTotal([{ price: 10, quantity: 10 }], 'error')).toThrowError('Скидка должна быть числом');
  });

});

describe('parameterized test', () => {
  test.each([
    [[{ price: 10, quantity: 10 }], 10, 90],
    [[{ price: 10, quantity: 10 }], 99, 1],
    [[{ price: 15, quantity: 2 }], 0, 30], 
  ])('getTotal(%s, %s) = %s', (items, discount, result) => {
    expect(getTotal(items, discount)).toBe(result);
  });
});


describe('test of nameIsValid function', () => {
  it('imported without errors', () => {
    expect(typeof nameIsValid).toBe('function');
  });

  it('test of not number', () => {
    expect(nameIsValid(100)).toBe(false);
  });

  it('test of short name', () => {
    expect(nameIsValid('l')).toBe(false);
  });

  it('test of positive name', () => {
    expect(nameIsValid('li')).toBe(true);
  });
});

describe('test of fullTrim function', () => {
  it('imported without errors', () => {
    expect(typeof fullTrim).toBe('function');
  });

  it('positive test', () => {
    expect(fullTrim(" Hello,   World! ")).toBe("Hello,World!");
  });

  it('test NoSpacesHere', () => {
    expect(fullTrim("")).toBe("");
  });

  it('test of positive name', () => {
    expect(fullTrim("NoSpacesHere")).toBe("NoSpacesHere");
  });
});
