/**
 * Created by paul on 5/24/17.
 */
import React from "react";

const LoadingOverlay = ({isLoading}) => <div>
    {isLoading ? <div id="loader"/> : null}
</div>;

export default LoadingOverlay;