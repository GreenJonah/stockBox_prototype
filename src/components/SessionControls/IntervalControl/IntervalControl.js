import React from 'react';

const intervalControl = (props) => {
    return (
        <div> Interval
            <select name="Interval">
                <option value="Hour">Hour</option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Finish">Finish</option>
            </select>
            <button>-></button>
        </div>
    );
};

export default intervalControl;