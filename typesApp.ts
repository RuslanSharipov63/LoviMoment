export type PhotosType = {
  message?: string;
  [x: string]: any;
  photos: {
    _id: string;
    createdAt: string;
    imageURL: string;
    size: string;
    tags: string;
    updatedAt: string;
    user: {
      _id: string;
      avatarUrl: string;
      createdAt: string;
      email: string;
      fullName: string;
      passwordHash: string;
      updatedAt: string;
    };
  };
};

export type PhotoType = {
  message?: string;
  _id: string;
  createdAt: string;
  imageURL: string;
  size: number;
  tags: string;
  updatedAt: string;
  user: {
    avatarUrl: string;
    email: string;
    fullName: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type UserType = {
avatarUrl: string;
createdAt: string;
email: string;
fullName: string;
updatedAt: string;
__v: number;
_id: string; 
}