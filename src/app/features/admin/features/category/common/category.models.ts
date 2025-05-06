export interface CategoryRequest {
  name: string;
  description: string;
  createdDate: Date;
  phone: string;
  email: string;
}

export interface CategoryResponse extends CategoryRequest {
  id: number;
}
