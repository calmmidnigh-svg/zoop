"use client";

import { Flame, Search, Heart, Users } from "lucide-react";

type NavItemType = {
  icon: typeof Flame;
  label: string;
  isActive: boolean;
};

const NAV_ITEMS: NavItemType[] = [
  { icon: Flame, label: "줍기", isActive: true },
  { icon: Search, label: "검색", isActive: false },
  { icon: Heart, label: "찜", isActive: false },
  { icon: Users, label: "마이", isActive: false },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-gray-100 bg-white/95 px-0 pt-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] backdrop-blur-xl">
    {NAV_ITEMS.map(item => (
      <button
        key={item.label}
        className={`flex flex-col items-center gap-1 border-0 bg-transparent text-[11px] ${
          item.isActive
            ? "font-bold text-brand"
            : "font-medium text-gray-300"
        }`}
      >
        <item.icon
          size={22}
          fill={item.isActive ? "currentColor" : "none"}
          strokeWidth={item.isActive ? 2.5 : 1.8}
        />
        {item.label}
      </button>
    ))}
  </nav>
);

export default BottomNav;
