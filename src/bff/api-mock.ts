import express from "express";

const isMock = false;

export const apiMock = (app: express.Application) => {
  isMock &&
    app.use(async (req, res, next) => {
      if (req.url.startsWith("/open-api")) {
        res.json({
          code: 200,
          data: {},
        });
      } else {
        next();
      }
    });
};
