// Experimental (unstable) : check for api support...
class Check {
  // Check for share...
  async Share() {
    try {
      // Check for share...
      return "share" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for clipboard...
  async Clipboard() {
    try {
      // Check for clipboard...
      return "clipboard" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for copy text...
  async copyText() {
    try {
      return (await this.Clipboard()) ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check copy image...
  async copyImage() {
    try {
      return (await this.Clipboard()) ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for idle detection...
  async idleDetection() {
    try {
      // Check for idle detection...
      return "IdleDetector" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for wakelock...
  async wakeLock() {
    try {
      // Check for wakelock...
      return "wakeLock" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for contacts...
  async Contacts() {
    try {
      // Check for contacts...
      return "contacts" in navigator && "ContactsManager" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Badging api support...
  async Badging() {
    try {
      // Check for Badging support...
      return "setAppBadge" in navigator && "clearAppBadge" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for notifications...
  async Notifications() {
    try {
      // Check for notifications...
      return "Notification" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // If the browser supports the Notification API, check if the user has granted permission to display notifications...
  async notificationPermission() {
    try {
      // If the browser supports the Notification API, check if the user has granted permission to display notifications...
      if (await this.Notifications()) {
        // Check if the user has granted permission to display notifications...
        return Notification.permission === "granted" ? true : false;
      } else {
        // Return false if the browser doesn't support the Notification API...
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  // Check for geolocation...
  async Geolocation() {
    try {
      // Check for geolocation...
      return "geolocation" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }
}

export default Check;
