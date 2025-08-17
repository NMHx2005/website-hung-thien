export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'user';
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPage {
    _id: string;
    title: string;
    slug: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IService {
    _id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITeamMember {
    _id: string;
    name: string;
    position: string;
    photo?: string;
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
} 