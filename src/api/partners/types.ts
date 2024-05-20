export type Partner = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  websiteUrl: string;
  active: boolean;
  image?: string;
  locationRadius: number;
  isFeatured: boolean;
  address: any;
  collectivity?: any;
};
