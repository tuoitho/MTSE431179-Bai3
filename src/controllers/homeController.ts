import { Request, Response } from 'express';
import CRUDService from '../services/CRUDService';

const getHomePage = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await CRUDService.getAllUser();
        res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error retrieving users');
    }
};

const getCRUD = (req: Request, res: Response): void => {
    res.render('crud.ejs');
};

const postCRUD = async (req: Request, res: Response): Promise<void> => {
    try {
        await CRUDService.createNewUser(req.body);
        res.redirect('/get-crud');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error creating user');
    }
};

const displayGetCRUD = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await CRUDService.getAllUser();
        res.render('displayCRUD.ejs', {
            dataTable: data
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error retrieving users');
    }
};

const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
    const userId = req.query.id as string;
    if (userId) {
        try {
            const user = await CRUDService.getUserInfoById(userId);
            res.render('editCRUD.ejs', { user });
        } catch (e) {
            console.error(e);
            res.status(500).send('Error retrieving user');
        }
    } else {
        res.send('User not found!');
    }
};

const putCRUD = async (req: Request, res: Response): Promise<void> => {
    try {
        await CRUDService.updateUser(req.body);
        res.redirect('/get-crud');
    } catch (e) {
        console.error(e);
        res.status(500).send('Error updating user');
    }
};

const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
    const id = req.query.id as string;
    if (id) {
        try {
            await CRUDService.deleteUserById(id);
            res.redirect('/get-crud');
        } catch (e) {
            console.error(e);
            res.status(500).send('Error deleting user');
        }
    } else {
        res.send('User not found!');
    }
};

export {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};
