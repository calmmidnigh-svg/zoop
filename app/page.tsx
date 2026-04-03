"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Clock, Send, CheckCircle2, XCircle, AlertTriangle,
  Eye, BanknoteIcon, Phone, MapPin, ArrowRight, ShieldCheck, User, Home
} from "lucide-react";

const PRIMARY_COLOR = "#FF4500";

export default function BangGeumPage() {
  const [activeTab, setActiveTab] = useState("guest");
  const [openedTossRoomId, setOpenedTossRoomId] = useState<string | null>(null);
  const [rooms, setRooms] = useState([
    {
      id: "room_1",
      motelName: "역삼 블루힐 모텔",
      roomType: "디럭스 더블",
      location: "서울 강남구 역삼동",
      originalPrice: 120000,
      dealPrice: 39000,
      hostName: "김사장",
      hostPhone: "010-1234-5678",
      tossLink: "https://toss.me/bluehill39",
      checkIn: "오늘 22:00",
      checkOut: "내일 12:00",
      deadlineHour: 3,
      status: "available",
    },
    {
      id: "room_2",
      motelName: "신림 골든파크",
      roomType: "스탠다드 트윈",
      location: "서울 관악구 신림동",
      originalPrice: 90000,
      dealPrice: 29000,
      hostName: "박사장",
      hostPhone: "010-9876-5432",
      tossLink: "https://toss.me/goldenpark29",
      checkIn: "오늘 21:00",
      checkOut: "내일 11:00",
      deadlineHour: 2,
      status: "available",
    }
  ]);

  const pendingRooms = useMemo(() => rooms.filter(r => r.status === "pending"), [rooms]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#F8F9FA] font-sans shadow-2xl">
      {/* Header - 윤지님의 zoop-feed 디자인 적용 */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 px-5 pt-6 pb-0 backdrop-blur-md">
        <div className="mb-5 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl font-black tracking-tighter" style={{ color: PRIMARY_COLOR }}>방금</h1>
            <p className="text-[10px] font-bold text-gray-400">수수료 0원 · 사장님 직거래</p>
          </motion.div>
          <div className="rounded-full px-3 py-1 text-[10px] font-bold text-white" style={{ background: PRIMARY_COLOR }}>MVP TEST</div>
        </div>
        
        <div className="flex gap-4">
          {["guest", "host"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 text-sm font-bold transition-all ${activeTab === tab ? "text-gray-900" : "text-gray-300"}`}
            >
              {tab === "guest" ? "게스트" : "사장님"}
              {activeTab === tab && (
                <motion.div layoutId="tab-bar" className="mt-2 h-0.5 w-full" style={{ background: PRIMARY_COLOR }} />
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === "guest" ? (
            <motion.div 
              key="guest-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {rooms.map((room) => (
                <motion.div 
                  key={room.id}
                  layout
                  className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Building2 size={16} className="text-gray-400" />
                        <span className="font-bold text-gray-900">{room.motelName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400">
                        <MapPin size={10} /> {room.location}
                      </div>
                    </div>
                    {room.status === "pending" && (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-600 italic">CHECKING...</span>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="mb-5 rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 line-through mb-1">정가 {room.originalPrice.toLocaleString()}원</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black tracking-tighter" style={{ color: PRIMARY_COLOR }}>{room.dealPrice.toLocaleString()}</span>
                          <span className="text-sm font-bold" style={{ color: PRIMARY_COLOR }}>원</span>
                        </div>
                      </div>
                      <div className="rounded-xl px-3 py-2 text-lg font-black text-white" style={{ background: PRIMARY_COLOR }}>
                        {Math.round(((room.originalPrice - room.dealPrice) / room.originalPrice) * 100)}%
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - 토스 송금 합체 */}
                  {room.status === "available" && (
                    <div className="space-y-2">
                      <a 
                        href={room.tossLink} 
                        target="_blank" 
                        onClick={() => setOpenedTossRoomId(room.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 py-4 text-sm font-bold text-white shadow-lg shadow-blue-100 transition-transform active:scale-95"
                      >
                        <BanknoteIcon size={18} /> 토스로 {room.dealPrice.toLocaleString()}원 송금
                      </a>
                      
                      {openedTossRoomId === room.id && (
                        <motion.button
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          onClick={() => setRooms(prev => prev.map(r => r.id === room.id ? {...r, status: 'pending'} : r))}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-amber-400 bg-amber-50 py-4 text-sm font-bold text-amber-700"
                        >
                          <Send size={16} /> 송금 완료 알림 보내기
                        </motion.button>
                      )}
                    </div>
                  )}

                  {room.status === "pending" && (
                    <div className="flex items-center justify-center gap-2 rounded-2xl bg-amber-50 py-4 text-sm font-bold text-amber-600">
                      <Clock size={16} className="animate-spin" /> 사장님이 확인 중입니다...
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="host-view" className="text-center py-20 text-gray-400 font-medium">
              사장님 화면 준비 중입니다.
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}