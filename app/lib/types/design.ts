export interface DesignImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface DesignItem {
  id: number;
  title: string;
  subtitle: string;
  tool: "figma" | "canva" | "figma + canva";
  images: DesignImage[];
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
