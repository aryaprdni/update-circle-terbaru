import { Request, Response } from "express";
import userServices from "../services/user-services";
import { loginValidation, registerValidation, updateValidation } from "../utils/validator/user-validation";
import cloudinary from "../libs/cloudinary";

export default new (class UserControllers {
  async Register(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = registerValidation.validate(data);
      if (error) return res.status(400).json(error);

      const response = await userServices.Register(value, res);
      return res.status(201).json(response);
    } catch (error) {
      if (res.headersSent) {
        return;
      }
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error } = loginValidation.validate(data);
      if (error) return res.status(400).json(error.details[0]);

      const response = await userServices.Login(data, res);
      return res.status(200).json(response);
    } catch (error) {
      if (res.headersSent) {
        return;
      }
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async Update(req: Request, res: Response) {
    try {
      const userId = res.locals.loginSession.id;
      const data = {
        id: userId,
        username: req.body.username,
        full_name: req.body.full_name,
        bio: req.body.bio,
        profile_picture: req.file ? res.locals.filename : null,
        profile_description: req.file ? res.locals.filename : null,
      };

      const { error, value } = updateValidation.validate(data);
      if (error) return res.status(400).json(error);

      if (req.file) {
        const cloudinaryResProfilePic = await cloudinary.destination(value.profile_picture);
        value.profile_picture = cloudinaryResProfilePic.secure_url;

        const cloudinaryResProfileDesc = await cloudinary.destination(value.profile_description);
        value.profile_description = cloudinaryResProfileDesc.secure_url;
      }

      const response = await userServices.Update(data, res);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Caught an error:", error);
      if (res.headersSent) {
        return;
      }

      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.id;
      const response = await userServices.getAll(loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await userServices.getOne(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession.id;
      const response = await userServices.check(loginSession);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
})();
