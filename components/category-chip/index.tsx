import type { CategoryDTO } from "@/app/types";

type CategoryChipPropsType = {
  category: CategoryDTO;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const CategoryChip = ({
  category,
  isSelected,
  onSelect,
}: CategoryChipPropsType) => {
  const handleClick = () => {
    onSelect(category.id);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
        isSelected
          ? "bg-brand font-bold text-white"
          : "border border-gray-200 bg-white font-medium text-gray-500 hover:border-gray-300"
      }`}
    >
      {category.label}
    </button>
  );
};

export default CategoryChip;
