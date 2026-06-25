export const FILTER_WIDTH = 145;

export const FILTER_SX = {
  width: FILTER_WIDTH,

  "& .MuiOutlinedInput-root": {
    backgroundColor: "var(--app-tertiary)",

    "& fieldset": {
      borderColor: "var(--app-primary)",
    },

    "&:hover fieldset": {
      borderColor: "var(--app-primary)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "var(--app-primary)",
    },
  },
};
