"use client";

import { Heart, Clock, MapPin, BedDouble, Star, Users, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import UrgencyBadge from "@/components/urgency-badge";
import type { RoomDTO } from "@/app/types";

type RoomCardPropsType = {
  room: RoomDTO;
  onToggleLike: (roomId: string) => void;
};

const formatPrice = (price: number) => price.toLocaleString("ko-KR");

const getTimeLabel = (minutes: number) => {
  let result = `${minutes}분 전`;

  if (minutes >= 60) {
    result = `${Math.floor(minutes / 60)}시간 전`;
  }

  return result;
};

const RoomCard = ({ room, onToggleLike }: RoomCardPropsType) => {
  const {
    id,
    name,
    roomType,
    location,
    originalPrice,
    zoopPrice,
    discountRate,
    imageUrl,
    rating,
    remainingCount,
    badgeType,
    uploadedMinutesAgo,
    isLiked,
  } = room;

  const isAlmostGone = remainingCount <= 2;

  const handleClickLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike(id);
  };

  return (
    <Card className="group overflow-hidden rounded-3xl border-gray-100 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
      {/* Image Area */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />

        {/* Gradient overlay */}
        <div className="absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 right-3 left-3 flex items-start justify-between">
          <UrgencyBadge badgeType={badgeType} />

          <button
            onClick={handleClickLike}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform hover:scale-110 active:scale-90"
          >
            <Heart
              size={18}
              fill={isLiked ? "#FF4B6E" : "none"}
              color={isLiked ? "#FF4B6E" : "#666"}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Bottom info on image */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-xs font-medium text-white">
          <Clock size={12} />
          <span>{getTimeLabel(uploadedMinutesAgo)} 업로드</span>
        </div>

        {/* Discount badge */}
        <div className="absolute right-3.5 bottom-3 flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand text-base font-black tracking-tighter text-white shadow-[0_4px_12px_rgba(255,94,0,0.4)]">
          {discountRate}%
        </div>
      </div>

      {/* Content Area */}
      <div className="px-[18px] pt-4 pb-[18px]">
        {/* Name & Rating */}
        <div className="mb-1 flex items-start justify-between">
          <h3 className="m-0 text-[17px] font-extrabold leading-tight tracking-tight text-gray-900">
            {name}
          </h3>
          <div className="ml-2 flex shrink-0 items-center gap-0.5 text-[13px] font-bold text-amber-500">
            <Star size={13} fill="currentColor" />
            {rating}
          </div>
        </div>

        {/* Location & Room Type */}
        <div className="mb-3 flex items-center gap-2 text-[13px] text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {location}
          </span>
          <span className="text-gray-200">|</span>
          <span className="flex items-center gap-1">
            <BedDouble size={12} />
            {roomType}
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-end justify-between">
          <div>
            <div className="mb-0.5 text-[13px] text-gray-300 line-through">
              {formatPrice(originalPrice)}원
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black leading-none tracking-tighter text-brand">
                {formatPrice(zoopPrice)}
              </span>
              <span className="text-[15px] font-bold text-brand">원</span>
            </div>
          </div>

          {/* ZOOP Button */}
          <button
            className={`flex items-center gap-1 rounded-[14px] border-0 px-5 py-2.5 text-[15px] font-extrabold tracking-tight text-white transition-all hover:brightness-110 hover:-translate-y-px active:scale-[0.97] ${
              isAlmostGone
                ? "bg-gradient-to-br from-brand to-brand-dark shadow-[0_4px_16px_rgba(255,94,0,0.35)] animate-pulse-soft"
                : "bg-brand"
            }`}
          >
            줍기
            <ArrowDown size={14} strokeWidth={3} />
          </button>
        </div>

        {/* Remaining count */}
        {isAlmostGone && (
          <div className="mt-2.5 flex items-center gap-1 rounded-[10px] bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-500 animate-fade-in">
            <Users size={12} />
            남은 객실 {remainingCount}개 · 지금 {Math.floor(Math.random() * 15) + 5}명이 보고 있어요
          </div>
        )}
      </div>
    </Card>
  );
};

export default RoomCard;
