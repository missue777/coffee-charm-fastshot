import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  FadeIn,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "../../constants/colors";
import { CoffeeCup } from "../../components/CoffeeCup";
import { CharmCard } from "../../components/CharmCard";
import { getCharmForDate } from "../../constants/charms";
import {
  getDailyCharm,
  saveDailyCharm,
  hasRevealedToday,
  CharmData,
} from "../../utils/storage";

export default function HomeScreen() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [charm, setCharm] = useState<CharmData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const cardRef = useRef<View>(null);

  // Animation values
  const cupScale = useSharedValue(1);
  const cupTranslateY = useSharedValue(0);
  const cupOpacity = useSharedValue(1);
  const cardScale = useSharedValue(0.8);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(50);

  const loadDailyCharm = useCallback(async () => {
    setIsLoading(true);
    const revealed = await hasRevealedToday();
    const savedCharm = await getDailyCharm();

    if (revealed && savedCharm) {
      setCharm(savedCharm);
      setIsRevealed(true);
      // Set card visible immediately for already revealed charms
      cardScale.value = 1;
      cardOpacity.value = 1;
      cardTranslateY.value = 0;
      cupOpacity.value = 0;
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load saved charm on mount
  useEffect(() => {
    loadDailyCharm();
  }, [loadDailyCharm]);

  const handleReveal = useCallback(async () => {
    if (isAnimating || isRevealed) return;

    setIsAnimating(true);

    // Haptic feedback
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // Get today's charm
    const todayCharm = getCharmForDate(new Date());
    setCharm(todayCharm);

    // Save the charm
    await saveDailyCharm(todayCharm);

    // Animate cup lifting and fading
    cupScale.value = withSequence(
      withSpring(1.05, { damping: 10, stiffness: 200 }),
      withSpring(0.9, { damping: 15, stiffness: 150 })
    );

    cupTranslateY.value = withTiming(-30, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });

    cupOpacity.value = withDelay(
      300,
      withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      })
    );

    // Animate card appearing
    cardOpacity.value = withDelay(
      500,
      withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      })
    );

    cardScale.value = withDelay(
      500,
      withSpring(1, {
        damping: 12,
        stiffness: 100,
      })
    );

    cardTranslateY.value = withDelay(
      500,
      withSpring(0, {
        damping: 15,
        stiffness: 120,
      })
    );

    // Success haptic after reveal
    setTimeout(() => {
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setIsRevealed(true);
      setIsAnimating(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, isRevealed]);

  const handleShare = async () => {
    if (!charm || !cardRef.current) return;

    try {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      // Capture the card as an image
      const uri = await captureRef(cardRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: "Сподели своето късметче",
        });
      } else {
        // Fallback to native Share API
        await Share.share({
          message: `${charm.text}\n\n- Късметче за деня`,
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert("Грешка", "Неуспешно споделяне. Моля, опитайте отново.");
    }
  };

  // Animated styles
  const cupAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: cupScale.value },
      { translateY: cupTranslateY.value },
    ],
    opacity: cupOpacity.value,
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: cardScale.value },
      { translateY: cardTranslateY.value },
    ],
    opacity: cardOpacity.value,
  }));

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Зареждане...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Background decorations */}
      <View style={styles.backgroundDecoration1} />
      <View style={styles.backgroundDecoration2} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Късметче</Text>
        <Text style={styles.headerSubtitle}>за деня</Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Coffee cup (shown when not revealed) */}
        {!isRevealed && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleReveal}
            disabled={isAnimating}
          >
            <Animated.View style={[styles.cupContainer, cupAnimatedStyle]}>
              <CoffeeCup size={220} />
            </Animated.View>
          </TouchableOpacity>
        )}

        {/* Reveal prompt */}
        {!isRevealed && (
          <TouchableOpacity
            style={styles.promptContainer}
            onPress={handleReveal}
            activeOpacity={0.8}
            disabled={isAnimating}
          >
            <Text style={styles.promptText}>
              {isAnimating ? "Разкриваме..." : "Докосни за късмета си днес"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Charm card (shown when revealed) */}
        {charm && (
          <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
            <View ref={cardRef} collapsable={false}>
              <CharmCard charm={charm} showAppBranding />
            </View>

            {/* Action buttons */}
            {isRevealed && (
              <Animated.View
                entering={FadeIn.delay(300).duration(400)}
                style={styles.actionsContainer}
              >
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={handleShare}
                  activeOpacity={0.8}
                >
                  <Ionicons name="share-outline" size={20} color={Colors.white} />
                  <Text style={styles.shareButtonText}>Сподели</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </Animated.View>
        )}
      </View>

      {/* Footer text */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Късметче за деня</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: Colors.mocha,
  },
  backgroundDecoration1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.backgroundDark,
    opacity: 0.5,
  },
  backgroundDecoration2: {
    position: "absolute",
    bottom: -50,
    left: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: Colors.backgroundDark,
    opacity: 0.3,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.espresso,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.mocha,
    marginTop: 4,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cupContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  promptContainer: {
    backgroundColor: Colors.cream,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.latte,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  promptText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.espresso,
    textAlign: "center",
  },
  cardContainer: {
    alignItems: "center",
  },
  actionsContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 15,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.coral,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: Colors.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: Colors.mocha,
    letterSpacing: 1,
  },
});
