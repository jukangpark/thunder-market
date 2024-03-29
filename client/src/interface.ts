export interface IProps {
  imageUrl: string;
}

export interface IProduct {
  categories: string;
  change: string;
  delivery: boolean;
  description: string;
  hashtags: string;
  imageUrl: string;
  location: string;
  meta: {
    views: number;
    favorites: string[];
  };
  name: string;
  newProduct: string;
  price: number;
  _id: string;
  owner: IUser;
  createdAt: string;
  state: string;
}

export interface IUser {
  email: string;
  products: IProduct[];
  reviews: IComment[];
  followings: [];
  followers: [];
  favorites: [];
  profileImageUrl: string;
  introduction: string;
  username: string;
  createdAt: number;
  _id: string;
}

export interface IComment {
  text: string;
  createdAt: string;
  owner: IUser;
  _id: string;
}

export interface IFormData {
  email: string;
  password: string;
  password2: string;
}
