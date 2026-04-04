import { Badge } from "@/components/ui/badge";
import { BADGE_STYLE_MAP } from "@/app/constants";
import type { BadgeVariantType } from "@/app/types";

type UrgencyBadgePropsType = {
  badgeType: BadgeVariantType;
};

const UrgencyBadge = ({ badgeType }: UrgencyBadgePropsType) => {
  const { className, icon: IconComponent, text } = BADGE_STYLE_MAP[badgeType];

  return (
    <Badge
      variant="secondary"
      className={`${className} gap-1 rounded-full border-0 px-2.5 py-1 text-[11px] font-bold tracking-tight`}
    >
      <IconComponent size={12} />
      {text}
    </Badge>
  );
};

export default UrgencyBadge;
