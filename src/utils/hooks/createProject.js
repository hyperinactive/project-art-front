import { useMutation } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import { CREATE_PROJECT, GET_PROJECTS, GET_USER_PROJECTS } from '../../graphql';

const useCreateProject = (setIsCreated) =>
  useMutation(CREATE_PROJECT, {
    update: (cache, result) => {
      const projects = cache.readQuery({
        query: GET_PROJECTS,
      });

      const userProjects = cache.readQuery({
        query: GET_USER_PROJECTS,
      });

      if (projects) {
        const projectsClone = cloneDeep(projects);
        projectsClone.getProjects = [
          ...projectsClone.getProjects,
          result.data.createProject,
        ];

        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            getProjects: projectsClone.getProjects,
          },
        });
      }

      if (userProjects) {
        const userProjectsClone = cloneDeep(userProjects);
        userProjectsClone.getUserProjects = [
          ...userProjectsClone.getUserProjects,
          result.data.createProject,
        ];

        cache.writeQuery({
          query: GET_USER_PROJECTS,
          data: {
            getUserProjects: userProjectsClone.getUserProjects,
          },
        });
      }
    },
    onCompleted: (data) => {
      setIsCreated((prevState) => ({
        ...prevState,
        project: data,
        isCreated: true,
      }));
      // props.history.push(`/projects/${data.createProject.id}`);
    },

    onError: (err) => {
      console.log(err);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

export default useCreateProject;
