import api from 'axios';

export interface IDespesas {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export const axios = api.create({
  baseURL: 'http://localhost:3001/',
});

export function getDespesasEndpoint(mesDia: string): Promise<IDespesas[]> {
  return axios.get(`despesas?mes=${mesDia}&_sort=dia`).then(res => {
    return res.data;
  });
}
