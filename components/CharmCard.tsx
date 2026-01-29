import React, { forwardRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/colors";
import { getCharmIcon } from "./CharmIcons";
import { CharmData } from "../utils/storage";

interface CharmCardProps {
  charm: CharmData;
  showAppBranding?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.85, 340);

export const CharmCard = forwardRef<View, CharmCardProps>(
  ({ charm, showAppBranding = false }, ref) => {
    return (
      <View ref={ref} style={styles.container} collapsable={false}>
        <View style={styles.card}>
          {/* Decorative top edge */}
          <View style={styles.topEdge} />

          {/* Icon container with decorative background */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              {getCharmIcon(charm.icon, 80, Colors.gold)}
            </View>
            {/* Decorative rays around icon */}
            <View style={styles.iconDecoration}>
              {getCharmIcon("sun", 140, `${Colors.gold}40`)}
            </View>
          </View>

          {/* Charm text */}
          <View style={styles.textContainer}>
            <Text style={styles.charmText}>{charm.text}</Text>
          </View>

          {/* App branding for sharing */}
          {showAppBranding && (
            <View style={styles.brandingContainer}>
              <Text style={styles.brandingText}>Късметче</Text>
            </View>
          )}

          {/* Decorative bottom edge */}
          <View style={styles.bottomEdge} />
        </View>
      </View>
    );
  }
);

CharmCard.displayName = "CharmCard";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.cream,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: "center",
  },
  topEdge: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    height: 4,
    backgroundColor: Colors.gold,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    opacity: 0.6,
  },
  iconContainer: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconBackground: {
    position: "absolute",
    zIndex: 2,
  },
  iconDecoration: {
    position: "absolute",
    opacity: 0.3,
    zIndex: 1,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  charmText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.espresso,
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 0.3,
  },
  brandingContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    width: "100%",
    alignItems: "center",
  },
  brandingText: {
    fontSize: 14,
    color: Colors.mocha,
    fontWeight: "600",
    letterSpacing: 1,
  },
  bottomEdge: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: 4,
    backgroundColor: Colors.gold,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    opacity: 0.6,
  },
});
