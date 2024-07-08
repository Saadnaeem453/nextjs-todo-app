
import ThemeToggle from '@/components/Theme/ThemeComponent';
import TodoList from '@/components/TodoList/TodoList';
import { FetchTodos } from '@/services/TodoService';
// import { useTheme } from "@/context/ThemeContext"z
interface Todo {
  _id: string;
  content: string;
}

async function fetchInitialTodos(): Promise<Todo[]> {
  try {
    const todos = await FetchTodos();
    console.log("todos", todos);

    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}
export default async function Home() {
  const todos = await fetchInitialTodos();
  return (
    <ThemeToggle>
      <div>
        <main className="flex flex-col items-center justify-between min-h-screen bg-slate-100 dark:bg-slate-800 ">
          <h1 className="text-white text-3xl font-bold text-center mb-6">Todo List</h1>
          <div className='w-8/12'>
            <TodoList initialTodos={todos} />
          </div>


        </main>
      </div>
    </ThemeToggle>
  );
}
