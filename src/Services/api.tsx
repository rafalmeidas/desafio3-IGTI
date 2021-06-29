import api, { AxiosResponse } from 'axios';

export interface IDespesas {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUser {
  nome: string;
  email: string;
}

export const axios = api.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: true,
});

export function getDespesasEndpoint(mesDia: string): Promise<IDespesas[]> {
  return axios.get(`despesas?mes=${mesDia}&_sort=dia`).then(handleResponse);
}

export function getUserEndpoint(): Promise<IUser> {
  return axios.get(`/sessao/usuario`).then(handleResponse);
}

export function signInUserEndpoint(
  email: string,
  senha: string
): Promise<IUser> {
  return axios
    .post(`/sessao/criar`, { email: email, senha: senha })
    .then(handleResponse);
}

export function signOutUserEndpoint(): Promise<IUser> {
  return axios
    .post(`http://localhost:3001/sessao/finalizar`, {})
    .then(handleResponse);
}

function handleResponse(res: AxiosResponse) {
  // eslint-disable-next-line eqeqeq
  if (res.status == 200) {
    return res.data;
  } else {
    throw new Error(res.statusText);
  }
}
