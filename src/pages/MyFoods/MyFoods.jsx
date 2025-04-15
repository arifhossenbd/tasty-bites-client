import { useEffect, useState, useCallback, useMemo } from "react";
import useApi from "../../hooks/useApi";
import Loading from "../../component/Loading/Loading";
import DataStatus from "../../component/DataStatus/DataStatus";
import PageHeader from "../../component/PageHeader/PageHeader";
import { useAuth } from "../../hooks/useAuth";
import {
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import MyFood from "../MyFood/MyFood";

const MyFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: "name",
    direction: "asc",
  });
  const { loading, error, getSecureData } = useApi();

  // Fetch all foods on component mount
  const fetchFoods = useCallback(async () => {
    try {
      const result = await getSecureData(`/my-foods?email=${user?.email}`);
      if (result?.success) {
        setAllFoods(result?.data);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, [user?.email, getSecureData]);

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

  // Handle sort configuration
  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.field === field) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ field, direction });
    setPage(1); // Reset to first page when sorting changes
  };

  // Render sort icon
  const sortIcons = (field) => {
    if (sortConfig.field !== field) return <FaSort className="ml-1" />;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="ml-1" />
    ) : (
      <FaSortDown className="ml-1" />
    );
  };

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
    return <Loading secondaryText="My Foods" />;
  }

  return (
    <DataStatus
      error={error}
      path="/add-food"
      btnText="Add Food"
      message="Your foods not found"
      data={filteredFoods || filteredFoods}
      onRetry={fetchFoods}
    >
      <PageHeader
        title="My Foods"
        subtitle="Manage your food items"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/foods" },
          { name: "My Foods" },
        ]}
        backgroundImage="/tasty-bites-images/banner/banner8.jpg"
      />
      <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
        {/* Search and Limit Controls */}
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

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Items per page:</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Food Items Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white overflow-hidden">
            <thead className="bg-yellow-100">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th
                  className="py-3 px-4 text-left cursor-pointer hover:bg-yellow-200 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {sortIcons("name")}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left cursor-pointer hover:bg-yellow-200 transition-colors"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    {sortIcons("category")}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left cursor-pointer hover:bg-yellow-200 transition-colors"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center">
                    Price
                    {sortIcons("price")}
                  </div>
                </th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFoods.map((food) => (
                <MyFood
                  key={food?._id}
                  food={food}
                  setAllFoods={setAllFoods}
                  allFoods={allFoods}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination Controls */}
        {totalItems > 0 && (
          <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, totalItems)} of {totalItems} items
            </div>

            <div className="flex items-center gap-2">
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

              <div className="flex gap-1">
                {paginationRange.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`w-10 h-10 flex items-center justify-center border rounded ${
                      page === pageNumber
                        ? "bg-yellow-500 text-white"
                        : "hover:bg-yellow-50"
                    } transition-colors`}
                  >
                    {pageNumber}
                  </button>
                ))}
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

export default MyFoods;
