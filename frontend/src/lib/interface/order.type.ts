export interface OrderPropsDTO {
  id: string;
  name: string;
  table: number;
  draft: boolean;
  status: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}
