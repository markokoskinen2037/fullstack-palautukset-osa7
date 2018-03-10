import React from "react"
import { mount } from "enzyme"
import App from "./App"
import Blog from "./components/Blog"
jest.mock("./services/blogs")

describe("<App />", () => {
  let app

  describe("when user is not logged in", () => {

    beforeEach(() => {
      app = mount(<App />)
    })


    it("only login page is shown", () => {

      app.update()

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe("when user is logged in", () => {

    beforeEach(() => {
      app = mount(<App />)
      // luo sovellus siten, että käyttäjä on kirjautuneena
      const user = {
        username: "testaaaajaaaa",
        token: "1231231214",
        name: "Teuvo Testaaaaaaaaja"
      }
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      console.log("user saved...")

      //Token on asetettu.

    })

    it("all notes are rendered", () => {
      app.update()
      console.log(localStorage.loggedBlogAppUser)
      console.log(app.html())
    })
  })

})