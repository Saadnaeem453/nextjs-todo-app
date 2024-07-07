export const FetchTodos = async () => {
    try {
        console.log("Attempting to fetch todos...");

        const response = await fetch("http://localhost:3000/api/todo", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (data.success) {
            return data.data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.log("Get todo error", error);
    }
};

export const FetchTodoById = async (id: string) => {
    try {
        const response = await fetch(`/api/todo/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json();
        if (data.success) {

            return data.data
        }
        else {
            return data.message
        }
    } catch (error) {
        console.log("error while fetch todo id", error);

    }
}

export const AddTodo = async (content: string) => {
    try {
        const response = await fetch("/api/todo", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });


        const data = await response.json();


        if (data.success) {
            return data.data?.content;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        throw error;
    }
}


export const DeleteTodo = async (id: string) => {
    const response = await fetch(`/api/todo/${id}`, {
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
    if (data) {
        return data.data
    }
    else {
        console.log("Something went wrong while updating");

    }
}