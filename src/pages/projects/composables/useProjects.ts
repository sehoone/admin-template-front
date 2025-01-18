// import { useTemplateStore } from '@/services/template/templateModule';
import { computed, Ref, ref, unref } from 'vue';
import { Pagination, Sorting } from '../../../data/pages/projects';
import { useProjectsStore } from '../../../stores/projects';
import { Project } from '../types';
import { useProjectUsers } from './useProjectUsers';

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 });
const makeSortingRef = () => ref<Sorting>({ sortBy: 'created_at', sortingOrder: 'desc' });

export const useProjects = (options?: { sorting?: Ref<Sorting>; pagination?: Ref<Pagination> }) => {
  const isLoading = ref(false);
  const projectsStore = useProjectsStore();
  // const templateStore = useTemplateStore();
  const { getUserById } = useProjectUsers();

  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options ?? {};

  const fetch = async () => {
    isLoading.value = true;
    await projectsStore.getAll({
      sorting: unref(sorting),
      pagination: unref(pagination)
    });
    pagination.value = projectsStore.pagination;
    // templateStore.reqProjects();

    isLoading.value = false;
  };

  const projects = computed(() => {
    const paginated = projectsStore.items.slice(
      (pagination.value.page - 1) * pagination.value.perPage,
      pagination.value.page * pagination.value.perPage
    );

    const getSortItem = (obj: any, sortBy: Sorting['sortBy']) => {
      if (sortBy === 'project_owner') {
        return getUserById(obj.project_owner)?.fullname;
      }

      if (sortBy === 'team') {
        return obj.team.map((user: any) => getUserById(user)?.fullname || '').join(', ');
      }

      if (sortBy === 'created_at') {
        return new Date(obj[sortBy]);
      }

      return obj[sortBy];
    };

    if (sorting.value.sortBy && sorting.value.sortingOrder) {
      paginated.sort((a, b) => {
        a = getSortItem(a, sorting.value.sortBy!);
        b = getSortItem(b, sorting.value.sortBy!);

        if (a < b) {
          return sorting.value.sortingOrder === 'asc' ? -1 : 1;
        }
        if (a > b) {
          return sorting.value.sortingOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return paginated;
  });

  fetch();

  return {
    isLoading,

    projects,

    fetch,

    async add(project: Omit<Project, 'id' | 'created_at'>) {
      isLoading.value = true;
      await projectsStore.add(project);
      await fetch();
      isLoading.value = false;
    },

    async update(project: Project) {
      isLoading.value = true;
      await projectsStore.update(project);
      await fetch();
      isLoading.value = false;
    },

    async remove(project: Project) {
      isLoading.value = true;
      await projectsStore.remove(project);
      await fetch();
      isLoading.value = false;
    },

    pagination,
    sorting
  };
};
