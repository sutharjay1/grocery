import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

export const renderRating = (rating) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-5 w-5",
            index < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300",
          )}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-500">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};
