import { ApiError } from "next/dist/server/api-utils";

export const FetchTodos = async () => {
    const response = await fetch("/api/todo");
    const data = await response.json();
    if (data.success) {
        return data.data
    }
    else {
        throw new Error(data.message)
    }
};

export const AddTodo = async (content: string) => {
    const response = await fetch("/api/todo", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });

    const data = await response.json();
    if (data.success) {
        return data.data
    }
    else {
        throw new Error(data.message)
    }
}

export const DeleteTodo = async (id: string) => {
    const response = await fetch(`api/todo/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    if (data.success) {
        return data.message;
    } else {
        throw new Error(data.message);
    }


}

export const UpdateTodo = async (id: string, content: string) => {
    const response = await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    })
    const data = await response.json();
    if (data.succuess) {
        return data.data
    }
    else {
        throw new Error(data.message)
    }
}