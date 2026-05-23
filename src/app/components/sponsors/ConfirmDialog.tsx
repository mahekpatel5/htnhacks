import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  destructive = true,
  onConfirm,
  onClose,
}: {
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") { onConfirm(); onClose(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onConfirm]);

  const confirmCls = destructive
    ? "bg-red-600 hover:bg-red-700 text-white"
    : "bg-[#43afde] hover:bg-[#3a9bc4] text-white";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onClose}>
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ type: "spring", stiffness: 420, damping: 38 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-start gap-3">
            {destructive && (
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-gray-900">{title}</h2>
              <div className="text-sm text-gray-600 mt-1.5 leading-relaxed">{message}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-6 py-3 mt-2 bg-gray-50 border-t border-gray-100">
          <button onClick={onClose}
            className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            {cancelLabel}
          </button>
          <button onClick={() => { onConfirm(); onClose(); }}
            className={"px-4 py-1.5 text-sm font-medium rounded-lg transition-colors shadow-sm " + confirmCls}>
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
