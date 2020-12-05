
describe('Blog app', function() {
  const testUser = {
    username: 'testman',
    name: 'Test Man',
    password: 'correct.password'
  }

  const otherTestUser = {
    username: 'nontestman',
    name: 'Non Test Man',
    password: 'nontest.password'
  }

  const testBlog = {
    title: 'Retry, Rerun, Repeat',
    author: 'Gleb Bahmutov',
    url: 'https://www.cypress.io/blog/2020/12/03/retry-rerun-repeat/'
  }

  const listOfTestBlogs = [
    {
      title: 'First',
      author: 'Writer',
      url: 'adress',
      likes: 1
    },
    {
      title: 'Second',
      author: 'Writer',
      url: 'adress',
      likes: 8
    },
    {
      title: 'Third',
      author: 'Writer',
      url: 'adress',
      likes: 13
    }
  ]

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    // create a user to backend
    cy.request('POST', 'http://localhost:3000/api/users', testUser)

    cy.visit('http://localhost:3000')
  })

  it('front page with login form is shown', function() {
    cy.contains('Log in to application')
    cy.should('not.contain', 'Blogs')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name=Username]').type(testUser.username)
      cy.get('input[name=Password]').type(testUser.password)
      cy.get('#newUserButton').click()

      cy.should('not.contain', 'Log in to application')
      cy.contains('Blogs')
      cy.contains('logged in')
    })

    describe('with wrong credentials', function() {
      beforeEach(function() {
        cy.get('input[name=Username]').type(testUser.username)
        cy.get('input[name=Password]').type('wrong.password')
        cy.get('#newUserButton').click()
      })

      it('fails ', function() {
        cy.contains('Log in to application')
        cy.should('not.contain', 'Blogs')
      })

      it('shows a warning in red ', function() {
        cy.get('.error')
          .contains('Wrong credentials')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
          .should('have.css', 'border-style', 'solid')
          .should('be.visible')
      })
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/login', testUser)
        .then(response => {
          window.localStorage.setItem(
            'loggedUser', JSON.stringify(response.body)
          )
          cy.visit('http://localhost:3000')
        })
    })

    describe('A blog can be created', function() {
      beforeEach(function() {
        cy.contains('new blog').click()

        cy.get('input[name=Title]').type(testBlog.title)
        cy.get('input[name=Author]').type(testBlog.author)
        cy.get('input[name=URL]').type(testBlog.url)

        cy.get('#newBlogButton').click()
      })

      it('and a confirmation is displayed in green', function() {
        cy.contains(testBlog.title.concat(' added'))
          .should('have.css', 'color', 'rgb(0, 128, 0)')
          .should('have.css', 'border-style', 'solid')
          .should('be.visible')
      })

      it('the blog is shown in the list', function() {
        cy.contains(`${testBlog.title} - ${testBlog.author}`)
          .should('be.visible')
      })
    })
  })

  describe('If there is a blog', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/login', testUser)
        // login
        .then(response => {
          window.localStorage.setItem(
            'loggedUser', JSON.stringify(response.body)
          )
        })
        // add a blog
        .then(() => {
          cy.request({
            url: 'http://localhost:3000/api/blogs',
            method: 'POST',
            body: testBlog,
            headers: {
              'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}`
            }
          })
            .then(() => {
              cy.visit('http://localhost:3000')
            })
        })
    })

    describe('and user clicks "like" button', function() {
      beforeEach(function() {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('a notification of update appeares', function() {
        cy.contains(testBlog.title.concat(' updated'))
          .should('have.css', 'color', 'rgb(0, 128, 0)')
          .should('have.css', 'border-style', 'solid')
          .should('be.visible')
      })

      it('likes count is increased by one', function() {
        cy.contains('Likes: 1')
          .should('be.visible')
      })
    })

    describe('deletion', function() {
      it('can be performed by the user who owns it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.contains(' deleted')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
          .and('be.visible')

        cy.should('not.contain', testBlog.title)
          .and('not.contain', testBlog.author)
          .and('not.contain', testBlog.url)
      })

      it('cannot be performed by other users', function() {
        window.localStorage.removeItem('loggedUser')
        cy.request('POST', 'http://localhost:3000/api/users', otherTestUser)
        cy.request('POST', 'http://localhost:3000/api/login', otherTestUser)
          .then(response => {
            window.localStorage.setItem(
              'loggedUser', JSON.stringify(response.body)
            )
            cy.visit('http://localhost:3000')

            cy.contains('view').click()
            cy.contains('remove').click()

            cy.contains(`${testBlog.title} - ${testBlog.author}`)
              .should('be.visible')
            cy.contains(testBlog.title)
            cy.contains(testBlog.author)
            cy.contains(testBlog.url)

            cy.should('not.contain', ' deleted')
          })
      })
    })
  })

  describe('If there are numerous blogs', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3000/api/login', testUser)
        // login
        .then(response => {
          window.localStorage.setItem(
            'loggedUser', JSON.stringify(response.body)
          )
        })
        // add several blogs
        .then(() => {
          for (const blog of listOfTestBlogs) {
            cy.request({
              url: 'http://localhost:3000/api/blogs',
              method: 'POST',
              body: blog,
              headers: {
                'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}`
              }
            })
          }
        })
        .then(() => {
          cy.visit('http://localhost:3000')
        })
    })

    it('they are sorted by amount of likes', function() {
      for (const blog of listOfTestBlogs) {
        cy.contains(`${blog.title} - ${blog.author}`)
      }

      cy.get('button')
        .filter(':contains("view")')
        .click({ multiple: true })

      cy.get('.likes')
        .should('have.length', 3)
        .each((value, index, collection) => {
          if (index === 0) { return }

          const countRegex = /\d+/
          const curretnLikes = parseInt(
            countRegex.exec(value[0].innerText)[0], 10
          )
          const previousLikes = parseInt(
            countRegex.exec(collection[index - 1].innerText)[0], 10
          )

          expect(previousLikes).to.be.greaterThan(curretnLikes)
        })
    })
  })
})