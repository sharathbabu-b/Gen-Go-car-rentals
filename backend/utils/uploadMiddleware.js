import multer from "multer";
import path from "path"
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ '-'+ file.originalname)
    }
})
export const upload=multer({
    storage,limits:{fileSize:2*1024*1024},
    fileFilter:function(req,file,cb){
        const ext=path.extname(file.originalname);
        if(!['.jpg','.jpeg','.png'].includes(ext)){
            return cb(new Error('only images are allowed'))

        }
        cb(null,true)
    }
})