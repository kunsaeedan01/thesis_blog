import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Wrong format of email').isEmail(),
    body('password', 'Minimum 5 symbols are required').isLength({ min: 5 }), 
    body('fullName', 'Minumum 3 symbols are required ').isLength({ min: 3 }), 
    body('avatarUrl', 'Wrong URL address').optional().isURL(), 

];

export const loginValidation = [
    body('email', 'Wrong format of email').isEmail(),
    body('password', 'Minimum 5 symbols are required').isLength({ min: 5 }), 
];


export const postCreateValidation = [
    body('title', 'Enter the tile of post').isLength({min:3}).isString(),
    body('text', 'Enter the text of the post').isLength({ min: 3 }).isString(), 
    body('tags', 'Wrong tags format (assign array)').optional().isString(), 
    body('imageUrl', 'Wrong image URL').optional().isString(), 

];