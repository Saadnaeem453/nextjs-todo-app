import { NextRequest, NextResponse } from 'next/server';
import dbconnect from '@/lib/dbconnect';
import TodoModel from '@/Models/TodoModel';
import { errorResponse, jsonResponse } from '@/helpers/responseHelper';

// DELETE a specific todo by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await dbconnect();
    const { id } = params;
    if (!id) {
        return errorResponse("Id not found", 404);
    }

    try {
        const deleteTodo = await TodoModel.findByIdAndDelete(id);
        if (!deleteTodo) {
            return errorResponse("Not find id for deletion in database", 400);
        }
        return jsonResponse({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.log("Something went wrong while deleting..", error);
        return errorResponse("Something went wrong while deleting..", 500);
    }
}
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await dbconnect();
    const { id } = params;

    if (!id) {
        return errorResponse("Id not found", 404);
    }

    try {
        const findTodo = await TodoModel.findById(id);
        if (!findTodo) {
            return errorResponse("Id not found in database", 400);
        }

        return jsonResponse({ data: findTodo, success: true, message: "Deleted successfully" });

    } catch (error) {
        return errorResponse("Something went wrong while deleting..", 500);
    }
}

// PATCH to update a specific todo by ID
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    console.log("Update");

    await dbconnect();
    const { id } = params;

    if (!id) {
        return errorResponse("Id not found", 404);
    }

    try {
        const { content } = await request.json();
        if (!content || content.length === 0) {
            return errorResponse("Content is required", 400);
        }

        const updateTodo = await TodoModel.findByIdAndUpdate(id, { content }, { new: true });
        if (!updateTodo) {
            return errorResponse("Not Find id or not able to update", 400);
        }
        return jsonResponse({ success: true, message: "Updated successfully" });
    } catch (error) {
        console.log("Error while updating the todo ", error);
        return errorResponse("Error while updating the todo", 500);
    }
}
