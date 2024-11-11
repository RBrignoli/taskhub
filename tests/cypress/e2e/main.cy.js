describe('template spec', () => {
  beforeEach(() => {
    cy.visit('localhost:5173/'); // Visita a página inicial da aplicação utilizando a API do Cypress com o alias "cy"
  });
  it('ir para a tela de cadastrar usuario pelo do header', () => {
    cy.contains('Sign Up').click()
  })

  it('ir para a tela de cadastrar usuario pelo botao central', () => {
    cy.get('button[id="test"]').click()
  })
  it('ir para a tela de cadastrar usuario pelo botao ja possui uma conta no signin', () => {
    cy.visit('localhost:5173/signin');
    cy.get('button[id="test"]').click()
  })
})

