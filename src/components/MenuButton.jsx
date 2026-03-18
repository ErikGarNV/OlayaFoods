// src/components/MenuButton.jsx
import { useState } from "react";
import CanIcon from "./CanIcon";

const MenuButton = ({ isMenuOpen, onToggleMenu }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CanIcon
        isHovered={hovered}
        isOpen={isMenuOpen}
        onClick={onToggleMenu}
        label=""
      />
    </div>
  );
};

export default MenuButton;
