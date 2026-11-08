import React from 'react';
import { Cloud, CloudOff, Loader2, CheckCircle2 } from 'lucide-react';
import { useSyncStatus } from './cloudSync';

const VARIANTS = {
  loading: { label: 'Memuat data...', Icon: Loader2, spin: true, className: 'text-emerald-100 border-emerald-600/50' },
  saving: { label: 'Menyimpan...', Icon: Loader2, spin: true, className: 'text-amber-200 border-amber-400/40' },
  saved: { label: 'Tersimpan di cloud', Icon: CheckCircle2, spin: false, className: 'text-emerald-100 border-emerald-500/50' },
  offline: { label: 'Offline - tersimpan lokal', Icon: CloudOff, spin: false, className: 'text-rose-200 border-rose-400/50' }
};

export default function SyncStatusBadge() {
  const { state, lastSavedAt } = useSyncStatus();
  const { label, Icon, spin, className } = VARIANTS[state] ?? VARIANTS.loading;
  const title = lastSavedAt
    ? `Terakhir disimpan ${lastSavedAt.toLocaleTimeString('id-ID')}`
    : 'Data otomatis disimpan ke cloud';

  return (
    <div
      role="status"
      aria-live="polite"
      title={title}
      className={`flex items-center gap-1.5 rounded-full border bg-emerald-950/60 px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      {state === 'saved' ? <Cloud className="h-3.5 w-3.5" aria-hidden="true" /> : <Icon className={`h-3.5 w-3.5 ${spin ? 'animate-spin' : ''}`} aria-hidden="true" />}
      <span className="hidden md:inline">{label}</span>
      <span className="sr-only md:hidden">{label}</span>
    </div>
  );
}
