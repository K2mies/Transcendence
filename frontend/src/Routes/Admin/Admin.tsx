import AdminUsers from "./AdminUsers";
import AdminReviews from "./AdminReviews";

function Admin() {
  return (
    <div className="bg-secondary text-primary min-h-screen p-6">
      <AdminUsers />
      <AdminReviews />
    </div>
  );
}

export default Admin;
