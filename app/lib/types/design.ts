export interface DesignItem {
  id: number;
  title: string;
  subtitle: string;
  tool: "figma" | "canva" | "figma + canva";
  imageUrl: string;
  previewColor: string;
  orientation: "landscape" | "portrait" | "square";
  year: string;
  details: string;
  tags?: string[];
  link?: string;
}

export interface DesignData { 
  design: DesignItem[];
}