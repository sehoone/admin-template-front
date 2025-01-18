import { defineStore } from 'pinia';
import { User } from '../../pages/users/types';
import { getProjectsApi, getUsers } from './templateApi';
import { Project } from '@/pages/projects/types';

interface TemplateState {
  users: User[];
  projects: Project[];
}

export type Pagination = {
  page: number;
  perPage: number;
  total: number;
};

export type Sorting = {
  sortBy: 'project_owner' | 'team' | 'created_at';
  sortingOrder: 'asc' | 'desc' | null;
};

export const useTemplateStore = defineStore('app-template', {
  state: (): TemplateState => ({
    users: [],
    projects: []
  }),
  getters: {
    getUsers(): User[] {
      return this.users || [];
    },
    getProjects(): Project[] {
      return this.projects || [];
    }
  },
  actions: {
    setUsers(users: User[]) {
      this.users = users || [];
    },
    setProjects(projects: Project[]) {
      this.projects = projects || [];
    },

    async reqProjects(options: Partial<Sorting> & Pagination): Promise<Project[]> {
      try {
        const data = await getProjectsApi(options);
        this.setProjects(data);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: reqHelloText
     */
    async reqUsers(): Promise<User[]> {
      try {
        const data = await getUsers();
        this.setUsers(data);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
});
