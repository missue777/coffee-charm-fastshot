import React from "react";
import Svg, { Path, Ellipse, G, Defs, LinearGradient, Stop } from "react-native-svg";

interface CoffeeCupProps {
  size?: number;
}

export const CoffeeCup: React.FC<CoffeeCupProps> = ({ size = 200 }) => {
  return (
    <Svg width={size} height={size * 1.1} viewBox="0 0 200 220">
      <Defs>
        {/* Cup gradient */}
        <LinearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#F5EDE4" />
          <Stop offset="50%" stopColor="#E8DFD4" />
          <Stop offset="100%" stopColor="#D4C4B0" />
        </LinearGradient>
        {/* Saucer gradient */}
        <LinearGradient id="saucerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#F5EDE4" />
          <Stop offset="100%" stopColor="#D4C4B0" />
        </LinearGradient>
        {/* Coffee gradient */}
        <LinearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#5C4033" />
          <Stop offset="100%" stopColor="#3D2A1C" />
        </LinearGradient>
        {/* Shadow gradient */}
        <LinearGradient id="shadowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="rgba(61,42,28,0.2)" />
          <Stop offset="100%" stopColor="rgba(61,42,28,0)" />
        </LinearGradient>
      </Defs>

      <G>
        {/* Shadow under saucer */}
        <Ellipse cx="100" cy="210" rx="70" ry="8" fill="rgba(61,42,28,0.15)" />

        {/* Saucer */}
        <Ellipse cx="100" cy="190" rx="80" ry="15" fill="url(#saucerGradient)" />
        <Ellipse cx="100" cy="188" rx="75" ry="12" fill="#F8F3EE" />
        <Ellipse cx="100" cy="186" rx="60" ry="8" fill="#E8DFD4" />

        {/* Envelope/charm slip peeking out */}
        <G>
          <Path
            d="M60 175 L75 140 L140 140 L155 175 Z"
            fill="#F8F3EE"
            stroke="#E8DFD4"
            strokeWidth="1"
          />
          {/* Heart on envelope */}
          <Path
            d="M100 155 C95 150 85 150 85 160 C85 170 100 175 100 175 C100 175 115 170 115 160 C115 150 105 150 100 155 Z"
            fill="#C47E6E"
            opacity={0.8}
          />
        </G>

        {/* Cup body */}
        <Path
          d="M55 70 C55 65 60 60 100 60 C140 60 145 65 145 70 L140 155 C140 165 125 175 100 175 C75 175 60 165 60 155 Z"
          fill="url(#cupGradient)"
        />

        {/* Cup rim highlight */}
        <Ellipse cx="100" cy="62" rx="42" ry="8" fill="#F8F3EE" />

        {/* Coffee surface */}
        <Ellipse cx="100" cy="70" rx="38" ry="6" fill="url(#coffeeGradient)" />

        {/* Cup inner shadow */}
        <Ellipse cx="100" cy="68" rx="35" ry="5" fill="rgba(0,0,0,0.1)" />

        {/* Handle */}
        <Path
          d="M145 85 C165 85 175 100 175 115 C175 130 165 145 145 145"
          stroke="url(#cupGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M145 90 C160 90 168 102 168 115 C168 128 160 140 145 140"
          stroke="#F8F3EE"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Decorative line on cup */}
        <Path
          d="M65 100 C80 105 120 105 135 100"
          stroke="#D4A574"
          strokeWidth="2"
          fill="none"
          opacity={0.5}
        />

        {/* Steam */}
        <G opacity={0.4}>
          <Path
            d="M80 50 C80 40 85 35 80 25"
            stroke="#8B7355"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M100 45 C100 35 105 30 100 20"
            stroke="#8B7355"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M120 50 C120 40 115 35 120 25"
            stroke="#8B7355"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </G>

        {/* Highlight on cup */}
        <Path
          d="M70 80 C70 75 72 72 75 72"
          stroke="#FFFFFF"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity={0.6}
        />
      </G>
    </Svg>
  );
};
