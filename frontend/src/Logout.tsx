export default function Logout() {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("user");
}
