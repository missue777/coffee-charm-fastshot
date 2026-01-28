import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import {
  getNotificationsEnabled,
  getNotificationTime,
  setNotificationsEnabled,
  setNotificationTime,
} from "./storage";

const NOTIFICATION_ID = "daily-charm-reminder";

// Messages for daily notifications (in Bulgarian)
const NOTIFICATION_MESSAGES = [
  {
    title: "Късметче за деня",
    body: "Чашата кафе те чака! Разкрий късмета си за днес.",
  },
  {
    title: "Добро утро!",
    body: "Ново късметче те очаква. Ела да го разкриеш!",
  },
  {
    title: "Време е за късмет!",
    body: "Твоето дневно късметче е готово. Докосни да видиш.",
  },
  {
    title: "Късметче",
    body: "Какво ще ти каже вселената днес? Разкрий късмета си!",
  },
  {
    title: "Твоят късмет те чака",
    body: "Нов ден, ново късметче. Ела да го откриеш!",
  },
];

// Get a random notification message
const getRandomMessage = () => {
  const index = Math.floor(Math.random() * NOTIFICATION_MESSAGES.length);
  return NOTIFICATION_MESSAGES[index];
};

// Schedule the daily notification
export const scheduleDailyNotification = async (
  hours: number,
  minutes: number
): Promise<void> => {
  if (Platform.OS === "web") return;

  try {
    // Cancel any existing notifications first
    await cancelAllNotifications();

    const message = getRandomMessage();

    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: message.title,
        body: message.body,
        sound: true,
        badge: 1,
        data: { screen: "home" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hours,
        minute: minutes,
      },
      identifier: NOTIFICATION_ID,
    });

    console.log(`Daily notification scheduled for ${hours}:${minutes.toString().padStart(2, "0")}`);
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
};

// Cancel all scheduled notifications
export const cancelAllNotifications = async (): Promise<void> => {
  if (Platform.OS === "web") return;

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error("Error canceling notifications:", error);
  }
};

// Initialize notifications based on saved settings
export const initializeNotifications = async (): Promise<void> => {
  if (Platform.OS === "web") return;

  const enabled = await getNotificationsEnabled();
  if (enabled) {
    const time = await getNotificationTime();
    await scheduleDailyNotification(time.hours, time.minutes);
  }
};

// Update notification settings
export const updateNotificationSettings = async (
  enabled: boolean,
  hours?: number,
  minutes?: number
): Promise<void> => {
  await setNotificationsEnabled(enabled);

  if (enabled && hours !== undefined && minutes !== undefined) {
    await setNotificationTime(hours, minutes);
    await scheduleDailyNotification(hours, minutes);
  } else if (!enabled) {
    await cancelAllNotifications();
  }
};

// Request notification permissions
export const requestNotificationPermissions = async (): Promise<boolean> => {
  if (Platform.OS === "web") return false;

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === "granted";
  } catch (error) {
    console.error("Error requesting notification permissions:", error);
    return false;
  }
};

// Check if notifications are granted
export const areNotificationsGranted = async (): Promise<boolean> => {
  if (Platform.OS === "web") return false;

  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status === "granted";
  } catch (error) {
    console.error("Error checking notification permissions:", error);
    return false;
  }
};
