import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogTitle, DialogPanel, DialogBackdrop } from "@headlessui/react"

function FriendList({ friends }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const friendAmount = (friends.length === 1 ? (friends.length + " friend") : (friends.length + " friends"));

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
      >
        {friendAmount}
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Friends
                    </DialogTitle>
                    <div>
                      {friends.map((friend) => (
                        <div className="flex flex-column justify-between">
                          <button type="button" onClick={() => {
                              navigate(`/user/${encodeURIComponent(friend.name)}`);
                            }}>{friend.name}</button>
                          <button type="button" onClick={async() => {
                            const user = encodeURIComponent(friend.name);
                            const response = await fetch(
                            `http://localhost:4243/profile/${user}/remove-friend`,
                            {
                              method: "DELETE",
                              credentials: "include",
                            },
                          );
                          if (response.ok) {
                            await response.json();
                          } else {
                            console.error("Error removing friend");
                          }}}>X</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

// function FriendList({ friends }) {
//   const navigate = useNavigate();
//   const [menu, setMenu] = useState(null);
//   const open = Boolean(menu);

//   const handleClick = (e) => {
//     setMenu(e.currentTarget);
//   };
//   const friendAmount =
//     friends.length === 1
//       ? friends.length + " friend"
//       : friends.length + " friends";
//   return (
//     <div>
//       <button onClick={handleClick}>{friendAmount}</button>
//       <Menu anchorEl={menu} open={open}>
//         {friends.map((friend) => (
//           <MenuItem key={friend.id} className="flex justify-between">
//             <button
//               onClick={() => {
//                 navigate(`/user/${encodeURIComponent(friend.name)}`);
//               }}
//             >
//               {friend.name}
//             </button>
//             <button onClick={async () => {
//               const user = encodeURIComponent(friend.name);
//               const response = await fetch(
//               `http://localhost:4243/profile/${user}/remove-friend`,
//               {
//                 method: "DELETE",
//                 credentials: "include",
//               },
//             );
//             if (response.ok) {
//               await response.json();
//             } else {
//               console.error("Error removing friend");
//       }}}>X</button>
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }

export default FriendList;
