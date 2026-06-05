import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car, Facebook, Instagram, Phone, Mail, MapPin, Calendar,
  MessageSquareText, ArrowRight, ShieldCheck, TimerReset, Handshake, Sparkles, ChevronRight,
  Plus, Pencil, Trash2, X, Check, Menu
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface EventItem {
  id: number;
  tag: string;
  title: string;
  desc: string;
  img: string;
  start: string;
  end: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "tonyu_events_v2";

function loadEvents(fallback: EventItem[]): EventItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as EventItem[];
  } catch { /* ignore */ }
  return fallback;
}

function saveEvents(events: EventItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

// ─── NavBar ──────────────────────────────────────────────────────────────────
const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "服務項目" },
    { href: "#events",   label: "近期活動" },
    { href: "#about",    label: "關於我們" },
    { href: "#contact",  label: "聯絡方式" },
    { href: "#social",   label: "社群媒體" },
    { href: "#booking",  label: "線上預約" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img src="/assets/logo.jpg" alt="統玉LOGO" className="w-9 h-9 rounded-xl object-contain" />
          <span className="font-extrabold tracking-wide text-white text-sm md:text-base">
            MICHELIN米其林輪胎中心-統玉店
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-[#FFCD11] transition">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#booking" className="hidden md:block">
            <button className="rounded-full bg-[#FFCD11] text-black font-bold px-5 py-2 hover:bg-yellow-300 transition text-sm">
              立即預約
            </button>
          </a>
          <button className="md:hidden text-white" onClick={() => setOpen(o => !o)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 pb-4 space-y-2">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block text-white/80 py-2 hover:text-[#FFCD11] transition">{l.label}</a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)}>
            <button className="w-full mt-2 rounded-full bg-[#FFCD11] text-black font-bold px-5 py-2 text-sm">立即預約</button>
          </a>
        </div>
      )}
    </header>
  );
};

// ─── Hero (full-width background slideshow) ───────────────────────────────────
function Hero() {
  const slides = [
    { src: "/assets/slide1.jpg", alt: "店面外觀" },
    { src: "/assets/car1.jpg",   alt: "輪胎更換" },
    { src: "/assets/car2.jpg",   alt: "專業施工" },
    { src: "/assets/people.jpg", alt: "技師團隊" },
    { src: "/assets/slide2.jpg", alt: "店面正面" },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="sync">
        <motion.img
          key={slides[index].src}
          src={slides[index].src}
          alt={slides[index].alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      {/* Slide dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-[#FFCD11]" : "w-2 bg-white/50"}`}
            aria-label={`slide-${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#FFCD11]/20 border border-[#FFCD11]/40 text-[#FFCD11] text-sm px-4 py-1.5 rounded-full font-medium">
            <ShieldCheck className="w-4 h-4" /> 米其林官方合作夥伴
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
            專業守護<br />
            <span className="text-[#FFCD11]">每一次出發</span>
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            米其林輪胎夥伴｜電腦診斷｜四輪定位｜機油保養｜煞車底盤<br />
            以誠信與技術為核心，提供安全、透明、值得信賴的維修體驗
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#booking">
              <button className="rounded-full bg-[#FFCD11] text-black font-bold px-7 py-3 hover:bg-yellow-300 transition text-base">
                線上預約
              </button>
            </a>
            <a href="#services" className="inline-flex items-center gap-1 text-white font-medium hover:text-[#FFCD11] transition">
              了解服務 <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { icon: <ShieldCheck className="w-4 h-4" />, label: "米其林合作店" },
              { icon: <TimerReset className="w-4 h-4" />, label: "當日快速完修" },
              { icon: <Handshake className="w-4 h-4" />, label: "透明報價" },
              { icon: <Sparkles className="w-4 h-4" />, label: "原廠規範保養" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 p-3 backdrop-blur-sm">
                <span className="text-[#FFCD11]">{item.icon}</span>
                <span className="text-sm text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const Services: React.FC = () => (
  <section id="services" className="py-20 bg-[#111827]">
    <div className="mx-auto max-w-7xl px-4">
      <div className="text-center mb-12">
        <span className="text-[#FFCD11] text-sm font-semibold tracking-widest uppercase">Our Services</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">服務項目</h2>
        <p className="text-white/60 mt-3">從日常保養到底盤懸吊、煞車、輪胎定位，一站式完成</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: <Sparkles className="w-6 h-6" />, title: "輪胎銷售與安裝", desc: "米其林/Michelin 合作，原廠規格建議，提供最適合您車輛的輪胎選配。" },
          { icon: <Car className="w-6 h-6" />, title: "四輪定位", desc: "提升抓地力與胎面壽命，改善偏磨與跑偏，讓行駛更穩定安全。" },
          { icon: <ShieldCheck className="w-6 h-6" />, title: "煞車/底盤維修", desc: "來令片、碟盤、避震器、拉桿、球頭等完整底盤檢測與修復。" },
          { icon: <TimerReset className="w-6 h-6" />, title: "快速維修服務", desc: "一般保養當日完修，減少等待時間，讓您的愛車快速上路。" },
          { icon: <Handshake className="w-6 h-6" />, title: "透明報價與保固", desc: "明確報價單、零件來源清楚，完工後提供保固，值得信賴。" },
          { icon: <Mail className="w-6 h-6" />, title: "保養提醒服務", desc: "完修後依里程/時程主動提醒，讓您的車況長期維持最佳狀態。" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#FFCD11]/50 hover:bg-white/10 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FFCD11]/10 border border-[#FFCD11]/20 flex items-center justify-center text-[#FFCD11] mb-4 group-hover:bg-[#FFCD11]/20 transition">
              {s.icon}
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── About ────────────────────────────────────────────────────────────────────
const About: React.FC = () => (
  <section id="about" className="py-20 bg-white">
    <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-5">
        <span className="text-[#FFCD11] text-sm font-semibold tracking-widest uppercase">About Us</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">關於統玉店</h2>
        <p className="text-gray-600 leading-relaxed">
          MICHELIN米其林輪胎中心-統玉店深耕在地多年，累積豐富的維修經驗與口碑。從到廠接待、檢測、報價到施工與交車，我們以透明流程、原廠規範與專業技師，為您帶來安心可靠的服務品質。
        </p>
        <ul className="space-y-3">
          {[
            "專業四輪定位（改善吃胎、跑偏、方向盤不正）",
            "米其林合作店，原廠規格建議與輪胎維護",
            "電腦診斷、底盤煞車、機油保養一站式",
            "完善保固與售後關懷，提供保養提醒",
          ].map(t => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#FFCD11] flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-black" />
              </span>
              <span className="text-gray-700">{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <div className="absolute -inset-4 bg-[#FFCD11]/10 rounded-3xl -z-10" />
        <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#FFCD11]/30 shadow-xl">
          <img src="/assets/team.jpg" alt="技師團隊照" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  </section>
);

// ─── Reviews strip ────────────────────────────────────────────────────────────
const Reviews: React.FC = () => (
  <div className="bg-[#FFCD11] py-10">
    <div className="mx-auto max-w-7xl px-4 grid sm:grid-cols-3 gap-6">
      {[
        { name: "Google 評價", stars: 5, text: "師傅專業、報價透明，換胎＋定位超有感！" },
        { name: "許先生", stars: 5, text: "方向盤抖動處理很快，還主動檢查底盤。" },
        { name: "陳小姐", stars: 5, text: "更換米其林輪胎後行駛更安靜，服務很細心。" },
      ].map((r, i) => (
        <div key={i} className="bg-white/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-black">{r.name}</span>
            <span className="text-black text-sm">{"★".repeat(r.stars)}</span>
          </div>
          <p className="text-black/80 text-sm">{r.text}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Events ───────────────────────────────────────────────────────────────────
function Events({ events }: { events: EventItem[] }) {
  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <span className="text-[#FFCD11] bg-black text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full">Events</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">近期活動</h2>
          <p className="text-gray-500 mt-3">最新優惠與品牌活動，歡迎到店參加</p>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-gray-400 py-16">目前無進行中的活動</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition border border-gray-100"
              >
                <div className="relative">
                  <img src={e.img} alt={e.title} className="w-full object-contain max-h-80" />
                  <span className="absolute top-4 left-4 bg-[#FFCD11] text-black text-xs font-bold px-3 py-1 rounded-full">
                    {e.tag}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{e.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{e.desc}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400 pt-2 border-t border-gray-100">
                    <span>📅</span>
                    <span>{e.start} ～ {e.end}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a href="#booking">
            <button className="rounded-full bg-black text-[#FFCD11] font-bold px-8 py-3 hover:bg-gray-800 transition text-base">
              前往預約保養或換胎
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
const EMPTY: EventItem = { id: 0, tag: "", title: "", desc: "", img: "", start: "", end: "" };

function AdminPanel({ events, setEvents }: { events: EventItem[]; setEvents: (e: EventItem[]) => void }) {
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  function openNew() {
    setEditing({ ...EMPTY, id: Date.now() });
    setIsNew(true);
  }

  function openEdit(e: EventItem) {
    setEditing({ ...e });
    setIsNew(false);
  }

  function save() {
    if (!editing) return;
    const updated = isNew
      ? [...events, editing]
      : events.map(e => e.id === editing.id ? editing : e);
    setEvents(updated);
    saveEvents(updated);
    setEditing(null);
  }

  function remove(id: number) {
    if (!confirm("確定要刪除這個活動嗎？")) return;
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    saveEvents(updated);
  }

  function field(key: keyof EventItem, label: string, multiline = false) {
    if (!editing) return null;
    const val = editing[key] as string;
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {multiline ? (
          <textarea
            rows={6}
            value={val}
            onChange={ev => setEditing({ ...editing, [key]: ev.target.value })}
            className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFCD11] outline-none"
          />
        ) : (
          <input
            value={val}
            onChange={ev => setEditing({ ...editing, [key]: ev.target.value })}
            className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFCD11] outline-none"
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">活動後台管理</h1>
            <p className="text-sm text-gray-500 mt-1">在這裡新增、編輯或刪除首頁的活動介紹</p>
          </div>
          <div className="flex gap-2">
            <button onClick={openNew}
              className="flex items-center gap-2 bg-[#FFCD11] text-black font-bold px-4 py-2 rounded-xl hover:bg-yellow-300 transition text-sm">
              <Plus className="w-4 h-4" /> 新增活動
            </button>
            <a href="#home" className="flex items-center gap-2 bg-black text-white font-medium px-4 py-2 rounded-xl hover:bg-gray-800 transition text-sm">
              回到首頁
            </a>
          </div>
        </div>

        {/* Edit / New form */}
        {editing && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border-2 border-[#FFCD11]">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{isNew ? "新增活動" : "編輯活動"}</h2>
            <div className="space-y-4">
              {field("tag", "標籤（如：進行中、熱烈進行中）")}
              {field("title", "活動標題")}
              {field("desc", "活動內容（可換行）", true)}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">活動圖片路徑</label>
                <input
                  value={editing.img}
                  onChange={ev => setEditing({ ...editing, img: ev.target.value })}
                  className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFCD11] outline-none"
                  placeholder="/assets/events/event1.jpg"
                />
                <p className="text-xs text-gray-400 mt-1">
                  請將圖片放到 <code>public/assets/events/</code> 資料夾，再填入路徑，例如 <code>/assets/events/event3.jpg</code>
                </p>
                {editing.img && (
                  <img src={editing.img} alt="預覽" className="mt-2 max-h-40 rounded-xl border object-contain" onError={e => (e.currentTarget.style.display="none")} />
                )}
              </div>
              {field("start", "開始日期（YYYY-MM-DD）")}
              {field("end", "結束日期（YYYY-MM-DD）")}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save}
                className="flex items-center gap-2 bg-[#FFCD11] text-black font-bold px-5 py-2 rounded-xl hover:bg-yellow-300 transition text-sm">
                <Check className="w-4 h-4" /> 儲存
              </button>
              <button onClick={() => setEditing(null)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-200 transition text-sm">
                <X className="w-4 h-4" /> 取消
              </button>
            </div>
          </div>
        )}

        {/* Event list */}
        <div className="space-y-4">
          {events.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400">目前沒有活動，點擊「新增活動」開始</div>
          )}
          {events.map(e => (
            <div key={e.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4 items-start">
              {e.img && (
                <img src={e.img} alt="" className="w-24 h-16 object-cover rounded-xl flex-shrink-0 border" onError={ev => (ev.currentTarget.style.display="none")} />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#FFCD11] text-black text-xs font-bold px-2 py-0.5 rounded-full">{e.tag}</span>
                  <span className="text-xs text-gray-400">{e.start} ～ {e.end}</span>
                </div>
                <div className="font-semibold text-gray-900 truncate">{e.title}</div>
                <div className="text-sm text-gray-500 mt-1 line-clamp-2 whitespace-pre-line">{e.desc}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(e)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-[#FFCD11]/20 text-gray-600 transition">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(e.id)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-8 text-center">
          資料儲存在瀏覽器 localStorage。清除瀏覽器資料後會還原成預設活動。
        </p>
      </div>
    </div>
  );
}

// ─── Booking / Contact ────────────────────────────────────────────────────────
const Booking: React.FC = () => (
  <section id="booking" className="py-20 bg-white">
    <div className="mx-auto max-w-7xl px-4">
      <div className="text-center mb-12">
        <span className="text-[#FFCD11] bg-black text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full">Booking</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">線上預約</h2>
        <p className="text-gray-500 mt-3">留下您的需求與聯絡方式，我們將儘速與您確認時段</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border-2 border-[#FFCD11]/30 p-8 bg-[#FFCD11]/5 flex flex-col items-center justify-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#FFCD11]/20 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[#FFCD11]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">線上預約系統</h3>
            <p className="text-gray-500 text-sm mt-2">點擊下方按鈕，填寫預約資訊<br />我們將儘速與您確認時段</p>
          </div>
          <a href="https://cloud.carce.cc/booking?id=1926" target="_blank" rel="noreferrer" className="w-full">
            <button className="rounded-full bg-[#FFCD11] text-black font-bold px-6 py-3 hover:bg-yellow-300 w-full transition text-base">
              立即線上預約
            </button>
          </a>
          <a href="https://lin.ee/DB1cJfL" target="_blank" rel="noreferrer" className="w-full">
            <button className="rounded-full border-2 border-[#FFCD11] text-gray-800 font-semibold px-6 py-3 hover:bg-[#FFCD11]/10 w-full transition text-base">
              用 LINE 預約
            </button>
          </a>
        </div>

        <div id="contact" className="rounded-2xl border p-6">
          <h3 className="font-bold text-gray-900 mb-4">聯絡資訊</h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#FFCD11]" /> (07)374-4333 / (07)374-2949</div>
            <div className="flex items-center gap-3"><MessageSquareText className="w-4 h-4 text-[#FFCD11]" /> LINE：https://lin.ee/DB1cJfL</div>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#FFCD11]" /> 814高雄市仁武區水管路333號</div>
          </div>
          <div className="rounded-xl overflow-hidden mt-4">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=814高雄市仁武區水管路333號&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-60 border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Social ───────────────────────────────────────────────────────────────────
const Social: React.FC = () => (
  <section id="social" className="py-20 bg-[#111827]">
    <div className="mx-auto max-w-7xl px-4">
      <div className="text-center mb-12">
        <span className="text-[#FFCD11] text-sm font-semibold tracking-widest uppercase">Follow Us</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">社群媒體</h2>
        <p className="text-white/60 mt-3">追蹤我們，掌握最新活動、保養知識與輪胎優惠</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Facebook className="w-5 h-5"/>, label: "Facebook 粉專", href: "https://www.facebook.com/duck670413/"},
          { icon: <Instagram className="w-5 h-5"/>, label: "Instagram", href: "https://www.instagram.com/tonyu_tire_repair/"},
          { icon: <MessageSquareText className="w-5 h-5"/>, label: "LINE 官方帳號", href: "https://lin.ee/DB1cJfL"},
          { icon: <Mail className="w-5 h-5"/>, label: "Google 商家", href: "https://maps.app.goo.gl/3YSsFbhMxDW6mUBk9"},
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group">
            <div className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#FFCD11]/60 hover:bg-white/10 transition p-5">
              <div className="w-10 h-10 rounded-xl bg-[#FFCD11]/10 flex items-center justify-center text-[#FFCD11] mb-3 group-hover:bg-[#FFCD11]/20 transition">
                {s.icon}
              </div>
              <div className="font-semibold text-white">{s.label}</div>
              <div className="text-sm text-white/50 mt-1">點擊前往官方頁面</div>
            </div>
          </a>
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
  const [defaultEvents, setDefaultEvents] = useState<EventItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Detect #admin in URL
  useEffect(() => {
    const check = () => setIsAdmin(window.location.hash === "#admin");
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  // Load default events from JSON, then override with localStorage if present
  useEffect(() => {
    fetch("/eventsData.json")
      .then(r => r.json())
      .then((data: EventItem[]) => {
        setDefaultEvents(data);
        setEvents(loadEvents(data));
      })
      .catch(() => {
        const fallback: EventItem[] = [];
        setDefaultEvents(fallback);
        setEvents(loadEvents(fallback));
      });
  }, []);

  if (isAdmin) {
    return (
      <>
        <NavBar />
        <AdminPanel events={events} setEvents={setEvents} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[15px]">
      <NavBar />
      <Hero />
      <Reviews />
      <Services />
      <About />
      <Events events={events} />
      <Booking />
      <Social />
      <Footer />
    </div>
  );
}
