export type TUser={
    id:string;
    password:string;
    needPassword:boolean;
    role:'admin' | 'student' | 'faculity';
    status:'in-progress' | 'blocked'
    isDelete:boolean;
    createAt:string;
    updateAt:string;


}

export type newUser={
    id:string;
  password:string;
  role:string;

  
}
