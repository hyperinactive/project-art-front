/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Message, Image } from 'semantic-ui-react';

const ImageController = ({
  previewImage,
  errors,
  setPreviewImage,
  setImageFile,
  before,
}) => {
  // DROPZONE
  // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed
  // createObjectURL will create a temp url we can use to preview the image

  console.log(previewImage);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);

    setPreviewImage(url);
    setImageFile(file);
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
          before !== null ? (
            { before }
          ) : (
            <p
              style={{
                padding: 50,
                marginBottom: 15,
              }}
            >
              Drop it here
            </p>
          )
        ) : previewImage ? (
          <Image centered src={previewImage} style={{ width: 180 }} />
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
      {Object.keys(errors).includes('allowedType') && (
        <Message negative>
          <p>File type not allowed</p>
        </Message>
      )}
    </div>
  );
};

ImageController.defaultProps = {
  errors: {},
  previewImage: '',
  before: null,
};

ImageController.propTypes = {
  previewImage: PropTypes.string,
  errors: PropTypes.objectOf(PropTypes.object),
  setImageFile: PropTypes.func.isRequired,
  setPreviewImage: PropTypes.func.isRequired,
  before: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default ImageController;
