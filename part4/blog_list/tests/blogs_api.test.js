/**
 * @license
 * Copyright (c) 2020 Example Corporation Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * @file contains test cases for blogs database api.
 * @author Roman Vasilyev
 */

// Imports
const testHelper = require('../utils/api_test_helper.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog.js')

// The test app
const api = supertest(app)

/*
 * Setup a function to run before each test
 */
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = testHelper.initialBlogs.map(blog => new Blog(blog))
  const promises = blogs.map(blog => blog.save())
  await Promise.all(promises)
})

/*
 * GET
 */
describe('When database has initial records,', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testHelper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)
    expect(title).toContain('Fisrt post')
  })

  test('the data retrieved contains id field', async () => {
    const response = await api.get('/api/blogs')

    for (const blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('When a specific record is requested,', () => {
  test('it is reachable with id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)

    for (const id of ids) {
      await api
        .get(`/api/blogs/${id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }
  })

  test('if id is valid but non-existant, status 404 is returned ', async () => {
    await api
      .get(`/api/blogs/${testHelper.nonExistingId}`)
      .expect(404)
  })

  test('if id is not valid, status 400 is returned ', async () => {
    await api
      .get('/api/blogs/5fbd5c89f7dd00102b17b20')
      .expect(400)
  })
})

/*
 * POST
 */
describe('When new data is added,', () => {
  test('blogs saved to database', async () => {
    await api
      .post('/api/blogs')
      .send(testHelper.anotherBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await testHelper.blogsInDb()
    expect(response).toHaveLength(testHelper.initialBlogs.length + 1)

    const titles = response.map(r => r.title)
    expect(titles).toContain('Third post')
  })

  test('a blog without likes set has 0 of them', async () => {
    const newBlog = {
      title: 'Third post',
      author: 'Jason',
      url: 'https://yahoo.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })

  test('a blog without title is not accepted', async () => {
    const newBlog = {
      author: 'Jason',
      url: 'https://yahoo.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await testHelper.blogsInDb()
    expect(response).toHaveLength(testHelper.initialBlogs.length)
  })

  test('a blog without url is not accepted', async () => {
    const newBlog = {
      title: 'Third post',
      author: 'Jason'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await testHelper.blogsInDb()
    expect(response).toHaveLength(testHelper.initialBlogs.length)
  })
})

/*
 * PUT
 */
describe('When a blog is updated,', () => {
  test('blog is saved to database', async () => {
    let blogs = await api.get('/api/blogs')
    const indexToUpdate = 0
    const newTitle = 'New one'

    const updatedRecord = await api
      .put(`/api/blogs/${blogs.body[indexToUpdate].id}`)
      .send({ title: newTitle })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedRecord.body.title).toEqual(newTitle)
  })
})


/*
 * DELETE
 */
describe('When deletion is requested,', () => {
  test('blog is deleted from database', async () => {
    let response = await api.get('/api/blogs')
    const indexToDelete = 0
    const deletedTitle = response.body[indexToDelete].title

    await api
      .delete(`/api/blogs/${response.body[indexToDelete].id}`)
      .expect(204)

    response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(response.body).toHaveLength(testHelper.initialBlogs.length - 1)
    expect(titles).not.toContain(deletedTitle)
  })
})

/*
 * Clean up after tests
 */
afterAll(() => {
  mongoose.connection.close()
})
