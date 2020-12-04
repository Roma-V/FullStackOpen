describe('Blog list app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page with login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })
})