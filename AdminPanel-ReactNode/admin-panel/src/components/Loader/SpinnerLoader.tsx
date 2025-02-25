import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import "./SpinnerLoader.scss";
const SpinnerLoader = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`spinner-overlay ${loading ? "show" : ""}`}>
      <div className="spinner-container">
        <BeatLoader color="#36D7B7" loading={loading} />
      </div>
    </div>
  );
};

export default SpinnerLoader;
