describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyz ', 10)
    cy.clock()
    // preenche Nome
    cy.get('#firstName')
      .type('teste')
    // preenche sobrenome
    cy.get('#lastName')
      .type('teste')
    // preenche email
    cy.get('#email')
      .type('teste@teste.com')
    // preenche elogio ou feedback
    cy.get('#open-text-area')
      .type(longText, { delay: 0 })
    // clica no botão Enviar
    cy.contains('button', 'Enviar').click()

    // verifica se exibiu a mensagem de sucesso
    cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    // preenche Nome
    cy.get('input[id=firstName]')
      .type('teste')

    // preenche sobrenome
    cy.get('input[id=lastName]')
      .type('teste')

    // preenche email invalido
    cy.get('input[id=email]')
      .type('testeteste.com')

    // preenche elogio ou feedback
    cy.get('textarea[id=open-text-area]')
      .type('Testando 123 testando!! 345 TEXTO BEEEEEEEEEM LONGO', { delay: 0 })

    // clica no botão Enviar
    cy.contains('button', 'Enviar').click()

    // verifica se não exibiu a mensagem de sucesso
    cy.get('span[class=success]').should('not.be.visible')

    // verifica se exibiu a mensagem de erro
    cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('não permite inserir valores não-numéricos no campo Telefone', () => {
    // tenta preencher campo Telefone com caractere não numérico
    cy.get('#phone')
      .type('abcdefg')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    // preenche Nome
    cy.get('input[id=firstName]')
      .type('teste')
    // preenche sobrenome
    cy.get('input[id=lastName]')
      .type('teste')
    // preenche email
    cy.get('input[id=email]')
      .type('teste@teste.com')
    // checka checkbox Telefone
    cy.get('input[id=phone-checkbox]')
      .check()
    // preenche elogio ou feedback
    cy.get('textarea[id=open-text-area]')
      .type('Testando 123 testando!! 345 TEXTO BEEEEEEEEEM LONGO', { delay: 0 })
    // clica no botão Enviar
    cy.contains('button', 'Enviar').click()

    // verifica se exibiu a mensagem de erro
    cy.get('.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[id=firstName]')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
    cy.get('input[id=lastName]')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
    cy.get('input[id=email]')
      .type('teste@teste.com')
      .should('have.value', 'teste@teste.com')
      .clear()
      .should('have.value', '')
    cy.get('input[id=phone]')
      .type('999999999')
      .should('have.value', '999999999')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    // clica no botão Enviar
    cy.contains('button', 'Enviar').click()

    // verifica se exibiu a mensagem de erro
    cy.get('.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    // const data = {
    //   firstName: 'Teste',
    //   lastName: 'Teste',
    //   email: 'teste@teste.com',
    //   text: 'Teste.'
    // }
    // preenche e submete o formulário
    // cy.fillMandatoryFieldsAndSubmit(data)
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()

    // verifica se exibiu a mensagem de sucesso
    cy.get('span[class=success]')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendiment', () => {
    // cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    // cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    // cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')

    // usando .each() e .wrap()
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

    // cy.get('input[type="checkbox"]')
    //   .last()
    //   .uncheck()
    //   .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        // console.log(input)
        // console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.eq('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json',  { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.eq('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json')
      .as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.eq('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    // cy.get('a[href="privacy.html"]')
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .should('not.have.attr', 'target', '_blank')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'TESTE TESTE')
      .should('have.value', 'TESTE TESTE')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('GET', 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it.only('desafio - encontra o cato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')

    cy.get('#title')
      .invoke('text', 'CAT TAT')

    cy.get('#subtitle')
      .invoke('text', 'I HATE CATS')
  })
})
