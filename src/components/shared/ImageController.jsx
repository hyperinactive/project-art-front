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
  placeholder,
}) => {
  // DROPZONE
  // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed
  // createObjectURL will create a temp url we can use to preview the image
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
          placeholder === 'text' ? (
            <p>{placeholder}</p>
          ) : (
            <p>idk</p>
          )
        ) : previewImage ? (
          <Image centered src={previewImage} style={{ width: 300 }} />
        ) : (
          <p>idk</p>
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
  errors: [],
  placeholder: 'text',
};

ImageController.propTypes = {
  previewImage: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.String),
  onDrop: PropTypes.func.isRequired,
  setImageFile: PropTypes.func.isRequired,
  setPreviewImage: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default ImageController;
