import { apiGet } from "../lib/api";
import type { Category, Product } from "../lib/types";

export const CatalogService = {
    getCategories: () => apiGet<Category[]>("/categories"),
    getProducts: () => apiGet<Product[]>("/produits"),
    getProductsByCategory: (categoryId: string) => apiGet<Product[]>(`/produits/categorie/${categoryId}`),
};
