import React from "react";
import { GoLinkExternal } from "react-icons/go";

const ExternalLink = ({
  children,
  to,
  showExternalLinkIcon = false,
  className
}) => (
  <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
    {children}{" "}
    {showExternalLinkIcon && (
      <span>
        <GoLinkExternal />{" "}
      </span>
    )}
  </a>
);

export default ExternalLink;
