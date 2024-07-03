import TodoList from '@/components/TodoList';


export default function Home() {



  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      {/* Top Menu Bar */}
      <nav className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Todo App</div>
        </div>
      </nav>

      {/* ToDo App Content */}
      <div className="container mx-auto mt-10 p-6 bg-slate-400 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-black text-3xl font-bold text-center mb-6">Todo List</h1>
        <TodoList />

      </div>
    </main>
  );
}
