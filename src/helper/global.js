export default {
  getDate() {
    return new Date();
  },
  storageSave(name, items) {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(items));
    }
  },
  storageGet(name) {
    if (typeof window !== "undefined") {
      let items = localStorage.getItem(name);
      if (items) {
        items = JSON.parse(items);
      } else {
        items = false;
      }
      return items;
    }
  },
  storageRemove(name) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  },
  /*************************************************/
  /**************** Local Storage *******************/
  sessionSave(key, items) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(items));
    }
  },
  sessionGet(key) {
    if (typeof window !== "undefined") {
      let items = sessionStorage.getItem(key);
      if (items) {
        items = JSON.parse(items);
      } else {
        items = false;
      }
      return items;
    }
  },
  sessionRemove(key) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key);
    }
  },
};
