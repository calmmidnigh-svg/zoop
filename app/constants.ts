import type { RoomDTO, CategoryDTO, BadgeVariantType } from "./types";
import { Flame, Clock, Zap, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Category ── */

export const CATEGORY_LIST: CategoryDTO[] = [
  { id: "all", label: "전체", icon: "🔥" },
  { id: "hotel", label: "호텔", icon: "🏨" },
  { id: "pension", label: "펜션", icon: "🏡" },
  { id: "resort", label: "리조트", icon: "🏖️" },
  { id: "motel", label: "모텔", icon: "🛏️" },
  { id: "guesthouse", label: "게하", icon: "🎒" },
];

/* ── Badge Style ── */

type BadgeStyleType = {
  className: string;
  icon: LucideIcon;
  text: string;
};

export const BADGE_STYLE_MAP: Record<BadgeVariantType, BadgeStyleType> = {
  urgent: {
    className: "bg-red-100 text-red-600",
    icon: Flame,
    text: "마감임박",
  },
  today: {
    className: "bg-amber-100 text-amber-600",
    icon: Clock,
    text: "오늘만 이 가격",
  },
  hot: {
    className: "bg-brand-light text-brand",
    icon: Zap,
    text: "지금 뜨는 딜",
  },
  new: {
    className: "bg-blue-100 text-blue-600",
    icon: Bell,
    text: "방금 올라옴",
  },
};

/* ── Mock Data ── */

export const MOCK_ROOMS: RoomDTO[] = [
  {
    id: "1",
    name: "그랜드 하얏트 서울",
    roomType: "디럭스 트윈",
    location: "서울 용산구",
    originalPrice: 380000,
    zoopPrice: 149000,
    discountRate: 61,
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 2341,
    remainingCount: 2,
    badgeType: "urgent",
    category: "hotel",
    uploadedMinutesAgo: 12,
    isLiked: false,
  },
  {
    id: "2",
    name: "제주 오션뷰 펜션",
    roomType: "오션뷰 스위트",
    location: "제주 서귀포시",
    originalPrice: 250000,
    zoopPrice: 89000,
    discountRate: 64,
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 876,
    remainingCount: 1,
    badgeType: "today",
    category: "pension",
    uploadedMinutesAgo: 3,
    isLiked: true,
  },
  {
    id: "3",
    name: "속초 마린베이 리조트",
    roomType: "패밀리 스위트",
    location: "강원 속초시",
    originalPrice: 320000,
    zoopPrice: 128000,
    discountRate: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 1203,
    remainingCount: 3,
    badgeType: "hot",
    category: "resort",
    uploadedMinutesAgo: 27,
    isLiked: false,
  },
  {
    id: "4",
    name: "을지로 디자인 호텔",
    roomType: "스탠다드 더블",
    location: "서울 중구",
    originalPrice: 180000,
    zoopPrice: 59000,
    discountRate: 67,
    imageUrl:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 567,
    remainingCount: 5,
    badgeType: "new",
    category: "hotel",
    uploadedMinutesAgo: 1,
    isLiked: false,
  },
  {
    id: "5",
    name: "부산 해운대 파라다이스",
    roomType: "프리미엄 오션뷰",
    location: "부산 해운대구",
    originalPrice: 450000,
    zoopPrice: 179000,
    discountRate: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 3892,
    remainingCount: 1,
    badgeType: "urgent",
    category: "hotel",
    uploadedMinutesAgo: 8,
    isLiked: true,
  },
  {
    id: "6",
    name: "가평 숲속 글램핑",
    roomType: "프리미엄 글램핑",
    location: "경기 가평군",
    originalPrice: 200000,
    zoopPrice: 78000,
    discountRate: 61,
    imageUrl:
      "https://images.unsplash.com/photo-1470214203263-0bbc3a399af2?w=600&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 432,
    remainingCount: 4,
    badgeType: "today",
    category: "pension",
    uploadedMinutesAgo: 45,
    isLiked: false,
  },
];
