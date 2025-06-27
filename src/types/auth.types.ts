export type RoleFormData = {
    roleName: string;
    description?: string;
}

export type RoleList = {
    roleId: string;
    roleName: string;
    description?: string;
    createdAt: string;
    isDeleted?: boolean;
}

export type UserFormData = {
    firstName : string;
    middleName? : string;
    lastName : string;
    email? : string;
    username : string;
    password : string; 
}

export type UserList = {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    email?: string;
    roleId: string;
    createdAt: string;
    role : any;
}