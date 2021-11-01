const {gql} = require('apollo-server-express');

const typeDefs = gql`
    # Types
    type Description {
        type: String
    }

    type Title {
        type: String
        required: Boolean
    }

    type Post {
        _id: String,
        description: Description
        title: Title
    }

    # QUERY
    type Query {
        hello: String
        getAllPosts: [Post]
        getPost(id: ID): Post
    }

    input PostInput {
        title: String
        description: String
    }

    # MUTATION
    type Mutation {
        createPost(post: PostInput): Post
        deletePost(id: ID): String
        updatePost(id: ID, post: PostInput): Post
    }
`;

module.exports = typeDefs;