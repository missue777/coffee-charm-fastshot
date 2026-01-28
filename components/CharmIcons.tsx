import React from "react";
import Svg, { Path, Circle, G, Ellipse } from "react-native-svg";
import { Colors } from "../constants/colors";

interface IconProps {
  size?: number;
  color?: string;
}

// Sun icon with rays
export const SunIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="20" fill={color} />
    {/* Rays */}
    <Path d="M50 5 L53 20 L47 20 Z" fill={color} />
    <Path d="M50 95 L53 80 L47 80 Z" fill={color} />
    <Path d="M5 50 L20 53 L20 47 Z" fill={color} />
    <Path d="M95 50 L80 53 L80 47 Z" fill={color} />
    <Path d="M18 18 L30 27 L27 30 Z" fill={color} />
    <Path d="M82 82 L70 73 L73 70 Z" fill={color} />
    <Path d="M82 18 L73 30 L70 27 Z" fill={color} />
    <Path d="M18 82 L27 70 L30 73 Z" fill={color} />
    {/* Additional decorative rays */}
    <Path d="M50 10 L52 25 L48 25 Z" fill={color} opacity={0.6} />
    <Path d="M50 90 L52 75 L48 75 Z" fill={color} opacity={0.6} />
  </Svg>
);

// Moon icon
export const MoonIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M60 10 C30 15 15 45 25 75 C35 95 65 100 85 80 C70 85 45 75 45 45 C45 25 55 15 60 10 Z"
      fill={color}
    />
    {/* Stars */}
    <Circle cx="75" cy="25" r="2" fill={color} />
    <Circle cx="85" cy="40" r="1.5" fill={color} />
    <Circle cx="70" cy="15" r="1" fill={color} />
  </Svg>
);

// Star icon
export const StarIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z"
      fill={color}
    />
  </Svg>
);

// Heart icon
export const HeartIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M50 90 C20 60 5 40 15 25 C25 10 40 15 50 30 C60 15 75 10 85 25 C95 40 80 60 50 90 Z"
      fill={color}
    />
  </Svg>
);

// Leaf icon
export const LeafIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M50 95 C50 95 20 70 15 40 C10 10 50 5 50 5 C50 5 90 10 85 40 C80 70 50 95 50 95 Z"
      fill={color}
    />
    <Path
      d="M50 25 L50 80"
      stroke={Colors.cream}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M50 40 L35 30"
      stroke={Colors.cream}
      strokeWidth="1.5"
      fill="none"
    />
    <Path
      d="M50 55 L65 45"
      stroke={Colors.cream}
      strokeWidth="1.5"
      fill="none"
    />
  </Svg>
);

// Flower icon
export const FlowerIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <G>
      {/* Petals */}
      <Ellipse cx="50" cy="25" rx="12" ry="18" fill={color} />
      <Ellipse
        cx="75" cy="40" rx="12" ry="18" fill={color}
        transform="rotate(72, 75, 40)"
      />
      <Ellipse
        cx="68" cy="70" rx="12" ry="18" fill={color}
        transform="rotate(144, 68, 70)"
      />
      <Ellipse
        cx="32" cy="70" rx="12" ry="18" fill={color}
        transform="rotate(-144, 32, 70)"
      />
      <Ellipse
        cx="25" cy="40" rx="12" ry="18" fill={color}
        transform="rotate(-72, 25, 40)"
      />
      {/* Center */}
      <Circle cx="50" cy="50" r="12" fill={Colors.coral} />
    </G>
  </Svg>
);

// Coffee cup icon
export const CoffeeIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* Cup */}
    <Path
      d="M20 30 L25 85 C25 90 35 95 50 95 C65 95 75 90 75 85 L80 30 Z"
      fill={color}
    />
    {/* Handle */}
    <Path
      d="M80 35 C95 35 100 50 95 60 C90 70 80 65 80 65"
      stroke={color}
      strokeWidth="6"
      fill="none"
    />
    {/* Steam */}
    <Path d="M35 25 C35 15 40 10 35 5" stroke={color} strokeWidth="2" fill="none" opacity={0.6} />
    <Path d="M50 25 C50 15 55 10 50 5" stroke={color} strokeWidth="2" fill="none" opacity={0.6} />
    <Path d="M65 25 C65 15 70 10 65 5" stroke={color} strokeWidth="2" fill="none" opacity={0.6} />
  </Svg>
);

// Horseshoe icon
export const HorseshoeIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M20 90 L20 50 C20 20 35 5 50 5 C65 5 80 20 80 50 L80 90 L65 90 L65 50 C65 30 60 20 50 20 C40 20 35 30 35 50 L35 90 Z"
      fill={color}
    />
    {/* Nail holes */}
    <Circle cx="27" cy="60" r="4" fill={Colors.cream} />
    <Circle cx="27" cy="80" r="4" fill={Colors.cream} />
    <Circle cx="73" cy="60" r="4" fill={Colors.cream} />
    <Circle cx="73" cy="80" r="4" fill={Colors.cream} />
  </Svg>
);

// Clover icon
export const CloverIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* Four leaves */}
    <Circle cx="50" cy="30" r="18" fill={color} />
    <Circle cx="30" cy="50" r="18" fill={color} />
    <Circle cx="70" cy="50" r="18" fill={color} />
    <Circle cx="50" cy="70" r="18" fill={color} />
    {/* Stem */}
    <Path
      d="M50 75 L50 95"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
  </Svg>
);

// Bird icon
export const BirdIcon: React.FC<IconProps> = ({
  size = 80,
  color = Colors.gold,
}) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M10 60 C20 45 35 40 50 40 C60 40 75 45 85 35 C90 30 95 25 95 25 C90 35 85 45 75 50 C85 55 90 65 85 75 C80 85 65 85 55 80 L45 90 L42 80 C30 80 15 75 10 60 Z"
      fill={color}
    />
    {/* Eye */}
    <Circle cx="70" cy="42" r="3" fill={Colors.cream} />
    {/* Wing detail */}
    <Path
      d="M40 55 C50 50 60 55 65 60"
      stroke={Colors.cream}
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);

// Icon mapping
export const getCharmIcon = (iconName: string, size?: number, color?: string) => {
  const props = { size, color };

  switch (iconName) {
    case "sun":
      return <SunIcon {...props} />;
    case "moon":
      return <MoonIcon {...props} />;
    case "star":
      return <StarIcon {...props} />;
    case "heart":
      return <HeartIcon {...props} />;
    case "leaf":
      return <LeafIcon {...props} />;
    case "flower":
      return <FlowerIcon {...props} />;
    case "coffee":
      return <CoffeeIcon {...props} />;
    case "horseshoe":
      return <HorseshoeIcon {...props} />;
    case "clover":
      return <CloverIcon {...props} />;
    case "bird":
      return <BirdIcon {...props} />;
    default:
      return <SunIcon {...props} />;
  }
};
