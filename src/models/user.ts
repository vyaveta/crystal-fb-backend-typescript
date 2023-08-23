import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;


const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required!"],
        trim: true,
        text: true,
    },
    last_name: {
        type: String,
        required: [true, "Last name is required!"],
        trim: true,
        text: true,
    },
    username: {
        type: String,
        required: [true, "username is required!"],
        trim: true,
        text: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required!"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required!"],
        text: true,
    },
    picture: {
        type: String,
        default:
            "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
    },
    cover: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        required: [true, "gender is required!"],
        trim: true,
    },
    bYear: {
        type: Number,
        required: true,
        trim: true,
    },
    bMonth: {
        type: Number,
        required: true,
    },
    bDay: {
        type: Number,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    friends: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    followers: {
        type: Array,
        default: [],
    },
    requests: {
        type: Array,
        default: [],
    },
    search: [
        {
            user: {
                type: ObjectId,
                ref: "User",
            },
        },
    ],
    details: {
        bio: {
            type: String,
        },
        otherName: {
            type: String,
        },
        job: {
            type: String,
        },
        workPlace: {
            type: String,
        },
        highSchool: {
            type: String
        },
        college: {
            type: String,
        },
        currentCity: {
            type: String,
        },
        homeTown: {
            type: String,
        },
        relationship: {
            type: String,
            enum: ['Single', 'In a relationship', 'Married', 'Divorced']
        },
        instagram: {
            type: String,
        },
    },
    savedPosts: [
        {
            post: {
                type: ObjectId,
                ref: 'Post',
            },
            savedAt: {
                type: Date,
                default: new Date(),
            }
        }
    ],
    resetPassToken: {
        expDate: {
            type: Date
        },
        token: {
            type: String
        },
    },
    profileShorcuts: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
})
 
export const UserModel = mongoose.model("User", UserSchema)