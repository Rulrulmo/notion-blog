export interface TagFilterItem {
  name: string;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}


export interface Post {
  id: string;
  title: string;
  coverImage?: string;
  tags?: Tag[];
  createdDate?: string;
  modifiedDate?: string;
  author?: string;
  content?: string;
  description?: string;
}
