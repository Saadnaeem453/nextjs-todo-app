// import ThemeToggle from '@/components/Theme/ThemeComponent';
import TodoList from '@/components/TodoList/TodoList';
import { FetchTodos } from '@/services/TodoService';

interface Todo {
  _id: string;
  content: string;
}

async function fetchInitialTodos(): Promise<Todo[]> {
  try {
    const todos = await FetchTodos();
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export default async function Home() {
  const todos = await fetchInitialTodos();
  return (
    // <ThemeToggle>
      <main className="flex flex-col items-center justify-between min-h-screen bg-gray-100 dark:bg-slate-800">
        <div className='w-8/12'>
          <TodoList initialTodos={todos} />
        </div>
      </main>
    // </ThemeToggle>
  );
}
