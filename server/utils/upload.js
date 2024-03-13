import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://1804ajaykumar:jnojJvAaaM8KautW@cluster0.b3omswl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    file: (request, file) => {
        console.log(file)
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.nameType) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucktName: "photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});