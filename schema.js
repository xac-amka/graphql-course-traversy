const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: ()=> ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});
/*
// Hardcoded data 
const customers = [
    {id: '1', name:'Amka Doe', email: 'amd@example.com', age: 25},
    {id: '2', name:'Steve Doe', email: 'steve@example.com', age: 18},
    {id: '3', name:'Robert Doe', email: 'report@example.com', age: 21}
]; 
*/

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer: {
            type: CustomerType,
            args:{
                id:{
                    type: GraphQLString
                }
            },
            // parentValue is root
            resolve(parentValue, args){
                /* Use when hardcoded
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
                */
               return axios.get('http://localhost:3000/customers/' + args.id)
                .then(res => res.data)
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers')
                .then(res => res.data) // Map it to res.data
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: { 
            type: CustomerType,
            args:{
                name: { 
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: { 
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: { 
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(res => res.data);
            }
        },
        deleteCustomer: { 
            type: CustomerType,
            args:{
                id: { 
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/customers/'+args.id)
                .then(res => res.data);
            }
        },
        editCustomer: { 
            type: CustomerType,
            args:{
                id: { 
                    type: new GraphQLNonNull(GraphQLString)
                },
                name: { 
                    type: GraphQLString
                },
                email: { 
                    type: GraphQLString
                },
                age: { 
                    type: GraphQLInt
                }
            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/customers/'+args.id, args)
                .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});

// More: https://graphql.org/graphql-js/type/