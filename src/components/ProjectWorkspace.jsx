/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropType from 'prop-types';
import { useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import PostProjectForm from './PostProjectForm';
import { UPLOAD_FILE } from '../graphql';

const ProjectWorkspace = ({ project }) => {
  console.log(project);
  const [upload, { loading }] = useMutation(UPLOAD_FILE);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      upload({
        variables: {
          file,
        },
      });
      console.log(acceptedFiles);
    },
    [upload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!e.target.files[0]) return;
  //   upload({ variables: { file } });
  // };

  // function onChange({
  //   target: {
  //     validity,
  //     files: [file],
  //   },
  // }) {
  //   if (validity.valid) upload({ variables: { file } });
  // }

  // const submitFile = (file) => {
  //   console.log('called submit method');
  //   upload({ variables: file });
  // };

  return (
    // TODO: setup the feed
    <div className="projectWorkspace">
      <h1 style={{ marginTop: 40 }}>{project.name} -- Workspace</h1>
      <Grid container divided columns={3} style={{ marginTop: 40 }}>
        <Grid.Column width={1}>
          <Grid.Row stretched>
            <Image
              circular
              floated="right"
              size="massive"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              style={{ margin: 10 }}
            />
            <Image
              circular
              floated="right"
              size="massive"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              style={{ margin: 10 }}
            />
            <Image
              circular
              floated="right"
              size="massive"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              style={{ margin: 10 }}
            />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid.Row>
            <Grid.Column>
              {/* <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitFile();
                }}
              >
                <input type="file" onChange={onChange} />
                <Button type="submit" loading={loading}>
                  Upload file
                </Button>
              </Form> */}
              <>
                <div
                  {...getRootProps()}
                  className={`dropzone ${isDragActive && 'isActive'}`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Drag n drop some files here, or click to select files</p>
                  )}
                </div>
              </>
              <PostProjectForm project={project} />
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={3}>I am a --to be named-- column</Grid.Column>
      </Grid>
    </div>
  );
};

ProjectWorkspace.propTypes = {
  project: PropType.shape({
    id: PropType.string.isRequired,
    name: PropType.string.isRequired,
    description: PropType.string.isRequired,
  }).isRequired,
};

export default ProjectWorkspace;
