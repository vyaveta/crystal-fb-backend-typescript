import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema
const PostSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["profilePicture", "cover", null],
        default: null,
    },
    text: {
        type: String,
    },
    images: {
        type: Array,
        of: String, //Image URL
    },
    background: {
        type: String,
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    comments: [
        {
            comments: {
                type: String
            },
            image: {
                type: String,
            },
            commentBy: {
                type: ObjectId,
                ref: "User"
            },
            commentedAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
},{
    timestamps: true,
})

// module.exports = mongoose.model("Post", postSchema)
export const PostModel = mongoose.model("Posts", PostSchema)