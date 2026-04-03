"use client";

import { useState } from "react";
import { 
  Search, Flame, Hotel, Tent, Umbrella, Bed, 
  Heart, MapPin, Star, ArrowDown, User, MessageCircle, Home
} from "lucide-react";

const PRIMARY_COLOR = "#FF5E00";

export default function ZoopPage() {
  const [activeTab, setActiveTab] = useState("줍기");
  const [isTossClicked, setIsTossClicked] = useState<{ [key: string]: boolean }>({});
  const [roomStatus, setRoomStatus] = useState<{ [key: string]: string }>({});

  const rooms = [
    {
      id: "1",
      name: "을지로 디자인 호텔",
      type: "스탠다드 더블",
      location: "서울 중구",
      originalPrice: 180000,
      price: 59000,
      discount: "67%",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
      tossLink: "https://toss.me/zoop59",
      updatedAt: "1분 전 업로드"
    },
    {
      id: "2",
      name: "부산 해운대 파라다이스",
      type: "프리미엄 오션뷰",
      location: "부산 해운대구",
      originalPrice: 450000,
      price: 179000,
      discount: "60%",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400",
      tossLink: "https://toss.me/zoop179",
      updatedAt: "8분 전 업로드",
      urgent: "마감임박",
      viewers: "지금 14명이 보고 있어요"
    }
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white font-sans">
      {/* Header */}
      <header className="px-5 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black italic tracking-tighter" style={{ color: PRIMARY_COLOR }}>ZOOP</span>
            <span className="text-xs text-gray-400 font-bold mt-1">숙소를 줍다</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[11px] font-bold text-orange-600">실시간 업데이트 중</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="지역, 숙소명으로 검색" 
            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-orange-100"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="p-1 border border-gray-200 rounded-md"><ArrowDown size={14} className="text-gray-400 rotate-90" /></div>
          </button>
        </div>

        {/* Category Icons */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {[
            { icon: <Flame size={16} />, label: "전체", active: true },
            { icon: <Hotel size={16} />, label: "호텔" },
            { icon: <Tent size={16} />, label: "펜션" },
            { icon: <Umbrella size={16} />, label: "리조트" },
            { icon: <Bed size={16} />, label: "모텔" }
          ].map((item, idx) => (
            <button key={idx} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-bold border transition-all ${item.active ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-100' : 'bg-white border-gray-100 text-gray-500'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Feed Area */}
      <main className="flex-1 bg-gray-50/50 px-5 pt-4 space-y-6 pb-24">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 relative">
            {/* Image Section */}
            <div className="relative h-56">
              <img src={room.image} className="w-full h-full object-cover" alt={room.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {room.urgent && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                  <Flame size={12} className="text-orange-600" />
                  <span className="text-[10px] font-black text-orange-600">{room.urgent}</span>
                </div>
              )}
              
              <button className="absolute top-4 right-4 text-white"><Heart size={24} /></button>
              
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-xs font-medium">
                <Clock size={12} /> {room.updatedAt}
              </div>
              
              <div className="absolute bottom-4 right-4 bg-orange-600 text-white font-black text-lg px-3 py-1 rounded-2xl">
                {room.discount}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-extrabold text-gray-900 leading-tight">{room.name}</h3>
                <div className="flex items-center gap-1 text-orange-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-black italic">{room.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
                <div className="flex items-center gap-0.5"><MapPin size={12} /> {room.location}</div>
                <div className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
                <div className="flex items-center gap-1"><Bed size={12} /> {room.type}</div>
              </div>

              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-xs text-gray-300 line-through mb-0.5">{room.originalPrice.toLocaleString()}원</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black tracking-tighter" style={{ color: PRIMARY_COLOR }}>{room.price.toLocaleString()}</span>
                    <span className="text-sm font-bold" style={{ color: PRIMARY_COLOR }}>원</span>
                  </div>
                </div>
                
                {/* ── 줍기 버튼 & 토스 송금 로직 합체 ── */}
                <div className="flex flex-col gap-2 w-1/2">
                  {!isTossClicked[room.id] ? (
                    <a 
                      href={room.tossLink} 
                      target="_blank"
                      onClick={() => setIsTossClicked(prev => ({...prev, [room.id]: true}))}
                      className="bg-orange-600 text-white py-3.5 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-1 shadow-lg shadow-orange-100 transition-transform active:scale-95"
                    >
                      줍기 <ArrowDown size={18} />
                    </a>
                  ) : (
                    <button 
                      onClick={() => setRoomStatus(prev => ({...prev, [room.id]: 'pending'}))}
                      className="bg-blue-500 text-white py-3.5 px-4 rounded-2xl font-black text-[13px] flex items-center justify-center gap-1.5 shadow-lg shadow-blue-100"
                    >
                      송금완료 알림 <Send size={14} />
                    </button>
                  )}
                </div>
              </div>

              {roomStatus[room.id] === 'pending' && (
                <div className="bg-orange-50 rounded-2xl py-3 px-4 flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" />
                  <span className="text-[11px] font-bold text-orange-700">사장님이 입금을 확인하고 있어요!</span>
                </div>
              )}

              {room.viewers && (
                <div className="bg-red-50 py-2.5 px-4 rounded-xl inline-flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1,2].map(i => <div key={i} className="w-4 h-4 rounded-full border border-white bg-gray-200" />)}
                  </div>
                  <span className="text-[10px] font-bold text-red-600 tracking-tight">{room.viewers}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 py-3 flex justify-between items-center z-[100]">
        {[
          { icon: <Flame size={24} />, label: "줍기", active: true },
          { icon: <Search size={24} />, label: "검색" },
          { icon: <Heart size={24} />, label: "찜" },
          { icon: <User size={24} />, label: "마이" }
        ].map((nav, idx) => (
          <button key={idx} className={`flex flex-col items-center gap-1 ${nav.active ? 'text-orange-600' : 'text-gray-300'}`}>
            {nav.icon}
            <span className="text-[10px] font-bold">{nav.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}