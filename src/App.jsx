import React, { useState, useMemo, useEffect } from 'react';
import {
  Users, Home, DollarSign, FileText, CheckCircle2, XCircle, AlertCircle,
  Plus, Edit, Trash2, Printer, Download, Shield, Eye, Lock, LogOut,
  ChevronRight, Calendar, UserCheck, TrendingUp, TrendingDown, RefreshCw,
  Search, Filter, Bell, Menu, X, Upload, Check, ShieldAlert, Key, FolderCheck, Info, RotateCcw
} from 'lucide-react';

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
        <path d="M 140,45 Q 160,15 165,0 Q 175,20 160,40 Z" fill="#22c55e" />
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
  const [currentUser, setCurrentUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // HELPER LOCALSTORAGE PERSISTENCE
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`kas_bap_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveState = (key, val) => {
    try {
      localStorage.setItem(`kas_bap_${key}`, JSON.stringify(val));
    } catch (e) {
      console.error(e);
    }
  };

  // APP DATA STATE (WITH LOCALSTORAGE)
  const [users, setUsers] = useState(() => loadState('users', INITIAL_USERS));
  const [houses, setHouses] = useState(() => loadState('houses', INITIAL_HOUSES));
  const [bills, setBills] = useState(() => loadState('bills', []));
  const [incomes, setIncomes] = useState(() => loadState('incomes', []));
  const [expenseRequests, setExpenseRequests] = useState(() => loadState('expenseRequests', []));
  const [categories, setCategories] = useState(() => loadState('categories', INITIAL_EXPENSE_CATEGORIES));
  const [auditLogs, setAuditLogs] = useState(() => loadState('auditLogs', []));
  const [cashSettlements, setCashSettlements] = useState(() => loadState('cashSettlements', []));

  useEffect(() => saveState('users', users), [users]);
  useEffect(() => saveState('houses', houses), [houses]);
  useEffect(() => saveState('bills', bills), [bills]);
  useEffect(() => saveState('incomes', incomes), [incomes]);
  useEffect(() => saveState('expenseRequests', expenseRequests), [expenseRequests]);
  useEffect(() => saveState('categories', categories), [categories]);
  useEffect(() => saveState('auditLogs', auditLogs), [auditLogs]);
  useEffect(() => saveState('cashSettlements', cashSettlements), [cashSettlements]);

  // SEARCH STATES
  const [houseSearchQuery, setHouseSearchQuery] = useState('');
  const [iuranSearchQuery, setIuranSearchQuery] = useState('');

  // SYSTEM SETTINGS CONFIG
  const [systemConfig, setSystemConfig] = useState({
    defaultMonthlyFee: 5000,
    bankName: 'Bank Mandiri',
    bankAccountNo: '123-456-7890',
    bankAccountHolder: 'KAS PERUMAHAN BUMI ARSAKHA PERMAI',
    autoWaReminder: true,
    cashInHand: 0,
    bankBalance: 0
  });

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

  // FORM STATES
  const [newUser, setNewUser] = useState({ username: '', name: '', role: 'WARGA', password: 'password123' });
  const [editingUser, setEditingUser] = useState(null);
  const [editingHouse, setEditingHouse] = useState(null);
  const [editingCategory, setEditingCategory] = useState({ index: -1, oldName: '', newName: '' });
  const [newSettlement, setNewSettlement] = useState({ collectorName: 'Erus', totalCollected: '', handedAmount: '', notes: '' });
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

  const [newExpense, setNewExpense] = useState({ category: INITIAL_EXPENSE_CATEGORIES[0], amount: '', purpose: '', description: '', proofUrl: '' });
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

      // Update nominal bill jika transaksi berasal dari iuran warga
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
    setSystemConfig(prev => ({ ...prev, cashInHand: 0, bankBalance: 0 }));
    logActivity('TRANSACTIONS_RESET', 'Semua aktivitas transaksi kas di-reset menjadi 0.');
    setShowResetTxModal(false);
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
    if (!selectedHouseForPayment) return;
    const targetHouse = houses.find((h) => h.id === selectedHouseForPayment);
    if (!targetHouse) return;

    const totalAmount = paymentMonths * 5000;
    const nowStr = superAdminCustomDate || new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' });
    const receiptNum = `000${bills.length + 1}/BBAP/${startYear}`;

    const updatedBills = [...bills];
    let monthIdx = startMonth - 1;
    let yearCurr = startYear;

    const periodMonthsText = [];

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
    if (!newExpense.amount || !newExpense.purpose) return;
    const reqObj = {
      id: `exp-${Date.now()}`,
      requestDate: new Date().toISOString().split('T')[0],
      applicantName: `${currentUser.name} (${currentUser.role})`,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      purpose: newExpense.purpose,
      description: newExpense.description || '-',
      proofUrl: newExpense.proofUrl || '',
      status: 'PENDING',
      realizedDate: null,
      realizedProofUrl: null,
      approvals: { 'usr-01': null, 'usr-02': null, 'usr-03': null }
    };
    setExpenseRequests((prev) => [reqObj, ...prev]);
    logActivity('EXPENSE_SUBMITTED', `Pengajuan pengeluaran: ${reqObj.purpose}`);
    setShowAddExpenseModal(false);
    setNewExpense({ category: categories[0], amount: '', purpose: '', description: '', proofUrl: '' });
  };

  const handleApproveExpense = (expId) => {
    setExpenseRequests(prev => prev.map(e => {
      if (e.id === expId) {
        return {
          ...e,
          status: 'REALIZED',
          realizedDate: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' })
        };
      }
      return e;
    }));
    logActivity('EXPENSE_APPROVED', `Disetujui pengeluaran ID: ${expId}`);
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
      date: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }),
      collectorName: newSettlement.collectorName,
      totalCollected: collected,
      handedAmount: handed,
      difference: diff,
      status: diff === 0 ? 'VERIFIED_MATCH' : 'MISMATCH',
      notes: newSettlement.notes || '-'
    };
    setCashSettlements((prev) => [setObj, ...prev]);
    setSystemConfig((prev) => ({ ...prev, cashInHand: prev.cashInHand + handed }));
    logActivity('SETTLEMENT_RECORDED', `Setoran kas dari ${setObj.collectorName}`);
    setShowSettlementModal(false);
    setNewSettlement({ collectorName: 'Erus', totalCollected: '', handedAmount: '', notes: '' });
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
    { id: 'warga', label: 'Data Warga & Rumah', icon: Users, show: true },
    { id: 'iuran', label: 'Penarikan Iuran', icon: DollarSign, show: ['SUPERADMIN', 'PETUGAS', 'BENDAHARA', 'KETUA'].includes(currentUser.role) },
    { id: 'rekonsiliasi', label: 'Setoran & Rekonsiliasi Kas', icon: RefreshCw, show: ['SUPERADMIN', 'BENDAHARA', 'PETUGAS', 'KETUA'].includes(currentUser.role) },
    { id: 'pengeluaran', label: 'Pengeluaran Kas', icon: FileText, show: ['SUPERADMIN', 'BENDAHARA', 'KETUA', 'SEKRETARIS'].includes(currentUser.role) },
    { id: 'laporan', label: 'Laporan Keuangan', icon: Printer, show: true },
    { id: 'master', label: 'Kontrol Master & Pengaturan', icon: Key, show: ['SUPERADMIN', 'ADMIN'].includes(currentUser.role) },
    { id: 'audit', label: 'Audit Log System', icon: Shield, show: currentUser.role === 'SUPERADMIN' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <header className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white border-b border-emerald-700/50 sticky top-0 z-30 shadow-md no-print">
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

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
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

          {activeTab === 'warga' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Home className="w-5 h-5 text-emerald-700" /> Master Data Warga & Unit Rumah
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Total {houses.length} Unit Rumah Terdaftar</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama / unit rumah..."
                      value={houseSearchQuery}
                      onChange={(e) => setHouseSearchQuery(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {['SUPERADMIN', 'ADMIN'].includes(currentUser.role) && (
                    <button onClick={() => setShowAddHouseModal(true)} className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-4 py-2 rounded-2xl font-bold flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap">
                      <Plus className="w-4 h-4" /> Tambah Unit Rumah
                    </button>
                  )}
                </div>
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
                          <p className="text-xs text-slate-500 font-mono mt-0.5">No WA: {h.phone}</p>
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-slate-200 p-5 rounded-3xl shadow-sm gap-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Pencatatan & Penagihan Iuran Warga</h2>
                  <p className="text-xs text-slate-500">Sistem Iuran Standar Rp 5.000 / Bulan</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari unit / nama warga..."
                      value={iuranSearchQuery}
                      onChange={(e) => setIuranSearchQuery(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {['SUPERADMIN', 'PETUGAS', 'BENDAHARA'].includes(currentUser.role) && (
                    <button onClick={() => setShowPaymentModal(true)} className="w-full sm:w-auto bg-emerald-700 text-white text-xs px-4 py-2.5 rounded-2xl font-bold flex items-center justify-center gap-1.5 shadow-md whitespace-nowrap">
                      <Plus className="w-4 h-4" /> Catat Pembayaran Iuran
                    </button>
                  )}
                </div>
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
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Penyetoran Petugas & Rekonsiliasi Kas</h2>
                  <p className="text-xs text-slate-500">Pencocokan Uang Fisik Tunai dan Rekening Bank</p>
                </div>
                {['SUPERADMIN', 'BENDAHARA'].includes(currentUser.role) && (
                  <button onClick={() => setShowSettlementModal(true)} className="bg-emerald-700 text-white text-xs px-4 py-2.5 rounded-2xl font-bold flex items-center gap-1.5 shadow-md">
                    <Plus className="w-4 h-4" /> Input Setoran Penagih
                  </button>
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
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border">
                      <span className="font-sans text-slate-600">Saldo Rekening Bank:</span>
                      <strong>{formatIDR(systemConfig.bankBalance)}</strong>
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

              {cashSettlements.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Riwayat Setoran Penagih</h3>
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b">
                      <tr>
                        <th className="p-3">Waktu</th>
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
              <div className="flex justify-between items-center bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Pengeluaran & Persetujuan Kas</h2>
                  <p className="text-xs text-slate-500">Mekanisme Approval Kolektif Pengurus</p>
                </div>
                {['SUPERADMIN', 'BENDAHARA', 'KETUA'].includes(currentUser.role) && (
                  <button onClick={() => setShowAddExpenseModal(true)} className="bg-emerald-700 text-white text-xs px-4 py-2.5 rounded-2xl font-bold flex items-center gap-1.5 shadow-md">
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
                  expenseRequests.map((req) => (
                    <div key={req.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">{req.id}</span>
                          <h3 className="font-bold text-slate-900 text-sm">{req.purpose}</h3>
                          <p className="text-xs text-slate-500">Kategori: {req.category} • Pengaju: {req.applicantName}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold font-mono text-rose-700">{formatIDR(req.amount)}</div>
                          <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${req.status === 'REALIZED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {req.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{req.description}</p>

                      {req.status === 'PENDING' && ['SUPERADMIN', 'KETUA', 'BENDAHARA'].includes(currentUser.role) && (
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => handleApproveExpense(req.id)}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-4 h-4" /> Setujui & Realisasikan Pengeluaran
                          </button>
                        </div>
                      )}
                    </div>
                  ))
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
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex justify-between items-center no-print">
                <div>
                  <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-700" /> Laporan Keuangan Transparan Bersama
                  </h2>
                  <p className="text-xs text-slate-500">Dapat Diakses Seluruh Warga Perumahan</p>
                </div>
                <button onClick={() => window.print()} className="bg-slate-900 text-white text-xs px-4 py-2.5 rounded-2xl font-bold flex items-center gap-1.5 shadow-md">
                  <Printer className="w-4 h-4" /> Cetak / Unduh Laporan PDF
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4">
                  <LogoBumiArsakha className="h-16" showSubtext={true} isDarkBg={false} />
                  <div className="text-right">
                    <h3 className="font-serif font-black text-lg text-slate-900 uppercase">LAPORAN KEUANGAN KAS PERUMAHAN</h3>
                    <p className="text-xs text-slate-600 font-semibold">Periode: 2026</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 font-mono">
                  <div className="bg-slate-50 p-4 rounded-2xl border">
                    <span className="text-[10px] text-slate-500 font-sans block">Total Pemasukan:</span>
                    <strong className="text-lg font-bold text-emerald-800">{formatIDR(totalOfficialIncome)}</strong>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border">
                    <span className="text-[10px] text-slate-500 font-sans block">Total Pengeluaran:</span>
                    <strong className="text-lg font-bold text-rose-700">{formatIDR(totalRealizedExpense)}</strong>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-emerald-900">
                    <span className="text-[10px] text-emerald-800 font-sans block">Saldo Kas Akhir:</span>
                    <strong className="text-xl font-black text-emerald-800">{formatIDR(finalOfficialCashBalance)}</strong>
                  </div>
                </div>

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
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative border border-slate-200">
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
                <Printer className="w-4 h-4" /> Cetak Kwitansi
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Rekapan Pembayaran Iuran Warga</h3>
                <p className="text-xs text-slate-500 font-mono">
                  Unit {showDetailsModal.block} No. {showDetailsModal.number} - {showDetailsModal.residentName}
                </p>
              </div>
              <button onClick={() => setShowDetailsModal(null)} className="text-slate-400"><X className="w-5 h-5" /></button>
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
                      <th className="p-2.5 text-center">Kwitansi</th>
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
                            <button
                              onClick={() => setSelectedReceipt({ bill: b, house: showDetailsModal })}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 shadow-sm"
                            >
                              <FileText className="w-3 h-3" /> Lihat Kwitansi
                            </button>
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

      {/* MODAL AJUKAN PENGELUARAN */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Formulir Pengajuan Pengeluaran Kas</h3>
              <button onClick={() => setShowAddExpenseModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddExpenseRequest} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-bold">
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal (Rp)</label>
                <input type="number" required placeholder="50000" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tujuan / Keperluan</label>
                <input type="text" required placeholder="Pembelian Lampu PJU" value={newExpense.purpose} onChange={(e) => setNewExpense({ ...newExpense, purpose: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan Detail</label>
                <textarea rows={2} placeholder="Keterangan..." value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} className="w-full text-xs p-2.5 border rounded-xl" />
              </div>
              <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md">Kirim Pengajuan</button>
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
    </div>
  );
}