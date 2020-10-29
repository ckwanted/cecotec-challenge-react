import React from "react";

const Loading = (props: {}) => {
    return(
        <div className="spinner-border" role="status">
            <span className="sr-only">...</span>
        </div>
    );
}

export default React.memo(Loading);
