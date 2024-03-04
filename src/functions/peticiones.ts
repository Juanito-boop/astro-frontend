import axios, { type AxiosResponse } from "axios";

const dominio = 'http://localhost:8088/';

/**
 * Realiza una petición GET a un endpoint y devuelve los datos obtenidos.
 * @param endpoint - El endpoint al que se realizará la petición.
 * @param parameters - Los parámetros opcionales que se enviarán en la petición.
 * @returns Una promesa que se resuelve con un array de datos de tipo T.
 */
export async function getData<T>(endpoint: string, parameters?: Record<string, any>): Promise<T[]> {
  try {
    const response: AxiosResponse<T[]> = await axios.get<T[]>(`${dominio + endpoint}`, {
      params: parameters,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error al pedir los datos desde ${endpoint}: ${error}`)
    return []
  }
}

/**
 * Envía una solicitud POST al endpoint especificado con el cuerpo proporcionado.
 * 
 * @param endpoint - El endpoint al que se enviará la solicitud.
 * @param body - El cuerpo de la solicitud.
 * @returns Una promesa que se resuelve con los datos de la respuesta.
 * @throws Si ocurre un error durante la solicitud.
 */
export async function postData<T>(endpoint: string, body: Record<string, any>): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.post<T>(`${dominio + endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error al enviar ${JSON.stringify(body)} a ${endpoint}: ${error}`)
    throw error
  }
}

/**
 * Envía una solicitud POST al endpoint especificado con un array de datos.
 * 
 * @param endpoint - El endpoint al que se enviará la solicitud.
 * @param body - Un array de datos que se enviarán en el cuerpo de la solicitud.
 * @returns Una promesa que se resuelve con los datos de la respuesta.
 * @throws Si ocurre un error durante la solicitud.
 */
export async function postManyData<T>(endpoint: string, body: Record<string, any>[]): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.post<T>(`${dominio + endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error al enviar ${JSON.stringify(body)} a ${endpoint}: ${error}`)
    throw error
  }
}
