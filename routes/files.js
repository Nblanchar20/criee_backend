const express = require("express");
const FileService = require("../services/files");

function fileApi(app, protectedRoutes) {
  const router = express.Router();
  app.use("/file", router);

  const fileService = new FileService();

  router.post("/:carpet/:id", protectedRoutes, async function (req, res, next) {
    const { file } = req.files;
    const { id, carpet } = req.params;

    try {
      const uploaded = await fileService.uploadFile(file, carpet, id);
      res.status(201).json(uploaded);
    } catch (error) {
      next(error);
    }
  });

  router.post("/subfolder/:folder/:subfolder/:id", protectedRoutes, async function (req, res, next) {
    const { file } = req.files;
    const { id, folder, subfolder } = req.params;

    try {
      const uploaded = await fileService.uploadFileSubFolder(file, folder, subfolder, id);
      res.status(201).json(uploaded);
    } catch (error) {
      next(error);
    }
  });

  router.post("/many/:carpet/:id", protectedRoutes, async function (req, res, next) {
    const { file } = req.files;
    const { id, carpet } = req.params;

    try {
      const uploaded = await fileService.uploadFiles(file, carpet, id);
      res.status(201).json(uploaded);
    } catch (error) {
      next(error);
    }
  });

  router.post("/many/subfolder/:folder/:subfolder/:id", protectedRoutes, async function (req, res, next) {
    const { file } = req.files;
    const { id, folder, subfolder } = req.params;

    try {
      const uploaded = await fileService.uploadFilesSubfolder(file, folder, subfolder, id);
      res.status(201).json(uploaded);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = fileApi;