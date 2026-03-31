import ReactGA from "react-ga4";

const TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const isProduction = import.meta.env.VITE_VERCEL_ENV === "production";

export const initGA = () => {
  if (isProduction && TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID);
  } else {
    console.log("GA4: dev mode - init stopped");
  }
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const hasConsent = () =>
  localStorage.getItem("cookie-consent") === "accepted";
