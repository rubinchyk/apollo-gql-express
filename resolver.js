const Post = require('./models/Post.model');
const ObjectID = require('mongodb').ObjectId;

const resolvers = {
    Query: {
        hello: () => {
            return "Hello world";
        },
        getAllPosts: async () => {
            return await Post.find();
        },
        getPost: async (parent, args, context, info) => {
            let {id} = args;
            id = await ObjectID(id);

            return await Post.findById(id);
        }
    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const {title, description} = args.post;

            const post = new Post({
                "title": {
                    "type": title,
                    "required": true
                },
                "description": {
                    "type": description
                }
            });

            await post.save();
            return post;
        },
        deletePost: async (parent, args, context, info) => {
            let {id} = args;
            id = await ObjectID(id);

            await Post.findByIdAndDelete(id);
            return `Was deleted post with id ${id}.`
        },
        updatePost: async (parent, args, context, info) => {
            const {title, description} = args.post;
            let id = await ObjectID(args.id);

            const post = Post.findByIdAndUpdate(id, {
                "title": {
                    "type": title,
                    "required": true
                },
                "description": {
                    "type": description
                }
            }, {new: true});

            return post;
        }
    }
};

module.exports = resolvers;