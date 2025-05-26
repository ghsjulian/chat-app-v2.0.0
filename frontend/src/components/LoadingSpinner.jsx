import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="full-page">
            <div className="loading-spinner">
                <img src="/icons/loading.gif" />
                <p>Please Wait...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
