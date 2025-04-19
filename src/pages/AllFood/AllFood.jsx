import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Food from "../Food/Food";
import useApi from "../../hooks/useApi";
import DataStatus from "../../component/DataStatus/DataStatus";
import PageHeader from "../../component/PageHeader/PageHeader";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
} from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";

const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const { loading, error, getPublicData } = useApi();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: "name",
    direction: "asc",
  });
  const { currentTheme } = useTheme();
  const {
    textColor,
    borderColor,
    cardBgColor,
    inactiveBtn,
    navTextColor,
    activeBtn,
    inputBgColor,
    inputTextColor,
  } = currentTheme;

  const fetchFoods = useCallback(async () => {
    const response = await getPublicData("/foods");
    if (response?.success) {
      setFoods(response?.data || []);
    }
  }, [getPublicData]);

  useEffect(() => {
    fetchFoods();
  }, []);

  const { filteredFoods, totalItems } = useMemo(() => {
    let result = [...(foods || [])];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (food) =>
          food?.name?.toLowerCase().includes(term) ||
          food?.category?.toLowerCase().includes(term)
      );
    }

    if (sortConfig.field) {
      result.sort((a, b) => {
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

    const total = result.length;
    const startIndex = (page - 1) * limit;
    result = result.slice(startIndex, startIndex + limit);

    return { filteredFoods: result, totalItems: total };
  }, [foods, searchTerm, sortConfig, page, limit]);

  const totalPages = Math.ceil(totalItems / limit) || 1;
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const skeletonVariants = {
    hidden: { opacity: 0.6 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <DataStatus
      loading={loading}
      btnText="Go Back Home"
      path="/"
      error={error}
      message="Foods not found"
      data={foods}
      onRetry={fetchFoods}
      emptyMessage="No food items available"
    >
      <PageHeader
        title="Our Menu"
        subtitle="Discover our delicious offerings"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Menu" }]}
        backgroundImage="/tasty-bites-images/banner/banner10.jpg"
      />
      
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className={`px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto py-4 md:py-6 pb-10 md:pb-12 ${textColor}`}
      >
        {/* Search and Sort Controls */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6"
        >
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className={`w-full pl-10 pr-4 py-2 border ${borderColor} focus:outline-none rounded-full ${inputBgColor} ${inputTextColor}`}
            />
            <FaSearch className={`absolute left-3 top-3 ${inputTextColor}`} />
          </div>

          {/* Sort by Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={sortConfig.field}
              onChange={(e) => {
                setSortConfig((prev) => ({ ...prev, field: e.target.value }));
                setPage(1);
              }}
              className={`border rounded px-2 py-1 text-sm ${cardBgColor} ${borderColor}`}
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
              className={`border rounded px-2 py-1 text-sm ${cardBgColor} ${borderColor}`}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </motion.div>

        {/* Food Grid */}
        {loading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                variants={skeletonVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: index * 0.1 }}
                className={`h-64 rounded-lg ${cardBgColor}`}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3"
          >
            <AnimatePresence>
              {filteredFoods.map((food) => (
                <motion.div
                  key={food?._id}
                  variants={itemVariants}
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <Food food={food} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Enhanced Pagination Controls */}
        {totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-row justify-between flex-wrap items-center gap-4 mt-6"
          >
            <div className={`text-sm ${navTextColor}`}>
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, totalItems)} of {totalItems} items
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(1)}
                disabled={page === 1}
                className={`p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed ${inactiveBtn} transition-colors ${borderColor}`}
                title="First Page"
              >
                <FaAngleDoubleLeft />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed ${inactiveBtn} transition-colors ${borderColor}`}
                title="Previous Page"
              >
                <FaAngleLeft />
              </motion.button>

              <div className="flex items-center flex-wrap gap-1">
                {paginationRange.map((pageNumber) => (
                  <motion.button
                    key={pageNumber}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPage(pageNumber)}
                    className={`w-10 h-10 flex items-center justify-center border rounded ${
                      page === pageNumber ? activeBtn : inactiveBtn
                    } transition-colors ${borderColor}`}
                  >
                    {pageNumber}
                  </motion.button>
                ))}
                <motion.select
                  whileHover={{ scale: 1.05 }}
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className={`border rounded p-2 ${cardBgColor} ${borderColor}`}
                >
                  {[5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </motion.select>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed ${inactiveBtn} transition-colors ${borderColor}`}
                title="Next Page"
              >
                <FaAngleRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className={`p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed ${inactiveBtn} transition-colors ${borderColor}`}
                title="Last Page"
              >
                <FaAngleDoubleRight />
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DataStatus>
  );
};

export default AllFood;