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
 * @file services for managing Blog element.
 * @author Roman Vasilyev
 */

import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const put = async updateBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const objectToSend = {
    likes: updateBlog.likes
  }

  const response = await axios.put(baseUrl.concat(`/${updateBlog.id}`), objectToSend, config)
  return response.data
}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl.concat(`/${blogId}`), config)
  return response.status
}

export default {
  setToken,
  getAll,
  create,
  put,
  remove
}