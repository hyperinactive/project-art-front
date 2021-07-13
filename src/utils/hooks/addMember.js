import { useMutation } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import {
  ADD_MEMBER,
  GET_MEMBERS,
  GET_PROJECT,
  GET_USER_PROJECTS,
} from '../../graphql';

const useAddMember = (projectID) =>
  useMutation(ADD_MEMBER, {
    variables: {
      projectID,
    },
    update: (cache, result) => {
      const members = cache.readQuery({
        query: GET_MEMBERS,
        variables: {
          projectID,
        },
      });

      const membersClone = {};
      membersClone.getProjectMembers = [
        ...cloneDeep(members.getProjectMembers),
        result.data.addMember,
      ];

      cache.writeQuery({
        query: GET_MEMBERS,
        variables: {
          projectID,
        },
        data: {
          getProjectMembers: membersClone.getProjectMembers,
        },
      });

      const projectData = cache.readQuery({
        query: GET_PROJECT,
        variables: {
          projectID,
        },
      });

      const projectClone = {};
      projectClone.getProject = cloneDeep(projectData.getProject);
      projectClone.getProject.members = [
        ...projectClone.getProject.members,
        result.data.addMember.id,
      ];

      cache.writeQuery({
        query: GET_PROJECT,
        variables: {
          projectID,
        },
        data: {
          getProject: {
            members: projectClone.getProject.members,
          },
        },
      });

      const userProjects = cache.readQuery({
        query: GET_USER_PROJECTS,
      });

      const userProjectsClone = cloneDeep(userProjects);
      userProjectsClone.getUserProjects = [
        ...userProjectsClone.getUserProjects,
        projectClone.getProject,
      ];

      cache.writeQuery({
        query: GET_USER_PROJECTS,
        data: {
          getUserProjects: userProjectsClone.getUserProjects,
        },
      });
    },
    onCompleted: () => {
      console.log('completed');
    },
  });

export default useAddMember;
