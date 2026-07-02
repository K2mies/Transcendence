import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogTitle, DialogPanel, DialogBackdrop } from "@headlessui/react"
import { Tabs, Tab, Box } from "@mui/material";
import { ImCheckmark, ImCross } from "react-icons/im";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function FriendList({ friends, sentReqs, recvReqs }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
      >
        Manage friends
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
              <DialogTitle as="h2" className="p-3 text-base font-semibold text-gray-900">
                Manage friends
              </DialogTitle>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label={`Friends (${friends.length})`} value={0} />
                  <Tab label={`Received requests (${recvReqs.length})`} value={1} />
                  <Tab label={`Sent requests (${sentReqs.length})`} value={2} />
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex flex-column justify-between">
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
                      }}}><ImCross /></button>
                    </div>
                  ))}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  {recvReqs.map((friend) => (
                    <div key={friend.id} className="flex flex-column justify-between">
                      <button type="button" className="justify-start" onClick={() => {
                          navigate(`/user/${encodeURIComponent(friend.name)}`);
                        }}>{friend.name}</button>
                      <div>
                        <button type="button" className="mr-6" onClick={async() => {
                          const user = encodeURIComponent(friend.name);
                          const response = await fetch(
                          `http://localhost:4243/profile/${user}/accept-request`,
                          {
                            method: "PUT",
                            credentials: "include",
                          },
                        );
                        if (response.ok) {
                          await response.json();
                        } else {
                          console.error("Error accepting request");
                        }}}><ImCheckmark /></button>
                        <button type="button" onClick={async() => {
                          const user = encodeURIComponent(friend.name);
                          const response = await fetch(
                          `http://localhost:4243/profile/${user}/decline-request`,
                          {
                            method: "DELETE",
                            credentials: "include",
                          },
                        );
                        if (response.ok) {
                          await response.json();
                        } else {
                          console.error("Error declining request");
                        }}}><ImCross /></button>
                      </div>
                    </div>
                  ))}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  {sentReqs.map((friend) => (
                    <div key={friend.id} className="flex flex-column justify-between">
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
                      }}}><ImCross /></button>
                    </div>
                  ))}
                </CustomTabPanel>
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

export default FriendList;
