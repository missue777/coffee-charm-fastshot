import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";

import { Colors } from "../../constants/colors";
import {
  getNotificationsEnabled,
  getNotificationTime,
} from "../../utils/storage";
import {
  updateNotificationSettings,
  requestNotificationPermissions,
  areNotificationsGranted,
} from "../../utils/notifications";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(true);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);

    // Check permission status
    const granted = await areNotificationsGranted();
    setPermissionGranted(granted);

    // Load saved settings
    const enabled = await getNotificationsEnabled();
    const time = await getNotificationTime();

    setNotificationsEnabled(enabled && granted);

    // Create a date object for the time picker
    const timeDate = new Date();
    timeDate.setHours(time.hours, time.minutes, 0, 0);
    setNotificationTime(timeDate);

    setIsLoading(false);
  };

  const handleToggleNotifications = async (value: boolean) => {
    if (value && !permissionGranted) {
      // Request permissions first
      const granted = await requestNotificationPermissions();
      if (!granted) {
        Alert.alert(
          "Разрешение е необходимо",
          "За да получаваш напомняния, трябва да разрешиш известията в настройките на устройството.",
          [
            { text: "Отказ", style: "cancel" },
            {
              text: "Настройки",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        return;
      }
      setPermissionGranted(true);
    }

    setNotificationsEnabled(value);

    const hours = notificationTime.getHours();
    const minutes = notificationTime.getMinutes();

    await updateNotificationSettings(value, hours, minutes);
  };

  const handleTimeChange = async (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }

    if (event.type === "set" && selectedTime) {
      setNotificationTime(selectedTime);

      if (notificationsEnabled) {
        const hours = selectedTime.getHours();
        const minutes = selectedTime.getMinutes();
        await updateNotificationSettings(true, hours, minutes);
      }
    }
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const handlePrivacyPolicy = () => {
    // Open privacy policy URL (placeholder)
    Linking.openURL("https://example.com/privacy");
  };

  const appVersion = Constants.expoConfig?.version || "1.0";

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Настройки</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Зареждане...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Настройки</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Известия</Text>

          <View style={styles.card}>
            {/* Enable notifications toggle */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={Colors.espresso}
                  style={styles.settingIcon}
                />
                <Text style={styles.settingLabel}>Ежедневно напомняне</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{
                  false: Colors.cardBorder,
                  true: `${Colors.toggleActive}80`,
                }}
                thumbColor={
                  notificationsEnabled ? Colors.toggleActive : Colors.mocha
                }
                ios_backgroundColor={Colors.cardBorder}
              />
            </View>

            {/* Time picker */}
            {notificationsEnabled && (
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons
                    name="time-outline"
                    size={22}
                    color={Colors.espresso}
                    style={styles.settingIcon}
                  />
                  <Text style={styles.settingLabel}>Час</Text>
                </View>
                {Platform.OS === "ios" ? (
                  <DateTimePicker
                    value={notificationTime}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                    style={styles.timePicker}
                    accentColor={Colors.coral}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => setShowTimePicker(true)}
                    >
                      <Text style={styles.timeButtonText}>
                        {formatTime(notificationTime)}
                      </Text>
                      <Ionicons
                        name="chevron-down"
                        size={16}
                        color={Colors.mocha}
                      />
                    </TouchableOpacity>
                    {showTimePicker && (
                      <DateTimePicker
                        value={notificationTime}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                      />
                    )}
                  </>
                )}
              </View>
            )}

            {!permissionGranted && (
              <Text style={styles.permissionWarning}>
                Известията са изключени в настройките на устройството
              </Text>
            )}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>За приложението</Text>

          <View style={styles.card}>
            {/* Version */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color={Colors.espresso}
                  style={styles.settingIcon}
                />
                <Text style={styles.settingLabel}>Версия</Text>
              </View>
              <Text style={styles.settingValue}>{appVersion}</Text>
            </View>

            {/* Privacy Policy */}
            <TouchableOpacity
              style={[styles.settingRow, styles.lastRow]}
              onPress={handlePrivacyPolicy}
              activeOpacity={0.7}
            >
              <View style={styles.settingInfo}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={22}
                  color={Colors.espresso}
                  style={styles.settingIcon}
                />
                <Text style={[styles.settingLabel, styles.linkText]}>
                  Политика за поверителност
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.mocha}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* App info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Късметче</Text>
          <Text style={styles.appInfoSubtext}>Твоят дневен късмет</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: Colors.espresso,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.white,
    letterSpacing: 0.5,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.espresso,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.espresso,
  },
  settingValue: {
    fontSize: 16,
    color: Colors.mocha,
  },
  linkText: {
    color: Colors.coral,
  },
  timePicker: {
    width: 100,
  },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 6,
  },
  timeButtonText: {
    fontSize: 15,
    color: Colors.espresso,
    fontWeight: "500",
  },
  permissionWarning: {
    fontSize: 13,
    color: Colors.coral,
    paddingHorizontal: 16,
    paddingBottom: 12,
    fontStyle: "italic",
  },
  appInfo: {
    alignItems: "center",
    paddingVertical: 30,
  },
  appInfoText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.mocha,
    letterSpacing: 1,
  },
  appInfoSubtext: {
    fontSize: 13,
    color: Colors.mocha,
    marginTop: 4,
    opacity: 0.7,
  },
});
