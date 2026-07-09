export interface PortfolioItemCard {
  id: string;
  href: string;
  badge: string;
  titlePrefix?: string;
  titleHighlight?: string;
  cardDescription: string;
  buttonText: string;
  details?: PreviewItem[];
}

export interface PreviewItem {
  label: string;
  icon: string;
  value?: string;
}
