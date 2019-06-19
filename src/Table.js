import React from 'react'

import TicketRow from './Row'
const TicketTable = (props) => {
    console.log(props)
    return(
        <div>
            <table border='2px' cellPadding='5px' className='table table-bordered table-hover'> {/*  align='center'  */}
                <thead className="thead-light">
                    <tr>
                        <th scope='col'>Code</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Department</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Message</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody className="table-striped">
                    {props.tickets.map((ticket) => <TicketRow key={ticket.ticket_code} ticket={ticket} handleCheck={props.handleCheck} handleRemove={props.handleRemove}/>)}
                </tbody>
            </table>
        </div>
    )
}
export default TicketTable