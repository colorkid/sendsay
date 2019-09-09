export const createConvertedFiles = (files) => {
  return new Promise((resolve) => {
    const promisesFile = files.map(file => {
      return convertFileToBase64(file);
    });
    Promise.all(promisesFile).then(result => {
      resolve(result);
    });
  });
};

export const convertFileToBase64 = (file) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve({name: file.name, content: event.target.result, encoding: 'base64'});
    };
    reader.readAsDataURL(file)
  });
};

export const getFilesSize = (files) => {
  try {
    if (Array.isArray(files)) {
      if (!files.length) return false;
      let totalSize = 0;
      files.forEach(item => {
        if (!item.size) throw new SyntaxError('ERROR: One of "File" does not have a size property');
        totalSize = totalSize + item.size
      });
      return totalSize;
    } else {
      throw new SyntaxError('ERROR: "Files" is not a array');
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};