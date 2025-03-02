import { useEffect, useState } from "react";
import { Check, Trash, Pencil, X } from "lucide-react";
import { getTasks, createTask, updateTask, deleteTask, type Todo } from "../api/apiTasks";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<Todo>({ id: "", name: "", done: false });
  const [showConfirm, setShowConfirm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState("");
  const [idTaskToDelete, setIdTaskToDelete] = useState<string>("")
  const [taskToUpdate, setTaskToUpdate] = useState<Todo | null>(null);

  function handleConfirmDelete(id: string) {
    setIdTaskToDelete(id)
    setShowConfirm(true);
  }

  function handleCancelEditing() {
    setEditingIndex(null);
    setEditedTask("");
  }


  async function handleSaveTask() {
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, name: editedTask };
  
      await updateTask(updatedTask.id, updatedTask);
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
  
      setEditingIndex(null);
      setEditedTask("");
      setTaskToUpdate(null);
    }
  }


  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  async function handleAddTask(task: Todo) {
    const myTask = { ...task, id: uuidv4() }; 
    setNewTask(myTask);
    await createTask(myTask);

    setTasks((prevTasks) => [...prevTasks, myTask]);

    setNewTask({ id: "", name: "", done: false })
  }

  async function handleToggleTask(id: string, tasks: Todo[], setTasks: React.Dispatch<React.SetStateAction<Todo[]>>) {
    try {

      const taskToUpdate = tasks.find(task => task.id === id);
  
      if (taskToUpdate) {
        const updatedTask = {
          id: taskToUpdate.id,
          name: taskToUpdate.name,
          done: !taskToUpdate.done,
        };
  
        await updateTask(id, updatedTask);
  
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
          )
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  }

  async function handleDeleteTask(id: string) {
    await deleteTask(id)
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== idTaskToDelete));
    setShowConfirm(false)
  }

  function handleStartEditing(task: Todo, index: number) {
    setEditingIndex(index);
    setEditedTask(task.name);
    setTaskToUpdate(task);
  }
  
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <header className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            To-Do List
          </h1>
        </header>
        <div className="max-w-[900px] w-full space-y-4 px-4">
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 dark:bg-gray-800 dark:text-gray-200"
              placeholder="New task"
              value={newTask.name}
              onChange={(e) => setNewTask({ id: "", name: e.target.value, done: false })}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => handleAddTask(newTask)}
            >
              Add
            </button>
          </div>
          <ul className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-3">
            {tasks.map((task, index) => (
              <li
                key={task.id}
                className="flex items-center gap-3 p-2 border-b border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => handleToggleTask(task.id, tasks, setTasks)}
                  className={`w-6 h-6 border rounded-full flex items-center justify-center ${
                    task.done ? "bg-green-500 border-green-500" : "border-gray-400"
                  }`}
                >
                  {task.done && <Check className="w-4 h-4 text-white" />}
                </button>
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg p-1 dark:bg-gray-800 dark:text-gray-200"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span
                    className={`flex-1 ${
                      task.done ? "line-through text-gray-500" : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {task.name}
                  </span>
                )}
                {editingIndex === index ? (
                  <>
                    <button onClick={handleCancelEditing} className="text-white hover:text-gray-300">
                      <X className="w-5 h-5" />
                    </button>
                    <button onClick={handleSaveTask} className="text-white hover:text-gray-300">
                      <Check className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleConfirmDelete(task.id)} className="text-white hover:text-gray-300">
                      <Trash className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleStartEditing(task, index)} className="text-white hover:text-gray-300">
                      <Pencil className="w-5 h-5" />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg text-gray-900 dark:text-gray-100">Are you sure you want to delete it?</p>
              <div className="mt-4 flex justify-center gap-4">
                <button onClick={() => handleDeleteTask(idTaskToDelete)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Yes
                </button>
                <button onClick={() => setShowConfirm(false)} className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
