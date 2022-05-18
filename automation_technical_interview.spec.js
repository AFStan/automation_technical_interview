Cypress.Commands.add('login', (password) => {
  
    cy.session([password], () => {
    cy.visit('https://betterqa.ro/top-movies/')
    cy.get('#pwbox-4212').type(password)
    cy.get('.post-password-form').submit()
  })
})

beforeEach(() => {
    cy.login('do_not_share!1')
    cy.visit('https://betterqa.ro/top-movies/')
})

describe('Testing', () => {
    
    it('successfully load list', () => {
        cy.visit('https://betterqa.ro/top-movies/')
    
    })
    
    it('succefully open movie', () => {        
        
        cy.get('#root > div > div > div:nth-child(1) > div.jss92 > button > span.jss95').click() // better to use ID for each element 
        cy.wait(1000)
        cy.get('.jss71.jss73').should('have.value', '1994-09-24') // better to use ID for each element 

    })
    
    it('search and check result', ()=>{
        
        cy.get('input.jss71.jss75.jss76').type('Star Trek')
        cy.get('header .jss37.jss38 form').submit()
        cy.wait(1000)
        cy.get('.movies .movie-card').contains('Star Trek: First Contact')
        cy.get('.movies .movie-card').contains('The Shawshank Redemption')
    
    })
    
    it('Expected values', ()=>{

        cy.get('#root > div > div > div:nth-child(2) > div:nth-child(3) > button > span.jss95').click()
        cy.wait(1000)                    
        cy.get('input.jss71.jss73')
        .eq(0)
        .should('have.value', '1995-10-20')
        cy.get('input.jss71.jss73')
        .eq(1)
        .should('have.value', '25.772') 
        .get('input.jss71.jss73')
        .eq(2)
        .should('have.value', '8.7')
         .get('input.jss71.jss73')
        .eq(3)
        .should('have.value', '3639')
    
    })
    
    it('BUG1', ()=>{
        
        cy.get('input.jss71.jss75.jss76').type(' ') //after you search for an empty string site will return an white page 
        cy.get('header .jss37.jss38 form').submit()
        cy.wait(1000)
             
    })
    
    it('BUG2', ()=>{
        
        cy.get('input.jss71.jss75.jss76').type(' The ') //after you search for "THE" you should recicve all the movies that have substring "THE" in title
        cy.get('header .jss37.jss38 form').submit()
        cy.wait(1000)
        cy.get('.movies .movie-card').contains('The Godfather')
    
    })
     
    it('BUG3', ()=>{
        
        cy.get('input.jss71.jss75.jss76').type('Star Trek') //after you run search for a movie you can't go back 
        cy.get('header .jss37.jss38 form').submit()
        cy.wait(1000)
        cy.go('back',{timeout:3000})   
    
    })
    
    it('BUG4', ()=>{
        
        cy.get('input.jss71.jss75.jss76').type('+') //after you search for an special character site will return an white page 
        cy.get('header .jss37.jss38 form').submit()
        cy.wait(1000)
    
    })
})

// When you search for a movie and you want to clear the imbox by pressing "X", 
// mark the classes of the input element are changing but no element apear so i can't targhet the "X" button.
// Site dosen t have back button.
// if you insert a wrong password you dont receive any error message you should expect "Wrong password".
// if you click on "Top Movies" you should expect to send you on "Home page"
