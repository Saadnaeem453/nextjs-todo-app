import TodoModel from "@/Models/TodoModel";
import { errorResponse, jsonResponse } from "@/helpers/responseHelper";
import dbconnect from "@/lib/dbconnect";
import { error, log } from "console";
import { Trykker } from "next/font/google";
import errorMap from "zod/locales/en.js";



export async function POST(request: Request) {
    await dbconnect()
    try {
        const { message } = await request.json();
        if (!message) {
            return new Response(JSON.stringify({
                success: false,
                message: "message can't be empty"
            }), { status: 404 })
        }
        const newMessage = new TodoModel({
            content: message
        })
        await newMessage.save();
        return jsonResponse({ success: true, message: "Todo is post succuessfully" })
    } catch (error) {
        console.log("error while saving todo");

        return errorResponse("Error while saving the todo")


    }
}


export async function GET(request: Request) {
    await dbconnect();
    try {
        const todos = await TodoModel.find({});
        return new Response(JSON.stringify({
            sucess: true,
            data: todos,
        }), { status: 200 })
    } catch (error) {
        console.log("error while getting todos");

        return errorResponse("Error While getting todos", 400)

    }
}


export async function Delete(request: Request, { params }: { params: { id?: string[] } }) {
    await dbconnect();
    try {
        const { id } = params;
        if (!id) {
            return errorResponse("Id not found", 404)
        }
        const todoId = id[0]

        const deleteTodo = await TodoModel.findByIdAndDelete(todoId);
        if (!deleteTodo) {
            return errorResponse("Issue while deleting todo", 400)
        }
        return jsonResponse({ success: true, message: "Deleted successfully" })

    } catch (error) {
        console.log("Something went wrong while deleting..")

        return errorResponse("Something went wrong while deleting..")
    }

}

export async function PATCH(request: Request, { params }: { params: { id?: string[] } }) {
    await dbconnect();
    try {
        const { id } = params;
        const { content } = await request.json();
        if (!content || content.length === 0) {
            return errorResponse("Todo not found")
        }
        if (!id || id.length === 0) {
            return errorResponse("Todo not found")
        }
        const todoId = id[0]
        const updateTodo = await TodoModel.findByIdAndUpdate(todoId, { content }, { new: true });
        if (!updateTodo) {
            return errorResponse("Error while Updating todo")
        }
        return jsonResponse({ success: true, message: "Updated Sucessfully" })
    }

    catch (error) {
        console.log("Error while updating the todo ", error);
        return errorResponse("Error while updating the todo")

    }
}