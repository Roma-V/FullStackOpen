/**
 * @file QraphQL queries for Library Frontend App .
 * @author Roman Vasilyev
 */

import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        id
        bookCount
    }
}`

export const ALL_BOOKS = gql`
query {
    allBooks {
        author
        title
        published
    } 
}`

export const NEW_BOOK = gql`
mutation AddBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String]
    ) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
      title,
      author
    }
}`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        born
        id
    }
}`