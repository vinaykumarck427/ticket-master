import React from 'react'

import { Chart } from "react-google-charts";

class PieChart extends React.Component{
    render(){ 
    return (
        <div>
        <Chart
            chartType="PieChart"
            data={[
                ['Priority', 'value'],
                ['HIGH', this.props.high],
                ['MEDIUM', this.props.medium],
                ['LOW', this.props.low],
            ]}
            options={{title:"ticket priority %"}}
            width="500px"
            height="300px"
            fontSize="2px"
        />
        </div>
    )
    }
};
export default PieChart

// render(<ExampleChart />, document.getElementByID("app"));