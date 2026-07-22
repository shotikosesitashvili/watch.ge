import React, { useState, useEffect } from "react";

export function Cookies() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("page_was_loaded");

    if (hasVisited) {
      setIsVisible(true);
    } else {
      sessionStorage.setItem("page_was_loaded", "true");
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner-wrapper">
      <div className="cookie-banner-content">
        <div className="cookie-text-side">
          <h3>Cookie Settings</h3>
          <p>
            ჩვენ ვიყენებთ ქუქი-ფაილებს თქვენი გამოცდილების გასაუმჯობესებლად. 
            საიტის მუშაობისთვის ეს აუცილებელია.
          </p>
        </div>
        <div className="cookie-buttons-side">
          <button className="cookie-btn-decline" onClick={handleDecline}>
            Decline
          </button>
          <button className="cookie-btn-accept" onClick={handleAccept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}