import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Coffee, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Trash2,
  CheckCircle2,
  Star,
  UtensilsCrossed,
  Flame,
  ThermometerSnowflake,
  Droplets,
  Milk
} from 'lucide-react';

// --- DATA KONFIGURASI ---
const slideData = [
  {
    id: '1',
    title: 'Selamat Datang di ARDA COFFEE!',
    description: 'Nikmati suasana santai dengan kopi kualitas terbaik di jantung Kota Pontianak.',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Biji Kopi Pilihan',
    description: 'Kami menghadirkan racikan kopi nusantara yang dipanggang dengan penuh keahlian.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Siap Melayani 24 Jam',
    description: 'Lapar atau butuh kafein di tengah malam? ARDA COFFEE selalu buka untuk Anda.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
  },
];

const menuData = [
  // --- KOPI ---
  { id: 'm12', name: 'Kopi Susu', price: 10000, category: 'Kopi', description: 'Kopi hitam dengan campuran susu kental manis yang pas.', image: 'https://images.unsplash.com/photo-1517701550927-30cf4bb1dba5?q=80&w=400&h=400&fit=crop', isBestSeller: true },
  { 
    id: 'm14', 
    name: 'Cappuccino', 
    category: 'Kopi', 
    description: 'Kopi lembut dengan busa susu melimpah.', 
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&h=400&fit=crop',
    isBestSeller: true,
    options: [
      { name: 'Panas', price: 7000, icon: <Flame size={16} /> },
      { name: 'Dingin', price: 9000, icon: <ThermometerSnowflake size={16} /> }
    ]
  },
  { id: 'm1', name: 'Espresso', price: 15000, category: 'Kopi', description: 'Ekstrak kopi murni dengan rasa yang sangat kuat dan pekat.', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&h=400&fit=crop' },
  { id: 'm2', name: 'Kopi Susu Gula Aren', price: 22000, category: 'Kopi', description: 'Perpaduan kopi, susu segar, dan manisnya gula aren asli.', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400&h=400&fit=crop' },
  { id: 'm3', name: 'Americano', price: 18000, category: 'Kopi', description: 'Espresso yang ditambahkan air panas untuk rasa yang lebih ringan.', image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=400&h=400&fit=crop' },
  { id: 'm9', name: 'Kopi Bubuk', price: 8000, category: 'Kopi', description: 'Kopi hitam bubuk murni racikan khas Arda.', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&h=400&fit=crop' },
  { id: 'm10', name: 'Kopi Jahe', price: 11000, category: 'Kopi', description: 'Hangatnya jahe geprek berpadu dengan kopi pilihan.', image: 'https://images.unsplash.com/photo-1606791405792-1004f17189bb?q=80&w=400&h=400&fit=crop' },
  { id: 'm11', name: 'Kopi Saring', price: 8000, category: 'Kopi', description: 'Kopi saring tradisional dengan aroma yang memikat.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop' },
  { id: 'm13', name: 'L. W. C', price: 7000, category: 'Kopi', description: 'Kopi dengan cita rasa unik dan harga ekonomis.', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=400&h=400&fit=crop' },

  // --- NON-KOPI ---
  { 
    id: 'm19', 
    name: 'Teh', 
    category: 'Non-Kopi', 
    description: 'Berbagai macam sajian teh terbaik.', 
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&h=400&fit=crop',
    isBestSeller: true,
    options: [
      { name: 'Teh Es', price: 5000, icon: <ThermometerSnowflake size={16} /> },
      { name: 'Teh Panas', price: 5000, icon: <Flame size={16} /> },
      { name: 'Teh Susu Dingin', price: 9000, icon: <Milk size={16} /> },
      { name: 'Teh Susu Panas', price: 7000, icon: <Flame size={16} /> }
    ]
  },
  { id: 'm15', name: 'Air Mineral', price: 5000, category: 'Non-Kopi', description: 'Kesegaran air mineral murni.', image: 'https://images.unsplash.com/photo-1523362622602-d24b249d23f8?q=80&w=400&h=400&fit=crop', specialColor: 'blue' },
  { id: 'm16', name: 'Bear Brand', price: 12000, category: 'Non-Kopi', description: 'Susu murni kaleng untuk stamina dan kesehatan.', image: 'https://images.unsplash.com/photo-1528750955925-53f58e2c41a9?q=80&w=400&h=400&fit=crop' },
  { id: 'm17', name: 'Chocolatos', category: 'Non-Kopi', description: 'Minuman cokelat lezat bertekstur kental.', image: 'https://images.unsplash.com/photo-1544787210-2211d247156a?q=80&w=400&h=400&fit=crop', options: [{ name: 'Dingin', price: 9000, icon: <ThermometerSnowflake size={16} /> }, { name: 'Panas', price: 7000, icon: <Flame size={16} /> }] },
  { id: 'm20', name: 'Energen', price: 7000, category: 'Non-Kopi', description: 'Minuman sereal bernutrisi, cocok untuk pengganjal lapar.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&h=400&fit=crop' },
  { id: 'm21', name: 'Es Susu', price: 7000, category: 'Non-Kopi', description: 'Susu segar dingin yang manis dan creamy.', image: 'https://images.unsplash.com/photo-1550583724-125581fe2f8a?q=80&w=400&h=400&fit=crop' },
  { id: 'm18', name: 'Extra Joss', category: 'Non-Kopi', description: 'Minuman energi untuk membangkitkan semangat.', image: 'https://images.unsplash.com/photo-1533227268408-a771dc951010?q=80&w=400&h=400&fit=crop', options: [{ name: 'Pakai Susu', price: 9000, icon: <Milk size={16} /> }, { name: 'Original', price: 6000, icon: <Droplets size={16} /> }] },
  { id: 'm22', name: 'Pocari Sweat', price: 8000, category: 'Non-Kopi', description: 'Minuman isotonik pengganti cairan tubuh.', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&h=400&fit=crop' },
  { id: 'm23', name: 'Pulpy Orange', price: 8000, category: 'Non-Kopi', description: 'Minuman jeruk dengan bulir asli yang menyegarkan.', image: 'https://images.unsplash.com/photo-1613478223719-2ab80260f00c?q=80&w=400&h=400&fit=crop' },

  // --- MAKANAN ---
  { id: 'f1', name: 'Indomie Goreng Telur', price: 11000, category: 'Makanan', description: 'Indomie goreng dengan telur mata sapi/dadar.', image: 'https://images.unsplash.com/photo-1582993582827-02081c2add4a?q=80&w=400&h=400&fit=crop', isBestSeller: true },
  { id: 'f3', name: 'Indomie Jumbo Telur', price: 19000, category: 'Makanan', description: 'Porsi besar indomie goreng jumbo ditambah telur.', image: 'https://images.unsplash.com/photo-1591814447921-7f434774212e?q=80&w=400&h=400&fit=crop', isBestSeller: true },
  { id: 'f2', name: 'Indomie Goreng', price: 8000, category: 'Makanan', description: 'Indomie goreng original yang melegenda.', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=400&h=400&fit=crop' },
  { id: 'f4', name: 'Indomie Rebus Telur', price: 10000, category: 'Makanan', description: 'Indomie rebus hangat dengan telur yang lembut.', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=400&h=400&fit=crop' },
  { id: 'f5', name: 'Indomie Rebus', price: 7000, category: 'Makanan', description: 'Indomie kuah hangat, nikmat saat cuaca dingin.', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=400&h=400&fit=crop' },

  // --- CAMILAN ---
  { id: 's1', name: 'Roti Bakar Coklat Keju', price: 18000, category: 'Camilan', description: 'Roti bakar dengan isian coklat melimpah dan taburan keju.', image: 'https://images.unsplash.com/photo-1603903052732-f599447a43f1?q=80&w=400&h=400&fit=crop', isBestSeller: true },
  { id: 's2', name: 'Pisang Goreng Pasir', price: 15000, category: 'Camilan', description: 'Pisang manis digoreng krispi dengan balutan tepung panir.', image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=400&h=400&fit=crop' },
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(0); 
  const [tableNumber, setTableNumber] = useState(null);
  const [activeTab, setActiveTab] = useState(null); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const meja = params.get('meja');
    if (meja) setTableNumber(meja);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (product, variant = null) => {
    const itemToAdd = variant 
      ? { ...product, id: `${product.id}-${variant.name.replace(/\s+/g, '-')}`, name: `${product.name} ${variant.name}`, price: variant.price }
      : product;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemToAdd.id);
      if (existing) {
        return prev.map(item => item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...itemToAdd, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      const itemToUpdate = prev.find(item => item.id === id);
      if (!itemToUpdate) return prev;
      if (itemToUpdate.quantity === 1 && delta === -1) {
        return prev.filter(item => item.id !== id);
      }
      return prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // --- LOGIKA UTAMA CHECKOUT (DIPERBAIKI) ---
  const handleCheckout = () => {
    const orderList = cart.map(item => `- ${item.name} (${item.quantity}x)`).join('\n');
    const tableInfo = tableNumber ? `MEJA: ${tableNumber}` : 'Bawa Pulang / Takeaway';
    
    const waMessage = `Halo ARDA COFFEE!
Saya ingin memesan:
---------------------------
${orderList}
---------------------------
Total: Rp ${totalPrice.toLocaleString('id-ID')}
Lokasi: ${tableInfo}
---------------------------
Mohon diproses, terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waMessage)}`;
    
    // 1. Buka WhatsApp
    window.open(waUrl, '_blank');
    
    // 2. Bersihkan State & Tampilkan Modal Sukses
    setCart([]);
    setIsCartOpen(false);
    setCheckoutStep(1); // Memicu Modal "Selamat Menikmati"
  };

  const toggleCategory = (cat) => {
    if (activeTab === cat) {
      setActiveTab(null);
    } else {
      setActiveTab(cat);
      const menuSection = document.getElementById('menu-section');
      if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getFilteredItems = () => {
    if (!activeTab) return menuData;
    if (activeTab === 'Minuman') {
      const kopiItems = menuData.filter(i => i.category === 'Kopi');
      const nonKopiItems = menuData.filter(i => i.category === 'Non-Kopi');
      const sortedNonKopi = [...nonKopiItems].sort((a, b) => a.id === 'm15' ? -1 : b.id === 'm15' ? 1 : 0);
      return { kopi: kopiItems, nonKopi: sortedNonKopi };
    }
    const makananItems = menuData.filter(i => i.category === 'Makanan');
    const camilanItems = menuData.filter(i => i.category === 'Camilan');
    return { camilan: camilanItems, makanan: makananItems };
  };

  const filteredData = getFilteredItems();
  const bestSellers = !activeTab 
    ? menuData.filter(i => i.isBestSeller)
    : activeTab === 'Minuman'
      ? [...(filteredData.kopi || []), ...(filteredData.nonKopi || [])].filter(i => i.isBestSeller)
      : [...(filteredData.makanan || []), ...(filteredData.camilan || [])].filter(i => i.isBestSeller);

  const getPriceRange = (options) => {
    if (!options) return "";
    const prices = options.map(o => o.price);
    const min = Math.min(...prices) / 1000;
    const max = Math.max(...prices) / 1000;
    return `${min}k - ${max}k`;
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-amber-200 overflow-x-hidden">
      
      {/* --- FLOATING BOOKMARK --- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3 pointer-events-none items-end">
        <button 
          onClick={() => toggleCategory('Minuman')} 
          className={`pointer-events-auto flex items-center h-14 transition-all duration-500 ease-in-out shadow-2xl rounded-l-full border-y border-l overflow-hidden ${
            activeTab === 'Minuman' ? 'w-40 bg-stone-900 text-white border-stone-800 pl-4' : 'w-14 bg-white text-stone-900 border-stone-200 pl-4'
          }`}
        >
          <Coffee size={24} className="flex-shrink-0" />
          <span className={`font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-500 ml-3 ${activeTab === 'Minuman' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>Minuman</span>
        </button>

        <button 
          onClick={() => toggleCategory('Makanan')} 
          className={`pointer-events-auto flex items-center h-14 transition-all duration-500 ease-in-out shadow-2xl rounded-l-full border-y border-l overflow-hidden ${
            activeTab === 'Makanan' ? 'w-40 bg-amber-700 text-white border-amber-800 pl-4' : 'w-14 bg-white text-stone-900 border-stone-200 pl-4'
          }`}
        >
          <UtensilsCrossed size={22} className="flex-shrink-0" />
          <span className={`font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-500 ml-3 ${activeTab === 'Makanan' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>Makanan</span>
        </button>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 h-16 flex items-center">
        <div className="container mx-auto max-w-4xl px-4 flex justify-between items-center text-left">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white shadow-lg"><Coffee size={24} /></div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-stone-900 leading-none uppercase">ARDA COFFEE</h1>
              <p className="text-[10px] font-bold text-amber-700 tracking-widest uppercase italic">The Real Roastery</p>
            </div>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-stone-100 rounded-2xl active:scale-90 transition-all">
            <ShoppingCart size={22} />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
          </button>
        </div>
      </nav>

      <main className="container mx-auto max-w-4xl pb-20 text-left">
        {!activeTab && (
          <section className="relative h-[400px] md:h-[550px] overflow-hidden md:rounded-b-[3rem] shadow-2xl">
            {slideData.map((slide, index) => (
              <div key={slide.id} className={`absolute inset-0 transition-all duration-1000 ${index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
                <img src={slide.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent flex flex-col justify-end p-8 md:p-16 text-white text-left">
                  <h2 className="text-3xl md:text-5xl font-black mb-2 leading-tight">{slide.title}</h2>
                  <p className="text-stone-200 text-sm md:text-lg max-w-md">{slide.description}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* INFO BAR */}
        <section className={`px-4 ${activeTab ? 'mt-6' : '-mt-8'} relative z-10 transition-all duration-500`}>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-4 text-stone-800">
              <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-amber-800 flex-shrink-0"><MapPin size={24} /></div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-none">Lokasi Kami</p>
                <p className="text-sm font-black mt-1">Jl. Khw. Hasyim No. 10, Pontianak</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl text-green-700 flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-black uppercase tracking-tighter italic">BUKA 24 JAM</span>
            </div>
          </div>
          {tableNumber && (
            <div className="mt-4 bg-stone-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3"><CheckCircle2 className="text-amber-400 flex-shrink-0" size={20} /><span className="text-sm font-bold">Terdeteksi: Meja {tableNumber}</span></div>
              <button onClick={() => setTableNumber(null)} className="text-[10px] font-bold underline opacity-70 tracking-widest uppercase">Ganti</button>
            </div>
          )}
        </section>

        {/* --- BEST SELLER --- */}
        {bestSellers.length > 0 && (
          <section className="mt-12 px-4">
            <div className="flex items-center gap-2 mb-6 text-left">
              <Star className="text-amber-500 fill-amber-500" size={24} />
              <h2 className="text-2xl font-black text-stone-800 tracking-tighter uppercase">Favorit {activeTab || "Minggu Ini"}</h2>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory">
              {bestSellers.map((item) => (
                <div key={item.id} onClick={() => setSelectedItem(item)} className="min-w-[280px] bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden snap-center cursor-pointer active:scale-95 transition-all text-left">
                  <div className="h-44 relative overflow-hidden"><img src={item.image} className="w-full h-full object-cover" /><div className="absolute top-5 left-5 bg-white/90 px-3 py-1 rounded-full text-[10px] font-black text-amber-800">🔥 BEST SELLER</div></div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-lg font-bold text-stone-800 leading-tight">{item.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-black text-stone-900">{item.options ? `Rp ${getPriceRange(item.options)}` : `Rp ${item.price/1000}k`}</p>
                      {!item.options && <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="p-2 bg-amber-100 text-amber-900 rounded-xl hover:bg-stone-900 hover:text-white transition-colors"><Plus size={18} /></button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- MENU SECTION --- */}
        <section id="menu-section" className="px-4 mt-12 transition-all">
          <div className="flex items-center justify-between mb-8 text-left">
            <div>
              <h2 className="text-2xl font-black text-stone-800 tracking-tighter uppercase">{activeTab ? `Menu ${activeTab}` : 'Daftar Menu'}</h2>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest italic">{activeTab ? 'Pilih kesukaanmu di sini' : 'Racikan terbaik Arda Coffee'}</p>
            </div>
            {activeTab && <button onClick={() => setActiveTab(null)} className="text-[10px] font-black text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 uppercase tracking-tighter hover:bg-amber-100 transition-colors">Semua</button>}
          </div>

          {activeTab ? (
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3 py-2 px-1 text-stone-400 font-black uppercase tracking-[0.2em] text-[11px]">
                  <div className="flex-1 h-[1px] bg-stone-200" /><span>{activeTab === 'Minuman' ? 'Non-Kopi' : 'Camilan'}</span><div className="flex-1 h-[1px] bg-stone-200" />
                </div>
                {(activeTab === 'Minuman' ? filteredData.nonKopi : filteredData.camilan).map((item) => (
                  <MenuCardVertical key={item.id} item={item} onClick={() => setSelectedItem(item)} onAdd={() => addToCart(item)} priceRange={getPriceRange(item.options)} />
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3 py-2 px-1 text-stone-400 font-black uppercase tracking-[0.2em] text-[11px]">
                  <div className="flex-1 h-[1px] bg-stone-200" /><span>{activeTab === 'Minuman' ? 'Kopi' : 'Makanan'}</span><div className="flex-1 h-[1px] bg-stone-200" />
                </div>
                {(activeTab === 'Minuman' ? filteredData.kopi : filteredData.makanan).map((item) => (
                  <MenuCardVertical key={item.id} item={item} onClick={() => setSelectedItem(item)} onAdd={() => addToCart(item)} priceRange={getPriceRange(item.options)} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
              {filteredData.map((item) => <MenuCardStandard key={item.id} item={item} onClick={() => setSelectedItem(item)} onAdd={() => addToCart(item)} priceRange={getPriceRange(item.options)} />)}
            </div>
          )}
        </section>
      </main>

      {/* --- CART DRAWER --- */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        totalPrice={totalPrice} 
        tableNumber={tableNumber} 
        onCheckout={handleCheckout} // PROPS BARU: MENGHUBUNGKAN KE LOGIKA UTAMA
      />
      
      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} onAdd={addToCart} />}
      {checkoutStep === 1 && <SuccessModal onClose={() => setCheckoutStep(0)} />}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function MenuCardStandard({ item, onClick, onAdd, priceRange }) {
  return (
    <div onClick={onClick} className={`group p-4 rounded-[2rem] shadow-sm border flex gap-4 cursor-pointer items-center active:scale-95 transition-all text-left ${item.specialColor === 'blue' ? 'bg-blue-50 border-blue-200 shadow-blue-50' : 'bg-white border-stone-100'}`}>
      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0"><img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
      <div className="flex-1">
        <span className={`text-[9px] font-black uppercase tracking-widest ${item.specialColor === 'blue' ? 'text-blue-700' : 'text-amber-700'}`}>{item.category}</span>
        <h3 className="text-base font-bold text-stone-800 leading-tight">{item.name}</h3>
        <div className="flex justify-between items-center mt-2 text-stone-900">
          <p className="font-black text-sm">{item.options ? `Rp ${priceRange}` : `Rp ${item.price/1000}k`}</p>
          {!item.options && <button onClick={(e) => { e.stopPropagation(); onAdd(); }} className={`p-2 rounded-xl shadow-lg text-white ${item.specialColor === 'blue' ? 'bg-blue-600' : 'bg-stone-900'}`}><Plus size={16} /></button>}
        </div>
      </div>
    </div>
  );
}

function MenuCardVertical({ item, onClick, onAdd, priceRange }) {
  const isBlue = item.specialColor === 'blue';
  return (
    <div onClick={onClick} className={`group rounded-[2.5rem] shadow-sm border overflow-hidden flex flex-col cursor-pointer active:scale-95 transition-all text-left ${isBlue ? 'bg-blue-50 border-blue-200 shadow-blue-50' : 'bg-white border-stone-100'}`}>
      <div className="aspect-[4/3] w-full overflow-hidden relative"><img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />{isBlue && <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />}</div>
      <div className="p-4 md:p-6 flex flex-col flex-1">
        <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 ${isBlue ? 'text-blue-600' : 'text-stone-400'}`}>{item.category}</span>
        <h3 className="text-sm md:text-lg font-bold text-stone-800 leading-tight mb-3 line-clamp-2 min-h-[40px]">{item.name}</h3>
        <div className="flex justify-between items-center mt-auto">
          <p className="font-black text-stone-900 text-xs md:text-base">{item.options ? `Rp ${priceRange}` : `Rp ${item.price/1000}k`}</p>
          {!item.options && <button onClick={(e) => { e.stopPropagation(); onAdd(); }} className={`p-1.5 md:p-2 rounded-xl transition-all shadow-sm ${isBlue ? 'bg-blue-600 text-white' : 'bg-amber-100 text-amber-900 hover:bg-stone-900 hover:text-white'}`}><Plus size={16} /></button>}
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, totalPrice, tableNumber, onCheckout }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex justify-between items-center bg-stone-50 text-stone-800">
          <h2 className="text-xl font-black uppercase tracking-tighter">Pesanan Anda</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-stone-300 opacity-50 text-center"><ShoppingCart size={64} className="mb-4 mx-auto"/><p className="font-black uppercase tracking-widest text-[10px]">Keranjang Kosong</p></div> : cart.map(item => (
            <div key={item.id} className="flex gap-4 text-left">
              <img src={item.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
              <div className="flex-1">
                <div className="flex justify-between font-bold text-sm text-stone-800"><h4>{item.name}</h4><button onClick={() => removeFromCart(item.id)}><Trash2 size={16} className="text-stone-300 hover:text-red-500" /></button></div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center bg-stone-100 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1">{item.quantity === 1 ? <Trash2 size={14} className="text-red-400" /> : <Minus size={14}/>}</button>
                    <span className="w-8 text-center text-xs font-black text-stone-800">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={14}/></button>
                  </div>
                  <p className="font-black text-sm text-stone-900">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && <div className="p-6 bg-stone-50 border-t border-stone-200"><div className="flex justify-between text-lg font-black mb-6 text-stone-800 uppercase tracking-tighter"><span>Total Bayar</span><span>Rp {totalPrice.toLocaleString('id-ID')}</span></div><button onClick={onCheckout} className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-stone-900/20 active:scale-95 transition-all">WhatsApp Order <ChevronRight size={18}/></button></div>}
      </div>
    </div>
  );
}

function ItemModal({ item, onClose, onAdd }) {
  const isBlue = item.specialColor === 'blue';
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        <div className="h-64 relative overflow-hidden text-left"><img src={item.image} className="w-full h-full object-cover" /><button onClick={onClose} className="absolute top-5 right-5 bg-black/20 backdrop-blur-md p-2 rounded-full text-white"><X size={20} /></button></div>
        <div className="p-8 text-center">
          <span className={`inline-block px-4 py-1 text-[10px] font-black rounded-full mb-4 uppercase tracking-tighter ${isBlue ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-900'}`}>{item.category}</span>
          <h3 className="text-2xl font-black mb-2 text-stone-800 leading-tight">{item.name}</h3>
          <p className="text-stone-500 text-sm mb-8 leading-relaxed italic">"{item.description}"</p>
          <div className="flex flex-col gap-3">
            {item.options ? item.options.map(opt => (
              <button key={opt.name} onClick={() => { onAdd(item, opt); onClose(); }} className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-stone-800"><span className="opacity-70">{opt.icon}</span> {opt.name} • Rp {opt.price.toLocaleString('id-ID')}</button>
            )) : <button onClick={() => { onAdd(item); onClose(); }} className={`w-full text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all ${isBlue ? 'bg-blue-600 hover:bg-blue-700' : 'bg-stone-900 hover:bg-stone-800'}`}>TAMBAH KE PESANAN • Rp {item.price.toLocaleString('id-ID')}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white p-10 rounded-[3rem] text-center max-w-sm shadow-2xl animate-in zoom-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-2xl font-black mb-2 text-stone-800 uppercase tracking-tighter">Pesan Terkirim!</h3>
        <p className="text-stone-500 text-sm mb-8">Admin kami akan segera menyiapkan pesanan Anda. Silakan kirim pesan WhatsApp tersebut.</p>
        <div className="p-4 bg-amber-50 rounded-2xl mb-8">
           <p className="text-amber-900 font-bold italic">"Selamat Menikmati!"</p>
        </div>
        <button onClick={onClose} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black shadow-lg shadow-stone-900/20 uppercase tracking-widest text-[10px]">Selesai</button>
      </div>
    </div>
  );
}