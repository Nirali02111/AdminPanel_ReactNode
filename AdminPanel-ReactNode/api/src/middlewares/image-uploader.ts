import { Request } from "express";
import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto'
import fs from 'node:fs';
const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        const destinationFolder = path.join(__dirname, "..", "assets/images/users");
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }
        cb(null, destinationFolder);
    },
    filename: (req: Request, file: any, cb: any) => {
        let filename;
        filename = crypto.randomBytes(8).toString('hex') + '_' + Date.now().toString().slice(0, -3) + ".jpg"
        req.body.profileImage = 'assets/images/users/' + filename;
        cb(null, filename);
    }
});

export const upload = multer({ storage: storage })
