export type Category = {
    id: string;
    title: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
};

export type Product = {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    image: string;
    categorieId: string;
};

export type Favorite = {
    id: string;
    createdAt: string;
    updatedAt: string;
    UserId: string;
    ProduitId: string;
    Produit?: Product;
};

export type User = {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
};

export type LoginResponse = {
    message: string;
    token: string;
};
