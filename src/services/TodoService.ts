export const FetchTodos = async () => {
    try {
        console.log("Attempting to fetch todos...");

        const response = await fetch("/api/todo", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log("Response data:", data);

        // Debugging the structure of data
        if (typeof data === 'object' && data !== null) {
            console.log("Response is a valid object.");
        } else {
            console.log("Response is not a valid object.");
        }

        // Correct key name check
        if (data.success) {
            console.log("Todos fetched successfully.");
            return data.data;
        } else {
            console.log("Error in fetching todos:", data.message);
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

