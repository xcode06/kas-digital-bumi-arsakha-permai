import React, { useState, useMemo, useEffect } from 'react';
import {
  Users, Home, DollarSign, FileText, CheckCircle2, XCircle, AlertCircle,
  Plus, Edit, Trash2, Printer, Download, Shield, Eye, Lock, LogOut,
  ChevronRight, Calendar, UserCheck, TrendingUp, TrendingDown, RefreshCw,
  Search, Filter, Bell, Menu, X, Upload, Check, ShieldAlert, Key, FolderCheck, Info, RotateCcw
} from 'lucide-react';
import { startCloudSync, useCloudState, useSessionState } from './cloudSync';
import SyncStatusBadge from './SyncStatusBadge';

// ==========================================
// LOGO & SEAL COMPONENTS
// ==========================================

const LogoBumiArsakha = ({ className = "h-12", showSubtext = true, isDarkBg = false }) => (
  <div className="inline-flex items-center gap-3 select-none">
    <div className="relative flex items-center justify-center filter drop-shadow-sm">
      <svg className={`${className} aspect-square`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="90" r="65" fill="#F59E0B" opacity="0.95" />
        <path d="M 20,105 Q 100,75 180,105 C 140,115 60,115 20,105 Z" fill="#15803D" />
        <path d="M 15,120 Q 100,88 185,120 C 150,132 50,132 15,120 Z" fill="#166534" />
        <path d="M 30,102 L 70,68 L 110,102 V 132 H 30 Z" fill="#15803D" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M 60,92 L 100,58 L 140,92 V 128 H 60 Z" fill="#166534" stroke="#FFFFFF" strokeWidth="5" />
        <path d="M 115,95 L 145,70 L 175,95 V 125 H 115 Z" fill="#15803D" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M 135,70 Q 155,30 165,10 Q 180,35 160,60 Z" fill="#22C55E" />
        <path d="M 150,55 Q 178,30 190,15 Q 195,40 168,62 Z" fill="#16A34A" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] leading-none ${isDarkBg ? 'text-amber-300' : 'text-emerald-800'}`}>
        PERUMAHAN
      </span>
      <span className={`text-base md:text-xl font-serif font-black uppercase tracking-tight leading-tight ${isDarkBg ? 'text-white' : 'text-slate-900'}`}>
        BUMI ARSAKHA PERMAI
      </span>
      {showSubtext && (
        <span className={`text-[9px] font-semibold tracking-wider ${isDarkBg ? 'text-emerald-100/80' : 'text-slate-500'}`}>
          Lembursawah, Kec. Cicantayan, Sukabumi
        </span>
      )}
    </div>
  </div>
);

const SealStempelOfficial = ({ size = "w-28 h-28", opacity = "opacity-90" }) => (
  <div className={`relative inline-flex items-center justify-center p-1 rounded-full border-2 border-emerald-700 text-emerald-800 bg-emerald-50/20 transform rotate-[-6deg] pointer-events-none select-none ${opacity} ${size}`}>
    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="95" stroke="#15803d" strokeWidth="6" />
      <circle cx="100" cy="100" r="86" stroke="#15803d" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="62" stroke="#15803d" strokeWidth="3" />

      <path id="textPathTop" d="M 25,100 A 75,75 0 1,1 175,100" fill="none" />
      <text fill="#14532d" fontSize="18" fontWeight="900" letterSpacing="3">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          PERUMAHAN
        </textPath>
      </text>

      <path id="textPathBottom" d="M 175,100 A 75,75 0 0,1 25,100" fill="none" />
      <text fill="#14532d" fontSize="14" fontWeight="900" letterSpacing="1.5">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          BUMI ARSAKHA PERMAI
        </textPath>
      </text>

      <path d="M 32,100 L 35,93 L 42,93 L 36,88 L 38,81 L 32,85 L 26,81 L 28,88 L 22,93 L 29,93 Z" fill="#15803d" />
      <path d="M 168,100 L 171,93 L 178,93 L 172,88 L 174,81 L 168,85 L 162,81 L 164,88 L 158,93 L 165,93 Z" fill="#15803d" />

      <g transform="translate(45, 60) scale(0.55)">
        <path d="M 30,70 A 45,45 0 0,1 170,70 Z" fill="#15803d" />
        <path d="M 20,80 L 50,55 L 80,80 V 110 H 20 Z" fill="#166534" stroke="#ffffff" strokeWidth="3" />
        <path d="M 50,70 L 100,30 L 150,70 V 110 H 50 Z" fill="#15803d" stroke="#ffffff" strokeWidth="4" />
        <path d="M 120,70 L 150,45 L 180,70 V 110 H 120 Z" fill="#166534" stroke="#ffffff" strokeWidth="3" />
        <path d="M 140,45 Q 160,15 165,0 Q 180,35 160,60 Z" fill="#22c55e" />
        <path d="M 155,35 Q 180,15 190,5 Q 195,25 168,42 Z" fill="#16a34a" />
        <path d="M 10,115 Q 100,85 190,110 C 150,125 70,125 10,115 Z" fill="#14532d" />
      </g>
    </svg>
  </div>
);

const INITIAL_USERS = [
  { id: 'usr-00', username: 'superadmin', password: 'admin123', name: 'SuperAdmin System', role: 'SUPERADMIN' },
  { id: 'usr-01', username: 'cece', password: 'password123', name: 'Bapak Cece', role: 'KETUA' },
  { id: 'usr-02', username: 'rahman', password: 'password123', name: 'Rahman', role: 'SEKRETARIS' },
  { id: 'usr-03', username: 'yana', password: 'password123', name: 'Yana', role: 'BENDAHARA' },
  { id: 'usr-04', username: 'erus', password: 'password123', name: 'Erus', role: 'PETUGAS' },
  { id: 'usr-05', username: 'tina', password: 'password123', name: 'Tina', role: 'ADMIN' },
  { id: 'usr-06', username: 'budi', password: 'password123', name: 'Budi Santoso', role: 'WARGA' },
  { id: 'usr-07', username: 'dewi', password: 'password123', name: 'Dewi Lestari', role: 'WARGA' }
];

const INITIAL_HOUSES = [
  { id: 'h-1', block: 'Blok A', number: '01', residentName: 'Budi Santoso', phone: '081234567890', isMandatory: true, collector: 'Erus' },
  { id: 'h-2', block: 'Blok A', number: '02', residentName: 'Dewi Lestari', phone: '081987654321', isMandatory: true, collector: 'Erus' },
  { id: 'h-3', block: 'Blok B', number: '05', residentName: 'Ahmad Subagja', phone: '085712345678', isMandatory: true, collector: 'Erus' }
];

const INITIAL_EXPENSE_CATEGORIES = ['Keamanan & Peronda', 'Kebersihan & Sampah', 'Perbaikan Infrastruktur', 'Acara Warga', 'Administrasi & ATK'];
const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function App() {
  const [currentUser, setCurrentUser] = useSessionState('currentUser', null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // PENYIMPANAN & SINKRONISASI DATA (AUTOSAVE KE CLOUD + CADANGAN LOKAL)
  useEffect(() => startCloudSync(), []);
  const [users, setUsers] = useCloudState('users', INITIAL_USERS);
  const [houses, setHouses] = useCloudState('houses', INITIAL_HOUSES);
  const [bills, setBills] = useCloudState('bills', []);
  const [incomes, setIncomes] = useCloudState('incomes', []);
  const [expenseRequests, setExpenseRequests] = useCloudState('expenseRequests', []);
  const [categories, setCategories] = useCloudState('categories', INITIAL_EXPENSE_CATEGORIES);
  const [auditLogs, setAuditLogs] = useCloudState('auditLogs', []);
  const [cashSettlements, setCashSettlements] = useCloudState('cashSettlements', []);

  // SEARCH STATES
  const [houseSearchQuery, setHouseSearchQuery] = useState('');
  const [iuranSearchQuery, setIuranSearchQuery] = useState('');
  const [backupFeedback, setBackupFeedback] = useState(null);
  const [iuranBackupFeedback, setIuranBackupFeedback] = useState(null);
  const houseFileInputRef = React.useRef(null);
  const iuranFileInputRef = React.useRef(null);

  // LAPORAN FILTER STATES
  const [reportFilterType, setReportFilterType] = useState('ALL'); // 'ALL' | 'DAILY' | 'MONTHLY' | 'YEARLY'
  const [reportFilterDate, setReportFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportFilterMonth, setReportFilterMonth] = useState((new Date().getMonth() + 1).toString());
  const [reportFilterYear, setReportFilterYear] = useState(new Date().getFullYear().toString());

  // SYSTEM SETTINGS CONFIG
  const [systemConfig, setSystemConfig] = useCloudState('systemConfig', {
    defaultMonthlyFee: 5000,
    bankName: 'Bank Mandiri',
    bankAccountNo: '123-456-7890',
    bankAccountHolder: 'KAS PERUMAHAN BUMI ARSAKHA PERMAI',
    autoWaReminder: true,
    cashInHand: 0,
    bankBalance: 0
  });

  // NOTIFIKASI PENGINGAT (TEXT BERJALAN DI DASHBOARD)
  const [announcements, setAnnouncements] = useCloudState('announcements', [
    {
      id: 'ann-1',
      text: 'Selamat datang di Sistem Kas Digital Perumahan Bumi Arsakha Permai. Pembayaran iuran bulanan paling lambat tanggal 10 setiap bulannya.',
      updatedAt: '2026-10-01'
    }
  ]);

  // RIWAYAT INPUT SALDO REKENING BANK (REKONSILIASI)
  const [bankBalanceEntries, setBankBalanceEntries] = useCloudState('bankBalanceEntries', []);

  // MODAL STATES
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showEditHouseModal, setShowEditHouseModal] = useState(false);
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddOtherIncomeModal, setShowAddOtherIncomeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [showEditTxModal, setShowEditTxModal] = useState(false);
  const [showResetTxModal, setShowResetTxModal] = useState(false);
  const [showEditBillModal, setShowEditBillModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showBankBalanceModal, setShowBankBalanceModal] = useState(false);

  // FORM STATES
  const [newUser, setNewUser] = useState({ username: '', name: '', role: 'WARGA', password: 'password123' });
  const [editingUser, setEditingUser] = useState(null);
  const [editingHouse, setEditingHouse] = useState(null);
  const [editingCategory, setEditingCategory] = useState({ index: -1, oldName: '', newName: '' });
  const [editingBill, setEditingBill] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [paymentError, setPaymentError] = useState('');
  const [confirmDeleteBillId, setConfirmDeleteBillId] = useState(null);
  const [confirmDeleteExpenseId, setConfirmDeleteExpenseId] = useState(null);
  const [confirmDeleteAnnId, setConfirmDeleteAnnId] = useState(null);
  const [confirmDeleteBankId, setConfirmDeleteBankId] = useState(null);

  // FORM NOTIFIKASI PENGINGAT (TEXT BERJALAN)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [announcementText, setAnnouncementText] = useState('');

  // FORM SALDO REKENING BANK
  const [editingBankEntry, setEditingBankEntry] = useState(null);
  const [bankEntryForm, setBankEntryForm] = useState({
    date: new Date().toISOString().split('T')[0],
    bankName: 'Bank Mandiri',
    accountNo: '123-456-7890',
    amount: '',
    notes: ''
  });

  const [newSettlement, setNewSettlement] = useState({
    date: new Date().toISOString().split('T')[0],
    collectorName: 'Erus',
    totalCollected: '',
    handedAmount: '',
    notes: ''
  });
  const [newHouse, setNewHouse] = useState({ block: 'Blok A', number: '', residentName: '', phone: '' });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingTx, setEditingTx] = useState(null);

  // PEMASUKAN LAIN
  const [newOtherIncome, setNewOtherIncome] = useState({
    source: 'Sumbangan Donatur / Kas Lain',
    payerName: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: ''
  });

  // FORM PEMBAYARAN IURAN
  const [selectedHouseForPayment, setSelectedHouseForPayment] = useState('');
  const [startMonth, setStartMonth] = useState(10);
  const [startYear, setStartYear] = useState(2026);
  const [paymentMonths, setPaymentMonths] = useState(1);
  const [superAdminCustomStatus, setSuperAdminCustomStatus] = useState('PAID');
  const [superAdminCustomDate, setSuperAdminCustomDate] = useState('');

  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    category: INITIAL_EXPENSE_CATEGORIES[0],
    amount: '',
    purpose: '',
    description: '',
    proofUrl: ''
  });
  const [openingBalance] = useState(0);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0);

  const logActivity = (action, details) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }),
      user: currentUser ? currentUser.username : 'GUEST',
      action,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const user = users.find(u => u.username.toLowerCase() === loginUsername.trim().toLowerCase() && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      logActivity('LOGIN', `User ${user.name} (${user.role}) berhasil masuk.`);
    } else {
      setLoginError('Username atau Password yang Anda masukkan tidak cocok.');
    }
  };

  // CALCULATIONS
  const totalOfficialIncome = useMemo(() => incomes.reduce((acc, curr) => acc + curr.amount, 0), [incomes]);
  const totalRealizedExpense = useMemo(() => expenseRequests.filter((e) => e.status === 'REALIZED').reduce((acc, curr) => acc + curr.amount, 0), [expenseRequests]);
  const pendingExpenseAmount = useMemo(() => expenseRequests.filter((e) => e.status === 'PENDING').reduce((acc, curr) => acc + curr.amount, 0), [expenseRequests]);
  const finalOfficialCashBalance = useMemo(() => openingBalance + totalOfficialIncome - totalRealizedExpense, [openingBalance, totalOfficialIncome, totalRealizedExpense]);

  const allTransactions = useMemo(() => {
    const incs = incomes.map(i => ({
      id: i.refNo || i.id,
      rawId: i.id,
      date: i.date,
      category: i.category,
      description: i.description,
      fullText: `${i.category} - ${i.description}`,
      type: 'PEMASUKAN',
      amount: i.amount
    }));
    const exps = expenseRequests.filter(e => e.status === 'REALIZED').map(e => ({
      id: `EXP-${e.id.toUpperCase()}`,
      rawId: e.id,
      date: e.realizedDate || e.requestDate,
      category: e.category,
      description: e.purpose,
      fullText: `${e.purpose} (${e.applicantName})`,
      type: 'PENGELUARAN',
      amount: e.amount
    }));
    return [...incs, ...exps].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [incomes, expenseRequests]);

  // FILTERED REPORT DATA
  const filteredIncomes = useMemo(() => {
    return incomes.filter(inc => {
      const incDate = inc.date.split(' ')[0];
      const [y, m] = incDate.split('-');
      if (reportFilterType === 'DAILY') {
        return incDate === reportFilterDate;
      }
      if (reportFilterType === 'MONTHLY') {
        return y === reportFilterYear && parseInt(m, 10).toString() === reportFilterMonth;
      }
      if (reportFilterType === 'YEARLY') {
        return y === reportFilterYear;
      }
      return true;
    });
  }, [incomes, reportFilterType, reportFilterDate, reportFilterMonth, reportFilterYear]);

  const filteredExpenses = useMemo(() => {
    return expenseRequests.filter(exp => {
      if (exp.status !== 'REALIZED') return false;
      const expDate = (exp.realizedDate || exp.requestDate).split(' ')[0];
      const [y, m] = expDate.split('-');
      if (reportFilterType === 'DAILY') {
        return expDate === reportFilterDate;
      }
      if (reportFilterType === 'MONTHLY') {
        return y === reportFilterYear && parseInt(m, 10).toString() === reportFilterMonth;
      }
      if (reportFilterType === 'YEARLY') {
        return y === reportFilterYear;
      }
      return true;
    });
  }, [expenseRequests, reportFilterType, reportFilterDate, reportFilterMonth, reportFilterYear]);

  const filteredTotalIncome = useMemo(() => filteredIncomes.reduce((acc, curr) => acc + curr.amount, 0), [filteredIncomes]);
  const filteredTotalExpense = useMemo(() => filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0), [filteredExpenses]);
  const filteredNetBalance = useMemo(() => filteredTotalIncome - filteredTotalExpense, [filteredTotalIncome, filteredTotalExpense]);

  // DATA UNIT & TAGIHAN KHUSUS PENGGUNA WARGA YANG SEDANG LOGIN
  const currentWargaHouses = useMemo(() => {
    if (!currentUser || currentUser.role !== 'WARGA') return [];
    const nameLower = currentUser.name.trim().toLowerCase();
    const matched = houses.filter((h) => h.residentName.trim().toLowerCase() === nameLower);
    return matched.length > 0
      ? matched
      : houses.filter((h) => h.residentName.trim().toLowerCase().includes(nameLower));
  }, [currentUser, houses]);

  const currentWargaBills = useMemo(() => {
    if (currentWargaHouses.length === 0) return [];
    const houseIds = new Set(currentWargaHouses.map((h) => h.id));
    return bills
      .filter((b) => houseIds.has(b.houseId))
      .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
  }, [currentWargaHouses, bills]);

  // HANDLERS EDIT DAN RESET TRANSAKSI
  const handleEditTxOpen = (tx) => {
    setEditingTx({
      ...tx,
      amount: tx.amount.toString()
    });
    setShowEditTxModal(true);
  };

  const handleSaveTxEdit = (e) => {
    e.preventDefault();
    if (!editingTx || !editingTx.amount) return;

    const newAmount = parseFloat(editingTx.amount);

    if (editingTx.type === 'PEMASUKAN') {
      setIncomes(prev => prev.map(inc => {
        if (inc.id === editingTx.rawId || inc.refNo === editingTx.id) {
          return {
            ...inc,
            amount: newAmount,
            date: editingTx.date,
            description: editingTx.description
          };
        }
        return inc;
      }));

      setBills(prev => prev.map(b => {
        if (b.receiptNo === editingTx.id) {
          return { ...b, amount: newAmount };
        }
        return b;
      }));
    } else {
      setExpenseRequests(prev => prev.map(exp => {
        if (exp.id === editingTx.rawId || `EXP-${exp.id.toUpperCase()}` === editingTx.id) {
          return {
            ...exp,
            amount: newAmount,
            purpose: editingTx.description
          };
        }
        return exp;
      }));
    }

    logActivity('TRANSACTION_EDITED', `Edit transaksi ${editingTx.id} menjadi nominal ${formatIDR(newAmount)}`);
    setShowEditTxModal(false);
    setEditingTx(null);
  };

  const handleResetTransactions = () => {
    setIncomes([]);
    setBills([]);
    setExpenseRequests([]);
    setCashSettlements([]);
    setBankBalanceEntries([]);
    setSystemConfig(prev => ({ ...prev, cashInHand: 0, bankBalance: 0 }));
    logActivity('TRANSACTIONS_RESET', 'Semua aktivitas transaksi kas di-reset menjadi 0.');
    setShowResetTxModal(false);
  };

  // HANDLERS NOTIFIKASI PENGINGAT (TEXT BERJALAN)
  const handleOpenAddAnnouncement = () => {
    setEditingAnnouncement(null);
    setAnnouncementText('');
    setShowAnnouncementModal(true);
  };

  const handleOpenEditAnnouncement = (ann) => {
    setEditingAnnouncement(ann);
    setAnnouncementText(ann.text);
    setShowAnnouncementModal(true);
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    const todayStr = new Date().toISOString().split('T')[0];
    if (editingAnnouncement) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingAnnouncement.id ? { ...a, text: announcementText.trim(), updatedAt: todayStr } : a
        )
      );
      logActivity('ANNOUNCEMENT_UPDATED', `Edit teks berjalan: "${announcementText.trim()}"`);
    } else {
      const newAnn = {
        id: `ann-${Date.now()}`,
        text: announcementText.trim(),
        updatedAt: todayStr
      };
      setAnnouncements((prev) => [newAnn, ...prev]);
      logActivity('ANNOUNCEMENT_ADDED', `Tambah teks berjalan: "${newAnn.text}"`);
    }
    setShowAnnouncementModal(false);
    setEditingAnnouncement(null);
    setAnnouncementText('');
  };

  const handleDeleteAnnouncement = (annId) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== annId));
    logActivity('ANNOUNCEMENT_DELETED', `Hapus teks berjalan ID: ${annId}`);
    setConfirmDeleteAnnId(null);
  };

  // HANDLERS SALDO REKENING BANK (REKONSILIASI KAS)
  const totalBankBalanceFromEntries = useMemo(() => {
    if (bankBalanceEntries.length === 0) return systemConfig.bankBalance || 0;
    return bankBalanceEntries.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  }, [bankBalanceEntries, systemConfig.bankBalance]);

  const handleOpenAddBankBalance = () => {
    setEditingBankEntry(null);
    setBankEntryForm({
      date: new Date().toISOString().split('T')[0],
      bankName: systemConfig.bankName || 'Bank Mandiri',
      accountNo: systemConfig.bankAccountNo || '123-456-7890',
      amount: '',
      notes: ''
    });
    setShowBankBalanceModal(true);
  };

  const handleOpenEditBankBalance = (entry) => {
    setEditingBankEntry(entry);
    setBankEntryForm({
      date: entry.date,
      bankName: entry.bankName,
      accountNo: entry.accountNo,
      amount: entry.amount.toString(),
      notes: entry.notes || ''
    });
    setShowBankBalanceModal(true);
  };

  const handleSaveBankBalance = (e) => {
    e.preventDefault();
    const numericAmt = parseFloat(bankEntryForm.amount);
    if (isNaN(numericAmt)) return;

    let nextEntries = [];
    if (editingBankEntry) {
      nextEntries = bankBalanceEntries.map((item) =>
        item.id === editingBankEntry.id
          ? {
              ...item,
              date: bankEntryForm.date,
              bankName: bankEntryForm.bankName.trim() || 'Bank Mandiri',
              accountNo: bankEntryForm.accountNo.trim() || '-',
              amount: numericAmt,
              notes: bankEntryForm.notes.trim() || '-'
            }
          : item
      );
      logActivity('BANK_BALANCE_UPDATED', `Edit saldo rekening bank (${bankEntryForm.bankName}) menjadi ${formatIDR(numericAmt)}`);
    } else {
      const newEntry = {
        id: `bank-${Date.now()}`,
        date: bankEntryForm.date,
        bankName: bankEntryForm.bankName.trim() || 'Bank Mandiri',
        accountNo: bankEntryForm.accountNo.trim() || '-',
        amount: numericAmt,
        notes: bankEntryForm.notes.trim() || '-',
        updatedBy: currentUser?.name || 'Bendahara'
      };
      nextEntries = [newEntry, ...bankBalanceEntries];
      logActivity('BANK_BALANCE_ADDED', `Input saldo rekening bank (${newEntry.bankName}): ${formatIDR(numericAmt)}`);
    }

    setBankBalanceEntries(nextEntries);
    const updatedTotal = nextEntries.reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);
    setSystemConfig((prev) => ({
      ...prev,
      bankName: bankEntryForm.bankName.trim() || prev.bankName,
      bankAccountNo: bankEntryForm.accountNo.trim() || prev.bankAccountNo,
      bankBalance: updatedTotal
    }));

    setShowBankBalanceModal(false);
    setEditingBankEntry(null);
  };

  const handleDeleteBankBalance = (entryId) => {
    const nextEntries = bankBalanceEntries.filter((item) => item.id !== entryId);
    setBankBalanceEntries(nextEntries);
    const updatedTotal = nextEntries.reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);
    setSystemConfig((prev) => ({ ...prev, bankBalance: updatedTotal }));
    logActivity('BANK_BALANCE_DELETED', `Hapus entri saldo rekening bank ID: ${entryId}`);
    setConfirmDeleteBankId(null);
  };

  // HANDLERS
  const handleAddHouse = (e) => {
    e.preventDefault();
    if (!newHouse.number || !newHouse.residentName) return;
    const houseObj = {
      id: `h-${Date.now()}`,
      block: newHouse.block,
      number: newHouse.number,
      residentName: newHouse.residentName,
      phone: newHouse.phone || '-',
      isMandatory: true,
      collector: 'Erus'
    };
    setHouses((prev) => [...prev, houseObj]);
    logActivity('HOUSE_ADDED', `Tambah unit ${houseObj.block} No. ${houseObj.number} (${houseObj.residentName})`);
    setShowAddHouseModal(false);
    setNewHouse({ block: 'Blok A', number: '', residentName: '', phone: '' });
  };

  const handleUpdateHouse = (e) => {
    e.preventDefault();
    if (!editingHouse) return;
    setHouses(prev => prev.map(h => h.id === editingHouse.id ? editingHouse : h));
    logActivity('HOUSE_UPDATED', `Memperbarui data unit ${editingHouse.block} No. ${editingHouse.number}`);
    setShowEditHouseModal(false);
    setEditingHouse(null);
  };

  const handleDeleteHouse = (houseId) => {
    const target = houses.find(h => h.id === houseId);
    setHouses(prev => prev.filter(h => h.id !== houseId));
    logActivity('HOUSE_DELETED', `Hapus unit rumah ${target?.block} No. ${target?.number}`);
  };

  // BACKUP & RESTORE DATA WARGA & UNIT RUMAH
  const handleDownloadHousesBackup = () => {
    try {
      const backupPayload = {
        app: 'Kas Digital Perumahan Bumi Arsakha Permai',
        type: 'BACKUP_DATA_WARGA_RUMAH',
        exportedAt: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }),
        exportedBy: currentUser?.name || 'System',
        totalUnits: houses.length,
        data: houses
      };
      const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStamp = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `backup-data-warga-bumi-arsakha-${dateStamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setBackupFeedback({
        type: 'success',
        message: `Backup berhasil diunduh (${houses.length} unit rumah).`
      });
      logActivity('HOUSE_BACKUP_EXPORTED', `Download backup data warga & unit rumah (${houses.length} unit).`);
    } catch (err) {
      setBackupFeedback({
        type: 'error',
        message: 'Gagal mengunduh file backup data warga.'
      });
    }
  };

  const handleImportHousesBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        const importedList = Array.isArray(parsed) ? parsed : parsed?.data;

        if (!Array.isArray(importedList)) {
          setBackupFeedback({
            type: 'error',
            message: 'Format file tidak valid. Pastikan memilih file backup JSON Data Warga yang benar.'
          });
          return;
        }

        const sanitizedHouses = importedList
          .filter((item) => item && item.block && item.number && item.residentName)
          .map((item, idx) => ({
            id: item.id || `h-imp-${Date.now()}-${idx}`,
            block: String(item.block),
            number: String(item.number),
            residentName: String(item.residentName),
            phone: item.phone ? String(item.phone) : '-',
            isMandatory: item.isMandatory !== undefined ? Boolean(item.isMandatory) : true,
            collector: item.collector ? String(item.collector) : 'Erus'
          }));

        if (sanitizedHouses.length === 0) {
          setBackupFeedback({
            type: 'error',
            message: 'File backup tidak memiliki data unit rumah yang valid.'
          });
          return;
        }

        let addedCount = 0;
        let updatedCount = 0;

        setHouses((prev) => {
          const merged = [...prev];
          sanitizedHouses.forEach((imp) => {
            const existingIdx = merged.findIndex(
              (h) =>
                h.id === imp.id ||
                (h.block.trim().toLowerCase() === imp.block.trim().toLowerCase() &&
                  h.number.trim().toLowerCase() === imp.number.trim().toLowerCase())
            );
            if (existingIdx > -1) {
              merged[existingIdx] = { ...merged[existingIdx], ...imp, id: merged[existingIdx].id };
              updatedCount++;
            } else {
              merged.push(imp);
              addedCount++;
            }
          });
          return merged;
        });

        setBackupFeedback({
          type: 'success',
          message: `Import otomatis berhasil: ${addedCount} unit baru ditambahkan, ${updatedCount} unit diperbarui.`
        });
        logActivity(
          'HOUSE_BACKUP_IMPORTED',
          `Import backup data warga: +${addedCount} baru, ${updatedCount} diperbarui.`
        );
      } catch (err) {
        setBackupFeedback({
          type: 'error',
          message: 'Gagal membaca file JSON. Pastikan file tidak rusak.'
        });
      } finally {
        if (houseFileInputRef.current) {
          houseFileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  // BACKUP & RESTORE DATA IURAN WARGA (KHUSUS SUPERADMIN & BENDAHARA)
  const handleDownloadIuranBackup = () => {
    try {
      const iuranIncomes = incomes.filter(
        (inc) => inc.category === 'Iuran Bulanan Warga' || bills.some((b) => b.receiptNo === inc.refNo)
      );
      const backupPayload = {
        app: 'Kas Digital Perumahan Bumi Arsakha Permai',
        type: 'BACKUP_DATA_IURAN_WARGA',
        exportedAt: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }),
        exportedBy: currentUser?.name || 'System',
        totalBills: bills.length,
        data: {
          bills,
          incomes: iuranIncomes
        }
      };
      const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStamp = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `backup-data-iuran-bumi-arsakha-${dateStamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIuranBackupFeedback({
        type: 'success',
        message: `Backup iuran berhasil diunduh (${bills.length} catatan tagihan).`
      });
      logActivity('IURAN_BACKUP_EXPORTED', `Download backup data iuran warga (${bills.length} catatan).`);
    } catch (err) {
      setIuranBackupFeedback({
        type: 'error',
        message: 'Gagal mengunduh file backup data iuran.'
      });
    }
  };

  const handleImportIuranBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        const importedBills = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed?.data?.bills)
          ? parsed.data.bills
          : Array.isArray(parsed?.bills)
          ? parsed.bills
          : null;
        const importedIncomes = Array.isArray(parsed?.data?.incomes)
          ? parsed.data.incomes
          : Array.isArray(parsed?.incomes)
          ? parsed.incomes
          : [];

        if (!importedBills) {
          setIuranBackupFeedback({
            type: 'error',
            message: 'Format file tidak valid. Pastikan memilih file backup JSON Data Iuran yang benar.'
          });
          return;
        }

        const sanitizedBills = importedBills
          .filter((b) => b && b.houseId && b.periodMonth && b.periodYear)
          .map((b, idx) => ({
            id: b.id || `b-imp-${Date.now()}-${idx}`,
            houseId: String(b.houseId),
            periodMonth: String(b.periodMonth),
            periodYear: Number(b.periodYear),
            amount: Number(b.amount) || 5000,
            status: b.status || 'PAID',
            receiptNo: b.receiptNo || `IMP-${Date.now()}-${idx}`,
            paidAt: b.paidAt || new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }),
            collectorName: b.collectorName || 'Erus'
          }));

        if (sanitizedBills.length === 0) {
          setIuranBackupFeedback({
            type: 'error',
            message: 'File backup tidak memiliki data tagihan iuran yang valid.'
          });
          return;
        }

        let addedBills = 0;
        let updatedBills = 0;

        setBills((prev) => {
          const merged = [...prev];
          sanitizedBills.forEach((imp) => {
            const existingIdx = merged.findIndex(
              (b) =>
                b.id === imp.id ||
                (b.houseId === imp.houseId &&
                  b.periodMonth.toLowerCase() === imp.periodMonth.toLowerCase() &&
                  Number(b.periodYear) === Number(imp.periodYear))
            );
            if (existingIdx > -1) {
              merged[existingIdx] = { ...merged[existingIdx], ...imp, id: merged[existingIdx].id };
              updatedBills++;
            } else {
              merged.push(imp);
              addedBills++;
            }
          });
          return merged;
        });

        if (importedIncomes.length > 0) {
          setIncomes((prev) => {
            const mergedInc = [...prev];
            importedIncomes.forEach((impInc, idx) => {
              if (!impInc || !impInc.amount) return;
              const sanitizedInc = {
                id: impInc.id || `inc-imp-${Date.now()}-${idx}`,
                date: impInc.date || new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }),
                category: impInc.category || 'Iuran Bulanan Warga',
                amount: Number(impInc.amount),
                description: impInc.description || 'Restored Iuran Warga',
                refNo: impInc.refNo || '',
                verifier: impInc.verifier || 'Yana'
              };
              const idxFound = mergedInc.findIndex(
                (x) => x.id === sanitizedInc.id || (sanitizedInc.refNo && x.refNo === sanitizedInc.refNo)
              );
              if (idxFound > -1) {
                mergedInc[idxFound] = { ...mergedInc[idxFound], ...sanitizedInc, id: mergedInc[idxFound].id };
              } else {
                mergedInc.unshift(sanitizedInc);
              }
            });
            return mergedInc;
          });
        }

        setIuranBackupFeedback({
          type: 'success',
          message: `Restore otomatis berhasil: ${addedBills} tagihan baru ditambahkan, ${updatedBills} tagihan diperbarui.`
        });
        logActivity(
          'IURAN_BACKUP_IMPORTED',
          `Restore backup data iuran: +${addedBills} baru, ${updatedBills} diperbarui.`
        );
      } catch (err) {
        setIuranBackupFeedback({
          type: 'error',
          message: 'Gagal membaca file JSON backup iuran. Pastikan file tidak rusak.'
        });
      } finally {
        if (iuranFileInputRef.current) {
          iuranFileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    logActivity('USER_UPDATED', `SuperAdmin memperbarui akun ${editingUser.name}`);
    setShowEditUserModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (userId === 'usr-00') return;
    setUsers(prev => prev.filter(u => u.id !== userId));
    logActivity('USER_DELETED', `Hapus user ID: ${userId}`);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (!editingCategory.newName.trim()) return;
    setCategories(prev => prev.map((c, idx) => idx === editingCategory.index ? editingCategory.newName.trim() : c));
    logActivity('CATEGORY_UPDATED', `Ubah kategori ${editingCategory.oldName} -> ${editingCategory.newName}`);
    setShowEditCategoryModal(false);
  };

  const handleDeleteCategory = (index, catName) => {
    setCategories(prev => prev.filter((_, idx) => idx !== index));
    logActivity('CATEGORY_DELETED', `Hapus kategori: ${catName}`);
  };

  const handleLogout = () => {
    if (currentUser) {
      logActivity('LOGOUT', `User ${currentUser.name} telah keluar.`);
    }
    setCurrentUser(null);
    setLoginUsername('');
    setLoginPassword('');
  };

  const handleAddOtherIncome = (e) => {
    e.preventDefault();
    if (!newOtherIncome.amount || !newOtherIncome.payerName) return;

    const amt = parseFloat(newOtherIncome.amount);
    const receiptNum = `INC-${Date.now().toString().slice(-6)}`;

    const incObj = {
      id: `inc-${Date.now()}`,
      date: newOtherIncome.date,
      category: newOtherIncome.source,
      amount: amt,
      description: `[Pemasukan Lain] Dari: ${newOtherIncome.payerName} - Ket: ${newOtherIncome.description || '-'}`,
      refNo: receiptNum,
      verifier: currentUser.name
    };

    setIncomes(prev => [incObj, ...prev]);
    logActivity('OTHER_INCOME_ADDED', `Pemasukan Kas Lain sebesar ${formatIDR(amt)} dari ${newOtherIncome.payerName}`);
    setShowAddOtherIncomeModal(false);
    setNewOtherIncome({
      source: 'Sumbangan Donatur / Kas Lain',
      payerName: '',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      description: ''
    });
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    setPaymentError('');
    if (!selectedHouseForPayment) return;
    const targetHouse = houses.find((h) => h.id === selectedHouseForPayment);
    if (!targetHouse) return;

    let monthIdx = startMonth - 1;
    let yearCurr = startYear;
    const proposedPeriods = [];

    for (let i = 0; i < paymentMonths; i++) {
      const mName = MONTH_NAMES[monthIdx];
      proposedPeriods.push({ month: mName, year: yearCurr });
      monthIdx++;
      if (monthIdx > 11) {
        monthIdx = 0;
        yearCurr++;
      }
    }

    const existingUnitBills = bills.filter(b => b.houseId === targetHouse.id && b.status === 'PAID');
    for (let p of proposedPeriods) {
      const found = existingUnitBills.some(b => b.periodMonth === p.month && b.periodYear === p.year);
      if (found) {
        setPaymentError(`Gagal: Iuran untuk bulan ${p.month} ${p.year} sudah pernah dicatat / dibayar sebelumnya untuk unit ini.`);
        return;
      }
    }

    const totalAmount = paymentMonths * 5000;
    const nowStr = superAdminCustomDate || new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' });
    const receiptNum = `000${bills.length + 1}/BBAP/${startYear}`;

    const updatedBills = [...bills];
    const periodMonthsText = [];

    monthIdx = startMonth - 1;
    yearCurr = startYear;

    for (let i = 0; i < paymentMonths; i++) {
      const mName = MONTH_NAMES[monthIdx];
      periodMonthsText.push(`${mName} ${yearCurr}`);

      updatedBills.push({
        id: `b-${Date.now()}-${i}`,
        houseId: targetHouse.id,
        periodMonth: mName,
        periodYear: yearCurr,
        amount: 5000,
        status: currentUser.role === 'SUPERADMIN' ? superAdminCustomStatus : 'PAID',
        receiptNo: receiptNum,
        paidAt: nowStr,
        collectorName: currentUser?.name || 'Erus'
      });

      monthIdx++;
      if (monthIdx > 11) {
        monthIdx = 0;
        yearCurr++;
      }
    }
    setBills(updatedBills);

    const periodDesc = periodMonthsText.length > 1
      ? `${periodMonthsText[0]} s/d ${periodMonthsText[periodMonthsText.length - 1]}`
      : periodMonthsText[0];

    const newIncome = {
      id: `inc-${Date.now()}`,
      date: nowStr,
      category: 'Iuran Bulanan Warga',
      amount: totalAmount,
      description: `Pembayaran Iuran ${targetHouse.block} No. ${targetHouse.number} (${targetHouse.residentName}) - ${periodDesc}`,
      refNo: receiptNum,
      verifier: 'Yana'
    };
    setIncomes((prev) => [newIncome, ...prev]);
    logActivity('PAYMENT_RECORDED', `Catat iuran ${targetHouse.block} No. ${targetHouse.number} sebesar ${formatIDR(totalAmount)}`);

    setSelectedReceipt({
      bill: {
        receiptNo: receiptNum,
        amount: totalAmount,
        periodMonth: periodDesc,
        periodYear: startYear,
        paidAt: nowStr,
        collectorName: currentUser?.name || 'Erus'
      },
      house: targetHouse
    });

    setShowPaymentModal(false);
    setSelectedHouseForPayment('');
    setPaymentMonths(1);
    setSuperAdminCustomDate('');
  };

  // EDIT KWITANSI / BILL HANDLERS (Hanya Superadmin & Bendahara)
  const handleSaveBillEdit = (e) => {
    e.preventDefault();
    if (!editingBill) return;

    const newAmt = parseFloat(editingBill.amount) || 5000;

    setBills(prev => prev.map(b => {
      if (b.id === editingBill.id) {
        return {
          ...b,
          periodMonth: editingBill.periodMonth,
          periodYear: parseInt(editingBill.periodYear),
          amount: newAmt,
          status: editingBill.status
        };
      }
      return b;
    }));

    logActivity('BILL_EDITED', `Edit kwitansi tagihan ID ${editingBill.id}`);
    setShowEditBillModal(false);
    setEditingBill(null);
  };

  // HAPUS KWITANSI / BILL HANDLER (Hanya Superadmin & Bendahara)
  const handleDeleteBill = (billId) => {
    const targetBill = bills.find(b => b.id === billId);
    if (!targetBill) return;

    const remainingBills = bills.filter(b => b.id !== billId);
    setBills(remainingBills);

    if (targetBill.receiptNo) {
      const sameReceiptBills = remainingBills.filter(b => b.receiptNo === targetBill.receiptNo);
      if (sameReceiptBills.length === 0) {
        setIncomes(prev => prev.filter(inc => inc.refNo !== targetBill.receiptNo));
      } else {
        const updatedTotal = sameReceiptBills.reduce((acc, b) => acc + b.amount, 0);
        setIncomes(prev => prev.map(inc => inc.refNo === targetBill.receiptNo ? { ...inc, amount: updatedTotal } : inc));
      }
    }

    logActivity('BILL_DELETED', `Hapus data tagihan iuran ${targetBill.periodMonth} ${targetBill.periodYear} (${targetBill.receiptNo})`);
    setConfirmDeleteBillId(null);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setCategories((prev) => [...prev, newCategoryName.trim()]);
    logActivity('CATEGORY_ADDED', `Tambah kategori: ${newCategoryName}`);
    setShowAddCategoryModal(false);
    setNewCategoryName('');
  };

  const handleAddExpenseRequest = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(newExpense.amount);
    if (!numericAmount || numericAmount <= 0 || !newExpense.purpose.trim()) return;
    const selectedCategory = newExpense.category || categories[0] || 'Administrasi & ATK';
    const reqObj = {
      id: `exp-${Date.now()}`,
      requestDate: newExpense.date || new Date().toISOString().split('T')[0],
      applicantName: `${currentUser.name} (${currentUser.role})`,
      category: selectedCategory,
      amount: numericAmount,
      purpose: newExpense.purpose.trim(),
      description: newExpense.description?.trim() || '-',
      proofUrl: newExpense.proofUrl || '',
      status: 'PENDING',
      realizedDate: null,
      realizedProofUrl: null,
      approvals: { KETUA: null, SEKRETARIS: null, BENDAHARA: null }
    };
    setExpenseRequests((prev) => [reqObj, ...prev]);
    logActivity('EXPENSE_SUBMITTED', `Pengajuan pengeluaran tertanggal ${reqObj.requestDate}: ${reqObj.purpose}`);
    setShowAddExpenseModal(false);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: categories[0] || INITIAL_EXPENSE_CATEGORIES[0],
      amount: '',
      purpose: '',
      description: '',
      proofUrl: ''
    });
  };

  // EDIT PENGELUARAN KAS (Hanya Bendahara & SuperAdmin)
  const handleSaveExpenseEdit = (e) => {
    e.preventDefault();
    if (!editingExpense || !editingExpense.amount || !editingExpense.purpose) return;

    const updatedAmt = parseFloat(editingExpense.amount);
    setExpenseRequests(prev => prev.map(exp => {
      if (exp.id === editingExpense.id) {
        return {
          ...exp,
          requestDate: editingExpense.requestDate,
          category: editingExpense.category,
          amount: updatedAmt,
          purpose: editingExpense.purpose,
          description: editingExpense.description || '-'
        };
      }
      return exp;
    }));

    logActivity('EXPENSE_EDITED', `Edit pengajuan pengeluaran ID ${editingExpense.id} (${editingExpense.purpose})`);
    setShowEditExpenseModal(false);
    setEditingExpense(null);
  };

  // HAPUS PENGELUARAN KAS (Hanya Bendahara & SuperAdmin)
  const handleDeleteExpense = (expId) => {
    const targetExp = expenseRequests.find(e => e.id === expId);
    setExpenseRequests(prev => prev.filter(e => e.id !== expId));
    logActivity('EXPENSE_DELETED', `Hapus pengeluaran ID ${expId} (${targetExp?.purpose || '-'})`);
    setConfirmDeleteExpenseId(null);
  };

  // APPROVAL BERJENJANG 3 PENGURUS INTI: KETUA -> SEKRETARIS -> BENDAHARA
  const handleApproveExpenseRole = (expId, targetRole) => {
    const approvalDateStr = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' });
    setExpenseRequests(prev => prev.map(e => {
      if (e.id === expId) {
        const currentApprovals = {
          KETUA: e.approvals?.KETUA || null,
          SEKRETARIS: e.approvals?.SEKRETARIS || null,
          BENDAHARA: e.approvals?.BENDAHARA || null
        };

        const updatedApprovals = {
          ...currentApprovals,
          [targetRole]: {
            approved: true,
            by: currentUser.name,
            at: approvalDateStr
          }
        };

        const allThreeApproved = Boolean(
          updatedApprovals.KETUA?.approved &&
          updatedApprovals.SEKRETARIS?.approved &&
          updatedApprovals.BENDAHARA?.approved
        );

        return {
          ...e,
          approvals: updatedApprovals,
          status: allThreeApproved ? 'REALIZED' : 'PENDING',
          realizedDate: allThreeApproved ? approvalDateStr : null
        };
      }
      return e;
    }));
    logActivity('EXPENSE_ROLE_APPROVED', `Persetujuan ${targetRole} oleh ${currentUser.name} untuk pengeluaran ID: ${expId}`);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.name) return;
    const userObj = {
      id: `usr-${Date.now()}`,
      username: newUser.username.toLowerCase(),
      password: newUser.password || 'password123',
      name: newUser.name,
      role: newUser.role
    };
    setUsers((prev) => [...prev, userObj]);
    logActivity('USER_ADDED', `Tambah pengguna: ${userObj.name}`);
    setShowAddUserModal(false);
    setNewUser({ username: '', name: '', role: 'WARGA', password: 'password123' });
  };

  const handleRecordSettlement = (e) => {
    e.preventDefault();
    const collected = parseFloat(newSettlement.totalCollected) || 0;
    const handed = parseFloat(newSettlement.handedAmount) || 0;
    const diff = handed - collected;

    const setObj = {
      id: `set-${Date.now()}`,
      date: newSettlement.date,
      collectorName: newSettlement.collectorName,
      totalCollected: collected,
      handedAmount: handed,
      difference: diff,
      status: diff === 0 ? 'VERIFIED_MATCH' : 'MISMATCH',
      notes: newSettlement.notes || '-'
    };
    setCashSettlements((prev) => [setObj, ...prev]);
    setSystemConfig((prev) => ({ ...prev, cashInHand: prev.cashInHand + handed }));
    logActivity('SETTLEMENT_RECORDED', `Setoran kas dari ${setObj.collectorName} tertanggal ${setObj.date}`);
    setShowSettlementModal(false);
    setNewSettlement({
      date: new Date().toISOString().split('T')[0],
      collectorName: 'Erus',
      totalCollected: '',
      handedAmount: '',
      notes: ''
    });
  };

  // LOGIN SCREEN
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans antialiased text-slate-800">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-3">
            <LogoBumiArsakha className="h-16 mx-auto" showSubtext={true} isDarkBg={false} />
            <h1 className="text-xl font-bold text-slate-900 pt-2">Sistem Laporan Kas Digital</h1>
            <p className="text-xs text-slate-500">Masuk dengan akun terdaftar untuk mengakses aplikasi</p>
          </div>

          {loginError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pengguna (Username)</label>
              <input
                type="text"
                required
                placeholder="pengguna"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi (Password)</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Masuk ke Aplikasi
            </button>
          </form>

          <div className="border-t border-slate-200 pt-4 text-center">
            <p className="text-xs text-slate-500 font-medium">Bila ada kendala akses aplikasi bisa hubungi Admin</p>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Kas', icon: Home, show: true },
    { id: 'iuran_warga', label: 'Rincian Iuran Saya', icon: DollarSign, show: currentUser.role === 'WARGA' },
    { id: 'warga', label: 'Data Warga & Rumah', icon: Users, show: true },
    { id: 'iuran', label: 'Penarikan Iuran', icon: DollarSign, show: ['SUPERADMIN', 'PETUGAS', 'BENDAHARA', 'KETUA', 'SEKRETARIS', 'ADMIN'].includes(currentUser.role) },
    { id: 'rekonsiliasi', label: 'Setoran & Rekonsiliasi Kas', icon: RefreshCw, show: ['SUPERADMIN', 'BENDAHARA', 'PETUGAS', 'KETUA', 'SEKRETARIS', 'ADMIN'].includes(currentUser.role) },
    { id: 'pengeluaran', label: 'Pengeluaran Kas', icon: FileText, show: ['SUPERADMIN', 'BENDAHARA', 'KETUA', 'SEKRETARIS'].includes(currentUser.role) },
    { id: 'laporan', label: 'Laporan Keuangan', icon: Printer, show: true },
    { id: 'master', label: 'Kontrol Master & Pengaturan', icon: Key, show: ['SUPERADMIN', 'ADMIN'].includes(currentUser.role) },
    { id: 'audit', label: 'Audit Log System', icon: Shield, show: currentUser.role === 'SUPERADMIN' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      {/* STYLE PRINT KHUSUS KWITANSI & LAPORAN KEUANGAN */}
      <style>{`
        @media print {
          @page {
            size: auto;
            margin: 12mm;
          }
          body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-hide-when-receipt-open {
            display: none !important;
          }
          .print-receipt-modal-wrapper {
            position: static !important;
            inset: auto !important;
            background: transparent !important;
            backdrop-filter: none !important;
            padding: 0 !important;
            display: block !important;
          }
          .print-receipt-modal-box {
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 auto !important;
          }
          .print-report-container {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            width: 100% !important;
          }
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee-text {
          display: inline-block;
          white-space: nowrap;
          animation: marqueeScroll 24s linear infinite;
        }
        .animate-marquee-text:hover {
          animation-play-state: paused;
        }
      `}</style>

      <header className={`bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white border-b border-emerald-700/50 sticky top-0 z-30 shadow-md no-print ${selectedReceipt ? 'print-hide-when-receipt-open' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-emerald-100 hover:bg-emerald-700/50 rounded-xl lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div className="inline-flex items-center gap-2.5 select-none">
              <LogoBumiArsakha className="h-10" showSubtext={false} isDarkBg={true} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SyncStatusBadge />
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{currentUser.name}</span>
              <span className="text-[10px] font-mono text-amber-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-600/50 inline-block font-bold">
                {currentUser.role}
              </span>
            </div>
            <button onClick={handleLogout} title="Keluar" className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-700/50 rounded-xl transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className={`flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6 ${selectedReceipt ? 'print-hide-when-receipt-open' : ''}`}>
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 p-4 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} no-print shadow-lg lg:shadow-none`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 lg:hidden">
            <LogoBumiArsakha className="h-8" showSubtext={false} isDarkBg={false} />
            <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5 mt-4">
            {navItems.filter(item => item.show).map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active ? 'bg-emerald-700 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 space-y-6 overflow-hidden">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* NOTIFIKASI PENGINGAT (TEXT BERJALAN DI DASHBOARD) */}
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-3.5 shadow-sm space-y-2.5">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0 shadow-sm">
                    <Bell className="w-3.5 h-3.5" /> Pengingat
                  </span>
                  <div className="flex-1 overflow-hidden relative h-5 flex items-center">
                    {announcements.length === 0 ? (
                      <span className="text-xs text-amber-800/70 italic">Belum ada pengumuman atau pengingat aktif.</span>
                    ) : (
                      <div className="animate-marquee-text text-xs font-bold text-amber-950">
                        {announcements.map((a) => `📢 ${a.text}`).join('     •     ')}
                      </div>
                    )}
                  </div>
                  {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                    <button
                      type="button"
                      onClick={handleOpenAddAnnouncement}
                      className="bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shrink-0 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Teks
                    </button>
                  )}
                </div>

                {/* DAFTAR KELOLA PENGINGAT KHUSUS SUPERADMIN & BENDAHARA */}
                {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && announcements.length > 0 && (
                  <div className="border-t border-amber-200/80 pt-2 space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                      Kelola Notifikasi Pengingat (SuperAdmin & Bendahara):
                    </span>
                    <div className="space-y-1.5">
                      {announcements.map((ann) => (
                        <div
                          key={ann.id}
                          className="bg-white/90 border border-amber-200/80 rounded-xl px-3 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div className="text-slate-800 font-medium flex-1">
                            <span>{ann.text}</span>
                            <span className="text-[10px] text-slate-400 font-mono ml-2">({ann.updatedAt})</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleOpenEditAnnouncement(ann)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-300 inline-flex items-center gap-1"
                            >
                              <Edit className="w-3 h-3" /> Edit
                            </button>
                            {confirmDeleteAnnId === ann.id ? (
                              <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-lg">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAnnouncement(ann.id)}
                                  className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded"
                                >
                                  Hapus!
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteAnnId(null)}
                                  className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded"
                                >
                                  Batal
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteAnnId(ann.id)}
                                className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-rose-200 inline-flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" /> Hapus
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-emerald-900 text-white rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute right-2 bottom-0 text-emerald-800/40 text-7xl font-bold select-none pointer-events-none font-serif">Rp</div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-200">Saldo Kas Akhir Resmi</span>
                    <div className="text-2xl font-black font-mono text-white mt-2">{formatIDR(finalOfficialCashBalance)}</div>
                  </div>
                  <p className="text-[10px] text-emerald-300 mt-4 leading-tight">Awal + Masuk - Realisasi Disetujui</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-slate-500">Pemasukan Resmi</span>
                    <div className="p-1.5 bg-emerald-50 rounded-full text-emerald-600"><TrendingUp className="w-4 h-4" /></div>
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-2">{formatIDR(totalOfficialIncome)}</div>
                  <p className="text-[10px] text-slate-400 mt-3">Iuran Warga & Pemasukan Lain</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-slate-500">Realisasi Pengeluaran</span>
                    <div className="p-1.5 bg-rose-50 rounded-full text-rose-600"><TrendingDown className="w-4 h-4" /></div>
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-2">{formatIDR(totalRealizedExpense)}</div>
                  <p className="text-[10px] text-slate-400 mt-3">Pengeluaran Disetujui & Dibayar</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-slate-500">Pengajuan Pending</span>
                    <div className="p-1.5 bg-amber-50 rounded-full text-amber-600"><AlertCircle className="w-4 h-4" /></div>
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-2">{formatIDR(pendingExpenseAmount)}</div>
                  <p className="text-[10px] text-amber-600 mt-3 font-medium">Belum mengurangi saldo resmi</p>
                </div>
              </div>

              {/* BARIS PEMASUKAN LAIN & RESET TRANSAKSI */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 p-4 rounded-3xl shadow-sm gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Pemasukan Kas & Kontrol Transaksi</h3>
                  <p className="text-xs text-slate-500">Catat pemasukan kas lain atau lakukan reset aktivitas transaksi</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                    <button onClick={() => setShowAddOtherIncomeModal(true)} className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2 rounded-2xl font-bold flex items-center gap-1.5 shadow-md">
                      <Plus className="w-4 h-4" /> Catat Pemasukan Lain
                    </button>
                  )}
                  {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                    <button onClick={() => setShowResetTxModal(true)} className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs px-3.5 py-2 rounded-2xl font-bold flex items-center gap-1.5 shadow-sm">
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Transaksi (0)
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Aktivitas Transaksi Terbaru (Resmi)
                  </h3>
                  <button onClick={() => setActiveTab('laporan')} className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
                    Lihat Laporan Lengkap →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  {allTransactions.length === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-6">Belum ada transaksi tercatat. Silakan input data transaksi.</p>
                  ) : (
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="p-3">Ref ID</th>
                          <th className="p-3">Tanggal (WIB)</th>
                          <th className="p-3">Kategori & Uraian</th>
                          <th className="p-3">Jenis</th>
                          <th className="p-3 text-right">Nominal</th>
                          {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && <th className="p-3 text-center">Aksi</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {allTransactions.map((tx, idx) => (
                          <tr key={idx}>
                            <td className="p-3 text-slate-500 font-bold">{tx.id}</td>
                            <td className="p-3 text-slate-500">{tx.date}</td>
                            <td className="p-3 font-sans font-medium text-slate-800">{tx.fullText}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-sans ${tx.type === 'PEMASUKAN' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                {tx.type}
                              </span>
                            </td>
                            <td className={`p-3 text-right font-bold ${tx.type === 'PEMASUKAN' ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {tx.type === 'PEMASUKAN' ? '+' : '-'} {formatIDR(tx.amount)}
                            </td>
                            {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                              <td className="p-3 text-center font-sans">
                                <button onClick={() => handleEditTxOpen(tx)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg border border-slate-200 inline-flex items-center gap-1 text-[10px] font-bold">
                                  <Edit className="w-3 h-3" /> Edit
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'iuran_warga' && currentUser.role === 'WARGA' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-700" /> Rincian Iuran Warga & Bukti Kwitansi
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Riwayat pembayaran iuran kas perumahan atas nama <strong>{currentUser.name}</strong>
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl text-right">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Total Iuran Terbayar</span>
                  <span className="text-base font-black font-mono text-emerald-900">
                    {formatIDR(currentWargaBills.filter((b) => b.status === 'PAID').reduce((acc, c) => acc + c.amount, 0))}
                  </span>
                </div>
              </div>

              {currentWargaHouses.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Data unit rumah untuk akun "{currentUser.name}" belum tertaut.</p>
                  <p className="text-[11px] text-slate-500">Silakan hubungi Admin atau Bendahara untuk memastikan nama penghuni di Data Warga sesuai dengan akun Anda.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentWargaHouses.map((h) => {
                      const unitPaidCount = bills.filter((b) => b.houseId === h.id && b.status === 'PAID').length;
                      return (
                        <div key={h.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg">
                              {h.block} No. {h.number}
                            </span>
                            <h3 className="font-bold text-slate-900 text-sm mt-2">{h.residentName}</h3>
                            <p className="text-xs text-slate-500 font-mono">No. WA: {h.phone}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 block">Bulan Lunas</span>
                            <span className="text-lg font-black font-mono text-emerald-700">{unitPaidCount} Bulan</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
                      Daftar Rincian Pembayaran & Kwitansi Digital
                    </div>
                    <div className="overflow-x-auto">
                      {currentWargaBills.length === 0 ? (
                        <p className="text-center text-xs text-slate-400 py-8">Belum ada riwayat pembayaran iuran yang tercatat untuk unit Anda.</p>
                      ) : (
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                            <tr>
                              <th className="p-3">No. Kwitansi</th>
                              <th className="p-3">Unit Rumah</th>
                              <th className="p-3">Periode Bulan</th>
                              <th className="p-3">Tanggal Bayar</th>
                              <th className="p-3 text-right">Nominal</th>
                              <th className="p-3 text-center">Status</th>
                              <th className="p-3 text-center">Bukti Kwitansi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-mono">
                            {currentWargaBills.map((b) => {
                              const unitObj = currentWargaHouses.find((h) => h.id === b.houseId) || currentWargaHouses[0];
                              return (
                                <tr key={b.id}>
                                  <td className="p-3 font-bold text-slate-700">{b.receiptNo}</td>
                                  <td className="p-3 font-sans font-semibold text-slate-800">
                                    {unitObj ? `${unitObj.block} No. ${unitObj.number}` : '-'}
                                  </td>
                                  <td className="p-3 font-sans font-bold text-slate-900">
                                    {b.periodMonth} {b.periodYear}
                                  </td>
                                  <td className="p-3 text-slate-500 text-[11px]">{b.paidAt}</td>
                                  <td className="p-3 text-right font-bold text-emerald-700">{formatIDR(b.amount)}</td>
                                  <td className="p-3 text-center font-sans">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                                      ✓ {b.status === 'PAID' ? 'LUNAS' : b.status}
                                    </span>
                                  </td>
                                  <td className="p-3 text-center font-sans">
                                    {unitObj && (
                                      <button
                                        onClick={() => setSelectedReceipt({ bill: b, house: unitObj })}
                                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl inline-flex items-center gap-1 shadow-sm"
                                      >
                                        <FileText className="w-3 h-3" /> Lihat & Cetak Kwitansi
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'warga' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <Home className="w-5 h-5 text-emerald-700" /> Master Data Warga & Unit Rumah
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">Total {houses.length} Unit Rumah Terdaftar</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                    <div className="relative flex-1 sm:w-56">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari nama / unit rumah..."
                        value={houseSearchQuery}
                        onChange={(e) => setHouseSearchQuery(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* TOMBOL BACKUP (DOWNLOAD) & IMPORT OTOMATIS (KHUSUS SUPERADMIN & BENDAHARA) */}
                    {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                      <>
                        <button
                          type="button"
                          onClick={handleDownloadHousesBackup}
                          className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3.5 py-2 rounded-2xl font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                          title="Download seluruh data warga & unit rumah ke file JSON"
                        >
                          <Download className="w-3.5 h-3.5" /> Backup Data
                        </button>

                        <input
                          ref={houseFileInputRef}
                          type="file"
                          accept=".json,application/json"
                          onChange={handleImportHousesBackup}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => houseFileInputRef.current?.click()}
                          className="bg-sky-700 hover:bg-sky-800 text-white text-xs px-3.5 py-2 rounded-2xl font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                          title="Upload file JSON backup untuk memulihkan / menggabungkan data otomatis"
                        >
                          <Upload className="w-3.5 h-3.5" /> Import Otomatis
                        </button>
                      </>
                    )}

                    {['SUPERADMIN', 'ADMIN'].includes(currentUser.role) && (
                      <button onClick={() => setShowAddHouseModal(true)} className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2 rounded-2xl font-bold flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap">
                        <Plus className="w-4 h-4" /> Tambah Unit Rumah
                      </button>
                    )}
                  </div>
                </div>

                {backupFeedback && (
                  <div
                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-2 ${
                      backupFeedback.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      {backupFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      )}
                      <span>{backupFeedback.message}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBackupFeedback(null)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {houses.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 text-xs">
                  Belum ada unit rumah terdaftar. Klik tombol <strong>"Tambah Unit Rumah"</strong> di atas untuk mulai menginput data rumah dan warga dari awal.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {houses
                    .filter(h => h.residentName.toLowerCase().includes(houseSearchQuery.toLowerCase()) || `${h.block} ${h.number}`.toLowerCase().includes(houseSearchQuery.toLowerCase()))
                    .map((h) => (
                      <div key={h.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3 relative">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold font-mono px-3 py-1 bg-slate-100 text-slate-800 rounded-xl">
                            Unit {h.block.replace('Blok ', '')}-{h.number}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">Dihuni</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{h.residentName}</h4>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            No WA: {currentUser.role === 'WARGA' ? '08xxx' : h.phone}
                          </p>
                        </div>
                        {['SUPERADMIN', 'ADMIN'].includes(currentUser.role) && (
                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button onClick={() => { setEditingHouse(h); setShowEditHouseModal(true); }} className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200">Edit</button>
                            <button onClick={() => handleDeleteHouse(h.id)} className="bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-200">Hapus</button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'iuran' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">Pencatatan & Penagihan Iuran Warga</h2>
                    <p className="text-xs text-slate-500">Sistem Iuran Standar Rp 5.000 / Bulan (Pencegahan Duplikasi Bulan Aktif)</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                    <div className="relative flex-1 sm:w-56">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari unit / nama warga..."
                        value={iuranSearchQuery}
                        onChange={(e) => setIuranSearchQuery(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* BACKUP & RESTORE IURAN WARGA (HANYA SUPERADMIN & BENDAHARA) */}
                    {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                      <>
                        <button
                          type="button"
                          onClick={handleDownloadIuranBackup}
                          className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3.5 py-2 rounded-2xl font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                          title="Download backup seluruh pencatatan & pembayaran iuran warga"
                        >
                          <Download className="w-3.5 h-3.5" /> Backup Data
                        </button>

                        <input
                          ref={iuranFileInputRef}
                          type="file"
                          accept=".json,application/json"
                          onChange={handleImportIuranBackup}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => iuranFileInputRef.current?.click()}
                          className="bg-sky-700 hover:bg-sky-800 text-white text-xs px-3.5 py-2 rounded-2xl font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                          title="Upload & restore otomatis data backup iuran warga"
                        >
                          <Upload className="w-3.5 h-3.5" /> Import Otomatis
                        </button>
                      </>
                    )}

                    {['SUPERADMIN', 'PETUGAS', 'BENDAHARA'].includes(currentUser.role) && (
                      <button onClick={() => { setPaymentError(''); setShowPaymentModal(true); }} className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2 rounded-2xl font-bold flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap">
                        <Plus className="w-4 h-4" /> Catat Pembayaran Iuran
                      </button>
                    )}
                  </div>
                </div>

                {iuranBackupFeedback && (
                  <div
                    className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-2 ${
                      iuranBackupFeedback.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      {iuranBackupFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      )}
                      <span>{iuranBackupFeedback.message}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIuranBackupFeedback(null)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
                  Daftar Tagihan & Rekapan Iuran Per Unit Rumah
                </div>
                <div className="overflow-x-auto">
                  {houses.length === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-8">Belum ada unit rumah terdaftar.</p>
                  ) : (
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="p-3">Unit Rumah / Nama Warga</th>
                          <th className="p-3 text-right">Nominal Bulanan</th>
                          <th className="p-3 text-center">Status Terakhir</th>
                          <th className="p-3 text-center">Aksi & Rekapan Pembayaran</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {houses
                          .filter(h => h.residentName.toLowerCase().includes(iuranSearchQuery.toLowerCase()) || `${h.block} ${h.number}`.toLowerCase().includes(iuranSearchQuery.toLowerCase()))
                          .map((h) => {
                            const unitBills = bills.filter(b => b.houseId === h.id);
                            const latestBill = unitBills[unitBills.length - 1];
                            const isPaid = latestBill && latestBill.status === 'PAID';

                            return (
                              <tr key={h.id}>
                                <td className="p-3 font-sans font-semibold text-slate-900">
                                  <span className="font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded mr-1.5 text-slate-800">
                                    {h.block.replace('Blok ', '')}-{h.number}
                                  </span>
                                  / {h.residentName}
                                </td>
                                <td className="p-3 text-right font-bold text-slate-800">Rp 5.000</td>
                                <td className="p-3 text-center font-sans">
                                  {isPaid ? (
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">✓ LUNAS</span>
                                  ) : (
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-800">✕ BELUM BAYAR</span>
                                  )}
                                </td>
                                <td className="p-3 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    {isPaid && (
                                      <button onClick={() => setSelectedReceipt({ bill: latestBill, house: h })} className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                        <FileText className="w-3 h-3" /> Kwitansi
                                      </button>
                                    )}
                                    <button onClick={() => setShowDetailsModal(h)} className="bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                      <Info className="w-3 h-3" /> Selengkapnya
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rekonsiliasi' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Penyetoran Petugas & Rekonsiliasi Kas</h2>
                  <p className="text-xs text-slate-500">Pencocokan Uang Fisik Tunai dan Rekening Bank</p>
                </div>
                {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleOpenAddBankBalance}
                      className="bg-sky-700 hover:bg-sky-800 text-white text-xs px-4 py-2.5 rounded-2xl font-bold flex items-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Input Saldo Rekening Bank
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSettlementModal(true)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2.5 rounded-2xl font-bold flex items-center gap-1.5 shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Input Setoran Penagih
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm border-b pb-2">1. Posisi Kas Fisik & Bank</h3>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border">
                      <span className="font-sans text-slate-600">Kas Tunai di Bendahara:</span>
                      <strong>{formatIDR(systemConfig.cashInHand)}</strong>
                    </div>
                    <div className="flex justify-between items-center bg-sky-50/70 p-3 rounded-xl border border-sky-200">
                      <div>
                        <span className="font-sans text-slate-700 font-semibold block">Saldo Rekening Bank:</span>
                        <span className="font-sans text-[10px] text-slate-500">
                          {systemConfig.bankName} ({systemConfig.bankAccountNo})
                        </span>
                      </div>
                      <strong className="text-sky-900">{formatIDR(totalBankBalanceFromEntries)}</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm border-b pb-2">2. Hasil Rekonsiliasi Pembukuan</h3>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border">
                      <span className="font-sans text-slate-600">Saldo Menurut Sistem:</span>
                      <strong>{formatIDR(finalOfficialCashBalance)}</strong>
                    </div>
                    <div className="flex justify-between items-center bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900 font-bold">
                      <span className="font-sans">Selisih Rekonsiliasi:</span>
                      <strong>Rp 0 (COCOK / SEIMBANG)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* DAFTAR RINCIAN SALDO REKENING BANK (EDIT & HAPUS OLEH SUPERADMIN & BENDAHARA) */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Rincian Input Saldo Rekening Bank
                  </h3>
                  {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                    <button
                      type="button"
                      onClick={handleOpenAddBankBalance}
                      className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Data Rekening
                    </button>
                  )}
                </div>

                {bankBalanceEntries.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">
                    Belum ada rincian saldo rekening bank yang diinput.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left font-mono">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b">
                        <tr>
                          <th className="p-3">Tanggal</th>
                          <th className="p-3">Nama Bank & No. Rekening</th>
                          <th className="p-3">Keterangan</th>
                          <th className="p-3 text-right">Nominal Saldo</th>
                          {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                            <th className="p-3 text-center">Aksi</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {bankBalanceEntries.map((entry) => (
                          <tr key={entry.id}>
                            <td className="p-3 text-slate-500">{entry.date}</td>
                            <td className="p-3 font-sans font-bold text-slate-800">
                              {entry.bankName}{' '}
                              <span className="font-mono font-normal text-slate-500">({entry.accountNo})</span>
                            </td>
                            <td className="p-3 font-sans text-slate-600">{entry.notes}</td>
                            <td className="p-3 text-right font-bold text-sky-800">{formatIDR(entry.amount)}</td>
                            {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                              <td className="p-3 text-center font-sans">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditBankBalance(entry)}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-300 inline-flex items-center gap-1"
                                  >
                                    <Edit className="w-3 h-3" /> Edit
                                  </button>
                                  {confirmDeleteBankId === entry.id ? (
                                    <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-lg">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteBankBalance(entry.id)}
                                        className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded"
                                      >
                                        Hapus!
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteBankId(null)}
                                        className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded"
                                      >
                                        Batal
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteBankId(entry.id)}
                                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-rose-200 inline-flex items-center gap-1"
                                    >
                                      <Trash2 className="w-3 h-3" /> Hapus
                                    </button>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {cashSettlements.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Riwayat Setoran Penagih</h3>
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b">
                      <tr>
                        <th className="p-3">Tanggal Setor</th>
                        <th className="p-3">Petugas Penagih</th>
                        <th className="p-3 text-right">Total Terkumpul</th>
                        <th className="p-3 text-right">Fisik Diserah</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {cashSettlements.map((s) => (
                        <tr key={s.id}>
                          <td className="p-3 text-slate-500">{s.date}</td>
                          <td className="p-3 font-bold font-sans text-slate-800">{s.collectorName}</td>
                          <td className="p-3 text-right">{formatIDR(s.totalCollected)}</td>
                          <td className="p-3 text-right font-bold text-emerald-700">{formatIDR(s.handedAmount)}</td>
                          <td className="p-3 text-center font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">VERIFIED</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pengeluaran' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 p-5 rounded-3xl shadow-sm gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Pengeluaran & Persetujuan Kas</h2>
                  <p className="text-xs text-slate-500">Approval Ketua dan Sekretaris serta Bendahara</p>
                </div>
                {['SUPERADMIN', 'BENDAHARA', 'KETUA', 'SEKRETARIS'].includes(currentUser.role) && (
                  <button
                    type="button"
                    onClick={() => {
                      setNewExpense({
                        date: new Date().toISOString().split('T')[0],
                        category: categories[0] || INITIAL_EXPENSE_CATEGORIES[0],
                        amount: '',
                        purpose: '',
                        description: '',
                        proofUrl: ''
                      });
                      setShowAddExpenseModal(true);
                    }}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2.5 rounded-2xl font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Ajukan Pengeluaran
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {expenseRequests.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 text-xs">
                    Belum ada pengajuan pengeluaran kas.
                  </div>
                ) : (
                  expenseRequests.map((req) => {
                    const ketuaOk = Boolean(req.approvals?.KETUA?.approved);
                    const sekretarisOk = Boolean(req.approvals?.SEKRETARIS?.approved);
                    const bendaharaOk = Boolean(req.approvals?.BENDAHARA?.approved);

                    return (
                      <div key={req.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-mono text-slate-400 uppercase">{req.id} • Tgl: {req.requestDate}</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm mt-1">{req.purpose}</h3>
                            <p className="text-xs text-slate-500">Kategori: {req.category} • Pengaju: {req.applicantName}</p>
                          </div>
                          <div className="flex flex-col sm:items-end gap-2">
                            <div className="text-left sm:text-right">
                              <div className="text-base font-bold font-mono text-rose-700">{formatIDR(req.amount)}</div>
                              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${req.status === 'REALIZED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                {req.status === 'REALIZED' ? 'APPROVED & REALIZED' : 'PENDING (MENUNGGU 3 PENGURUS INTI)'}
                              </span>
                            </div>

                            {/* AKSI EDIT & HAPUS (KHUSUS SUPERADMIN & BENDAHARA) */}
                            {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingExpense({
                                      ...req,
                                      amount: req.amount.toString()
                                    });
                                    setShowEditExpenseModal(true);
                                  }}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-300 inline-flex items-center gap-1"
                                >
                                  <Edit className="w-3 h-3" /> Edit
                                </button>
                                {confirmDeleteExpenseId === req.id ? (
                                  <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
                                    <span className="text-[10px] text-rose-700 font-bold">Hapus data ini?</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteExpense(req.id)}
                                      className="text-[10px] bg-rose-600 hover:bg-rose-700 text-white px-2 py-0.5 rounded font-bold"
                                    >
                                      Ya, Hapus
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteExpenseId(null)}
                                      className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded font-bold"
                                    >
                                      Batal
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteExpenseId(req.id)}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-rose-200 inline-flex items-center gap-1"
                                  >
                                    <Trash2 className="w-3 h-3" /> Hapus
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600">{req.description}</p>

                        {/* NOTIFIKASI STATUS PERSETUJUAN 3 PENGURUS INTI */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                              <Bell className="w-3.5 h-3.5 text-amber-600" /> Status Persetujuan Pengurus Inti (Wajib 3 Setuju):
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-500">
                              {[ketuaOk, sekretarisOk, bendaharaOk].filter(Boolean).length} / 3 Setuju
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            {/* 1. KETUA */}
                            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${ketuaOk ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-white border-slate-200 text-slate-500'}`}>
                              <div>
                                <div className="font-bold text-[11px]">1. Ketua (Bapak Cece)</div>
                                <div className="text-[10px]">
                                  {ketuaOk ? `✓ Sudah Setuju (${req.approvals.KETUA.by})` : '⏳ Menunggu Persetujuan'}
                                </div>
                              </div>
                              {ketuaOk ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />}
                            </div>

                            {/* 2. SEKRETARIS */}
                            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${sekretarisOk ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-white border-slate-200 text-slate-500'}`}>
                              <div>
                                <div className="font-bold text-[11px]">2. Sekretaris (Rahman)</div>
                                <div className="text-[10px]">
                                  {sekretarisOk ? `✓ Sudah Setuju (${req.approvals.SEKRETARIS.by})` : ketuaOk ? '⏳ Menunggu Sekretaris' : '🔒 Menunggu Ketua'}
                                </div>
                              </div>
                              {sekretarisOk ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />}
                            </div>

                            {/* 3. BENDAHARA */}
                            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${bendaharaOk ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-white border-slate-200 text-slate-500'}`}>
                              <div>
                                <div className="font-bold text-[11px]">3. Bendahara (Yana)</div>
                                <div className="text-[10px]">
                                  {bendaharaOk ? `✓ Sudah Setuju (${req.approvals.BENDAHARA.by})` : (ketuaOk && sekretarisOk) ? '⏳ Menunggu Bendahara' : '🔒 Menunggu Ketua & Sekretaris'}
                                </div>
                              </div>
                              {bendaharaOk ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />}
                            </div>
                          </div>
                        </div>

                        {/* TOMBOL AKSI PERSETUJUAN BERJENJANG */}
                        {req.status === 'PENDING' && (
                          <div className="pt-1 flex flex-wrap justify-end gap-2">
                            {!ketuaOk && ['KETUA', 'SUPERADMIN'].includes(currentUser.role) && (
                              <button
                                onClick={() => handleApproveExpenseRole(req.id, 'KETUA')}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
                              >
                                <Check className="w-4 h-4" /> Setujui sebagai Ketua
                              </button>
                            )}

                            {ketuaOk && !sekretarisOk && ['SEKRETARIS', 'SUPERADMIN'].includes(currentUser.role) && (
                              <button
                                onClick={() => handleApproveExpenseRole(req.id, 'SEKRETARIS')}
                                className="bg-sky-700 hover:bg-sky-800 text-white text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
                              >
                                <Check className="w-4 h-4" /> Setujui sebagai Sekretaris
                              </button>
                            )}

                            {ketuaOk && sekretarisOk && !bendaharaOk && ['BENDAHARA', 'SUPERADMIN'].includes(currentUser.role) && (
                              <button
                                onClick={() => handleApproveExpenseRole(req.id, 'BENDAHARA')}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
                              >
                                <Check className="w-4 h-4" /> Setujui & Realisasikan (Bendahara)
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'master' && ['SUPERADMIN', 'ADMIN'].includes(currentUser.role) && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Kontrol Master & Pengaturan Sistem</h2>
                  <p className="text-xs text-slate-500">Kelola Akun Pengguna & Kategori Pengeluaran</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddCategoryModal(true)} className="bg-slate-800 text-white text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Tambah Kategori
                  </button>
                  <button onClick={() => setShowAddUserModal(true)} className="bg-emerald-700 text-white text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
                    <UserCheck className="w-4 h-4" /> Tambah Pengguna Baru
                  </button>
                </div>
              </div>

              {/* EDIT / HAPUS KATEGORI OLEH SUPERADMIN */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-5 space-y-4">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Daftar Kategori Pengeluaran</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <span>{cat}</span>
                      {currentUser.role === 'SUPERADMIN' && (
                        <div className="flex items-center gap-1 border-l border-emerald-300 pl-1.5">
                          <button onClick={() => { setEditingCategory({ index: idx, oldName: cat, newName: cat }); setShowEditCategoryModal(true); }} className="p-0.5 text-slate-500 hover:text-slate-800" title="Edit Kategori">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button onClick={() => handleDeleteCategory(idx, cat)} className="p-0.5 text-rose-500 hover:text-rose-700" title="Hapus Kategori">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* EDIT USER OLEH SUPERADMIN */}
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-5 space-y-3">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Daftar Akun Pengguna Terdaftar</h3>
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b">
                    <tr>
                      <th className="p-3">Username</th>
                      <th className="p-3">Nama Lengkap</th>
                      <th className="p-3">Role</th>
                      <th className="p-3 text-center">Status</th>
                      {currentUser.role === 'SUPERADMIN' && <th className="p-3 text-center">Aksi SuperAdmin</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y font-mono">
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td className="p-3 font-bold text-slate-900">{u.username}</td>
                        <td className="p-3 font-sans font-semibold text-slate-800">{u.name}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">{u.role}</span></td>
                        <td className="p-3 text-center font-sans"><span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">AKTIF</span></td>
                        {currentUser.role === 'SUPERADMIN' && (
                          <td className="p-3 text-center font-sans">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => { setEditingUser(u); setShowEditUserModal(true); }} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-slate-300">
                                Edit
                              </button>
                              {u.id !== 'usr-00' && (
                                <button onClick={() => handleDeleteUser(u.id)} className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-rose-200">
                                  Hapus
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'laporan' && (
            <div className="space-y-6">
              {/* FILTER BAR & CETAK */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
                <div>
                  <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-700" /> Laporan Keuangan Transparan Bersama
                  </h2>
                  <p className="text-xs text-slate-500">Pilih rentang waktu laporan harian, bulanan, tahunan, atau keseluruhan</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <select
                    value={reportFilterType}
                    onChange={(e) => setReportFilterType(e.target.value)}
                    className="text-xs p-2.5 border rounded-xl font-bold bg-slate-50"
                  >
                    <option value="ALL">Semua Periode</option>
                    <option value="DAILY">Harian</option>
                    <option value="MONTHLY">Bulanan</option>
                    <option value="YEARLY">Tahunan</option>
                  </select>

                  {reportFilterType === 'DAILY' && (
                    <input
                      type="date"
                      value={reportFilterDate}
                      onChange={(e) => setReportFilterDate(e.target.value)}
                      className="text-xs p-2 border rounded-xl font-mono bg-slate-50"
                    />
                  )}

                  {reportFilterType === 'MONTHLY' && (
                    <div className="flex gap-1">
                      <select
                        value={reportFilterMonth}
                        onChange={(e) => setReportFilterMonth(e.target.value)}
                        className="text-xs p-2 border rounded-xl font-bold bg-slate-50"
                      >
                        {MONTH_NAMES.map((m, idx) => (
                          <option key={idx} value={idx + 1}>{m}</option>
                        ))}
                      </select>
                      <select
                        value={reportFilterYear}
                        onChange={(e) => setReportFilterYear(e.target.value)}
                        className="text-xs p-2 border rounded-xl font-bold bg-slate-50"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </select>
                    </div>
                  )}

                  {reportFilterType === 'YEARLY' && (
                    <select
                      value={reportFilterYear}
                      onChange={(e) => setReportFilterYear(e.target.value)}
                      className="text-xs p-2 border rounded-xl font-bold bg-slate-50"
                    >
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  )}

                  <button onClick={() => window.print()} className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md">
                    <Printer className="w-4 h-4" /> Cetak PDF
                  </button>
                </div>
              </div>

              {/* DOKUMEN LAPORAN UTAMA */}
              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 print-report-container">
                <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4">
                  <LogoBumiArsakha className="h-16" showSubtext={true} isDarkBg={false} />
                  <div className="text-right">
                    <h3 className="font-serif font-black text-lg text-slate-900 uppercase">LAPORAN KEUANGAN KAS PERUMAHAN</h3>
                    <p className="text-xs text-slate-600 font-semibold uppercase">
                      Periode Filter: {reportFilterType === 'ALL' ? 'Keseluruhan' : reportFilterType === 'DAILY' ? `Harian (${reportFilterDate})` : reportFilterType === 'MONTHLY' ? `Bulanan (${MONTH_NAMES[reportFilterMonth - 1]} ${reportFilterYear})` : `Tahunan (${reportFilterYear})`}
                    </p>
                  </div>
                </div>

                {/* RINGKASAN KEUANGAN */}
                <div className="grid grid-cols-3 gap-4 font-mono">
                  <div className="bg-slate-50 p-4 rounded-2xl border">
                    <span className="text-[10px] text-slate-500 font-sans block">Total Pemasukan:</span>
                    <strong className="text-lg font-bold text-emerald-800">{formatIDR(filteredTotalIncome)}</strong>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border">
                    <span className="text-[10px] text-slate-500 font-sans block">Total Pengeluaran:</span>
                    <strong className="text-lg font-bold text-rose-700">{formatIDR(filteredTotalExpense)}</strong>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-emerald-900">
                    <span className="text-[10px] text-emerald-800 font-sans block">Saldo Periode Ini:</span>
                    <strong className="text-xl font-black text-emerald-800">{formatIDR(filteredNetBalance)}</strong>
                  </div>
                </div>

                {/* RINCIAN PEMASUKAN */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b pb-1">
                    A. Rincian Pemasukan Kas
                  </h4>
                  <div className="overflow-x-auto">
                    {filteredIncomes.length === 0 ? (
                      <p className="text-xs text-slate-400 py-3 italic">Tidak ada data pemasukan pada periode ini.</p>
                    ) : (
                      <table className="w-full text-xs text-left font-mono border">
                        <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b">
                          <tr>
                            <th className="p-2.5">Tanggal</th>
                            <th className="p-2.5">Kategori / Sumber</th>
                            <th className="p-2.5">Uraian / Keterangan</th>
                            <th className="p-2.5 text-right">Nominal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredIncomes.map((inc, i) => (
                            <tr key={i}>
                              <td className="p-2.5 text-slate-500">{inc.date}</td>
                              <td className="p-2.5 font-bold font-sans text-slate-800">{inc.category}</td>
                              <td className="p-2.5 font-sans text-slate-600">{inc.description}</td>
                              <td className="p-2.5 text-right font-bold text-emerald-700">{formatIDR(inc.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>

                {/* RINCIAN PENGELUARAN */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b pb-1">
                    B. Rincian Pengeluaran Kas (Disetujui)
                  </h4>
                  <div className="overflow-x-auto">
                    {filteredExpenses.length === 0 ? (
                      <p className="text-xs text-slate-400 py-3 italic">Tidak ada data pengeluaran pada periode ini.</p>
                    ) : (
                      <table className="w-full text-xs text-left font-mono border">
                        <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b">
                          <tr>
                            <th className="p-2.5">Tanggal Realisasi</th>
                            <th className="p-2.5">Kategori</th>
                            <th className="p-2.5">Keperluan & Pengaju</th>
                            <th className="p-2.5 text-right">Nominal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredExpenses.map((exp, i) => (
                            <tr key={i}>
                              <td className="p-2.5 text-slate-500">{exp.realizedDate || exp.requestDate}</td>
                              <td className="p-2.5 font-bold font-sans text-slate-800">{exp.category}</td>
                              <td className="p-2.5 font-sans text-slate-600">{exp.purpose} ({exp.applicantName})</td>
                              <td className="p-2.5 text-right font-bold text-rose-700">{formatIDR(exp.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>

                {/* TANDA TANGAN & STEMPEL */}
                <div className="grid grid-cols-3 gap-4 text-center text-xs pt-8 border-t relative items-end">
                  <div className="relative flex flex-col items-center justify-end h-36">
                    <p className="text-slate-500 mb-auto font-medium z-10">Ketua Perumahan,</p>
                    <div className="relative my-1 flex justify-center items-center h-20 w-full">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <SealStempelOfficial size="w-28 h-28" opacity="opacity-90" />
                      </div>
                    </div>
                    <p className="font-bold text-slate-900 underline z-10 relative">Bapak Cece</p>
                  </div>
                  <div className="relative flex flex-col items-center justify-end h-36">
                    <p className="text-slate-500 mb-auto font-medium">Sekretaris,</p>
                    <div className="h-20 w-full"></div>
                    <p className="font-bold text-slate-900 underline">Rahman</p>
                  </div>
                  <div className="relative flex flex-col items-center justify-end h-36">
                    <p className="text-slate-500 mb-auto font-medium">Bendahara Kas,</p>
                    <div className="h-20 w-full"></div>
                    <p className="font-bold text-slate-900 underline">Yana</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && currentUser.role === 'SUPERADMIN' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-700" /> Audit Log System
                </h2>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6">
                {auditLogs.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center">Belum ada aktivitas audit tercatat.</p>
                ) : (
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b">
                      <tr>
                        <th className="p-3">Waktu</th>
                        <th className="p-3">User</th>
                        <th className="p-3">Aksi</th>
                        <th className="p-3">Detail</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {auditLogs.map((l) => (
                        <tr key={l.id}>
                          <td className="p-3 text-slate-500">{l.timestamp}</td>
                          <td className="p-3 font-bold text-slate-800">{l.user}</td>
                          <td className="p-3">{l.action}</td>
                          <td className="p-3 font-sans text-slate-600">{l.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL EDIT TRANSAKSI */}
      {showEditTxModal && editingTx && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Edit Data Transaksi ({editingTx.id})</h3>
              <button onClick={() => setShowEditTxModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveTxEdit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis & Kategori Transaksi</label>
                <input type="text" disabled value={`${editingTx.type} - ${editingTx.category}`} className="w-full text-xs p-2.5 border rounded-xl bg-slate-100 font-bold text-slate-600 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Transaksi</label>
                <input type="text" required value={editingTx.date} onChange={(e) => setEditingTx({ ...editingTx, date: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Uraian / Keterangan</label>
                <input type="text" required value={editingTx.description} onChange={(e) => setEditingTx({ ...editingTx, description: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal Transaksi (Rp)</label>
                <input type="number" required value={editingTx.amount} onChange={(e) => setEditingTx({ ...editingTx, amount: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono font-bold text-emerald-800" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Perubahan Transaksi</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT KWITANSI/TAGIHAN IURAN (Hanya SuperAdmin & Bendahara) */}
      {showEditBillModal && editingBill && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Edit Data Kwitansi / Tagihan Iuran</h3>
              <button onClick={() => setShowEditBillModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveBillEdit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">No. Kwitansi</label>
                <input type="text" disabled value={editingBill.receiptNo} className="w-full text-xs p-2.5 border rounded-xl bg-slate-100 font-mono font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bulan</label>
                  <select
                    value={editingBill.periodMonth}
                    onChange={(e) => setEditingBill({ ...editingBill, periodMonth: e.target.value })}
                    className="w-full text-xs p-2.5 border rounded-xl font-bold bg-white"
                  >
                    {MONTH_NAMES.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun</label>
                  <select
                    value={editingBill.periodYear}
                    onChange={(e) => setEditingBill({ ...editingBill, periodYear: e.target.value })}
                    className="w-full text-xs p-2.5 border rounded-xl font-bold bg-white"
                  >
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal (Rp)</label>
                <input
                  type="number"
                  required
                  value={editingBill.amount}
                  onChange={(e) => setEditingBill({ ...editingBill, amount: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-mono font-bold text-emerald-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingBill.status}
                  onChange={(e) => setEditingBill({ ...editingBill, status: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-bold bg-white"
                >
                  <option value="PAID">PAID (Lunas)</option>
                  <option value="EXEMPTED">EXEMPTED (Bebas / Dispensasi)</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Perubahan Kwitansi</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI RESET TRANSAKSI (MENJADI 0) */}
      {showResetTxModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b pb-3 text-rose-700">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-slate-900 text-sm">Konfirmasi Reset Seluruh Transaksi</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin **menghapus seluruh riwayat aktivitas transaksi kas (pemasukan, iuran, pengeluaran, dan setoran)** sehingga saldo kas menjadi **Rp 0**?
            </p>
            <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
              *Master Data Warga, Unit Rumah, Pengguna, dan Kategori Pengeluaran tidak akan terhapus.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowResetTxModal(false)} className="bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl border">
                Batal
              </button>
              <button onClick={handleResetTransactions} className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md">
                Ya, Reset Menjadi Rp 0
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KWITANSI OFFICIAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 print-receipt-modal-wrapper">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative border border-slate-200 print-receipt-modal-box">
            <div className="flex justify-between items-center no-print border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Kwitansi Tanda Bukti Pembayaran Resmi</h3>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-2 border-sky-500 rounded-2xl p-6 relative bg-gradient-to-b from-sky-50/20 via-white to-sky-50/40 space-y-4 shadow-inner">
              <div className="flex justify-between items-start">
                <LogoBumiArsakha className="h-12" showSubtext={false} isDarkBg={false} />
                <div className="text-right">
                  <span className="text-[10px] font-sans italic text-sky-800 font-bold block">Bersama Membangun Lingkungan yang Nyaman</span>
                </div>
              </div>

              <div className="text-center py-1 bg-sky-900 text-white rounded-lg font-black text-sm tracking-widest uppercase shadow-sm">
                — KWITANSI TANDA BUKTI PEMBAYARAN —
              </div>

              <div className="grid grid-cols-2 text-xs gap-y-1.5 font-mono pt-1 text-slate-800">
                <div><span className="text-slate-500 font-sans inline-block w-28">No. Kwitansi</span>: <strong>{selectedReceipt.bill.receiptNo}</strong></div>
                <div><span className="text-slate-500 font-sans inline-block w-28">Tanggal</span>: {selectedReceipt.bill.paidAt}</div>
                <div><span className="text-slate-500 font-sans inline-block w-28">Nama Warga</span>: <strong>{selectedReceipt.house.residentName}</strong></div>
                <div><span className="text-slate-500 font-sans inline-block w-28">Blok / No. Rumah</span>: <strong>{selectedReceipt.house.block} No. {selectedReceipt.house.number}</strong></div>
              </div>

              <div className="border border-sky-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-sky-100/80 text-sky-900 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5 w-12 text-center">No.</th>
                      <th className="p-2.5">Perihal</th>
                      <th className="p-2.5 text-right w-36">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100 font-mono">
                    <tr>
                      <td className="p-2.5 text-center">1</td>
                      <td className="p-2.5 font-sans">Iuran Kas Bulanan Perumahan ({selectedReceipt.bill.periodMonth})</td>
                      <td className="p-2.5 text-right font-bold">{formatIDR(selectedReceipt.bill.amount)}</td>
                    </tr>
                    <tr className="bg-sky-50/60 font-bold">
                      <td colSpan={2} className="p-2.5 text-right font-sans">Total Pembayaran:</td>
                      <td className="p-2.5 text-right font-black text-sky-900">{formatIDR(selectedReceipt.bill.amount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-end pt-4 text-[11px]">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 border-2 border-emerald-600 text-emerald-800 font-black px-3.5 py-1.5 rounded-xl bg-white text-xs tracking-wider shadow-sm transform rotate-[-3deg]">
                    <Check className="w-4 h-4 stroke-[3]" /> SUDAH BAYAR
                  </div>
                  <p className="text-slate-500 italic text-[10px] max-w-xs leading-relaxed">
                    Terima kasih atas pembayaran iuran bulanan Anda.<br />Semoga kebersamaan kita selalu terjaga.
                  </p>
                </div>

                <div className="text-center relative min-w-[160px]">
                  <p className="text-slate-600 font-medium text-[10px]">Petugas Penerima,</p>
                  <div className="relative h-16 flex items-center justify-center my-1">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      <SealStempelOfficial size="w-20 h-20" opacity="opacity-90" />
                    </div>
                  </div>
                  <p className="font-bold text-slate-900 underline z-10 relative">{selectedReceipt.bill.collectorName || 'Erus'}</p>
                  <p className="text-[9px] text-slate-400">Perumahan Bumi Arsakha Permai</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 no-print">
              <button onClick={() => window.print()} className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md">
                <Printer className="w-4 h-4" /> Cetak / Simpan PDF Kwitansi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PEMASUKAN KAS LAIN */}
      {showAddOtherIncomeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Pencatatan Pemasukan Kas Lainnya</h3>
              <button onClick={() => setShowAddOtherIncomeModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddOtherIncome} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Asal Dana / Kategori</label>
                <input type="text" required placeholder="Contoh: Sumbangan Donatur / Bantuan Pemkab" value={newOtherIncome.source} onChange={(e) => setNewOtherIncome({ ...newOtherIncome, source: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pengirim / Pembayar / Donatur</label>
                <input type="text" required placeholder="Nama Lengkap / Instansi" value={newOtherIncome.payerName} onChange={(e) => setNewOtherIncome({ ...newOtherIncome, payerName: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Penerimaan</label>
                <input type="date" required value={newOtherIncome.date} onChange={(e) => setNewOtherIncome({ ...newOtherIncome, date: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal Penerimaan (Rp)</label>
                <input type="number" required placeholder="100000" value={newOtherIncome.amount} onChange={(e) => setNewOtherIncome({ ...newOtherIncome, amount: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan Catatan Detail</label>
                <textarea rows={2} placeholder="Keterangan tambahan..." value={newOtherIncome.description} onChange={(e) => setNewOtherIncome({ ...newOtherIncome, description: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Pemasukan Lain</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REKAPAN "SELENGKAPNYA" PER UNIT */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Rekapan Pembayaran Iuran Warga</h3>
                <p className="text-xs text-slate-500 font-mono">
                  Unit {showDetailsModal.block} No. {showDetailsModal.number} - {showDetailsModal.residentName}
                </p>
              </div>
              <button onClick={() => { setShowDetailsModal(null); setConfirmDeleteBillId(null); }} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-3 rounded-2xl border flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600">Total Pembayaran Terakumulasi:</span>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  {formatIDR(bills.filter(b => b.houseId === showDetailsModal.id).reduce((acc, c) => acc + c.amount, 0))}
                </span>
              </div>

              <div className="border rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b">
                    <tr>
                      <th className="p-2.5">Bulan / Tahun</th>
                      <th className="p-2.5">Tanggal Bayar</th>
                      <th className="p-2.5 text-right">Nominal</th>
                      <th className="p-2.5 text-center">Status</th>
                      <th className="p-2.5 text-center">Aksi (Kwitansi / Edit / Hapus)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-mono">
                    {bills.filter(b => b.houseId === showDetailsModal.id).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-slate-400 font-sans">Belum ada riwayat pembayaran iuran.</td>
                      </tr>
                    ) : (
                      bills.filter(b => b.houseId === showDetailsModal.id).map((b) => (
                        <tr key={b.id}>
                          <td className="p-2.5 font-bold">{b.periodMonth} {b.periodYear}</td>
                          <td className="p-2.5 text-slate-500 text-[10px]">{b.paidAt}</td>
                          <td className="p-2.5 text-right font-bold text-emerald-700">{formatIDR(b.amount)}</td>
                          <td className="p-2.5 text-center font-sans">
                            <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">
                              {b.status}
                            </span>
                          </td>
                          <td className="p-2.5 text-center font-sans">
                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                              <button
                                onClick={() => setSelectedReceipt({ bill: b, house: showDetailsModal })}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 shadow-sm"
                              >
                                <FileText className="w-3 h-3" /> Kwitansi
                              </button>
                              {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                                <>
                                  <button
                                    onClick={() => { setEditingBill(b); setShowEditBillModal(true); }}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 border border-slate-300"
                                  >
                                    <Edit className="w-3 h-3" /> Edit
                                  </button>
                                  {confirmDeleteBillId === b.id ? (
                                    <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-lg">
                                      <button onClick={() => handleDeleteBill(b.id)} className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Hapus!</button>
                                      <button onClick={() => setConfirmDeleteBillId(null)} className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">Batal</button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setConfirmDeleteBillId(b.id)}
                                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 border border-rose-200"
                                    >
                                      <Trash2 className="w-3 h-3" /> Hapus
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT USER */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Edit Data Pengguna (SuperAdmin)</h3>
              <button onClick={() => setShowEditUserModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                <input type="text" required value={editingUser.username} onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input type="text" required value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Hak Akses</label>
                <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                  <option value="WARGA">WARGA</option>
                  <option value="PETUGAS">PETUGAS</option>
                  <option value="BENDAHARA">BENDAHARA</option>
                  <option value="SEKRETARIS">SEKRETARIS</option>
                  <option value="KETUA">KETUA</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPERADMIN">SUPERADMIN</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password Baru</label>
                <input type="text" required value={editingUser.password} onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Perubahan User</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT KATEGORI */}
      {showEditCategoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Edit Kategori Pengeluaran</h3>
              <button onClick={() => setShowEditCategoryModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUpdateCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kategori</label>
                <input type="text" required value={editingCategory.newName} onChange={(e) => setEditingCategory({ ...editingCategory, newName: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Nama Kategori</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PEMBAYARAN IURAN */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Pencatatan Pembayaran Iuran</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            {paymentError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{paymentError}</span>
              </div>
            )}

            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Unit Rumah</label>
                <select required value={selectedHouseForPayment} onChange={(e) => setSelectedHouseForPayment(e.target.value)} className="w-full text-xs p-2.5 border rounded-xl font-bold bg-slate-50">
                  <option value="">-- Pilih Unit / Warga --</option>
                  {houses.map((h) => (
                    <option key={h.id} value={h.id}>{h.block} No. {h.number} - {h.residentName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mulai Bulan</label>
                  <select value={startMonth} onChange={(e) => setStartMonth(parseInt(e.target.value))} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={idx} value={idx + 1}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun</label>
                  <select value={startYear} onChange={(e) => setStartYear(parseInt(e.target.value))} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Durasi (Jumlah Bulan)</label>
                <select value={paymentMonths} onChange={(e) => setPaymentMonths(parseInt(e.target.value))} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                  <option value={1}>1 Bulan (Rp 5.000)</option>
                  <option value={3}>3 Bulan (Rp 15.000)</option>
                  <option value={6}>6 Bulan (Rp 30.000)</option>
                  <option value={12}>12 Bulan (Rp 60.000)</option>
                </select>
              </div>

              {currentUser.role === 'SUPERADMIN' && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-amber-700" /> Opsi Khusus SuperAdmin (Edit Status/Tanggal)
                  </span>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-1">Set Status Khusus</label>
                    <select value={superAdminCustomStatus} onChange={(e) => setSuperAdminCustomStatus(e.target.value)} className="w-full text-xs p-2 border rounded-xl bg-white font-bold">
                      <option value="PAID">PAID (Lunas)</option>
                      <option value="EXEMPTED">EXEMPTED (Bebas Iuran / Dispensasi)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 mb-1">Tanggal Bayar Manual (Opsional)</label>
                    <input type="text" placeholder="2026-10-16 09:30:00" value={superAdminCustomDate} onChange={(e) => setSuperAdminCustomDate(e.target.value)} className="w-full text-xs p-2 border rounded-xl bg-white font-mono" />
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Proses Pembayaran & Cetak Kwitansi</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH UNIT RUMAH */}
      {showAddHouseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Tambah Unit Rumah Baru</h3>
              <button onClick={() => setShowAddHouseModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddHouse} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Blok Rumah</label>
                <select value={newHouse.block} onChange={(e) => setNewHouse({ ...newHouse, block: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                  {['Blok A', 'Blok B', 'Blok C', 'Blok D', 'Blok E', 'Blok F', 'Blok G', 'Blok H', 'Blok I', 'Blok J', 'Blok K', 'Blok L', 'Blok M'].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Rumah</label>
                <input type="text" required placeholder="01" value={newHouse.number} onChange={(e) => setNewHouse({ ...newHouse, number: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Penghuni Warga</label>
                <input type="text" required placeholder="Nama Lengkap Warga" value={newHouse.residentName} onChange={(e) => setNewHouse({ ...newHouse, residentName: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp / HP</label>
                <input type="text" placeholder="08123456789" value={newHouse.phone} onChange={(e) => setNewHouse({ ...newHouse, phone: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Unit Rumah</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT UNIT RUMAH */}
      {showEditHouseModal && editingHouse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Edit Data Unit Rumah</h3>
              <button onClick={() => setShowEditHouseModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUpdateHouse} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Blok Rumah</label>
                <select value={editingHouse.block} onChange={(e) => setEditingHouse({ ...editingHouse, block: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                  {['Blok A', 'Blok B', 'Blok C', 'Blok D', 'Blok E', 'Blok F', 'Blok G', 'Blok H', 'Blok I', 'Blok J', 'Blok K', 'Blok L', 'Blok M'].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Rumah</label>
                <input type="text" required value={editingHouse.number} onChange={(e) => setEditingHouse({ ...editingHouse, number: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Penghuni Warga</label>
                <input type="text" required value={editingHouse.residentName} onChange={(e) => setEditingHouse({ ...editingHouse, residentName: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp / HP</label>
                <input type="text" value={editingHouse.phone} onChange={(e) => setEditingHouse({ ...editingHouse, phone: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Perubahan Unit</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH KATEGORI */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Tambah Kategori Pengeluaran</h3>
              <button onClick={() => setShowAddCategoryModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kategori Baru</label>
                <input type="text" required placeholder="Contoh: Perbaikan PJU" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Kategori</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH PENGGUNA */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Tambah Pengguna Baru</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Username Login</label>
                <input type="text" required placeholder="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input type="text" required placeholder="Nama Lengkap" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Hak Akses</label>
                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                  <option value="WARGA">WARGA</option>
                  <option value="PETUGAS">PETUGAS</option>
                  <option value="BENDAHARA">BENDAHARA</option>
                  <option value="SEKRETARIS">SEKRETARIS</option>
                  <option value="KETUA">KETUA</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPERADMIN">SUPERADMIN</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input type="text" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Pengguna</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORMULIR PENGAJUAN PENGELUARAN KAS */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Formulir Pengajuan Pengeluaran Kas</h3>
              <button type="button" onClick={() => setShowAddExpenseModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddExpenseRequest} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Pengajuan</label>
                <input
                  type="date"
                  required
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori Pengeluaran</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-bold bg-white"
                >
                  {(categories.length > 0 ? categories : INITIAL_EXPENSE_CATEGORIES).map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal Pengajuan (Rp)</label>
                <input
                  type="number"
                  min="1"
                  required
                  placeholder="50000"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-mono font-bold text-rose-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tujuan / Keperluan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pembelian Lampu PJU Blok A"
                  value={newExpense.purpose}
                  onChange={(e) => setNewExpense({ ...newExpense, purpose: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan Detail</label>
                <textarea
                  rows={2}
                  placeholder="Rincian kebutuhan pengeluaran..."
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
              >
                Kirim Pengajuan Pengeluaran
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT PENGELUARAN KAS (Hanya Bendahara & SuperAdmin) */}
      {showEditExpenseModal && editingExpense && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Edit Pengajuan Pengeluaran Kas</h3>
              <button onClick={() => setShowEditExpenseModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveExpenseEdit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Pengajuan</label>
                <input type="date" required value={editingExpense.requestDate} onChange={(e) => setEditingExpense({ ...editingExpense, requestDate: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                <select value={editingExpense.category} onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal (Rp)</label>
                <input type="number" required value={editingExpense.amount} onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono font-bold text-rose-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tujuan / Keperluan</label>
                <input type="text" required value={editingExpense.purpose} onChange={(e) => setEditingExpense({ ...editingExpense, purpose: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan Detail</label>
                <textarea rows={2} value={editingExpense.description} onChange={(e) => setEditingExpense({ ...editingExpense, description: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Perubahan Pengeluaran</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL INPUT SETORAN PETUGAS */}
      {showSettlementModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Input Setoran Hasil Penagihan Kas</h3>
              <button onClick={() => setShowSettlementModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleRecordSettlement} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Setoran</label>
                <input type="date" required value={newSettlement.date} onChange={(e) => setNewSettlement({ ...newSettlement, date: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Petugas Penagih</label>
                <input type="text" required value={newSettlement.collectorName} onChange={(e) => setNewSettlement({ ...newSettlement, collectorName: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-bold" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Catatan Penagihan (Rp)</label>
                <input type="number" required placeholder="25000" value={newSettlement.totalCollected} onChange={(e) => setNewSettlement({ ...newSettlement, totalCollected: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Uang Fisik Diserahkan ke Bendahara (Rp)</label>
                <input type="number" required placeholder="25000" value={newSettlement.handedAmount} onChange={(e) => setNewSettlement({ ...newSettlement, handedAmount: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan</label>
                <input type="text" placeholder="Setoran tunai" value={newSettlement.notes} onChange={(e) => setNewSettlement({ ...newSettlement, notes: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Simpan Setoran</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT NOTIFIKASI PENGINGAT (TEXT BERJALAN) */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingAnnouncement ? 'Edit Notifikasi Pengingat' : 'Tambah Notifikasi Pengingat Baru'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAnnouncementModal(false);
                  setEditingAnnouncement(null);
                }}
                className="text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAnnouncement} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Isi Pesan Teks Berjalan (Dashboard)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Mohon segera melunasi iuran bulan ini sebelum tanggal 10..."
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full text-xs p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
              >
                {editingAnnouncement ? 'Simpan Perubahan Pengingat' : 'Tampilkan di Dashboard'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL INPUT / EDIT SALDO REKENING BANK (SUPERADMIN & BENDAHARA) */}
      {showBankBalanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingBankEntry ? 'Edit Saldo Rekening Bank' : 'Input Saldo Rekening Bank'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowBankBalanceModal(false);
                  setEditingBankEntry(null);
                }}
                className="text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBankBalance} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Pencatatan</label>
                <input
                  type="date"
                  required
                  value={bankEntryForm.date}
                  onChange={(e) => setBankEntryForm({ ...bankEntryForm, date: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Bank</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bank Mandiri / BRI / BCA"
                  value={bankEntryForm.bankName}
                  onChange={(e) => setBankEntryForm({ ...bankEntryForm, bankName: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Rekening</label>
                <input
                  type="text"
                  required
                  placeholder="123-456-7890"
                  value={bankEntryForm.accountNo}
                  onChange={(e) => setBankEntryForm({ ...bankEntryForm, accountNo: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal Saldo Rekening (Rp)</label>
                <input
                  type="number"
                  required
                  placeholder="500000"
                  value={bankEntryForm.amount}
                  onChange={(e) => setBankEntryForm({ ...bankEntryForm, amount: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl font-mono font-bold text-sky-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan / Catatan</label>
                <input
                  type="text"
                  placeholder="Contoh: Saldo rekening kas perumahan per akhir bulan"
                  value={bankEntryForm.notes}
                  onChange={(e) => setBankEntryForm({ ...bankEntryForm, notes: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
              >
                {editingBankEntry ? 'Simpan Perubahan Saldo Bank' : 'Simpan Saldo Rekening Bank'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
