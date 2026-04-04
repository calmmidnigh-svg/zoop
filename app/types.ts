export type BadgeVariantType = "urgent" | "today" | "hot" | "new";

export type CategoryIdType = "all" | "hotel" | "pension" | "resort" | "motel" | "guesthouse";

export interface RoomDTO {
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
}

export interface CategoryDTO {
  id: CategoryIdType;
  label: string;
  icon: string;
}
