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
        author {
            name
        }
        title
        published
        genres
    } 
}`

export const LOGIN = gql`
mutation Login(
    $username: String!, 
    $password: String!
    ) {
    login(
        username: $username
        password: $password
    ) {
        value
    }
}`

export const ME = gql`
query {
    me {
        username
        favoriteGenre
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
        author {
            name
        }
        title
        published
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