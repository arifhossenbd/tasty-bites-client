import { useEffect, useState, useCallback, useMemo } from "react";
import {
  FaSearch,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import useApi from "../../hooks/useApi";
import DataStatus from "../../component/DataStatus/DataStatus";
import PageHeader from "../../component/PageHeader/PageHeader";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../component/Loading/Loading";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const { loading, error, getSecureData } = useApi();

  const fetchOrders = useCallback(async () => {
    try {
      const result = await getSecureData(`/my-orders?email=${user?.email}`);
      if (result?.success) {
        setOrders(result?.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user?.email, getSecureData]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const { filteredOrders, totalItems } = useMemo(() => {
    let result = [...orders];
    result?.sort((a, b) => {
      const dateA = new Date(a?.orderDate);
      const dateB = new Date(b?.orderDate);
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result?.filter((order) =>
        order?.items.some(
          (item) =>
            item?.name?.toLowerCase().includes(term) ||
            item?.category?.toLowerCase().includes(term)
        )
      );
    }

    const total = result?.length;
    const startIndex = (page - 1) * limit;
    result = result?.slice(startIndex, startIndex + limit);

    return { filteredOrders: result, totalItems: total };
  }, [orders, searchTerm, page, limit, sortOrder]);

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

  if (loading) return <Loading secondaryText="My Orders" />;

  return (
    <DataStatus
      error={error}
      path="/foods"
      btnText="Menu"
      title="My Orders"
      message="You haven't placed any orders yet"
      data={filteredOrders}
      onRetry={fetchOrders}
    >
      <PageHeader
        title="My Orders"
        subtitle="View your order history"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/foods" },
          { name: "My Orders" },
        ]}
        backgroundImage="/tasty-bites-images/banner/banner11.jpg"
      />

      <div className="px-4 md:px-0 md:w-11/12 lg:w-10/12 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white border rounded-xl shadow-md p-4 mb-6">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName || "User Avatar"}
            className="w-20 h-20 rounded-full border object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.displayName || "Unnamed User"}
            </h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by food or category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 pl-8 py-2 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            Sort by:
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value="latest">Recently Ordered 🕒</option>
              <option value="oldest">Oldest First 📅</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            Items per page:
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-6">
          {filteredOrders?.map((order) => (
            <div
              key={order?._id}
              className="border rounded-xl shadow-sm hover:shadow-md transition p-4 bg-white"
            >
              <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                <div className="font-mono text-gray-800">
                  Order ID:{" "}
                  <span className="text-yellow-600">
                    #{order?._id.slice(0, 8)}
                  </span>
                </div>
                <div className="text-gray-600">
                  {new Date(order?.orderDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {order?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg border flex items-center gap-2"
                  >
                    <figure className="h-24 w-28">
                      <img
                        className="w-full h-full rounded-l-md"
                        src={item?.image}
                        alt={item?.name}
                      />
                    </figure>
                    <div className="space-y-1">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 w-fit"
                      >
                        {item?.category}
                      </div>
                      <div className="font-semibold text-gray-800">
                        {item?.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item?.quantity} × ${item?.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="text-sm text-gray-500">Total: </span>
                  <span className="lg:text-lg font-bold text-sm md:text-base text-yellow-600">
                    ${order?.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order?.pending
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order?.pending ? "Pending ⏳" : "Completed ✅"}
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalItems > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, totalItems)} of {totalItems} orders
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="p-2 border rounded disabled:opacity-40 hover:bg-yellow-100 transition"
              >
                <FaAngleDoubleLeft />
              </button>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 border rounded disabled:opacity-40 hover:bg-yellow-100 transition"
              >
                <FaAngleLeft />
              </button>

              {paginationRange.map((pg) => (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`w-9 h-9 text-sm border rounded ${
                    page === pg
                      ? "bg-yellow-500 text-white"
                      : "hover:bg-yellow-100"
                  } transition`}
                >
                  {pg}
                </button>
              ))}

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 border rounded disabled:opacity-40 hover:bg-yellow-100 transition"
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="p-2 border rounded disabled:opacity-40 hover:bg-yellow-100 transition"
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

export default MyOrders;
