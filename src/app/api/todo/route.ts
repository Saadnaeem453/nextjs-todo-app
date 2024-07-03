import TodoModel from "@/Models/TodoModel";
import { errorResponse, jsonResponse } from "@/helpers/responseHelper";
import dbconnect from "@/lib/dbconnect";




export async function POST(request: Request) {
    await dbconnect()
    try {
        const { content } = await request.json();
        if (!content || content.trim().length === 0) {
            return errorResponse("Message cant be empty")
        }
        const newMessage = new TodoModel({
            content: content.trim()
        })
        await newMessage.save();
        return jsonResponse({ data: newMessage, success: true, message: "Todo is post succuessfully" })
    } catch (error) {
        console.log("error while saving todo", error);

        return errorResponse("Error while saving the todo")
    }
}


export async function GET() {
    console.log(" in get api");

    await dbconnect();
    try {
        console.log("in get try");

        const todos = await TodoModel.find({});

        return new Response(JSON.stringify({
            success: true,
            data: todos,
        }), { status: 200 })
    } catch (error) {

        console.log("error while getting todos");

        return errorResponse("Error While getting todos", 400)

    }
}


