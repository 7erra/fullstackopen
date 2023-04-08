describe("Blog app", function() {
  const api = "http://localhost:3003/api/"
  beforeEach(function() {
    // Reset database
    cy.request("POST", api + "testing/reset")
    // Create new user in backend
    const user = {
      name: "Max Musterman",
      username: "MaxM",
      password: "password123"
    }
    cy.request("POST", api + "users/", user)
    // Visit frontend
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.contains("Login")
    cy.contains("Username")
    cy.contains("Password")
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("MaxM")
      cy.get("#password").type("password123")
      cy.get("#login-button").click()
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("MaxM")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()
      cy.get(".error")
        .should("contain", "Wrong username or password!")
        .and("have.css", "color", "rgb(255, 0, 0)")

    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.request("POST", api + "login", {
        username: "MaxM", password: "password123"
      }).then(({ body }) => {
        localStorage.setItem("user", JSON.stringify(body))
        cy.visit("http://localhost:3000")
      })
    })

    it("A new blog can be created", function() {
      cy.contains("New Blog").click()
      cy.get("#blog-title").type("Full stack open")
      cy.get("#blog-author").type("Univerity of Helsinki")
      cy.get("#blog-url").type("fullstackopen.com")
      cy.get("#blog-submit").click()
      cy.contains("Full stack open")
    })

    describe("and a blog exists", function() {
      beforeEach(function() {
        cy.request({
          url: "http://localhost:3000/api/blogs",
          method: "POST",
          body: {
            title: "Localhost",
            url: "http://localhost:3000",
            author: "Me"
          },
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          }
        }).then(() => {
          cy.visit("http://localhost:3000")
        })
      })

      it("Can be liked", function() {
        cy.contains("View").click()
        cy.contains("Like").click()
        cy.visit("http://localhost:3000")
        cy.contains("View").click()
        cy.get(".blog-likes").contains("1")
      })

      it("Can be deleted", function() {
        cy.contains("View").click()
        cy.contains("Remove").click()
        cy.get("html").should("not.contain", "Localhost")
      })

      it("Can not be deleted by anyone else", function() {
        cy.contains("Log Out").click()
        cy.contains("View").click()
        cy.get(".blog").should("not.contain", "Remove")
      })

    })

  })
})
