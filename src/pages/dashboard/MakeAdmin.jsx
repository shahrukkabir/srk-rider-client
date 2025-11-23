import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Button from "../../components/ui/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: users = [],
    refetch,
    isFetching,
    isError,
  } = useQuery({
    // include emailQuery so results update when it changes
    queryKey: ["usersList", emailQuery],
    // fetch all users when no query, or call search endpoint when a query exists
    queryFn: async () => {
      const url = emailQuery
        ? `/users/search?email=${encodeURIComponent(emailQuery)}`
        : `/users`;
      const res = await axiosSecure.get(url);
      // normalize created_at / createdAt if needed on backend; here assume created_at exists
      return res.data || [];
    },
    // no `enabled` so it will fetch immediately and whenever emailQuery changes
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 minute (optional)
  });

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleRoleChange = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Make Admin</h2>

      <div className="flex gap-2 mb-6 items-center">
        <FaSearch />
        <input
          type="text"
          className="input input-bordered w-full max-w-md border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-200"
          placeholder="Search user by email (leave empty to show all)"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
        <Button className="cursor-pointer"
          variant="secondary"
          onClick={() => {
            // clear search to show all
            setEmailQuery("");
          }}
        >
          Clear
        </Button>
      </div>

      {isFetching && <p>Loading users...</p>}
      {isError && <p className="text-red-600">Failed to load users.</p>}

      {!isFetching && users.length === 0 && (
        <p className="text-gray-500">
          {emailQuery ? "No users found for that search." : "No users available."}
        </p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>
                    {/* guard in case field name differs */}
                    {u.created_at
                      ? new Date(u.created_at).toLocaleDateString()
                      : u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`badge ${u.role === "admin" ? "badge-success" : "badge-ghost"}`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => handleRoleChange(u._id, u.role || "user")}
                      className={`btn border-none btn-sm text-black ${
                        u.role === "admin" ? "btn-error" : "btn-primary"
                      }`}
                    >
                      {u.role === "admin" ? (
                        <>
                          <FaUserTimes className="mr-1" />
                          Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield className="mr-1" />
                          Make Admin
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
