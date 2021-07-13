import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PropTypes from 'prop-types';

function getCroppedImg(image, crop) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return canvas.toDataURL();

  // return a blob and a url
  // return new Promise((resolve, reject) => {
  //   try {
  //     canvas.toBlob((blob) => {
  //       resolve(blob);
  //     });
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
}

const CropComponent = ({ setState }) => {
  // src
  const [previewImage, setPreviewImage] = useState(null);
  // img
  const [imageFile, setImageFile] = useState(null);
  const [open, setOpen] = useState(false);

  // contains canvas info about the image height and width
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  // const [croppedImage, setCroppedImage] = useState(null);

  const handleFileChange = (e) =>
    setPreviewImage(URL.createObjectURL(e.target.files[0]));

  const handleCrop = async () => {
    // setCroppedImage(getCroppedImg(imageFile, crop));
    setState((state) => ({
      ...state,
      previewImage: getCroppedImg(imageFile, crop),
      newImage: true,
    }));
  };

  return (
    <div className="cropComponent">
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button icon="add" content="profile" />}
      >
        <Modal.Header>Upload image</Modal.Header>
        <Modal.Content>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewImage && (
            <>
              <div
                style={{ display: 'inline' }}
                className="cropComponent__imageFile"
              >
                <ReactCrop
                  onImageLoaded={setImageFile}
                  src={previewImage}
                  crop={crop}
                  onChange={(newCrop) => {
                    setCrop(newCrop);
                  }}
                />
              </div>
              {/* {croppedImage && (
                <div className="cropped" style={{ display: 'inline' }}>
                  <img src={croppedImage} alt="cropped" />
                </div>
              )} */}
            </>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              await handleCrop();
              setOpen(false);
            }}
            color="orange"
          >
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
      {/* <button
        type="submit"
        onClick={() =>
          uploadCroppedImage({
            variables: {
              image: croppedImage,
              // image: atob(
              //   // croppedImage.replace(/^data:image\/(png|jpg);base64,/, '')
              //   croppedImage.replace('data:image/jpeg;base64,/9j/', '')
              // ),
            },
          })
        }
      >
        Upload
      </button> */}
    </div>
  );
};

CropComponent.propTypes = {
  setState: PropTypes.func.isRequired,
};

export default CropComponent;
