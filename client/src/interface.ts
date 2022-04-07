export interface IProps {
  imageUrl: string;
}

export interface IProducts {
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
  __v: number;
  _id: string;
  owner: IUser;
}

export interface IUser {
  email: string;
  products: IProducts[];
  reviews: [];
  followings: [];
  followers: [];
  _id: string;
}
