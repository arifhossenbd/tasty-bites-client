import { useTheme } from "../../hooks/useTheme";

// Card Skeleton Component
export const CardSkeleton = ({ count = 1, className = "" }) => {
  const { currentTheme } = useTheme();
  const { cardBgColor, cardBorderColor } = currentTheme;

  return (
    <div className={`${className}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`rounded-2xl overflow-hidden shadow-xl border flex flex-col ${cardBgColor} ${cardBorderColor}`}>
          <div className="h-56 md:h-48 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex flex-col gap-3">
              <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="flex justify-between">
                <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="mt-auto pt-4 md:pt-6">
              <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// List Skeleton Component
export const ListSkeleton = ({ count = 5, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
      ))}
    </div>
  );
};

// Default Skeleton with types
const Skeleton = ({ type = "card", count = 1, className = "" }) => {
  switch (type) {
    case "card":
      return <CardSkeleton count={count} className={className} />;
    case "list":
      return <ListSkeleton count={count} className={className} />;
    default:
      return <CardSkeleton count={count} className={className} />;
  }
};

export default Skeleton;