import { defHttp } from '@/utils/http/axios';
import { User } from '../../pages/users/types';
import { Project } from '../../pages/projects/types';
import { Pagination, Sorting } from './templateModule';

enum Api {
  GetUsers = '/users/',
  GetProjects = '/projects'
}

/**
 * @description: getUsers
 */
export const getUsers = (): Promise<User[]> => {
  return defHttp.get<User[]>({ url: Api.GetUsers });
};

export const getProjectsApi = (options: Partial<Sorting> & Pagination): Promise<Project[]> => {
  return defHttp.get<Project[]>({ url: Api.GetProjects, params: options });
};
