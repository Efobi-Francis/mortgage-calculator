import type { CustomFlowbiteTheme } from "flowbite-react";

const customThemeMortgageAmount: CustomFlowbiteTheme["textInput"] = {
  base: "flex ",
//   addon: "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-sm bg-[hsl(202,86%,94%)] text-[hsl(200,26%,54%)] font-bold",
  field: {
    base: "relative w-full  ",
    input: {
      base: "block w-full  disabled:cursor-not-allowed disabled:opacity-50",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "p-4 sm:text-base",
      },
      colors: {
        gray: "border-0 bg-white text-gray-900 focus:border-[hsl(61,70%,52%)] focus:border-2 focus:border-l-0 focus:ring-0",
      },
      withAddon: {
        "on": "rounded-r-lg",
        "off": "rounded-r-lg"
      },
    },
  },
};

const customThemeTerm_Rate: CustomFlowbiteTheme["textInput"] = {
  base: "flex flex-row-reverse",
//   addon:"inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-sm bg-[hsl(202,86%,94%)] text-[hsl(200,26%,54%)] font-bold",
  field: {
    base: "relative w-full",
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-l-md rounded-e-none",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "p-4 sm:text-base",
      },
      colors: {
        gray: "border-0 bg-white text-gray-900 focus:border-[hsl(61,70%,52%)] focus:border-2 focus:border-r-0 focus:ring-0",
      },
      withAddon: {
        "on": "rounded-r-lg",
        "off": "rounded-l-lg"
      },
    },
  },
};


export { customThemeMortgageAmount, customThemeTerm_Rate };
