import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { Tabs, Tab, Box } from "@mui/material";
import { ImCheckmark, ImCross } from "react-icons/im";
import type { User, UserProfile } from "../../types";

interface CustomTabPanelProps extends React.PropsWithChildren {
  value: number;
  index: number;
}

type FriendInfoProps = {
  friends: User[];
  sentReqs: User[];
  recvReqs: User[];
};

type FriendListProps = FriendInfoProps & {
  myCurrUser: string | undefined;
};

function CustomTabPanel({ children, value, index }: CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function FriendList({
  friends,
  sentReqs,
  recvReqs,
  myCurrUser,
}: FriendListProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [friendInfo, setFriendInfo] = useState<FriendInfoProps>({
    friends: friends,
    sentReqs: sentReqs,
    recvReqs: recvReqs,
  });

  useEffect(() => {
    async function getFriendInfo() {
      const response: Response = await fetch(
        `http://localhost:4243/profile/${encodeURIComponent(myCurrUser)}`,
        {
          credentials: "include",
        },
      );
      const res: UserProfile = await response.json();
      setFriendInfo({
        friends: res.friends,
        sentReqs: res.sent_reqs,
        recvReqs: res.received_reqs,
      });
    }

    getFriendInfo();
  }, [refreshKey]);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
          setRefreshKey(refreshKey + 1);
        }}
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
              className="relative transform overflow-hidden rounded-lg bg-tertiary text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <DialogTitle
                as="h2"
                className="p-3 text-base  bg-primary text-tertiary font-semibold"
              >
                Manage friends
              </DialogTitle>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#c59113",
                  },
                }}
                aria-label="Choose friend category"
              >
                <Tab
                  label={`Friends (${friendInfo.friends.length})`}
                  sx={{
                    "&:focus": {
                      outline: "2px solid var(--color-secondary)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid var(--color-secondary)",
                    },
                  }}
                  {...a11yProps(0)}
                />
                <Tab
                  label={`Received requests (${friendInfo.recvReqs.length})`}
                  sx={{
                    "&:focus": {
                      outline: "2px solid var(--color-secondary)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid var(--color-secondary)",
                    },
                  }}
                  {...a11yProps(1)}
                />
                <Tab
                  label={`Sent requests (${friendInfo.sentReqs.length})`}
                  sx={{
                    "&:focus": {
                      outline: "2px solid var(--color-secondary)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid var(--color-secondary)",
                    },
                  }}
                  {...a11yProps(2)}
                />
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                {friendInfo.friends.map((friend) => (
                  <div key={friend.id} className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/user/${encodeURIComponent(friend.name)}`);
                      }}
                    >
                      {friend.name}
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${friend.name} from friends`}
                      onClick={async () => {
                        const user: string = encodeURIComponent(friend.name);
                        const response: Response = await fetch(
                          `http://localhost:4243/profile/${user}/remove-friend`,
                          {
                            method: "DELETE",
                            credentials: "include",
                          },
                        );
                        if (response.ok) {
                          await response.json();
                          setRefreshKey(refreshKey + 1);
                        } else {
                          console.error("Error removing friend");
                        }
                      }}
                    >
                      <ImCross aria-hidden="true" focusable="false" />
                    </button>
                  </div>
                ))}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {friendInfo.recvReqs.map((friend) => (
                  <div key={friend.id} className="flex justify-between">
                    <button
                      type="button"
                      className="justify-start"
                      onClick={() => {
                        navigate(`/user/${encodeURIComponent(friend.name)}`);
                      }}
                    >
                      {friend.name}
                    </button>
                    <div>
                      <button
                        type="button"
                        aria-label={`Accept friend request from ${friend.name}`}
                        className="mr-6"
                        onClick={async () => {
                          const user: string = encodeURIComponent(friend.name);
                          const response: Response = await fetch(
                            `http://localhost:4243/profile/${user}/accept-request`,
                            {
                              method: "PUT",
                              credentials: "include",
                            },
                          );
                          if (response.ok) {
                            await response.json();
                            setRefreshKey(refreshKey + 1);
                          } else {
                            console.error("Error accepting request");
                          }
                        }}
                      >
                        <ImCheckmark aria-hidden="true" focusable="false" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Decline friend request from ${friend.name}`}
                        onClick={async () => {
                          const user: string = encodeURIComponent(friend.name);
                          const response: Response = await fetch(
                            `http://localhost:4243/profile/${user}/decline-request`,
                            {
                              method: "DELETE",
                              credentials: "include",
                            },
                          );
                          if (response.ok) {
                            await response.json();
                            setRefreshKey(refreshKey + 1);
                          } else {
                            console.error("Error declining request");
                          }
                        }}
                      >
                        <ImCross aria-hidden="true" focusable="false" />
                      </button>
                    </div>
                  </div>
                ))}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                {friendInfo.sentReqs.map((friend) => (
                  <div key={friend.id} className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/user/${encodeURIComponent(friend.name)}`);
                      }}
                    >
                      {friend.name}
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete friend request sent to ${friend.name}`}
                      onClick={async () => {
                        const user: string = encodeURIComponent(friend.name);
                        const response: Response = await fetch(
                          `http://localhost:4243/profile/${user}/remove-friend`,
                          {
                            method: "DELETE",
                            credentials: "include",
                          },
                        );
                        if (response.ok) {
                          await response.json();
                          setRefreshKey(refreshKey + 1);
                        } else {
                          console.error("Error removing friend");
                        }
                      }}
                    >
                      <ImCross aria-hidden="true" focusable="false" />
                    </button>
                  </div>
                ))}
              </CustomTabPanel>
              <div className="bg-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
  );
}

export default FriendList;
