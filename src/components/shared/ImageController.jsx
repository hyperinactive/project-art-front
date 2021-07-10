/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Message, Image } from 'semantic-ui-react';

const ImageController = ({ state, setState }) => {
  // DROPZONE
  // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed
  // createObjectURL will create a temp url we can use to preview the image

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);

    setState({
      ...state,
      previewImage: url,
      imageFile: file,
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="imageController">
      <div
        {...getRootProps()}
        className={`dropzone ${
          isDragActive && 'isActive'
        } imageController__container`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          // eslint-disable-next-line no-unneeded-ternary
          <p
            style={{
              padding: 50,
              marginBottom: 15,
            }}
          >
            Drop it here
          </p>
        ) : state.previewImage ? (
          <Image centered src={state.previewImage} style={{ width: 180 }} />
        ) : (
          <div className="imageController__container__placeholder">
            <p
              style={{
                padding: 50,
                marginBottom: 15,
              }}
            >
              Drag & drop or click here
            </p>
          </div>
        )}
      </div>
      {Object.keys(state.errors).includes('allowedType') && (
        <Message negative>
          <p>File type not allowed</p>
        </Message>
      )}
    </div>
  );
};

ImageController.defaultProps = {
  state: PropTypes.shape({
    imageFile: null,
    previewImage: '',
    open: false,
    body: '',
    errors: {},
  }),
};

ImageController.propTypes = {
  state: PropTypes.shape({
    imageFile: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    previewImage: PropTypes.string,
    open: PropTypes.bool,
    body: PropTypes.string,
    errors: PropTypes.objectOf(PropTypes.object),
  }),
  setState: PropTypes.func.isRequired,
};

export default ImageController;
