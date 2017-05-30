/**
 * Created by paul on 5/24/17.
 */
import React from "react";

export default ({isLoading}) => <div>
    {isLoading ? <div id="loader"/> : null}
</div>