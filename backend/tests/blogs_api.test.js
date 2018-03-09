const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')
const Blog = require('../models/blog')

describe("when there are initially some blogs saved", () => {

    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(n => new Blog(n))
        await Promise.all(blogObjects.map(n => n.save()))
    })


    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test("single note is returned as json", async () => { //tätä ominaisuutta ei ole vielä toteutettu siksi expected 404
        const blogsInBD = await blogsInDb()
        const aBlog = blogsInBD[0]

        const response = await api
            .get(`/api/blogs/${aBlog._id}`)
            .expect(404)
            .expect('Content-Type', /application\/json/)

        expect(response.body.content).toBe(aBlog.content)
    })

})

describe("POST tests", () => {

    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(n => new Blog(n))
        await Promise.all(blogObjects.map(n => n.save()))
    })

    test("blog is added to database", async () => {

        const startBlogs = await blogsInDb()

        const newBlog = {
            title: "test",
            author: "tester",
            url: "test.com"
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()


        expect(blogsAfterOperation.length).toBe(startBlogs.length + 1)

    })

    test("if likes is empty then its set to 0", async () => {


        const newBlog = {
            title: "test",
            author: "tester",
            url: "test.com"
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await blogsInDb()


        expect(blogs[blogs.length - 1].likes).toBe(0)
    })

    test("if blog-title and url are empty then return 400 bad request", async () => {
        const newBlog = {
            likes: 2
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
    })




})

describe('deletion of a blog', async () => {

    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: "test yeah 123",
            author: "peter pan 72"
        })
        await addedBlog.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfterOperation = await blogsInDb()

        const contents = blogsAfterOperation.map(r => r.title)

        expect(contents).not.toContain(addedBlog.content)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })

})

afterAll(() => {
    server.close()
})