import { Replies } from "./../entities/Replies";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export default new (class RepliesService {
  private readonly RepliesRepository: Repository<Replies> = AppDataSource.getRepository(Replies);

  // async create(data: any): Promise<object | string> {
  //   try {
  //     const response = await this.RepliesRepository.save(data);

  //     return {
  //       message: "Create replies success",
  //       data: response,
  //     };
  //   } catch (error) {
  //     return {
  //       message: "Create replies failed",
  //       error: error.message,
  //     };
  //   }
  // }

  async update(id: number, data: Replies): Promise<object | string> {
    try {
      const response = await this.RepliesRepository.update(id, data);
      return {
        message: "Update threads success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Update threads failed",
        error: error.message,
      };
    }
  }

  async delete(id: number): Promise<object | string> {
    try {
      const response = await this.RepliesRepository.delete(id);
      return {
        message: "Delete threads success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Delete threads failed",
        error: error.message,
      };
    }
  }

  async getAll(reqQuery: any): Promise<any> {
    try {
      const threadId = parseInt(reqQuery.thread_id ?? 0);

      const replies = await this.RepliesRepository.find({
        relations: ["user", "threads"],
        where: {
          threads: {
            id: threadId,
          },
        },
        order: {
          id: "DESC",
        },
        select: {
          user: {
            id: true,
            username: true,
            full_name: true,
          },
          threads: {
            id: true,
            content: true,
            image: true,
          },
        },
      });

      return replies;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(id: number): Promise<object | string> {
    try {
      const response = await this.RepliesRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user", "threads"],
        select: {
          user: {
            full_name: true,
            username: true,
            photo_profile: true,
          },
          threads: {
            id: true,
            content: true,
            image: true,
          },
          id: true,
          content: true,
          image: true,
        },
      });
      return {
        message: "Get one threads success",
        data: response,
      };
    } catch (error) {
      return {
        message: "Get one threads failed",
        error: error.message,
      };
    }
  }
})();
