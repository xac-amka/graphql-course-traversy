# Building A GraphQL Server

## What Is GraphQL
 - Application layer query language
 - Open sourced by **Facebook** in 2015
 - Can be used with any type of database
 - Ability to ask for exactly what you need and nothing more
 - Get multiple resources in a single request

## GraphQL Types
 - GraphQL APIS are organized in terms of types and fields
 ```graphql
    Type Query{
        user: User
    }

    Type User{
        name: String
        age: int
        friends: [User]
    }
 ```

 ## GraphiQL Tool
  - Graphical interactive GraphQL IDE
  - Runs in the browser
  - Syntax highlighting
  - Error reporting
  - Automation & Hinting

