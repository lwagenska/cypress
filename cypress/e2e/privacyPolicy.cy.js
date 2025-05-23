Cypress._.times(5, () => { 
  it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
      
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})