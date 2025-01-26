export interface OrderRequestInterface {
  id?: string;
  table: number;
  name: string;
  draft?: boolean;
  status?: boolean;
  category_id: string;
}
