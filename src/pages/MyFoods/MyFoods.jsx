import { useEffect, useState, useCallback, useMemo } from "react";
import useApi from "../../hooks/useApi";
import Loading from "../../component/Loading/Loading";
import DataStatus from "../../component/DataStatus/DataStatus";
import PageHeader from "../../component/PageHeader/PageHeader";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: "name",
    direction: "asc",
  });
  const { loading, error, getSecureData } = useApi();
  const { user } = useAuth();
  const { currentTheme } = useTheme();
  const email = user?.email;

  // Fetch all foods on component mount
  const fetchFoods = useCallback(async () => {
    const result = await getSecureData(`/my-foods?email=${email}`);
    if (result?.success) {
      setAllFoods(result?.data);
    }
  }, [email, getSecureData]);

  useEffect(() => {
    fetchFoods();
  }, []);

  // Filter and sort foods
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
        if (sortConfig.field === "price") {
          const valueA = parseFloat(a.price) || 0;
          const valueB = parseFloat(b.price) || 0;
          return sortConfig.direction === "asc"
            ? valueA - valueB
            : valueB - valueA;
        }

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
    setPage(1);
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
      data={filteredFoods}
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
        backgroundImage="/tasty-bites-images/banner/banner6.jpg"
      />
      <div className={currentTheme.bgColor}>
        <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto py-6 md:py-8 lg:py-12">
          {/* Search and Limit Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className={`relative w-full md:w-64`}>
              <input
                type="text"
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className={`w-full pl-10 pr-4 py-2 border ${currentTheme.borderColor} focus:outline-none rounded-full ${currentTheme.inputBgColor} ${currentTheme.inputTextColor}`}
              />
              <FaSearch
                className={`absolute left-3 top-3 ${currentTheme.inputTextColor}`}
              />
            </div>

            <div className={`flex items-center gap-2 ${currentTheme.textColor}`}>
              <span className="text-sm">Items per page:</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className={`border rounded px-2 py-1 text-sm ${currentTheme.inputBgColor} ${currentTheme.inputTextColor} ${currentTheme.borderColor}`}
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
            <table className={`min-w-full overflow-hidden ${currentTheme.bgColor}`}>
              <thead className="">
                <tr className={`${currentTheme.navBgColor} ${currentTheme.navTextColor}`}>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th
                    className="py-3 px-4 text-left cursor-pointer hover:bg-opacity-80 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Name
                      {sortIcons("name")}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-left cursor-pointer hover:bg-opacity-80 transition-colors"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center">
                      Category
                      {sortIcons("category")}
                    </div>
                  </th>
                  <th
                    className="py-3 px-4 text-left cursor-pointer hover:bg-opacity-80 transition-colors"
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
              <tbody className={`divide-y ${currentTheme.borderColor}`}>
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
              <div className={`text-sm ${currentTheme.textColor}`}>
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, totalItems)} of {totalItems} items
              </div>

              <div className="flex items-center gap-2">
                {/* First Page Button */}
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className={`p-2 rounded transition-colors ${
                    page === 1
                      ? `${currentTheme.inactiveBtn} cursor-not-allowed`
                      : `${currentTheme.activeBtn}`
                  }`}
                  title="First Page"
                >
                  <FaAngleDoubleLeft className={currentTheme.textColor} />
                </button>

                {/* Previous Page Button */}
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`p-2 rounded transition-colors ${
                    page === 1
                      ? `${currentTheme.inactiveBtn} cursor-not-allowed`
                      : `${currentTheme.activeBtn}`
                  }`}
                  title="Previous Page"
                >
                  <FaAngleLeft className={currentTheme.textColor} />
                </button>

                {/* Page Number Buttons */}
                <div className="flex gap-1">
                  {paginationRange.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${
                        page === pageNumber
                          ? `${currentTheme.activeBtn} font-bold`
                          : `${currentTheme.inactiveBtn}`
                      }`}
                    >
                      <span>
                        {pageNumber}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Next Page Button */}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={`p-2 rounded transition-colors ${
                    page === totalPages
                      ? `${currentTheme.inactiveBtn} cursor-not-allowed`
                      : `${currentTheme.activeBtn}`
                  }`}
                  title="Next Page"
                >
                  <FaAngleRight className={currentTheme.textColor} />
                </button>

                {/* Last Page Button */}
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  className={`p-2 rounded transition-colors ${
                    page === totalPages
                      ? `${currentTheme.inactiveBtn} cursor-not-allowed`
                      : `${currentTheme.activeBtn}`
                  }`}
                  title="Last Page"
                >
                  <FaAngleDoubleRight className={currentTheme.textColor} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DataStatus>
  );
};

export default MyFoods;