const { removeDuplicates } = require('../controllers/projectsControl');

describe('removeDuplicates', () => {
  it('deve remover itens duplicados com base no campo _id', () => {
    const input = [
      { _id: '1', name: 'Projeto A' },
      { _id: '2', name: 'Projeto B' },
      { _id: '1', name: 'Projeto A Duplicado' },
    ];

    const expectedOutput = [
      { _id: '1', name: 'Projeto A' },
      { _id: '2', name: 'Projeto B' },
    ];

    const result = removeDuplicates(input);
    expect(result).toEqual(expectedOutput);
  });

  it('deve retornar o array original se não houver duplicados', () => {
    const input = [
      { _id: '1', name: 'Projeto A' },
      { _id: '2', name: 'Projeto B' },
    ];

    const result = removeDuplicates(input);
    expect(result).toEqual(input);
  });

  it('deve retornar um array vazio se o array de entrada for vazio', () => {
    const input = [];
    const result = removeDuplicates(input);
    expect(result).toEqual([]);
  });
});
