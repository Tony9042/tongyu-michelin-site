import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Car, Facebook, Instagram, Phone, Mail, MapPin, Calendar,
  MessageSquareText, ArrowRight, ShieldCheck, TimerReset, Handshake, Sparkles, ChevronRight,
  Plus, Pencil, Trash2, X, Check, Menu, Star, ChevronLeft, ChevronDown, Wrench, Gauge, Battery
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface EventItem {
  id: number; tag: string; title: string; desc: string; img: string; start: string; end: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "tonyu_events_v3";
function loadEvents(fallback: EventItem[]): EventItem[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw); } catch {}
  return fallback;
}
function saveEvents(events: EventItem[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); }

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#FFCD11] z-[60]"
    />
  );
}

// ─── Floating LINE Button ─────────────────────────────────────────────────────
function FloatingContact() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://lin.ee/DB1cJfL" target="_blank" rel="noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#06C755] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
          aria-label="LINE 聯絡"
        >
          <MessageSquareText className="w-7 h-7 text-white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ─── NavBar ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#services", label: "服務項目" },
  { href: "#events",   label: "近期活動" },
  { href: "#about",    label: "關於我們" },
  { href: "#contact",  label: "聯絡方式" },
  { href: "#social",   label: "社群媒體" },
  { href: "#booking",  label: "線上預約" },
];

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(`#${id}`); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ paddingTop: scrolled ? "8px" : "12px", paddingBottom: scrolled ? "8px" : "12px" }}
      transition={{ duration: 0.3 }}
      className="fixed top-[3px] inset-x-0 z-50 bg-black/90 backdrop-blur border-b border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <motion.img
            src="/assets/logo.jpg" alt="統玉LOGO"
            animate={{ width: scrolled ? "32px" : "36px", height: scrolled ? "32px" : "36px" }}
            transition={{ duration: 0.3 }}
            className="rounded-xl object-contain"
          />
          <span className="font-extrabold tracking-wide text-white text-sm md:text-base">
            MICHELIN米其林輪胎中心-統玉店
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              className={`relative hover:text-[#FFCD11] transition pb-1 ${active === l.href ? "text-[#FFCD11]" : ""}`}>
              {l.label}
              {active === l.href && (
                <motion.span layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FFCD11] rounded-full" />
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#booking" className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#FFCD11] text-black font-bold px-5 py-2 text-sm">
              立即預約
            </motion.button>
          </a>
          <button className="md:hidden text-white" onClick={() => setOpen(o => !o)}>
            <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <Menu className="w-6 h-6" />
            </motion.div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden bg-black border-t border-white/10 px-4 pb-4 overflow-hidden">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block text-white/80 py-2 hover:text-[#FFCD11] transition">{l.label}</a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)}>
              <button className="w-full mt-2 rounded-full bg-[#FFCD11] text-black font-bold px-5 py-2 text-sm">立即預約</button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const slides = [
    { src: "/assets/slide1.jpg", alt: "店面外觀" },
    { src: "/assets/car1.jpg",   alt: "輪胎更換" },
    { src: "/assets/car2.jpg",   alt: "專業施工" },
    { src: "/assets/people.jpg", alt: "技師團隊" },
    { src: "/assets/slide2.jpg", alt: "店面正面" },
  ];
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  useEffect(() => {
    const t = setInterval(() => go((index + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [index, go, slides.length]);

  const badges = [
    { icon: <ShieldCheck className="w-4 h-4" />, label: "米其林合作店" },
    { icon: <TimerReset className="w-4 h-4" />, label: "當日快速完修" },
    { icon: <Handshake className="w-4 h-4" />, label: "透明報價" },
    { icon: <Sparkles className="w-4 h-4" />, label: "原廠規範保養" },
  ];

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <AnimatePresence mode="sync" custom={dir}>
        <motion.img
          key={slides[index].src}
          src={slides[index].src} alt={slides[index].alt}
          className="absolute inset-0 w-full h-full object-cover"
          custom={dir}
          initial={{ opacity: 0, x: dir * 60, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

      {/* Prev / Next arrows */}
      <button onClick={() => go((index - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#FFCD11]/30 hover:border-[#FFCD11] transition backdrop-blur-sm">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => go((index + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#FFCD11]/30 hover:border-[#FFCD11] transition backdrop-blur-sm">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-[#FFCD11]" : "w-2 bg-white/40"}`} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#FFCD11]/20 border border-[#FFCD11]/40 text-[#FFCD11] text-sm px-4 py-1.5 rounded-full font-medium">
            <ShieldCheck className="w-4 h-4" /> 米其林官方合作夥伴
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
            專業守護<br /><span className="text-[#FFCD11]">每一次出發</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/80 text-lg leading-relaxed">
            米其林輪胎夥伴｜電腦診斷｜四輪定位｜機油保養｜煞車底盤<br />
            以誠信與技術為核心，提供安全、透明、值得信賴的維修體驗
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3">
            <a href="#booking">
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                className="rounded-full bg-[#FFCD11] text-black font-bold px-7 py-3 text-base shadow-lg shadow-yellow-500/20">
                線上預約
              </motion.button>
            </a>
            <a href="#services" className="inline-flex items-center gap-1 text-white font-medium hover:text-[#FFCD11] transition">
              了解服務 <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {badges.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
                className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 p-3 backdrop-blur-sm hover:border-[#FFCD11]/50 hover:bg-white/15 transition">
                <span className="text-[#FFCD11]">{item.icon}</span>
                <span className="text-sm text-white">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews Marquee ──────────────────────────────────────────────────────────
const REVIEWS = [
  { name: "許先生", stars: 5, text: "師傅專業、報價透明，換胎＋定位超有感！" },
  { name: "陳小姐", stars: 5, text: "更換米其林輪胎後行駛更安靜，服務很細心。" },
  { name: "林大哥", stars: 5, text: "方向盤抖動處理很快，還主動幫我檢查底盤。" },
  { name: "王先生", stars: 5, text: "四輪定位後開車穩多了，不再跑偏，推薦！" },
  { name: "張小姐", stars: 5, text: "機油保養當天完修，師傅講解很詳細，很放心。" },
  { name: "蔡大哥", stars: 5, text: "換了米其林輪胎，安靜度跟抓地力都明顯提升。" },
  { name: "Google 評價", stars: 5, text: "到店環境整潔，技師態度親切，服務流程透明。" },
  { name: "劉先生", stars: 5, text: "煞車片更換後剎車力道明顯改善，非常感謝！" },
];

function Reviews() {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <div className="bg-[#FFCD11] py-10 overflow-hidden">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-black font-extrabold text-lg">
          <Star className="w-5 h-5 fill-black" /> Google 評價 5.0 <Star className="w-5 h-5 fill-black" />
        </div>
      </div>
      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 w-max">
          {doubled.map((r, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 w-64 flex-shrink-0 border border-white/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-black text-sm">{r.name}</span>
                <span className="text-black text-xs">{"★".repeat(r.stars)}</span>
              </div>
              <p className="text-black/80 text-sm leading-relaxed">「{r.text}」</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Services with Modal ──────────────────────────────────────────────────────
const SERVICE_DATA = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "輪胎銷售與安裝",
    short: "米其林官方合作，原廠規格輪胎選配",
    details: [
      "🏆 米其林 / 普利司通 / 南港等多品牌庫存",
      "🔧 專業換胎，附贈輪胎充氮氣服務",
      "⚖️ 換胎後免費動態平衡",
      "📏 依車型推薦最適規格尺寸",
      "🛡️ 完工後提供行駛品質確認",
    ],
    color: "from-yellow-500/20 to-yellow-600/5",
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "3D四輪定位",
    short: "電腦精準定位，改善偏磨跑偏問題",
    details: [
      "🖥️ 採用 3D 電腦定位儀器，數據精準",
      "🔄 改善車輛跑偏、方向盤偏移、吃胎現象",
      "⏱️ 施工約 45 分鐘，快速完成",
      "📄 施工前後數據報告對照",
      "✅ 提升輪胎壽命與行車穩定性",
    ],
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "煞車/底盤維修",
    short: "來令片、碟盤、避震器全面檢測",
    details: [
      "🛑 煞車來令片、碟盤更換與研磨",
      "🔩 避震器、拉桿、球頭、橡皮套檢測",
      "🚗 完整底盤安全項目診斷",
      "🔊 異音排查與處理",
      "🛡️ 施工後測試確認，附保固",
    ],
    color: "from-red-500/20 to-red-600/5",
  },
  {
    icon: <TimerReset className="w-6 h-6" />,
    title: "快速維修服務",
    short: "機油更換、濾心等，當日完修",
    details: [
      "🛢️ 機油更換（多品牌規格可選）",
      "🌬️ 空氣濾心、機油芯更換",
      "🧹 節氣門清洗、燃油系統清潔",
      "🌧️ 雨刷更換、燈泡更換",
      "⚡ 電瓶檢測與更換",
    ],
    color: "from-green-500/20 to-green-600/5",
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "透明報價與保固",
    short: "施工前報價確認，零件來源清楚",
    details: [
      "📋 施工前提供明細報價，確認後才動工",
      "🏷️ 零件來源清楚標示，拒絕黑箱",
      "🛡️ 完工後提供零件與工資保固",
      "📞 售後問題免費諮詢",
      "⭐ Google 評價真實反映服務品質",
    ],
    color: "from-purple-500/20 to-purple-600/5",
  },
  {
    icon: <Battery className="w-6 h-6" />,
    title: "保養提醒服務",
    short: "里程/時程主動提醒，車況長保最佳",
    details: [
      "📱 完修後依里程或時間設定保養提醒",
      "💬 LINE 官方帳號主動通知",
      "📊 建立個人愛車維修記錄",
      "🔍 下次到廠快速掌握車輛狀態",
      "💡 提供日常用車保養小知識",
    ],
    color: "from-orange-500/20 to-orange-600/5",
  },
];

function Services() {
  const [selected, setSelected] = useState<typeof SERVICE_DATA[0] | null>(null);

  return (
    <section id="services" className="py-20 bg-[#111827]">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <span className="text-[#FFCD11] text-sm font-semibold tracking-widest uppercase">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">服務項目</h2>
          <p className="text-white/60 mt-3">從日常保養到底盤懸吊、煞車、輪胎定位，一站式完成</p>
          <p className="text-white/40 text-xs mt-2">點擊卡片了解詳細服務內容 ↓</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_DATA.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(s)}
              className={`text-left rounded-2xl border border-white/10 bg-gradient-to-br ${s.color} p-6 hover:border-[#FFCD11]/60 transition group relative overflow-hidden`}>
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#FFCD11]/5 rounded-2xl" />
              <div className="w-12 h-12 rounded-xl bg-[#FFCD11]/10 border border-[#FFCD11]/20 flex items-center justify-center text-[#FFCD11] mb-4 group-hover:bg-[#FFCD11]/25 group-hover:scale-110 transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.short}</p>
              <div className="flex items-center gap-1 mt-4 text-[#FFCD11] text-xs font-semibold">
                查看詳細 <ChevronRight className="w-3 h-3" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-md max-h-[85vh] overflow-y-auto bg-[#1a2235] border border-white/10 rounded-3xl p-7 shadow-2xl">
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition">
                <X className="w-4 h-4" />
              </button>
              <div className="w-14 h-14 rounded-2xl bg-[#FFCD11]/10 border border-[#FFCD11]/30 flex items-center justify-center text-[#FFCD11] mb-5">
                {selected.icon}
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-1">{selected.title}</h3>
              <p className="text-white/50 text-sm mb-5">{selected.short}</p>
              <ul className="space-y-3">
                {selected.details.map((d, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="text-white/80 text-sm leading-relaxed bg-white/5 rounded-xl px-4 py-2.5">
                    {d}
                  </motion.li>
                ))}
              </ul>
              <a href="#booking" onClick={() => setSelected(null)}>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="w-full mt-6 rounded-full bg-[#FFCD11] text-black font-bold py-3 text-sm">
                  立即預約此服務
                </motion.button>
              </a>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── About ────────────────────────────────────────────────────────────────────
const About: React.FC = () => (
  <section id="about" className="py-20 bg-white">
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="space-y-5">
          <span className="text-[#FFCD11] text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">關於統玉店</h2>
          <p className="text-gray-600 leading-relaxed">
            MICHELIN米其林輪胎中心-統玉店深耕在地多年，累積豐富的維修經驗與口碑。從到廠接待、檢測、報價到施工與交車，以透明流程、原廠規範與專業技師，為您帶來安心可靠的服務品質。
          </p>
          <ul className="space-y-3">
            {[
              "專業四輪定位（改善吃胎、跑偏、方向盤不正）",
              "米其林合作店，原廠規格建議與輪胎維護",
              "電腦診斷、底盤煞車、機油保養一站式",
              "完善保固與售後關懷，提供保養提醒",
            ].map((t, i) => (
              <motion.li key={t}
                initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#FFCD11] flex items-center justify-center">
                  <ChevronRight className="w-3 h-3 text-black" />
                </span>
                <span className="text-gray-700">{t}</span>
              </motion.li>
            ))}
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { n: 10, suffix: "+", label: "年在地口碑" },
              { n: 5000, suffix: "+", label: "服務車輛" },
              { n: 5, suffix: "★", label: "Google 評價" },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="text-center rounded-2xl bg-[#FFCD11]/10 border border-[#FFCD11]/20 py-4">
                <div className="text-2xl font-extrabold text-gray-900">
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative">
          <motion.div
            animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-4 bg-[#FFCD11]/10 rounded-3xl -z-10" />
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#FFCD11]/30 shadow-xl">
            <img src="/assets/team.jpg" alt="技師團隊照" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Events ───────────────────────────────────────────────────────────────────
function Events({ events }: { events: EventItem[] }) {
  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[#FFCD11] bg-black text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full">Events</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">近期活動</h2>
          <p className="text-gray-500 mt-3">最新優惠與品牌活動，歡迎到店參加</p>
        </motion.div>

        {events.length === 0 ? (
          <p className="text-center text-gray-400 py-16">目前無進行中的活動</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={e.img} alt={e.title}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="w-full object-contain max-h-80" />
                  <span className="absolute top-4 left-4 bg-[#FFCD11] text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                    {e.tag}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{e.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{e.desc}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400 pt-2 border-t border-gray-100">
                    <Calendar className="w-4 h-4" />
                    <span>{e.start} ～ {e.end}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} className="mt-12 text-center">
          <a href="#booking">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="rounded-full bg-black text-[#FFCD11] font-bold px-8 py-3 hover:bg-gray-800 transition text-base shadow-lg">
              前往預約保養或換胎
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
const EMPTY: EventItem = { id: 0, tag: "", title: "", desc: "", img: "", start: "", end: "" };
function AdminPanel({ events, setEvents }: { events: EventItem[]; setEvents: (e: EventItem[]) => void }) {
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const openNew = () => { setEditing({ ...EMPTY, id: Date.now() }); setIsNew(true); };
  const openEdit = (e: EventItem) => { setEditing({ ...e }); setIsNew(false); };
  const save = () => {
    if (!editing) return;
    const updated = isNew ? [...events, editing] : events.map(e => e.id === editing.id ? editing : e);
    setEvents(updated); saveEvents(updated); setEditing(null);
  };
  const remove = (id: number) => {
    if (!confirm("確定要刪除這個活動嗎？")) return;
    const updated = events.filter(e => e.id !== id); setEvents(updated); saveEvents(updated);
  };
  const field = (key: keyof EventItem, label: string, multiline = false) => {
    if (!editing) return null;
    const val = editing[key] as string;
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {multiline
          ? <textarea rows={6} value={val} onChange={ev => setEditing({ ...editing, [key]: ev.target.value })}
              className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFCD11] outline-none" />
          : <input value={val} onChange={ev => setEditing({ ...editing, [key]: ev.target.value })}
              className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFCD11] outline-none" />}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">活動後台管理</h1>
            <p className="text-sm text-gray-500 mt-1">新增、編輯或刪除首頁的近期活動</p>
          </div>
          <div className="flex gap-2">
            <button onClick={openNew} className="flex items-center gap-2 bg-[#FFCD11] text-black font-bold px-4 py-2 rounded-xl hover:bg-yellow-300 transition text-sm">
              <Plus className="w-4 h-4" /> 新增活動
            </button>
            <a href="#home" className="flex items-center gap-2 bg-black text-white font-medium px-4 py-2 rounded-xl hover:bg-gray-800 transition text-sm">回到首頁</a>
          </div>
        </div>
        {editing && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border-2 border-[#FFCD11]">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{isNew ? "新增活動" : "編輯活動"}</h2>
            <div className="space-y-4">
              {field("tag", "標籤（如：進行中、限時優惠）")}
              {field("title", "活動標題")}
              {field("desc", "活動內容（可換行）", true)}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">活動圖片路徑</label>
                <input value={editing.img} onChange={ev => setEditing({ ...editing, img: ev.target.value })}
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFCD11] outline-none"
                  placeholder="/assets/events/event1.jpg" />
                <p className="text-xs text-gray-400 mt-1">請將圖片放到 <code>public/assets/events/</code> 資料夾後填入路徑</p>
                {editing.img && <img src={editing.img} alt="預覽" className="mt-2 max-h-40 rounded-xl border object-contain" onError={e => (e.currentTarget.style.display="none")} />}
              </div>
              {field("start", "開始日期（YYYY-MM-DD）")}
              {field("end", "結束日期（YYYY-MM-DD）")}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex items-center gap-2 bg-[#FFCD11] text-black font-bold px-5 py-2 rounded-xl hover:bg-yellow-300 transition text-sm"><Check className="w-4 h-4" /> 儲存</button>
              <button onClick={() => setEditing(null)} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-200 transition text-sm"><X className="w-4 h-4" /> 取消</button>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {events.length === 0 && <div className="bg-white rounded-2xl p-8 text-center text-gray-400">目前沒有活動，點擊「新增活動」開始</div>}
          {events.map(e => (
            <div key={e.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4 items-start">
              {e.img && <img src={e.img} alt="" className="w-24 h-16 object-cover rounded-xl flex-shrink-0 border" onError={ev => (ev.currentTarget.style.display="none")} />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#FFCD11] text-black text-xs font-bold px-2 py-0.5 rounded-full">{e.tag}</span>
                  <span className="text-xs text-gray-400">{e.start} ～ {e.end}</span>
                </div>
                <div className="font-semibold text-gray-900 truncate">{e.title}</div>
                <div className="text-sm text-gray-500 mt-1 line-clamp-2 whitespace-pre-line">{e.desc}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(e)} className="p-2 rounded-xl bg-gray-100 hover:bg-[#FFCD11]/20 text-gray-600 transition"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(e.id)} className="p-2 rounded-xl bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-8 text-center">資料儲存在瀏覽器 localStorage。清除瀏覽器資料後會還原成預設活動。</p>
      </div>
    </div>
  );
}

// ─── Booking ──────────────────────────────────────────────────────────────────
const Booking: React.FC = () => (
  <section id="booking" className="py-20 bg-white">
    <div className="mx-auto max-w-7xl px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <span className="text-[#FFCD11] bg-black text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full">Booking</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">線上預約</h2>
        <p className="text-gray-500 mt-3">留下您的需求與聯絡方式，我們將儘速與您確認時段</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="rounded-2xl border-2 border-[#FFCD11]/30 p-8 bg-[#FFCD11]/5 flex flex-col items-center justify-center text-center gap-5">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 4 }}
            className="w-16 h-16 rounded-full bg-[#FFCD11]/20 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[#FFCD11]" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">線上預約系統</h3>
            <p className="text-gray-500 text-sm mt-2">點擊下方按鈕，填寫預約資訊<br />我們將儘速與您確認時段</p>
          </div>
          <a href="https://cloud.carce.cc/booking?id=1926" target="_blank" rel="noreferrer" className="w-full">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#FFCD11] text-black font-bold px-6 py-3 w-full text-base shadow-md shadow-yellow-200">
              立即線上預約
            </motion.button>
          </a>
          <a href="https://lin.ee/DB1cJfL" target="_blank" rel="noreferrer" className="w-full">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="rounded-full border-2 border-[#FFCD11] text-gray-800 font-semibold px-6 py-3 hover:bg-[#FFCD11]/10 w-full text-base transition">
              用 LINE 預約
            </motion.button>
          </a>
        </motion.div>

        <motion.div id="contact" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="rounded-2xl border p-6">
          <h3 className="font-bold text-gray-900 mb-4">聯絡資訊</h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#FFCD11]" /> (07)374-4333 / (07)374-2949</div>
            <div className="flex items-center gap-3"><MessageSquareText className="w-4 h-4 text-[#FFCD11]" /> LINE：https://lin.ee/DB1cJfL</div>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#FFCD11]" /> 814高雄市仁武區水管路333號</div>
          </div>
          <div className="rounded-xl overflow-hidden mt-4">
            <iframe title="map"
              src="https://maps.google.com/maps?q=814高雄市仁武區水管路333號&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-60 border-0" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Social ───────────────────────────────────────────────────────────────────
const Social: React.FC = () => (
  <section id="social" className="py-20 bg-[#111827]">
    <div className="mx-auto max-w-7xl px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <span className="text-[#FFCD11] text-sm font-semibold tracking-widest uppercase">Follow Us</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">社群媒體</h2>
        <p className="text-white/60 mt-3">追蹤我們，掌握最新活動、保養知識與輪胎優惠</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Facebook className="w-5 h-5"/>, label: "Facebook 粉專", href: "https://www.facebook.com/duck670413/", sub: "按讚追蹤最新消息" },
          { icon: <Instagram className="w-5 h-5"/>, label: "Instagram", href: "https://www.instagram.com/tonyu_tire_repair/", sub: "精彩施工動態分享" },
          { icon: <MessageSquareText className="w-5 h-5"/>, label: "LINE 官方帳號", href: "https://lin.ee/DB1cJfL", sub: "快速預約與諮詢" },
          { icon: <Mail className="w-5 h-5"/>, label: "Google 商家", href: "https://maps.app.goo.gl/3YSsFbhMxDW6mUBk9", sub: "查看評價與位置" },
        ].map((s, i) => (
          <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }} className="group block">
            <div className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#FFCD11]/60 hover:bg-white/10 transition-all duration-300 p-5 h-full">
              <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}
                className="w-10 h-10 rounded-xl bg-[#FFCD11]/10 flex items-center justify-center text-[#FFCD11] mb-3">
                {s.icon}
              </motion.div>
              <div className="font-semibold text-white">{s.label}</div>
              <div className="text-sm text-white/50 mt-1">{s.sub}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="bg-black border-t border-white/10 pt-12 pb-8">
    <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-6 items-center">
      <div className="text-sm text-white/60">
        <img src="/assets/logo.jpg" alt="統玉LOGO" className="h-12 mb-3 rounded-xl" />
        <div className="font-bold text-white">MICHELIN米其林輪胎中心-統玉店</div>
        <div className="mt-1">統一編號：86816691｜服務時間：週一至週六 09:30–19:00（週日公休）</div>
        <div>地址：814高雄市仁武區水管路333號｜電話：(07)374-4333 / (07)374-2949</div>
      </div>
      <div className="flex md:justify-end gap-4 text-sm">
        <a href="#home" className="text-white/60 hover:text-[#FFCD11] transition">回到頂部</a>
        <span className="text-white/20">|</span>
        <a href="#booking" className="text-white/60 hover:text-[#FFCD11] transition">立即預約</a>
        <span className="text-white/20">|</span>
        <a href="#admin" className="text-white/30 hover:text-[#FFCD11] transition text-xs">後台管理</a>
      </div>
    </div>
    <div className="mx-auto max-w-7xl px-4 mt-6 text-xs text-white/30">
      © {new Date().getFullYear()} TongYu Michelin. All rights reserved.
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = () => setIsAdmin(window.location.hash === "#admin");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  useEffect(() => {
    fetch("/eventsData.json")
      .then(r => r.json())
      .then((data: EventItem[]) => setEvents(loadEvents(data)))
      .catch(() => setEvents(loadEvents([])));
  }, []);

  if (isAdmin) {
    return <><NavBar /><AdminPanel events={events} setEvents={setEvents} /></>;
  }

  return (
    <div className="min-h-screen bg-white text-[15px]">
      <ScrollProgress />
      <NavBar />
      <Hero />
      <Reviews />
      <Services />
      <About />
      <Events events={events} />
      <Booking />
      <Social />
      <Footer />
      <FloatingContact />
    </div>
  );
}
