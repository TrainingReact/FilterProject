import React, { useState } from "react";
/**
 * this personalized hook helps to determine if the filter container
 * should be visible or not
 * @returns
 */
export default function useFilter() {
  const [isShowing, setIsShowing] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }
  return {
    isShowing,
    toggle,
  };
}
