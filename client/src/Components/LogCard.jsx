import React from "react";

const LogCard = ({ logStr }) => {
  const getLogString = (log) => {
    const logTokens = log.split("$");
    var logStr = `#${parseInt(logTokens[0]) + 1} : Product `;

    if (logTokens[1] == "CREATE_PRODUCT")
      return logStr + `created by '${logTokens[2]}'.`;
    else
      return (
        logStr +
        `ownership transfered from '${logTokens[2]}' to '${logTokens[3]}'.`
      );
  };

  return <div className="log-card">{getLogString(logStr)}</div>;
};

export default LogCard;
