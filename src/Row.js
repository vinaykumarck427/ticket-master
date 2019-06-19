import React from 'react'


class TicketRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accept: this.props.ticket.status === 'close' ? true : false
        }
        console.log(this.state.accept)
    }

    handleChange = (e) => {
        console.log(this.state.accept)
        const accept = e.target.checked
        this.setState(() => ({ accept }))
        console.log(this.state.accept)
        this.props.handleCheck(!this.state.accept, this.props.ticket.ticket_code)
    }
    handleButton = () => {
        this.props.handleRemove(this.props.ticket.ticket_code)
    }
    render() {

        return (
            <tr>
                <td scope='row'>{this.props.ticket.ticket_code}</td>
                <td scope='row'>{this.props.ticket.name}</td>
                <td scope='row'>{this.props.ticket.department}</td>
                <td scope='row'>{this.props.ticket.priority}</td>
                <td scope='row'>{this.props.ticket.message}</td>
                <td scope='row'><div className='form-check'><input className='form-check-input' type='checkbox' value={this.state.accept} checked={this.state.accept} onChange={this.handleChange} /><label class='form-check-label'>{this.props.ticket.status}</label></div></td>
                <td scope='row'><input className='btn btn-outline-success' type='button' value='Remove' onClick={this.handleButton} /></td>
            </tr>
        )
    }
}
export default TicketRow