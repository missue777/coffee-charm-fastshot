import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  DAILY_CHARM: "daily_charm",
  CHARM_DATE: "charm_date",
  CHARM_REVEALED: "charm_revealed",
  NOTIFICATIONS_ENABLED: "notifications_enabled",
  NOTIFICATION_TIME: "notification_time",
  CHARM_HISTORY: "charm_history",
};

export interface CharmData {
  id: number;
  text: string;
  icon: string;
}

export interface HistoryItem {
  date: string;
  charm: CharmData;
}

// Get today's date as a string (YYYY-MM-DD)
export const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Save today's charm
export const saveDailyCharm = async (charm: CharmData): Promise<void> => {
  try {
    const today = getTodayString();
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_CHARM, JSON.stringify(charm));
    await AsyncStorage.setItem(STORAGE_KEYS.CHARM_DATE, today);
    await AsyncStorage.setItem(STORAGE_KEYS.CHARM_REVEALED, "true");

    // Add to history
    const history = await getCharmHistory();
    const historyItem: HistoryItem = { date: today, charm };

    // Check if today's charm already exists in history
    const existingIndex = history.findIndex((item) => item.date === today);
    if (existingIndex >= 0) {
      history[existingIndex] = historyItem;
    } else {
      history.unshift(historyItem);
    }

    // Keep only last 30 days
    const trimmedHistory = history.slice(0, 30);
    await AsyncStorage.setItem(
      STORAGE_KEYS.CHARM_HISTORY,
      JSON.stringify(trimmedHistory)
    );
  } catch (error) {
    console.error("Error saving daily charm:", error);
  }
};

// Get today's charm (if any)
export const getDailyCharm = async (): Promise<CharmData | null> => {
  try {
    const savedDate = await AsyncStorage.getItem(STORAGE_KEYS.CHARM_DATE);
    const today = getTodayString();

    if (savedDate !== today) {
      // Reset for new day
      await AsyncStorage.setItem(STORAGE_KEYS.CHARM_REVEALED, "false");
      return null;
    }

    const charmStr = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_CHARM);
    if (charmStr) {
      return JSON.parse(charmStr) as CharmData;
    }
    return null;
  } catch (error) {
    console.error("Error getting daily charm:", error);
    return null;
  }
};

// Check if charm has been revealed today
export const hasRevealedToday = async (): Promise<boolean> => {
  try {
    const savedDate = await AsyncStorage.getItem(STORAGE_KEYS.CHARM_DATE);
    const today = getTodayString();

    if (savedDate !== today) {
      return false;
    }

    const revealed = await AsyncStorage.getItem(STORAGE_KEYS.CHARM_REVEALED);
    return revealed === "true";
  } catch (error) {
    console.error("Error checking revealed status:", error);
    return false;
  }
};

// Get charm history
export const getCharmHistory = async (): Promise<HistoryItem[]> => {
  try {
    const historyStr = await AsyncStorage.getItem(STORAGE_KEYS.CHARM_HISTORY);
    if (historyStr) {
      return JSON.parse(historyStr) as HistoryItem[];
    }
    return [];
  } catch (error) {
    console.error("Error getting charm history:", error);
    return [];
  }
};

// Notification settings
export const getNotificationsEnabled = async (): Promise<boolean> => {
  try {
    const enabled = await AsyncStorage.getItem(
      STORAGE_KEYS.NOTIFICATIONS_ENABLED
    );
    return enabled === null ? true : enabled === "true"; // Default to true
  } catch (error) {
    console.error("Error getting notification status:", error);
    return true;
  }
};

export const setNotificationsEnabled = async (
  enabled: boolean
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS_ENABLED,
      enabled.toString()
    );
  } catch (error) {
    console.error("Error saving notification status:", error);
  }
};

export const getNotificationTime = async (): Promise<{
  hours: number;
  minutes: number;
}> => {
  try {
    const timeStr = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_TIME);
    if (timeStr) {
      return JSON.parse(timeStr);
    }
    return { hours: 10, minutes: 0 }; // Default 10:00 AM
  } catch (error) {
    console.error("Error getting notification time:", error);
    return { hours: 10, minutes: 0 };
  }
};

export const setNotificationTime = async (
  hours: number,
  minutes: number
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.NOTIFICATION_TIME,
      JSON.stringify({ hours, minutes })
    );
  } catch (error) {
    console.error("Error saving notification time:", error);
  }
};
