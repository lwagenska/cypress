// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
//     // comando não recebe nenhum argumento
//     cy.get('input[id=firstName]').type('teste')
//     cy.get('input[id=lastName]').type('teste')
//     cy.get('input[id=email]').type('teste@teste.com')
//     cy.get('textarea[id=open-text-area]').type('Teste.')

//     cy.contains('button', 'Enviar').click()
// })

// Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => {
//     // comando que recebe um objeto como argumento
//     cy.get('input[id=firstName]').type(data.firstName)
//     cy.get('input[id=lastName]').type(data.lastName)
//     cy.get('input[id=email]').type(data.email)
//     cy.get('textarea[id=open-text-area]').type(data.text)

//     cy.contains('button', 'Enviar').click()
// })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@teste.com',
    text: 'Test.'
}) => {
    // comando que recebe um objeto como argumento, com valores default
    cy.get('input[id=firstName]').type(data.firstName)
    cy.get('input[id=lastName]').type(data.lastName)
    cy.get('input[id=email]').type(data.email)
    cy.get('textarea[id=open-text-area]').type(data.text)

    cy.contains('button', 'Enviar').click()
})