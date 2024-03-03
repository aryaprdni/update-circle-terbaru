import { Like, Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { randomInt } from "crypto";
import { Response } from "express";

export default new (class UserServices {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);
  async Register(data: any, res: Response): Promise<object | string> {
    try {
      const checkEmail = await this.UserRepository.exists({
        where: {
          email: data.email,
        },
      });
      if (checkEmail)
        return res.status(409).json({
          message: `message: email ${data.email} already exist`,
        });

      const checkUsername = await this.UserRepository.exists({
        where: {
          username: data.username,
        },
      });
      if (checkUsername)
        return res.status(409).json({
          message: `message: username ${data.username} already exist`,
        });

      const hashPassword = await bcrypt.hash(data.password, 10);

      const obj = {
        ...data,
        password: hashPassword,
      };

      const response = await this.UserRepository.save(obj);
      return {
        message: "Register success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Register failed",
        error: error.message,
      };
    }
  }

  async Login(data: any, res: Response): Promise<object | string> {
    try {
      const checkUser = await this.UserRepository.findOne({
        where: [{ username: Like(`%${data.username}%`) }, { email: Like(`%${data.username}%`) }],
        relations: ["follower", "following"],
      });

      if (!checkUser) {
        throw new Error("Email / password is wrong!");
      }

      const comparePassword = await bcrypt.compare(data.password, checkUser.password);
      if (!comparePassword) {
        return res.status(400).json({
          message: "Email/username and password is wrong!",
        });
      }

      const obj = {
        id: checkUser.id,
        username: checkUser.username,
      };

      const token = jwt.sign(obj, "secret", { expiresIn: "1h" });

      return {
        message: "Login success",
        token: token,
        user: {
          id: checkUser.id,
          username: checkUser.username,
          full_name: checkUser.full_name,
          email: checkUser.email,
          photo_profile: checkUser.photo_profile,
          photo_background: checkUser.photo_background,
          bio: checkUser.bio,
          followers_count: checkUser.follower.length,
          followings_count: checkUser.following.length,
        },
      };
    } catch (error) {
      console.error("Error occurred during login:", error);

      return {
        message: "Login failed",
        error: error.message,
      };
    }
  }

  async Update(data: any, res: Response): Promise<object | string> {
    try {
      const user = await this.UserRepository.findOne({
        where: {
          id: data.id,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: `User with ID ${data.id} not found`,
        });
      }

      if (user) {
        return res.status(404).json({
          message: `username ${data.username} already exists`,
        });
      }

      if (data.username) {
        user.username = data.username;
      }
      if (data.full_name) {
        user.full_name = data.full_name;
      }
      if (data.bio) {
        user.bio = data.bio;
      }
      if (data.email) {
        user.email = data.email;
      }

      const response = await this.UserRepository.save(user);
      return {
        message: "Updated success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Updated failed",
        error: error.message,
      };
    }
  }

async getAll(loginSession: number): Promise<object | string> {
  try {
    const allUsers = await this.UserRepository.find();
    const userId = loginSession;

    const usersWithFollowingStatus = await Promise.all(
      allUsers.map(async (user) => {
        const userWithRelations = await this.UserRepository.findOne({
          where: { id: userId },
          relations: ["following"],
        });

        const is_following = userWithRelations?.following.some(
          (followingUserId) => followingUserId.id === user.id
        );

        return { ...user, is_following, userId };
      })
    );

    return {
      message: "Get all user success",
      data: usersWithFollowingStatus,
    };
  } catch (error) {
    return {
      message: "Get all user failed",
      error: error.message,
    };
  }
}
  

  async getOne(id: number): Promise<object | string> {
    try {
      const response = await this.UserRepository.findOneBy({ id });

      return {
        message: "Get one user success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Get one user failed",
        error: error.message,
      };
    }
  }

  async check(loginSession: any): Promise<any> {
    try {
      const user = await this.UserRepository.findOne({
        relations: ["follower", "following"],
        where: {
          id: loginSession,
        },
      });

      return {
        message: "Token is valid!",
        user: {
          id: user.id,
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          bio: user.bio,
          photo_profile: user.photo_profile,
          photo_background: user.photo_background,
          followers_count: user.follower.length,
          followings_count: user.following.length,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
})();
