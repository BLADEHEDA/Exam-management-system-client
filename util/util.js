 export const toggleToast = (setShowToast) => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
      };