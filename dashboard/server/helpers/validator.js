const fileIsImage = (filePath) => {
  const supportedFiles = [
    'jpeg',
    'jpg',
    'gif',
    'png',
    'bmp'
  ];

  return supportedFiles.includes(filePath.split('.').pop());
}

module.exports = fileIsImage;
