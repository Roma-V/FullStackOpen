/* eslint-disable react/prop-types */
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
 * @file Blog element.
 * @author Roman Vasilyev
 */

import React from 'react'

const Blogs = ({ username, blogs, logoutHandler, newBlogHandler }) => (
  <div>
    <h2>Blogs</h2>
    <p>
      {username} logged in
      <button type="submit" onClick={logoutHandler}>logout</button>
    </p>
    <NewBlog submit={newBlogHandler} />
    <p>The blog posts in database:</p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author}
  </div>
)

const NewBlog = ({ submit }) => (
  <div>
    <form onSubmit={submit}>
      <div>
        Title <input type="text" name="Title"/>
      </div>
      <div>
        Author <input type="text" name="Author"/>
      </div>
      <div>
        URL <input type="text" name="URL"/>
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default Blogs