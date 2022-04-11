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
  };
  name: string;
  newProduct: string;
  price: number;
  _id: string;
  owner: IUser;
  createdAt: String;
  state: string;
}

export interface IUser {
  email: string;
  products: IProduct[];
  reviews: [];
  followings: [];
  followers: [];
  _id: string;
  favorites: [];
}

export interface IComment {
  text: string;
  createdAt: string;
  owner: {
    comments: string;
    email: string;
    _id: string;
  }
}

export interface IFormData {
  email: string;
  password: string;
  password2: string;
}
