import { useEffect, useState, useSyncExternalStore } from 'react';

const API_URL = '/api/state';
const LOCAL_PREFIX = 'kas_bap_';
const SAVE_DEBOUNCE_MS = 800;
const POLL_INTERVAL_MS = 15000;

const setters = new Map();
const lastSynced = new Map();
const pending = new Map();
const statusListeners = new Set();

let status = { state: 'loading', lastSavedAt: null };
let initialPullDone = false;
let saveTimer = null;
let inFlight = false;

function setStatus(next) {
  status = { ...status, ...next };
  statusListeners.forEach((listener) => listener());
}

function readLocal(key, fallback) {
  try {
    const saved = localStorage.getItem(LOCAL_PREFIX + key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(LOCAL_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

function scheduleFlush(delay = SAVE_DEBOUNCE_MS) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, delay);
}

async function flush() {
  if (!initialPullDone || inFlight || pending.size === 0) return;
  inFlight = true;
  const batch = new Map(pending);
  pending.clear();
  setStatus({ state: 'saving' });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: Object.fromEntries(batch) })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    batch.forEach((value, key) => lastSynced.set(key, JSON.stringify(value)));
    setStatus({ state: pending.size ? 'saving' : 'saved', lastSavedAt: new Date() });
  } catch (error) {
    console.error('Autosave ke cloud gagal:', error);
    batch.forEach((value, key) => {
      if (!pending.has(key)) pending.set(key, value);
    });
    setStatus({ state: 'offline' });
    scheduleFlush(5000);
  } finally {
    inFlight = false;
    if (pending.size && status.state !== 'offline') scheduleFlush();
  }
}

function queueSave(key, value) {
  if (lastSynced.get(key) === JSON.stringify(value)) {
    pending.delete(key);
    return;
  }
  pending.set(key, value);
  if (initialPullDone) {
    setStatus({ state: 'saving' });
    scheduleFlush();
  }
}

async function pull({ initial = false } = {}) {
  if (!initial && (pending.size || inFlight)) return;
  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { items = {} } = await response.json();

    for (const [key, { value }] of Object.entries(items)) {
      const json = JSON.stringify(value);
      if (!initial && pending.has(key)) continue;
      pending.delete(key);
      if (lastSynced.get(key) === json) continue;
      lastSynced.set(key, json);
      writeLocal(key, value);
      setters.get(key)?.(value);
    }

    if (initial) {
      initialPullDone = true;
      setStatus({ state: pending.size ? 'saving' : 'saved' });
      if (pending.size) flush();
    } else if (status.state === 'offline') {
      setStatus({ state: 'saved' });
      if (pending.size) flush();
    }
  } catch (error) {
    console.error('Gagal memuat data dari cloud:', error);
    if (initial) setTimeout(() => pull({ initial: true }), 5000);
    setStatus({ state: 'offline' });
  }
}

function flushOnExit() {
  if (!initialPullDone || pending.size === 0) return;
  const body = new Blob([JSON.stringify({ items: Object.fromEntries(pending) })], { type: 'application/json' });
  if (navigator.sendBeacon?.(API_URL, body)) pending.clear();
}

let started = false;
export function startCloudSync() {
  if (started || typeof window === 'undefined') return;
  started = true;
  pull({ initial: true });
  setInterval(() => {
    if (document.visibilityState === 'visible' && initialPullDone) pull();
  }, POLL_INTERVAL_MS);
  window.addEventListener('focus', () => initialPullDone && pull());
  window.addEventListener('online', () => (initialPullDone ? flush() : pull({ initial: true })));
  window.addEventListener('pagehide', flushOnExit);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushOnExit();
  });
}

export function useCloudState(key, fallback) {
  const [value, setValue] = useState(() => readLocal(key, fallback));

  useEffect(() => {
    setters.set(key, setValue);
    return () => setters.delete(key);
  }, [key]);

  useEffect(() => {
    writeLocal(key, value);
    queueSave(key, value);
  }, [key, value]);

  return [value, setValue];
}

export function useSessionState(key, fallback) {
  const storageKey = `${LOCAL_PREFIX}session_${key}`;
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      if (value === null || value === undefined) localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [storageKey, value]);

  return [value, setValue];
}

export function useSyncStatus() {
  return useSyncExternalStore(
    (listener) => {
      statusListeners.add(listener);
      return () => statusListeners.delete(listener);
    },
    () => status
  );
}
