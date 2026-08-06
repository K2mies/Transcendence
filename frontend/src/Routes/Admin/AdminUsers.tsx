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
  const [announcement, setAnnouncement] = useState<string>("");

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(
        `/api/admin/users?search=${encodeURIComponent(search)}`,
        { credentials: "include" },
      );

      if (response.status === 200) {
        const result = await response.json();
        setUsers(result.data);
        setPage(1);
        setAnnouncement(
          result.data.length === 1
            ? "1 user found"
            : `${result.data.length} users found`,
        );
      }
    }

    const timeoutId = setTimeout(loadUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  async function deleteUser(id: number, name: string) {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) {
      return;
    }

    const response = await fetch(`/api/admin/users/${id}`, {
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
      `/api/admin/users/${id}/role`,
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
        <h2 className="text-[1.4rem] font-bold">Users</h2>
        <label htmlFor="admin-user-search" className="sr-only">
          Search for a user
        </label>
        <input
          id="admin-user-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username..."
          className="rounded px-2 py-1 text-sm text-primary bg-tertiary"
        />
      </div>

      <p aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</p>

      <table className="bg-tertiary text-primary border-primary border-3 md:overflow-hidden w-full overflow-x-auto scroll-smooth snap-x snap-mandatory md:table flex flex-wrap">
        <caption className="sr-only">Users</caption>
        <thead>
          <tr className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-2 px-5 font-bold text-sm`}>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">
              <span className="sr-only">Date of joining</span>
              <button
                type="button"
                onClick={() => setSortAsc((prev) => !prev)}
                className="font-bold"
                aria-label={sortAsc ? "Change to descending sorting" : "Change to ascending sorting"}
              >
                <span aria-hidden="true">Joined {sortAsc ? "▲" : "▼"}</span>
              </button>
            </th>
            <th scope="col">Delete?</th>
          </tr>
        </thead>

        <tbody>
          {pagedUsers.map((user) => {
            const isSelf = user.id === currentUser?.id;
            const isSuperuserRow = user.role === "SUPERUSER";
            const canDelete = !isSelf && !isSuperuserRow;

            return (
              <tr
                key={user.id}
                className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-3 px-5 last:border-b-0`}
              >
                <td>
                  <Link
                    to={`/user/${user.name}`}
                    className="text-sm no-underline text-primary truncate"
                  >
                    {user.name}
                  </Link>
                </td>

                <td>
                  <span className="text-sm truncate">{user.email}</span>
                </td>

                <td>
                  {currentUser?.role === "SUPERUSER" && !isSuperuserRow ? (
                    <div className="relative inline-flex items-center">
                      <select
                        aria-label="Choose a role"
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
                </td>

                <td>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString("fi-FI")}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
                    disabled={!canDelete}
                    aria-hidden={!canDelete}
                    onClick={() => deleteUser(user.id, user.name)}
                    className={
                      canDelete
                        ? ""
                        : "text-gray-400 cursor-not-allowed hover:text-gray-400"
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}

          {Array.from({ length: PAGE_SIZE - pagedUsers.length }).map((_, i) => (
            <tr
              key={`empty-${i}`}
              className={`grid ${columns} gap-4 items-center justify-items-start border-b border-gray-500 py-3 px-5 last:border-b-0`}
              aria-hidden="true"
            >
              <td>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>

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
