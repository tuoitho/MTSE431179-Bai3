import db from '../models';
import bcrypt from 'bcryptjs';

interface UserData {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address?: string;
    phoneNumber?: string;
    gender?: boolean;
    image?: string;
    roleId?: string;
    positionId?: string;
}

const hashUserPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

const createNewUser = async (data: UserData): Promise<void> => {
    const hashedPassword = await hashUserPassword(data.password);
    await db.User.create({
        ...data,
        password: hashedPassword
    });
};

const getAllUser = async (): Promise<UserData[]> => {
    return await db.User.findAll({ raw: true });
};

const getUserInfoById = async (userId: string): Promise<UserData | null> => {
    return await db.User.findOne({ where: { id: userId }, raw: true });
};

const updateUser = async (data: UserData): Promise<void> => {
    const updateData: Partial<UserData> = { ...data };
    if (data.password) {
        updateData.password = await hashUserPassword(data.password);
    }
    await db.User.update(updateData, {
        where: { id: data.id }
    });
};

const deleteUserById = async (userId: string): Promise<void> => {
    await db.User.destroy({
        where: { id: userId }
    });
};

export default {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUserById
};
