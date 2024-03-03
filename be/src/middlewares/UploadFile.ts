// import * as express from "express";
// import * as multer from "multer";

// class UploadFile {
//   upload(fields: { name: string; maxCount?: number }[]) {
//     const storage = multer.diskStorage({
//       destination: (req, file, cb) => {
//         cb(null, "src/uploads");
//       },
//       filename: (req, file, cb) => {
//         const fieldName = fields.find((field) => field.name === file.fieldname)?.name || "unknown";
//         cb(null, `${fieldName}-${Date.now()}-${file.originalname}`);
//       },
//     });

//     const uploadFiles = multer({ storage }).fields(fields);

//     return (req: express.Request, res: express.Response, next: express.NextFunction) => {
//       uploadFiles(req, res, (err: any) => {
//         if (err instanceof multer.MulterError) {
//           console.error("MulterError:", err);
//           return res.status(400).json({
//             message: "File upload failed",
//             error: err.message,
//           });
//         } else if (err) {
//           console.error("Other error:", err);
//           return res.status(500).json({
//             message: "Internal server error",
//             error: err.message,
//           });
//         }

//         console.log("After multer processing");

//         if (!req.files || Object.keys(req.files).length === 0) {
//           return res.status(400).json({
//             message: "No files provided",
//           });
//         }

//         if (req.files["profile_picture"]) {
//           res.locals.profile_picture_filename = (req.files["profile_picture"] as Express.Multer.File[])[0].filename;
//         }

//         if (req.files["profile_description"]) {
//           res.locals.profile_description_filename = (req.files["profile_description"] as Express.Multer.File[])[0].filename;
//         }

//         if (req.files["image"]) {
//           res.locals.image_filename = (req.files["image"] as Express.Multer.File[])[0].filename;
//         }

//         next();
//       });
//     };
//   }
// }

// export default new UploadFile();

import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

const uploadFile = (fieldName: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  const uploadFile = multer({ storage: storage });

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldName)(req, res, function (error: any) {
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ error: error.message });
      } else if (error) {
        return res.status(500).json({ error: "Internal server error" });
      }

      if (req.file && req.file.filename) {
        res.locals.filename = req.file.filename;
      } else {
        res.locals.filename = null;
      }

      next();
    });
  };
};

export default uploadFile;
