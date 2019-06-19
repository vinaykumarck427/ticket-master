import React from 'react'
import { Line } from 'rc-progress'

class ProgressBar extends React.Component{
    render(){
        const status = this.props.tickets.filter(ticket => ticket.status === 'close') 
        console.log(status)  
        return(
            <div className='progress-bar bg-success' ><Line percent={`${(status.length * 100) /this.props.tickets.length }`} strokeWidth="2" trailWidth="2" height="40px" width="825px" strokeLinecap="round" gapPosition="right" />
            </div>
        )
    }
}
export default ProgressBar
