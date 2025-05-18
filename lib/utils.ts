import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (errorData: {
  message: string;
  error: { [key: string]: string };
  statusCode: number;
}) => {
  // console.log(errorData);

  if (!errorData.error) {
    return errorData.message;
  } else {
    if (typeof errorData.error === "string") {
      return errorData.message;
    }

    const errorMessages = Object.keys(errorData.error).map(
      (key) => errorData.error[key]
    );

    return errorMessages[0];
  }
};

export function removeParam(paramNames: string | string[]): void {
  if (typeof window === "undefined") {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);

  const paramNamesArray = Array.isArray(paramNames) ? paramNames : [paramNames];

  paramNamesArray.forEach((paramName) => {
    if (searchParams.has(paramName)) {
      searchParams.delete(paramName);
    }
  });

  // Construct the new URL and update the browser's history state
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newUrl);
}

export function pushParam(paramName: string, paramValue: any): void {
  if (typeof window === "undefined") {
    return;
  }

  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);

  // Update the parameter value
  searchParams.set(paramName, paramValue);

  // Manually replace encoded commas with raw commas
  const queryString = searchParams
    .toString()
    .replace(/%2C/g, ",")
    .replace(/%3A/g, ":");

  // Update the URL
  const newUrl = `${currentUrl.pathname}?${queryString}`;
  window.history.pushState({}, "", newUrl);
}
