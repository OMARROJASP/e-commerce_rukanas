export interface Category {
    cat_id?: number;
    cat_name: string;
    cat_description: string;
    cat_imageUrl: string;
    cat_status: number;    
    cat_area: number  // 1: Tienda, 2: Lubricantes
}