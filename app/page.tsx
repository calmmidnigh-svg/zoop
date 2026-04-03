"use client";

import { useState, useMemo } from "react";
import {
  Building2, Clock, Send, CheckCircle2, XCircle, AlertTriangle,
  Eye, BanknoteIcon, Phone, MapPin, ArrowRight, ShieldCheck, User, Home,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Constants & Types
   ───────────────────────────────────────────── */
const PRIMARY_COLOR = "#FF4500";
type RoomStatusType = "available" | "pending" | "sold_out";
type TabType = "guest" | "host";

interface RoomDTO {
  id: string;
  motelName: string;
  roomType: string;
  location: string;
  originalPrice: number;
  dealPrice: number;
  hostName: string;
  hostPhone: string;
  tossLink: string;
  checkIn: string;
  checkOut: string;
  deadlineHour: number;
  guestName: string;
  status: RoomStatusType;
  hasSentNotification: boolean;
}

const INITIAL_ROOMS: RoomDTO[] = [
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
    guestName: "임윤지",
    status: "available",
    hasSentNotification: false,
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
    guestName: "임윤지",
    status: "available",
    hasSentNotification: false,
  },
];

const formatPrice = (price: number) => price.toLocaleString("ko-KR");
const getDiscountRate = (original: number, deal: number) =>
  Math.round(((original - deal) / original) * 100);

/* ─────────────────────────────────────────────
   Main Page Component
   ───────────────────────────────────────────── */
export default function BangGeumPage() {
  const [activeTab, setActiveTab] = useState<TabType>("guest");
  const [rooms, setRooms] = useState<RoomDTO[]>(INITIAL_ROOMS);
  const [openedTossRoomId, setOpenedTossRoomId] = useState<string | null>(null);

  const pendingRooms = useMemo(
    () => rooms.filter(room => room.status === "pending" && room.hasSentNotification),
    [rooms]
  );

  const handleClickToss = (roomId: string) => setOpenedTossRoomId(roomId);

  const handleClickSendNotification = (roomId: string) => {
    setRooms(prev =>
      prev.map(room =>
        room.id === roomId
          ? { ...room, status: "pending" as RoomStatusType, hasSentNotification: true }
          : room
      )
    );
    setOpenedTossRoomId(null);
  };

  const handleClickConfirmPayment = (roomId: string) => {
    setRooms(prev =>
      prev.map(room =>
        room.id === roomId ? { ...room, status: "sold_out" as RoomStatusType } : room
      )
    );
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#F8F9FA]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-5 pt-5 pb-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="m-0 text-2xl font-black tracking-tight" style={{ color: PRIMARY_COLOR }}>방금</h1>
            <p className="m-0 mt-0.5 text-xs text-gray-400">수수료 0원 · 사장님 직거래 · 지금 바로</p>
          </div>
          <div className="rounded-lg px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: PRIMARY_COLOR }}>MVP 테스트</div>
        </div>
        <div className="flex">
          <button onClick={() => setActiveTab("guest")} className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 py-3 text-sm font-bold transition-all ${activeTab === "guest" ? "text-gray-900" : "border-transparent text-gray-400"}`} style={{ borderColor: activeTab === "guest" ? PRIMARY_COLOR : "transparent" }}><User size={16} />게스트 화면</button>
          <button onClick={() => setActiveTab("host")} className={`relative flex flex-1 items-center justify-center gap-1.5 border-b-2 py-3 text-sm font-bold transition-all ${activeTab === "host" ? "text-gray-900" : "border-transparent text-gray-400"}`} style={{ borderColor: activeTab === "host" ? PRIMARY_COLOR : "transparent" }}><Home size={16} />사장님 화면{pendingRooms.length > 0 && (<span className="absolute -top-0.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: PRIMARY_COLOR }}>{pendingRooms.length}</span>)}</button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-3 px-4 pt-4 pb-8">
        {activeTab === "guest" && (
          <>
            {/* How it works */}
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4">
              <p className="m-0 mb-2 text-xs font-bold text-gray-500">📌 방금 이용법 (3단계)</p>
              <div className="flex items-center gap-0 text-[11px] text-gray-500">
                <span className="rounded-md bg-blue-50 px-2 py-1 font-bold text-blue-600">① 토스 송금</span>
                <ArrowRight size={12} className="mx-1 text-gray-300" />
                <span className="rounded-md bg-amber-50 px-2 py-1 font-bold text-amber-600">② 송금 알림</span>
                <ArrowRight size={12} className="mx-1 text-gray-300" />
                <span className="rounded-md bg-green-50 px-2 py-1 font-bold text-green-600">③ 사장님 확인</span>
              </div>
            </div>

            {/* Room List */}
            {rooms.map(room => {
              const isSoldOut = room.status === "sold_out";
              const isPending = room.status === "pending";
              const isThisRoomTossOpened = openedTossRoomId === room.id;
              const discountRate = getDiscountRate(room.originalPrice, room.dealPrice);

              return (
                <div key={room.id} className={`relative overflow-hidden rounded-2xl border bg-white transition-all ${isSoldOut ? "border-gray-200 opacity-60" : isPending ? "border-amber-300" : "border-gray-200"}`}>
                  {isSoldOut && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80">
                      <XCircle size={40} className="mb-2 text-gray-400" />
                      <p className="m-0 text-lg font-black text-gray-500">거래 완료</p>
                    </div>
                  )}

                  <div className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5"><Building2 size={16} className="text-gray-600" /><h3 className="m-0 text-base font-extrabold text-gray-900">{room.motelName}</h3></div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-400"><MapPin size={11} />{room.location}</div>
                      </div>
                      {isPending ? <span className="shrink-0 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600">⏳ 입금확인 중</span> : !isSoldOut && <span className="shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: PRIMARY_COLOR }}>🔥 땡처리</span>}
                    </div>

                    <div className="mb-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-3">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="m-0 text-xs text-gray-400 line-through">정가 {formatPrice(room.originalPrice)}원</p>
                          <div className="mt-1 flex items-baseline gap-1.5"><span className="text-3xl font-black leading-none tracking-tighter" style={{ color: PRIMARY_COLOR }}>{formatPrice(room.dealPrice)}</span><span className="text-sm font-bold" style={{ color: PRIMARY_COLOR }}>원</span></div>
                        </div>
                        <div className="rounded-xl px-3 py-1.5 text-lg font-black text-white" style={{ background: PRIMARY_COLOR }}>{discountRate}%↓</div>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-1.5 text-xs text-red-500 font-bold"><Clock size={13} />마감까지 {room.deadlineHour}시간 남음</div>

                    {/* ── 토스 송금 플로우 버튼 ── */}
                    {!isSoldOut && !isPending && (
                      <div className="flex flex-col gap-2">
                        <a href={room.tossLink} target="_blank" rel="noopener noreferrer" onClick={() => handleClickToss(room.id)} className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3.5 text-sm font-extrabold text-white transition-all hover:bg-blue-600 active:scale-[0.98]"><BanknoteIcon size={18} />토스로 {formatPrice(room.dealPrice)}원 송금하기</a>
                        {isThisRoomTossOpened && (
                          <button onClick={() => handleClickSendNotification(room.id)} className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-400 bg-amber-50 px-4 py-3.5 text-sm font-extrabold text-amber-700 transition-all hover:bg-amber-100 active:scale-[0.98]"><Send size={16} />송금 완료했어요 (사장님께 알림)</button>
                        )}
                      </div>
                    )}
                    
                    {isPending && (
                      <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700 font-semibold"><AlertTriangle size={16} className="shrink-0 text-amber-500" />사장님이 입금을 확인하고 있어요.</div>
                    )}

                    <div className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1"><ShieldCheck size={12} /><span>사장님 직거래</span> <span className="font-semibold text-gray-600">{room.hostName}</span></div>
                      <div className="flex items-center gap-1"><Phone size={11} /><span className="text-gray-500">{room.hostPhone}</span></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {activeTab === "host" && (
          <div className="space-y-3">
            {pendingRooms.length > 0 ? pendingRooms.map(room => (
              <div key={room.id} className="overflow-hidden rounded-2xl border-2 border-amber-400 bg-white">
                <div className="flex items-center gap-2 px-4 py-3 text-white font-extrabold text-sm" style={{ background: PRIMARY_COLOR }}><AlertTriangle size={18} />새 입금 알림이 있습니다!</div>
                <div className="p-4 text-center">
                  <div className="mb-3 rounded-xl bg-amber-50 p-3 text-sm text-gray-600 font-medium"><b>{room.guestName}</b>님이 <b>{formatPrice(room.dealPrice)}원</b> 송금을 완료했다고 알렸습니다.</div>
                  <button onClick={() => handleClickConfirmPayment(room.id)} className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-base font-extrabold text-white" style={{ background: PRIMARY_COLOR }}><CheckCircle2 size={20} />입금 확인 완료 · 방 닫기</button>
                </div>
              </div>
            )) : <div className="py-20 text-center text-gray-400">아직 알림이 없어요.</div>}
          </div>
        )}
      </main>
    </div>
  );
}