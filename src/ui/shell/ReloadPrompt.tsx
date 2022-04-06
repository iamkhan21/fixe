import { useRegisterSW } from "virtual:pwa-register/react";
import { useEffect } from "react";
import { useModals } from "@mantine/modals";

function ReloadPrompt() {
  const modals = useModals();

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  function close() {
    setNeedRefresh(false);
  }

  function reloadApp() {
    updateServiceWorker(true);
  }

  useEffect(() => {
    if (needRefresh) {
      modals.openConfirmModal({
        title: "App update",
        centered: true,
        children: (
          <p>Newest version available, click on reload button to update.</p>
        ),
        labels: { confirm: "Reload", cancel: "Cancel" },
        onCancel: close,
        onConfirm: reloadApp,
      });
    }
  }, [needRefresh]);

  return null;
}

export default ReloadPrompt;
