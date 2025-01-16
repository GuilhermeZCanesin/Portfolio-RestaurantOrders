export interface OrderRequestInterface {
    id?: string;
    table: number;
    name: string;
    draft?: boolean;
    category_id: string;
}