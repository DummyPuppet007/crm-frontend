export type RoleFormData = {
    roleName: string;
    description?: string;
}

export type RoleList = {
    roleId: number;
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
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email?: string;
    roleId: number;
    createdAt: string;
    role : any;
}

export type ModuleFormData = {
    moduleName: string;
    description?: string;
}

export type ModuleList = {
    moduleId: number;
    moduleName: string;
    description?: string;
    createdAt: string;
    isDeleted?: boolean;
}

export type ActionFormData = {
    actionName: string;
    description?: string;
}

export type ActionList = {
    actionId: number;
    actionName: string;
    description?: string;
    createdAt: string;
    isDeleted?: boolean;
}

export type PermissionFormData = {
    moduleId: number;
    actionId: number;
}

export type PermissionList = {
    permissionId: number;
    permissionName: string;
    moduleId: number;
    moduleName: string
    actionId: number;
    actionName: string;
    createdAt: string;
}

export type RolePermissionFormData = {
    roleId: number;
    permissionId : number;
}

export type RolePermissionList = {
    rolepermissionId: number;
    roleId: number;
    roleName: string;
    permissionId: number;
    permissionName: string;
    createdAt: string;      
}

export type UserPermissionFormData = {
    userId: number;
    permissionId: number;
}

export type UserPermissionList = {
    userpermissionId: number;
    userId: number;
    username: string;
    permissionId: number;
    permissionName: string;
    createdAt: string;      
}

export type RoutePermissionFormData = {
    routeId: number;
    permissionId: number;
}

export type RoutePermissionList = {
    routePermissionId: number;
    routeId: number;
    routeName: string;
    permissionId: number;
    permissionName: string;
    createdAt: string;      
}