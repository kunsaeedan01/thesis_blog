import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { UserController, PostContoller } from './controllers/index.js'
import multer from 'multer'
import { handleValidationErrors, checkAuth } from './utils/index.js';


mongoose.connect('YOUR MONGODB URL')
    .then(() => {
        console.log('DB OK');
    }).catch((err) => {
        console.log('DB error', err)
    })

const app = express();
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    }, 
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.post('/auth/register/', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login/', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get('/posts', PostContoller.getAll)
app.get('/posts/:id', PostContoller.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostContoller.create)
app.delete('/posts/:id', checkAuth, PostContoller.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostContoller.update)


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('Server OK');
    }
});
    

 