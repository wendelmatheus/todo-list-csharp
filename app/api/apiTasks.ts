import axios from "axios";

const API_URL = "http://localhost:5248/api/todos";

export interface Todo {
    id: string;
    name: string;
    done: boolean;
  }
  
  export async function getTasks(): Promise<Todo[]> {
    const response = await axios.get<Todo[]>(API_URL);
    return response.data;
  };

  export async function createTask(todo: Todo): Promise<Todo> {
    const response = await axios.post<Todo>(API_URL, todo);
    return response.data;
  };
  
//   export async function createTask (todo: Omit<Todo, "id">): Promise<Todo> {
//     const response = await axios.post<Todo>(API_URL, todo);
//     return response.data;
//   };
  
  export async function updateTask(id: string, todo: Partial<Todo>): Promise<void> {
    await axios.put(`${API_URL}/${id}`, todo);
  };
  
  export async function deleteTask (id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  };