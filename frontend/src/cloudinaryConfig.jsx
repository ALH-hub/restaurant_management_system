import { CloudinaryContext } from 'cloudinary-react';

const cloudinaryConfig = {
  cloudName: 'your_cloud_name',
};

const CloudinaryConfigProvider = ({ children }) => (
  <CloudinaryContext {...cloudinaryConfig}>{children}</CloudinaryContext>
);

export default CloudinaryConfigProvider;