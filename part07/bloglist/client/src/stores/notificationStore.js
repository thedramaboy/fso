import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: null,

  setNotification: (text, type, duration = 5000) => {
    set({ notification: { text, type } });
    setTimeout(() => set({ notification: null }), duration);
  },

  clearNotification: () => set({ notification: null }),
}));

export default useNotificationStore;
