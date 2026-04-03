"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Tag,
  ChevronDown,
  Heart,
  Clock,
  MapPin,
  BedDouble,
  Star,
  Users,
  ArrowDown,
  ArrowLeft,
  Flame,
  Zap,
  Bell,
  BanknoteIcon,
  Send,
  CheckCircle2,
  Phone,
  ShieldCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const BRAND_COLOR = "#FF5E00";

type BadgeVariantType = "urgent" | "today" | "hot" | "new";
type CategoryIdType = "all" | "hotel" | "pension" | "resort" | "motel" | "guesthouse";
type PaymentStepType = "idle" | "detail" | "toss_opened" | "notified" | "confirmed";

interface RoomDTO {
  id: string;
  name: string;
  roomType: string;
  location: string;
  originalPrice: number;
  zoopPrice: number;
  discountRate: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  remainingCount: number;
  badgeType: BadgeVariantType;
  category: CategoryIdType;
  uploadedMinutesAgo: number;
  isLiked: boolean;
  hostName: string;
  hostPhone: string;
  tossLink: string;
  checkIn: string;
  checkOut: string;
}

interface CategoryDTO {
  id: CategoryIdType;
  label: string;
  icon: string;
}

const CATEGORY_LIST: CategoryDTO[] = [
  { id: "all", label: "전체", icon: "🔥" },
  { id: "hotel", label: "호텔", icon: "🏨" },
  { id: "pension", label: "펜션", icon: "🏡" },
  { id: "resort", label: "리조트", icon: "🏖️" },
  { id: "motel", label: "모텔", icon: "🛏️" },
  { id: "guesthouse", label: "게하", icon: "🎒" },
];

const BADGE_MAP: Record<BadgeVariantType, { bg: string; color: string; icon: typeof Flame; text: string }> = {
  urgent: { bg: "#FEE2E2", color: "#DC2626", icon: Flame, text: "마감임박" },
  today: { bg: "#FEF3C7", color: "#D97706", icon: Clock, text: "오늘만 이 가격" },
  hot: { bg: "#FFF4ED", color: BRAND_COLOR, icon: Zap, text: "지금 뜨는 딜" },
  new: { bg: "#DBEAFE", color: "#2563EB", icon: Bell, text: "방금 올라옴" },
};

const MOCK_ROOMS: RoomDTO[] = [
  {
    id: "1",
    name: "그랜드 하얏트 서울",
    roomType: "디럭스 트윈",
    location: "서울 용산구",
    originalPrice: 380000,
    zoopPrice: 149000,
    discountRate: 61,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 2341,
    remainingCount: 2,
    badgeType: "urgent",
    category: "hotel",
    uploadedMinutesAgo: 12,
    isLiked: false,
    hostName: "김사장",
    hostPhone: "010-1234-5678",
    tossLink: "https://toss.me/hyatt149",
    checkIn: "오늘 15:00",
    checkOut: "내일 11:00",
  },
  {
    id: "2",
    name: "제주 오션뷰 펜션",
    roomType: "오션뷰 스위트",
    location: "제주 서귀포시",
    originalPrice: 250000,
    zoopPrice: 89000,
    discountRate: 64,
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 876,
    remainingCount: 1,
    badgeType: "today",
    category: "pension",
    uploadedMinutesAgo: 3,
    isLiked: true,
    hostName: "박사장",
    hostPhone: "010-9876-5432",
    tossLink: "https://toss.me/jejuocean89",
    checkIn: "오늘 16:00",
    checkOut: "내일 11:00",
  },
  {
    id: "3",
    name: "속초 마린베이 리조트",
    roomType: "패밀리 스위트",
    location: "강원 속초시",
    originalPrice: 320000,
    zoopPrice: 128000,
    discountRate: 60,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 1203,
    remainingCount: 3,
    badgeType: "hot",
    category: "resort",
    uploadedMinutesAgo: 27,
    isLiked: false,
    hostName: "이사장",
    hostPhone: "010-5555-1234",
    tossLink: "https://toss.me/marinbay128",
    checkIn: "오늘 15:00",
    checkOut: "내일 12:00",
  },
  {
    id: "4",
    name: "을지로 디자인 호텔",
    roomType: "스탠다드 더블",
    location: "서울 중구",
    originalPrice: 180000,
    zoopPrice: 59000,
    discountRate: 67,
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 567,
    remainingCount: 5,
    badgeType: "new",
    category: "hotel",
    uploadedMinutesAgo: 1,
    isLiked: false,
    hostName: "최사장",
    hostPhone: "010-3333-7777",
    tossLink: "https://toss.me/euljiro59",
    checkIn: "오늘 22:00",
    checkOut: "내일 12:00",
  },
  {
    id: "5",
    name: "부산 해운대 파라다이스",
    roomType: "프리미엄 오션뷰",
    location: "부산 해운대구",
    originalPrice: 450000,
    zoopPrice: 179000,
    discountRate: 60,
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 3892,
    remainingCount: 1,
    badgeType: "urgent",
    category: "hotel",
    uploadedMinutesAgo: 8,
    isLiked: true,
    hostName: "정사장",
    hostPhone: "010-7777-8888",
    tossLink: "https://toss.me/paradise179",
    checkIn: "오늘 15:00",
    checkOut: "내일 11:00",
  },
  {
    id: "6",
    name: "가평 숲속 글램핑",
    roomType: "프리미엄 글램핑",
    location: "경기 가평군",
    originalPrice: 200000,
    zoopPrice: 78000,
    discountRate: 61,
    imageUrl: "https://images.unsplash.com/photo-1470214203263-0bbc3a399af2?w=600&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 432,
    remainingCount: 4,
    badgeType: "today",
    category: "pension",
    uploadedMinutesAgo: 45,
    isLiked: false,
    hostName: "한사장",
    hostPhone: "010-1111-2222",
    tossLink: "https://toss.me/gapyeong78",
    checkIn: "오늘 16:00",
    checkOut: "내일 11:00",
  },
];

/* ─────────────────────────────────────────────
   Utility
   ───────────────────────────────────────────── */

const formatPrice = (price: number) => price.toLocaleString("ko-KR");

const getTimeLabel = (minutes: number) => {
  let result = `${minutes}분 전`;

  if (minutes >= 60) {
    result = `${Math.floor(minutes / 60)}시간 전`;
  }

  return result;
};

/* ─────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────── */

const HomePage = () => {
  /* ── state hooks ── */
  const [selectedCategory, setSelectedCategory] = useState<CategoryIdType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<RoomDTO[]>(MOCK_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<PaymentStepType>("idle");

  /* ── memo hooks ── */
  const filteredRooms = useMemo(() => {
    let result = rooms;

    if (selectedCategory !== "all") {
      result = result.filter(room => room.category === selectedCategory);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        room =>
          room.name.toLowerCase().includes(lowerQuery) ||
          room.location.toLowerCase().includes(lowerQuery)
      );
    }

    return result;
  }, [rooms, selectedCategory, searchQuery]);

  const selectedRoom = useMemo(
    () => rooms.find(room => room.id === selectedRoomId) ?? null,
    [rooms, selectedRoomId]
  );

  /* ── handlers ── */
  const handleToggleLike = (roomId: string) => {
    setRooms(prev =>
      prev.map(room =>
        room.id === roomId ? { ...room, isLiked: !room.isLiked } : room
      )
    );
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId as CategoryIdType);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClickZoop = (roomId: string) => {
    setSelectedRoomId(roomId);
    setPaymentStep("detail");
  };

  const handleClickBack = () => {
    setSelectedRoomId(null);
    setPaymentStep("idle");
  };

  const handleClickToss = () => {
    setPaymentStep("toss_opened");
  };

  const handleClickNotify = () => {
    setPaymentStep("notified");
  };

  const handleClickConfirm = () => {
    if (selectedRoomId) {
      setRooms(prev =>
        prev.map(room =>
          room.id === selectedRoomId
            ? { ...room, remainingCount: Math.max(0, room.remainingCount - 1) }
            : room
        )
      );
    }
    setPaymentStep("confirmed");
  };

  const handleClickDone = () => {
    setSelectedRoomId(null);
    setPaymentStep("idle");
  };

  /* ══════════════════════════════════════════
     render: 줍기 결제 화면
     ══════════════════════════════════════════ */
  if (selectedRoom && paymentStep !== "idle") {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh", width: "100%", maxWidth: "448px", margin: "0 auto", background: "#fff", fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` }}>
        {/* Header */}
        <header style={{ display: "flex", position: "sticky", top: 0, zIndex: 50, alignItems: "center", gap: "12px", padding: "12px 16px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
          <button onClick={handleClickBack} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "36px", height: "36px", borderRadius: "12px", border: "none", background: "#F0F0F0", cursor: "pointer" }}>
            <ArrowLeft size={18} color="#555" />
          </button>
          <h2 style={{ flex: 1, margin: 0, fontSize: "16px", fontWeight: 800, color: "#111" }}>줍기</h2>
          <span style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "-0.06em", color: BRAND_COLOR }}>ZOOP</span>
        </header>

        <main style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px 20px 32px" }}>
          {/* 숙소 카드 */}
          <div style={{ overflow: "hidden", marginBottom: "20px", borderRadius: "20px", border: "1px solid #F0F0F0" }}>
            <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
              <img src={selectedRoom.imageUrl} alt={selectedRoom.name} style={{ display: "block", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#111" }}>{selectedRoom.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", fontSize: "12px", color: "#999" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} />{selectedRoom.location}</span>
                <span style={{ color: "#ddd" }}>|</span>
                <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><BedDouble size={11} />{selectedRoom.roomType}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", padding: "8px 12px", borderRadius: "10px", background: "#F8F8F8", fontSize: "12px", color: "#777" }}>
                <Clock size={12} />
                <span>체크인 {selectedRoom.checkIn}</span>
                <span style={{ color: "#ddd" }}>→</span>
                <span>체크아웃 {selectedRoom.checkOut}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "16px", padding: "16px", borderRadius: "14px", background: "#F8F8F8" }}>
                <div>
                  <p style={{ margin: 0, fontSize: "12px", color: "#bbb", textDecoration: "line-through" }}>정가 {formatPrice(selectedRoom.originalPrice)}원</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "4px" }}>
                    <span style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: BRAND_COLOR }}>{formatPrice(selectedRoom.zoopPrice)}</span>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: BRAND_COLOR }}>원</span>
                  </div>
                </div>
                <div style={{ padding: "6px 12px", borderRadius: "12px", background: BRAND_COLOR, color: "#fff", fontSize: "16px", fontWeight: 900 }}>{selectedRoom.discountRate}%↓</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", padding: "10px 12px", borderRadius: "10px", background: "#F8F8F8", fontSize: "12px", color: "#999" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={12} />
                  <span>사장님 직거래</span>
                  <span style={{ fontWeight: 600, color: "#555" }}>{selectedRoom.hostName}</span>
                </div>
                <a href={`tel:${selectedRoom.hostPhone}`} style={{ display: "flex", alignItems: "center", gap: "4px", color: "#777", textDecoration: "none" }}>
                  <Phone size={11} />{selectedRoom.hostPhone}
                </a>
              </div>
            </div>
          </div>

          {/* 결제 스텝 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {paymentStep === "detail" && (
              <>
                <div style={{ padding: "16px", borderRadius: "14px", border: "1px dashed #ddd", background: "#FAFAFA" }}>
                  <p style={{ margin: "0 0 8px", fontSize: "12px", fontWeight: 700, color: "#888" }}>📌 줍기 방법 (수수료 0원 직거래)</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", color: "#888" }}>
                    <span>① 아래 버튼으로 사장님께 토스 송금</span>
                    <span>② 송금 후 '송금 완료' 버튼 눌러 알림</span>
                    <span>③ 사장님이 확인하면 예약 완료!</span>
                  </div>
                </div>
                <a href={selectedRoom.tossLink} target="_blank" rel="noopener noreferrer" onClick={handleClickToss} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", padding: "16px", borderRadius: "16px", background: "#3B82F6", color: "#fff", fontSize: "16px", fontWeight: 800, textDecoration: "none", cursor: "pointer" }}>
                  <BanknoteIcon size={20} />토스로 {formatPrice(selectedRoom.zoopPrice)}원 송금하기
                </a>
              </>
            )}

            {paymentStep === "toss_opened" && (
              <>
                <div style={{ padding: "16px", borderRadius: "14px", background: "#EFF6FF", textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1D4ED8" }}>토스에서 송금을 완료하셨나요?</p>
                  <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#60A5FA" }}>송금 완료 후 아래 버튼을 눌러주세요</p>
                </div>
                <a href={selectedRoom.tossLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", padding: "16px", borderRadius: "16px", background: "#3B82F6", color: "#fff", fontSize: "16px", fontWeight: 800, textDecoration: "none", cursor: "pointer" }}>
                  <BanknoteIcon size={20} />토스 다시 열기
                </a>
                <button onClick={handleClickNotify} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", padding: "16px", borderRadius: "16px", border: "2px solid #FBBF24", background: "#FFFBEB", color: "#B45309", fontSize: "16px", fontWeight: 800, cursor: "pointer" }}>
                  <Send size={18} />송금 완료했어요 (사장님께 알림)
                </button>
              </>
            )}

            {paymentStep === "notified" && (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "32px 16px", borderRadius: "20px", background: "#FFFBEB", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "56px", height: "56px", borderRadius: "50%", background: "#FDE68A" }}><Clock size={28} color="#D97706" /></div>
                  <p style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#92400E" }}>사장님께 알림을 보냈어요!</p>
                  <p style={{ margin: 0, fontSize: "14px", color: "#B45309" }}>입금 확인 후 예약이 확정됩니다</p>
                </div>
                <div style={{ padding: "16px", borderRadius: "14px", border: "2px dashed #ddd" }}>
                  <p style={{ margin: "0 0 12px", fontSize: "12px", fontWeight: 700, color: "#bbb", textAlign: "center" }}>🧪 MVP 테스트: 사장님 역할 시뮬레이션</p>
                  <button onClick={handleClickConfirm} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: BRAND_COLOR, color: "#fff", fontSize: "14px", fontWeight: 800, cursor: "pointer" }}>
                    <CheckCircle2 size={18} />[사장님] 입금 확인 완료
                  </button>
                </div>
              </>
            )}

            {paymentStep === "confirmed" && (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "40px 16px", borderRadius: "20px", background: "#F0FDF4", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "64px", height: "64px", borderRadius: "50%", background: BRAND_COLOR }}><CheckCircle2 size={32} color="#fff" /></div>
                  <p style={{ margin: 0, fontSize: "20px", fontWeight: 900, color: "#111" }}>줍기 완료! 🎉</p>
                  <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>{selectedRoom.name} 예약이 확정되었습니다</p>
                  <div style={{ marginTop: "8px", padding: "12px 16px", borderRadius: "12px", background: "#fff", fontSize: "14px", color: "#555" }}>
                    <p style={{ margin: 0 }}>체크인 <strong>{selectedRoom.checkIn}</strong></p>
                    <p style={{ margin: "4px 0 0" }}>체크아웃 <strong>{selectedRoom.checkOut}</strong></p>
                  </div>
                </div>
                <button onClick={handleClickDone} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", width: "100%", padding: "16px", borderRadius: "16px", border: "none", background: BRAND_COLOR, color: "#fff", fontSize: "16px", fontWeight: 800, cursor: "pointer" }}>
                  홈으로 돌아가기
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     render: 메인 피드
     ══════════════════════════════════════════ */
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh", width: "100%", maxWidth: "448px", margin: "0 auto", background: "#FAFAFA", fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .zoop-card:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.08); }
        .zoop-card img:hover { transform:scale(1.04); }
        * { box-sizing:border-box; }
      `}</style>

      {/* ── Header ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, padding: "16px 20px 0", background: "#FAFAFA" }}>
        <div style={{ display: "flex", justify-content: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 900, letterSpacing: "-0.06em", color: BRAND_COLOR }}>ZOOP</h1>
            <span style={{ fontSize: "12px", fontWeight: 500, color: "#aaa" }}>숙소를 줍다</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "14px", background: "#FFF4ED" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: BRAND_COLOR, animation: "blink 1.4s infinite" }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: BRAND_COLOR }}>실시간 업데이트 중</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "14px" }}>
          <Search size={18} color="#999" style={{ position: "absolute", top: "50%", left: "14px", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="지역, 숙소명으로 검색"
            value={searchQuery}
            onChange={handleChangeSearch}
            style={{ display: "block", width: "100%", height: "44px", padding: "0 48px 0 42px", borderRadius: "16px", border: "1px solid #E8E8E8", background: "#fff", fontSize: "14px", color: "#333", outline: "none" }}
          />
          <button style={{ display: "flex", position: "absolute", top: "50%", right: "10px", justifyContent: "center", alignItems: "center", width: "32px", height: "32px", borderRadius: "10px", border: "none", background: "#F5F5F5", transform: "translateY(-50%)", cursor: "pointer" }}>
            <SlidersHorizontal size={16} color="#666" />
          </button>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "14px", scrollbarWidth: "none" }}>
          {CATEGORY_LIST.map(category => (
            <button
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              style={{
                display: "flex", flexShrink: 0, alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "9999px",
                border: selectedCategory === category.id ? "none" : "1px solid #E5E5E5",
                background: selectedCategory === category.id ? BRAND_COLOR : "#fff",
                color: selectedCategory === category.id ? "#fff" : "#555",
                fontSize: "14px", fontWeight: selectedCategory === category.id ? 700 : 500,
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "16px" }}>{category.icon}</span>{category.label}
            </button>
          ))}
        </div>
      </header>

      {/* Stats */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", margin: "0 20px 16px", padding: "10px 16px", borderRadius: "14px", background: "linear-gradient(135deg, #1A1A2E, #16213E)", color: "#fff", fontSize: "13px", fontWeight: 600 }}>
        <Tag size={14} color={BRAND_COLOR} />
        <span>지금&nbsp;</span>
        <span style={{ fontSize: "16px", fontWeight: 900, color: BRAND_COLOR }}>{filteredRooms.length}개</span>
        <span>의 특가가 떠있어요</span>
        <ChevronDown size={14} style={{ marginLeft: "2px", opacity: 0.5 }} />
      </div>

      {/* ── Feed ── */}
      <main style={{ display: "flex", flexDirection: "column", flex: 1, gap: "16px", padding: "0 20px 100px" }}>
        {filteredRooms.map((room, index) => {
          const badge = BADGE_MAP[room.badgeType];
          const BadgeIcon = badge.icon;
          const isAlmostGone = room.remainingCount <= 2;

          return (
            <div
              key={room.id}
              className="zoop-card"
              style={{ overflow: "hidden", borderRadius: "20px", border: "1px solid #F0F0F0", background: "#fff", cursor: "pointer", transition: "transform .2s, box-shadow .2s", animation: `fadeIn .4s ease ${index * 0.08}s both` }}
            >
              {/* Image */}
              <div style={{ position: "relative", width: "100%", height: "220px", overflow: "hidden" }}>
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  style={{ display: "block", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform .3s" }}
                />
                <div style={{ position: "absolute", right: 0, bottom: 0, left: 0, height: "80px", background: "linear-gradient(to top, rgba(0,0,0,.4), transparent)" }} />

                {/* Top: Badge + Like */}
                <div style={{ display: "flex", position: "absolute", top: "12px", right: "12px", left: "12px", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "9999px", background: badge.bg, color: badge.color, fontSize: "11px", fontWeight: 700 }}>
                    <BadgeIcon size={12} />{badge.text}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleLike(room.id); }}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "36px", height: "36px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,.9)", backdropFilter: "blur(4px)", cursor: "pointer" }}
                  >
                    <Heart size={18} fill={room.isLiked ? "#FF4B6E" : "none"} color={room.isLiked ? "#FF4B6E" : "#666"} strokeWidth={2} />
                  </button>
                </div>

                {/* Bottom: Time + Discount */}
                <div style={{ display: "flex", position: "absolute", bottom: "12px", left: "14px", alignItems: "center", gap: "6px", color: "#fff", fontSize: "12px", fontWeight: 500 }}>
                  <Clock size={12} /><span>{getTimeLabel(room.uploadedMinutesAgo)} 업로드</span>
                </div>
                <div style={{ display: "flex", position: "absolute", right: "14px", bottom: "12px", justifyContent: "center", alignItems: "center", width: "48px", height: "48px", borderRadius: "14px", background: BRAND_COLOR, color: "#fff", fontSize: "16px", fontWeight: 900, boxShadow: "0 4px 12px rgba(255,94,0,.4)" }}>
                  {room.discountRate}%
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "16px 18px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.3, color: "#111" }}>{room.name}</h3>
                  <div style={{ display: "flex", flexShrink: 0, alignItems: "center", gap: "2px", marginLeft: "8px", fontSize: "13px", fontWeight: 700, color: "#FF8C00" }}>
                    <Star size={13} fill="#FF8C00" />{room.rating}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "13px", color: "#888" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={12} />{room.location}</span>
                  <span style={{ color: "#ddd" }}>|</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><BedDouble size={12} />{room.roomType}</span>
                </div>

                {/* Price + 줍기 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ marginBottom: "2px", fontSize: "13px", color: "#bbb", textDecoration: "line-through" }}>{formatPrice(room.originalPrice)}원</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span style={{ fontSize: "24px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: BRAND_COLOR }}>{formatPrice(room.zoopPrice)}</span>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: BRAND_COLOR }}>원</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleClickZoop(room.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "4px", padding: "10px 20px", borderRadius: "14px", border: "none",
                      background: isAlmostGone ? `linear-gradient(135deg, ${BRAND_COLOR}, #E54D00)` : BRAND_COLOR,
                      color: "#fff", fontSize: "15px", fontWeight: 800, cursor: "pointer",
                      boxShadow: isAlmostGone ? "0 4px 16px rgba(255,94,0,.35)" : "none",
                    }}
                  >
                    줍기<ArrowDown size={14} strokeWidth={3} />
                  </button>
                </div>

                {isAlmostGone && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "10px", padding: "6px 10px", borderRadius: "10px", background: "#FFF5F5", color: "#EF4444", fontSize: "12px", fontWeight: 600 }}>
                    <Users size={12} />남은 객실 {room.remainingCount}개 · 지금 {Math.floor(Math.random() * 15) + 5}명이 보고 있어요
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredRooms.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "60px 20px", color: "#aaa", textAlign: "center" }}>
            <Search size={40} color="#ddd" />
            <p style={{ margin: 0, fontSize: "15px", fontWeight: 600 }}>검색 결과가 없어요</p>
            <p style={{ margin: 0, fontSize: "13px" }}>다른 키워드로 검색해보세요</p>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav style={{ display: "flex", position: "fixed", bottom: 0, left: "50%", justifyContent: "space-around", alignItems: "center", width: "100%", maxWidth: "448px", padding: "12px 0 calc(12px + env(safe-area-inset-bottom, 0px))", borderTop: "1px solid #F0F0F0", background: "rgba(255,255,255,.95)", backdropFilter: "blur(12px)", transform: "translateX(-50%)" }}>
        {[
          { icon: Flame, label: "줍기", isActive: true },
          { icon: Search, label: "검색", isActive: false },
          { icon: Heart, label: "찜", isActive: false },
          { icon: Users, label: "마이", isActive: false },
        ].map(item => (
          <button key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", border: "none", background: "none", color: item.isActive ? BRAND_COLOR : "#BBB", fontSize: "11px", fontWeight: item.isActive ? 700 : 500, cursor: "pointer" }}>
            <item.icon size={22} fill={item.isActive ? BRAND_COLOR : "none"} strokeWidth={item.isActive ? 2.5 : 1.8} />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HomePage;