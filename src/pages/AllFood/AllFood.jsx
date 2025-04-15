import { useCallback, useEffect, useMemo, useState } from "react";
import Food from "../Food/Food";
import useApi from "../../hooks/useApi";
import DataStatus from "../../component/DataStatus/DataStatus";
import PageHeader from "../../component/PageHeader/PageHeader";
import Loading from "../../component/Loading/Loading";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
} from "react-icons/fa";
const AllFood = () => {
  const [allFoods, setAllFoods] = useState([]);
  const { loading, error, getPublicData } = useApi();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: "name",
    direction: "asc",
  });

  // Fetch all foods on component mount
  const fetchFoods = useCallback(async () => {
    try {
      const response = await getPublicData("/foods");
      setAllFoods(response?.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, [getPublicData]);

  useEffect(() => {
    fetchFoods();
  }, []);

  // In the useMemo where sorting happens:
  const { filteredFoods, totalItems } = useMemo(() => {
    let result = [...allFoods];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result?.filter(
        (food) =>
          food?.name?.toLowerCase().includes(term) ||
          food?.category?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortConfig.field) {
      result?.sort((a, b) => {
        // Special handling for price (numeric sorting)
        if (sortConfig.field === "price") {
          const valueA = parseFloat(a.price) || 0;
          const valueB = parseFloat(b.price) || 0;
          return sortConfig.direction === "asc"
            ? valueA - valueB
            : valueB - valueA;
        }

        // Default string sorting for other fields
        const fieldA = a[sortConfig.field]?.toString().toLowerCase() || "";
        const fieldB = b[sortConfig.field]?.toString().toLowerCase() || "";

        if (fieldA < fieldB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (fieldA > fieldB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    const total = result?.length;
    const startIndex = (page - 1) * limit;
    result = result?.slice(startIndex, startIndex + limit);

    return { filteredFoods: result, totalItems: total };
  }, [allFoods, searchTerm, sortConfig, page, limit]);

  // Pagination controls
  const totalPages = Math.ceil(totalItems / limit);
  const paginationRange = useMemo(() => {
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      Math.min(
        page - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      )
    );
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [totalPages, page]);

  if (loading) {
    return <Loading secondaryText="All Food" />;
  }

  return (
    <DataStatus
      btnText="Go Back Home"
      path="/"
      error={error}
      message="Foods not found"
      data={allFoods}
      onRetry={fetchFoods}
      emptyMessage="No food items available"
    >
      <PageHeader
        title="Our Menu"
        subtitle="Discover our delicious offerings"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Menu" }]}
        backgroundImage="/tasty-bites-images/banner/banner6.jpg"
      />
      <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Sort by Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={sortConfig.field}
              onChange={(e) => {
                setSortConfig((prev) => ({ ...prev, field: e.target.value }));
                setPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="category">Sort by Category</option>
            </select>

            <select
              value={sortConfig.direction}
              onChange={(e) => {
                setSortConfig((prev) => ({
                  ...prev,
                  direction: e.target.value,
                }));
                setPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {filteredFoods?.map((food) => (
            <Food key={food?._id} food={food} />
          ))}
        </div>
        {/* Enhanced Pagination Controls */}
        {totalItems > 0 && (
          <div className="flex flex-row justify-between flex-wrap items-center gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, totalItems)} of {totalItems} items
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-50 transition-colors"
                title="First Page"
              >
                <FaAngleDoubleLeft />
              </button>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-50 transition-colors"
                title="Previous Page"
              >
                <FaAngleLeft />
              </button>

              <div className="flex items-center flex-wrap gap-1">
                {paginationRange?.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`w-10 h-10 flex flex-wrap items-center justify-center border rounded ${
                      page === pageNumber
                        ? "bg-yellow-500 text-white"
                        : "hover:bg-yellow-50"
                    } transition-colors`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="border rounded p-2"
                >
                  {[5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-50 transition-colors"
                title="Next Page"
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-50 transition-colors"
                title="Last Page"
              >
                <FaAngleDoubleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </DataStatus>
  );
};

export default AllFood;
