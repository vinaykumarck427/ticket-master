import React from 'react'

import {Chart} from 'react-google-charts'
 
class BarChart  extends React.Component{
    render(){
        return(
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Department', 'number of tickets'],
                    ['technical', this.props.technical],
                    ['hr', this.props.hr],
                    ['service', this.props.service],
                    ['delivery', this.props.delivery],
                    ['sales', this.props.sales],
                ]}
                options={{
                    title: 'Tickets by Department',
                    chartArea: { width: '50%' },
                    is3D:true
                }} />
        )
    } 
}
export default BarChart
