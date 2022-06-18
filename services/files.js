const { encrypt } = require("../utils/crypt");
const _ = require("lodash");

class FileService {
  async uploadFile(file, carpet, id) {
    try {
      if (file) {
        file.mv(`./uploads/${carpet}/${encrypt(id)}${file.name}`);
        return { success: true, ruta: `/${carpet}/${encrypt(id)}${file.name}` };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadFileSubFolder(file, folder, subfolder, id) {
    try {
      if (file) {
        file.mv(`./uploads/${folder}/${subfolder}/${encrypt(id)}${file.name}`);
        return { success: true, ruta: `/${folder}/${subfolder}/${encrypt(id)}${file.name}` };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadFiles(files, carpet, id) {
    try {
      const routes = [];
      files.length > 0 &&
        _.forEach(_.keysIn(files), (key) => {
          let f = files[key];
          f.mv(`./uploads/${carpet}/${encrypt(id)}${f.name}`);
          routes.push(`/${carpet}/${encrypt(id)}${f.name}`);
        });
      return { success: true, ruta: routes };
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async uploadFilesSubfolder(files, folder, subfolder, id) {
    try {
      var routes = [];
      files.length > 0 &&
      files.map((f) => {
        f.mv(`./uploads/${folder}/${subfolder}/${encrypt(id)}${f.name}`);
        routes.push(`/${folder}/${subfolder}/${encrypt(id)}${f.name}`);
      });
      return { success: true, ruta: routes };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = FileService;