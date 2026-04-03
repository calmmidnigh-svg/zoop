"use client";

import { useState, useMemo } from "react";
import {
  Building2, Clock, Send, CheckCircle2, XCircle, AlertTriangle,
  BanknoteIcon, Phone, MapPin, ArrowRight, ShieldCheck, User, Home
} from "lucide-react";

const PRIMARY_COLOR = "#FF5E00"; // 윤지님의 브랜드 컬러

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
  ]);

  const handleSendNotification = (id: string) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, status: "pending" } : r));
    setOpenedTossRoomId(null);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-gray-50 font-sans">
      <header className="border-b bg-white px-5 pt-6 pb-0">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-black italic" style={{ color: PRIMARY_COLOR }}>방금</h1>
          <div className="rounded-full px-3 py-1 text-[10px] font-bold text-white" style={{ background: PRIMARY_COLOR }}>MVP TEST</div>
        </div>
        <div className="flex">
          <button onClick={() => setActiveTab("guest")} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === "guest" ? "border-[#FF5E00] text-gray-900" : "border-transparent text-gray-400"}`}>게스트</button>
          <button onClick={() => setActiveTab("host")} className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === "host" ? "border-[#FF5E00] text-gray-900" : "border-transparent text-gray-400"}`}>사장님</button>
        </div>
      </header>

      <main className="flex-1 p-4">
        {activeTab === "guest" ? (
          <div className="space-y-4">
            {rooms.map(room => (
              <div key={room.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{room.motelName}</span>
                    {room.status === "pending" && <span className="rounded bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-600">입금 확인중</span>}
                  </div>
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#FF5E00]">{room.dealPrice.toLocaleString()}원</span>
                    <span className="text-sm text-gray-400 line-through">{room.originalPrice.toLocaleString()}원</span>
                  </div>
                  
                  {room.status === "available" && (
                    <div className="flex flex-col gap-2">
                      <a href={room.tossLink} target="_blank" onClick={() => setOpenedTossRoomId(room.id)} className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 font-bold text-white">
                        <BanknoteIcon size={18} /> 토스 송금하기
                      </a>
                      {openedTossRoomId === room.id && (
                        <button onClick={() => handleSendNotification(room.id)} className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#FF5E00] py-3 font-bold text-[#FF5E00]">
                          <Send size={16} /> 송금 완료 알림 보내기
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">사장님 전용 관리 화면입니다.</div>
        )}
      </main>
    </div>
  );
}