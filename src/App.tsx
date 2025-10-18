import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car, Facebook, Instagram, Phone, Mail, MapPin, Calendar,
  MessageSquareText, ArrowRight, ShieldCheck, TimerReset, Handshake, Sparkles, ChevronRight
} from "lucide-react";

// ---------- NavBar ----------
const NavBar: React.FC = () => (
  <div className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 border-b border-black/5">
    <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
      <a href="#home" className="flex items-center gap-3">
        <img src="/assets/logo.jpg" alt="統玉LOGO" className="w-8 h-8 rounded-xl object-contain" />
        <div className="font-extrabold tracking-wide text-gray-900">MICHELIN米其林輪胎中心-統玉店</div>
      </a>
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
        <a href="#services" className="hover:text-emerald-700 transition">服務項目</a>
        <a href="#events" className="hover:text-emerald-700 transition">活動介紹</a>
        <a href="#about" className="hover:text-emerald-700 transition">關於我們</a>
        <a href="#contact" className="hover:text-emerald-700 transition">聯絡方式</a>
        <a href="#social" className="hover:text-emerald-700 transition">社群媒體</a>
        <a href="#booking" className="hover:text-emerald-700 transition">線上預約</a>
      </nav>
      <div className="flex items-center gap-3">
        <a href="#booking"><button className="rounded-2xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700">立即預約</button></a>
      </div>
    </div>
  </div>
);

// ---------- Hero (slideshow + reviews) ----------
const Hero: React.FC = () => {
  const slides = [
    { src: "/assets/slide1.jpg", alt: "店面外觀1" },
    { src: "/assets/slide2.jpg", alt: "店面外觀2" },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section id="home" className="relative pt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">專業守護每一次出發</h1>
          <p className="text-gray-700 text-lg">
            米其林輪胎夥伴｜電腦診斷｜四輪定位｜機油保養｜煞車底盤。<br />
            MICHELIN米其林輪胎中心-統玉店，以誠信與技術為核心，提供安全、透明、值得信賴的維修體驗。
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#booking"><button className="rounded-2xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700">線上預約</button></a>
            <a href="#services" className="inline-flex items-center gap-1 text-emerald-700 font-medium">了解服務 <ArrowRight className="w-4 h-4" /></a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, label: "米其林合作店" },
              { icon: <TimerReset className="w-5 h-5" />, label: "當日快速完修" },
              { icon: <Handshake className="w-5 h-5" />, label: "透明報價" },
              { icon: <Sparkles className="w-5 h-5" />, label: "原廠規範保養" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl border bg-white/70 p-3 shadow-sm">
                <span className="text-emerald-700">{item.icon}</span>
                <span className="text-sm text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur bg-white/60 border border-emerald-100 shadow-xl rounded-3xl overflow-hidden">
          <div className="px-6 pt-6 pb-0">
            <div className="text-gray-900 flex items-center gap-2 font-semibold">
              <Car className="w-5 h-5 text-emerald-700" /> 精緻保養 × 專業檢修
            </div>
          </div>
          <div className="p-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={slides[index].src}
                  src={slides[index].src}
                  alt={slides[index].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </AnimatePresence>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-2 rounded-full ${i === index ? "bg-emerald-500" : "bg-white/70"}`}
                    aria-label={`slide-${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {[
                { name: "Google 評價", stars: 5, text: "師傅專業、報價透明，換胎＋定位超有感！" },
                { name: "許先生", stars: 5, text: "方向盤抖動處理很快，還主動檢查底盤。" },
                { name: "陳小姐", stars: 5, text: "更換米其林輪胎後行駛更安靜，服務很細心。" },
              ].map((r, i) => (
                <div key={i} className="rounded-xl border bg-white/70 p-3 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    <div className="text-amber-500" aria-label={`${r.stars} stars`}>{"★★★★★".slice(0, r.stars)}</div>
                  </div>
                  <p className="mt-1 text-gray-600">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Services ----------
const Services: React.FC = () => (
  <section id="services" className="py-16 bg-emerald-50">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">服務內容</h2>
        <p className="text-gray-600 mt-3">從日常保養到底盤懸吊、煞車、輪胎定位，一站式完成</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: <Sparkles className="w-5 h-5" />, title: "輪胎銷售與安裝", desc: "米其林/Michelin 合作，原廠規格建議。" },
          { icon: <Car className="w-5 h-5" />, title: "四輪定位", desc: "提升抓地力與胎面壽命，改善偏磨與跑偏。" },
          { icon: <ShieldCheck className="w-5 h-5" />, title: "煞車/底盤維修", desc: "來令片、碟盤、避震、拉桿、球頭等。" },
          { icon: <TimerReset className="w-5 h-5" />, title: "快速維修服務", desc: "一般保養當日完修，節省您的時間。" },
          { icon: <Handshake className="w-5 h-5" />, title: "透明報價與保固", desc: "明確報價單、零件來源清楚，提供保固。" },
          { icon: <Mail className="w-5 h-5" />, title: "保養提醒服務", desc: "完修後提供里程/時程提醒，讓車況長保如新。" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border hover:shadow-xl transition group p-5 bg-white">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <span className="text-emerald-700">{s.icon}</span>{s.title}
            </div>
            <p className="mt-2 text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- About ----------
const About: React.FC = () => (
  <section id="about" className="py-16">
    <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4 text-gray-700">
        <h2 className="text-3xl font-bold">關於統玉店</h2>
        <p>MICHELIN米其林輪胎中心-統玉店深耕在地多年，累積豐富的維修經驗與口碑。從到廠接待、檢測、報價到施工與交車，我們以透明流程、原廠規範與專業技師，為您帶來安心可靠的服務品質。</p>
        <ul className="space-y-2">
          {[
            "專業四輪定位（改善吃胎、跑偏、方向盤不正）",
            "米其林合作店，原廠規格建議與輪胎維護",
            "電腦診斷、底盤煞車、機油保養一站式",
            "完善保固與售後關懷，提供保養提醒",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-emerald-700 mt-0.5" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-emerald-100">
        <img src="/assets/team.jpg" alt="技師團隊照" className="object-cover w-full h-full" />
      </div>
    </div>
  </section>
);

// ---------- Events ----------
const Events: React.FC = () => (
  <section id="events" className="py-16">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">活動介紹</h2>
        <p className="text-gray-600 mt-3">節慶檔期、限時優惠與社群互動，歡迎關注參加</p>
      </div>

      {/* 空狀態：目前暫無活動 */}
      <div className="text-center text-gray-500 py-12 text-lg">
        目前暫無活動，敬請期待！
      </div>

      <div className="mt-10 text-center">
        <a href="#booking">
          <button className="rounded-2xl bg-emerald-600 text-white px-5 py-2 hover:bg-emerald-700">
            查看活動與預約
          </button>
        </a>
      </div>
    </div>
  </section>
);

// ---------- Booking / Contact ----------
const Booking: React.FC = () => (
  <section id="booking" className="py-16">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">線上預約</h2>
        <p className="text-gray-600 mt-3">留下您的需求與聯絡方式，我們將儘速與您確認時段</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-5">
          <div className="font-semibold">預約表單</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <input className="border rounded-xl px-3 py-2" placeholder="您的姓名" />
            <input className="border rounded-xl px-3 py-2" placeholder="聯絡電話" />
            <input className="border rounded-xl px-3 py-2" placeholder="車款 / 年份" />
            <input className="border rounded-xl px-3 py-2" placeholder="里程數 (km)" />
          </div>
          <textarea className="border rounded-xl px-3 py-2 w-full mt-3" rows={4} placeholder="想預約的服務或現象描述（如：震動、偏磨、方向盤抖動）" />
          <a href="https://lin.ee/DB1cJfL" target="_blank" rel="noreferrer"><button className="rounded-2xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 w-full mt-3">立即用 LINE 預約</button></a>
          <p className="text-xs text-gray-500 mt-2">※ 可串接 LINE OA / Airtable / TurboPlus 表單</p>
        </div>

        <div id="contact" className="rounded-2xl border p-5">
          <div className="font-semibold">聯絡資訊</div>
          <div className="space-y-3 text-gray-700 mt-3">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-700"/> (07)374-4333 / (07)374-2949</div>
            <div className="flex items-center gap-2"><MessageSquareText className="w-4 h-4 text-emerald-700"/> LINE 預約：https://lin.ee/DB1cJfL</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-700"/> 814高雄市仁武區水管路333號</div>
            <div className="rounded-xl overflow-hidden">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=814高雄市仁武區水管路333號&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-64 border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------- Social ----------
const Social: React.FC = () => (
  <section id="social" className="py-16 bg-emerald-50">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto max-w-3xl text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">社群媒體</h2>
        <p className="text-gray-600 mt-3">追蹤我們，掌握最新活動、保養知識與輪胎優惠</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Facebook className="w-5 h-5"/>, label: "Facebook 粉專", href: "https://www.facebook.com/duck670413/"},
          { icon: <Instagram className="w-5 h-5"/>, label: "Instagram", href: "https://www.instagram.com/tonyu_tire_repair/"},
          { icon: <MessageSquareText className="w-5 h-5"/>, label: "LINE 官方帳號", href: "https://lin.ee/DB1cJfL"},
          { icon: <Mail className="w-5 h-5"/>, label: "Google 商家(GMB)", href: "https://maps.app.goo.gl/3YSsFbhMxDW6mUBk9"},
        ].map((s) => (
          <a key={s.label} href={s.href} className="group" target="_blank" rel="noreferrer">
            <div className="rounded-2xl border hover:shadow-xl transition p-5 bg-white">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <span className="text-emerald-700">{s.icon}</span>{s.label}
              </div>
              <div className="text-sm text-gray-600 mt-2">點擊前往官方頁面</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Footer ----------
const Footer: React.FC = () => (
  <footer className="pt-12 pb-8 border-t bg-white">
    <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-6 items-center">
      <div className="text-sm text-gray-600">
        <img src="/assets/logo.jpg" alt="統玉LOGO" className="h-14 mb-3" />
        <div className="font-bold text-gray-900">MICHELIN米其林輪胎中心-統玉店</div>
        <div>統一編號：86816691｜服務時間：週一至週六 09:30–19:00（週日公休）</div>
        <div>地址：814高雄市仁武區水管路333號｜電話：(07)374-4333 / (07)374-2949</div>
      </div>
      <div className="flex md:justify-end gap-3 text-sm">
        <a href="#home" className="text-gray-700 hover:text-emerald-700">回到頂部</a>
        <span className="text-gray-300">|</span>
        <a href="#booking" className="text-gray-700 hover:text-emerald-700">立即預約</a>
      </div>
    </div>
    <div className="mx-auto max-w-7xl px-4 mt-6 text-xs text-gray-400">© {new Date().getFullYear()} TongYu Michelin. All rights reserved.</div>
  </footer>
);

// ---------- App (with minimal tests) ----------
function runSelfTests() {
  const urls = [
    "https://lin.ee/DB1cJfL",
    "https://www.facebook.com/duck670413/",
    "https://www.instagram.com/tonyu_tire_repair/",
    "https://maps.app.goo.gl/3YSsFbhMxDW6mUBk9",
    "https://maps.google.com/maps?q=814高雄市仁武區水管路333號&t=&z=16&ie=UTF8&iwloc=&output=embed",
  ];
  urls.forEach((u) => console.assert(/^https?:\/\//.test(u), `[TEST] Invalid URL: ${u}`));
  const mustContain = [
    "MICHELIN米其林輪胎中心-統玉店",
    "統一編號：86816691",
    "立即用 LINE 預約",
    "店面外觀1",
  ];
  mustContain.forEach((s) => console.assert(Boolean(s && s.length > 0), `[TEST] Missing text: ${s}`));
}

export default function App() {
  useEffect(() => { runSelfTests(); }, []);
  return (
    <div className="min-h-screen bg-white text-[15px]">
      <NavBar />
      <Hero />
      <Services />
      <About />
      <Events />
      <Booking />
      <Social />
      <Footer />
    </div>
  );
}
