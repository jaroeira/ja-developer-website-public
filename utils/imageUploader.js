export default async function (
  file,
  progress,
  error,
  options,
  $config,
  $axios,
  $fire
) {
  progress(0);

  const paramsToSign = {
    folder: $config.cloudinary.folder,
  };

  try {
    const getCloudinarySignature = $fire.functions.httpsCallable(
      'getCloudinarySignature'
    );

    const response = await getCloudinarySignature({ ...paramsToSign });

    const { signature, timestamp } = response.data;

    progress(10);

    const readData = (fileObj) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(fileObj);
      });

    const data = await readData(file);

    progress(15);

    const params = {
      timestamp,
      ...paramsToSign,
    };

    const uploadUrl =
      $config.cloudinary.apiUrl +
      '/' +
      $config.cloudinary.cloudName +
      '/image/upload';

    const formData = new FormData();
    formData.append('file', data);
    formData.append('signature', signature);
    formData.append('api_key', $config.cloudinary.apiKey);

    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });

    // console.log('begining image upload');

    const asset = await $axios.post(uploadUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        // console.log('onUploadProgress');
        const prog = parseInt(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
        // console.log('progress', prog);
        progress(prog);
      },
    });

    progress(100);

    // console.log('upload finished');

    const publicId = asset.data.public_id;

    // console.log('plubicId', publicId);

    return {
      publicId,
    };
  } catch (err) {
    error('Unable to upload file');
  }
}
