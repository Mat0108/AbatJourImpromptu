import React from "react";

// Import de toutes les icônes ici
import DelIcon from "@/assets/svg/Delete.svg?react";
import EditIcon from "@/assets/svg/Edit.svg?react"
// Mapping des noms → composants
const ICONS = {
  del: DelIcon,
  edit: EditIcon
  // upload: UploadIcon
} as const;

type IconName = keyof typeof ICONS;

interface ImportSVGProps extends React.SVGProps<SVGSVGElement> {
  src: IconName;
  color?: string;            // Couleur dynamique
  size?: [number, number];   // [width, height] en pixels
}

const ImportSVG: React.FC<ImportSVGProps> = ({ src, color, size, ...rest }) => {
  const Icon = ICONS[src];
  if (!Icon) return null;

  // Style inline pour couleur + taille
  const style = {
    width: size ? size[0] : "100%",
    height: size ? size[1] : "100%",
    color
  };

  return <Icon style={style} {...rest} />;
};

export default ImportSVG;