import { Api } from "../../services/api"
import { AxiosResponse,AxiosError } from 'axios';

export interface IUserData {
    name: string;
    email: string;
    password: string;
    id: number;
}

export interface ILoginResponse {
    data: {
      id: number;
      name: string;
    };
  }

  export interface ITasks{
  id: number;
  title: string;
  subtitle: string;
  }
  

export function setUserLocalStorage(user:ILoginResponse| null){
        localStorage.setItem('user',JSON.stringify(user))
}

export function getUserLocalStorage(){
    const json = localStorage.getItem('user')

    if(!json){
        return null
    }

    const user = JSON.parse(json)

    return user ?? null
}

export async function LoginRequest(email: string, password: string): Promise<ILoginResponse | null> {
    try {
      const request = await Api.post('users/login', { email, password });
        
      if (request.data) {
        return request.data as ILoginResponse;
      }
  
      return null;
    } catch (error) {
      return null;
    }
  }

export async function Register(name: string, email: string, password: string): Promise<IUserData | null> {
    try {
        const response: AxiosResponse<{ user: IUserData }> = await Api.post('users', { name, email, password });
          
        if (response.data && response.data.user) {
            return response.data.user;
        }

        return null;
    } catch (error) {
        console.error('Erro ao criar conta:', error);
        return null;
    }
}

export async function getTasks(): Promise<ITasks[] | null> {
  try {
    const response: AxiosResponse = await Api.get('tasks'); 

    if (response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return null;
  }
}

export async function addTask(title:string,subtitle:string): Promise<ITasks | null> {
  try {
    const response: AxiosResponse<{ task: ITasks }> = await Api.post('tasks',{title,subtitle}); 

    if (response.data) {
      return response.data.task;
    }

    return null;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return null;
  }
}

export async function editTask(
  id: number,
  title: string,
  subtitle: string
): Promise<ITasks | null> {
  try {
    const response: AxiosResponse<ITasks> = await Api.put(`tasks/${id}`, {
      title,
      subtitle,
    });

    if (response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
}
export async function deleteTask(id: number): Promise<AxiosResponse | null> {
  try {
    const response: AxiosResponse = await Api.delete(`tasks/${id}`);

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`Failed to delete task. Status: ${response.status}`);
    }
  } catch (error:any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        console.error('Error deleting task. Server response:', axiosError.response.data);

        return axiosError.response;
      }
    }

    console.error('Error deleting task:', error);

    return null;
  }
}


