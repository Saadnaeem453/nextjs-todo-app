import mongoose, { Schema, Document } from "mongoose"


export interface Todo extends Document {
    content: string,
    createdAt: Date,
}
const TodoSchema: Schema<Todo> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }

})


const TodoModel = (mongoose.models.Todo as mongoose.Model<Todo>) || mongoose.model("Todo", TodoSchema)

export default TodoModel