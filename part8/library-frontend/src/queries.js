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
    }
}`

export const ALL_BOOKS = gql`
    query{
        allBooks {
        author
        title
        genres
    } 
}`