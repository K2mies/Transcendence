import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../Auth/CurrentUserContext";
import type { AdminUser, Role } from "../../Types/AdminType";
import PaginationControls from "../Games/PaginationControls";

const ASSIGNABLE_ROLES: Role[] = ["ADMIN", "USER"];
const PAGE_SIZE = 10;

function AdminUsers() {
  const { currentUser } = useCurrentUser();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(
        `http://localhost:4243/admin/users?search=${encodeURIComponent(search)}`,
        { credentials: "include" },
      );

      if (response.status === 200) {
        const result = await response.json();
        setUsers(result.data);
        setPage(1);
      }
    }

    const timeoutId = setTimeout(loadUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  async function deleteUser(id: number, name: string) {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) {
      return;
    }

    const response = await fetch(`http://localhost:4243/admin/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } else {
      toast.custom(() => (
        <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
          <div className="flex items-center gap-2">
            Failed to delete user. Please try again.
          </div>
        </div>
      ));
    }
  }

  async function changeRole(id: number, role: Role) {
    const response = await fetch(
      `http://localhost:4243/admin/users/${id}/role`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role }),
      },
    );

    if (response.ok) {
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role } : user)),
      );
    } else {
      toast.custom(() => (
        <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
          <div className="flex items-center gap-2">
            Failed to change role. Please try again.
          </div>
        </div>
      ));
    }
  }

  const columns =
    "grid-cols-[minmax(120px,1fr)_minmax(180px,1.5fr)_130px_110px_90px]";

  const sortedUsers = [...users].sort((a, b) => {
    const diff =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sortAsc ? diff : -diff;
  });

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedUsers = sortedUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="mb-6">
      <div className="bg-primary text-tertiary flex items-center justify-between rounded-t-lg py-2 px-5">
        <span className="font-bold">Users</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username..."
          className="rounded px-2 py-1 text-sm text-primary bg-tertiary"
        />
      </div>

      <div className="bg-tertiary text-primary border-primary border-3 overflow-hidden">
        <div
          className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-2 px-5 font-bold text-sm`}
        >
          <span>Username</span>
          <span>Email</span>
          <span>Role</span>
          <button
            type="button"
            onClick={() => setSortAsc((prev) => !prev)}
            className="font-bold"
          >
            Joined {sortAsc ? "▲" : "▼"}
          </button>
          <span />
        </div>

        {pagedUsers.map((user) => {
          const isSelf = user.id === currentUser?.id;
          const isSuperuserRow = user.role === "SUPERUSER";
          const canDelete = !isSelf && !isSuperuserRow;

          return (
            <div
              key={user.id}
              className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-3 px-5 last:border-b-0`}
            >
              <Link
                to={`/user/${user.name}`}
                className="text-sm no-underline text-primary truncate"
              >
                {user.name}
              </Link>

              <span className="text-sm truncate">{user.email}</span>

              {currentUser?.role === "SUPERUSER" && !isSuperuserRow ? (
                <div className="relative inline-flex items-center">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      changeRole(user.id, e.target.value as Role)
                    }
                    className="appearance-none border-none bg-transparent p-0 pr-4 text-sm"
                  >
                    {ASSIGNABLE_ROLES.map((role) => (
                      <option key={role} value={role} className="py-2">
                        {role}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-0 text-lg">
                    ▾
                  </span>
                </div>
              ) : (
                <span className="text-sm">{user.role}</span>
              )}

              <span className="text-sm">
                {new Date(user.createdAt).toLocaleDateString("fi-FI")}
              </span>

              <button
                type="button"
                disabled={!canDelete}
                onClick={() => deleteUser(user.id, user.name)}
                className={
                  canDelete
                    ? ""
                    : "text-gray-400 cursor-not-allowed hover:text-gray-400"
                }
              >
                Delete
              </button>
            </div>
          );
        })}

        {Array.from({ length: PAGE_SIZE - pagedUsers.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-3 px-5 last:border-b-0`}
            aria-hidden="true"
          >
            <span>&nbsp;</span>
          </div>
        ))}
      </div>

      <PaginationControls
        page={currentPage}
        totalPages={totalPages}
        onPrevious={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        onPageChange={setPage}
        className="rounded-b-lg"
      />
    </div>
  );
}

export default AdminUsers;
