import React from 'react'
import axios from 'axios'

import TicketTable from './Table'
import TicketForm from './Form'
import TicketSearch from './search'
import PieChart from './Piechart'
import BarChart from './Barchart'
import ProgressBar from './progress-bar'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tickets: [],
            originalTickets: [],
            removeResponse: '',
        }
    }
    componentDidMount() {
        axios.get('http://dct-api-data.herokuapp.com/tickets?api_key=14ba4dca61c726c6')
            .then(response => {
                console.log(response.data)
                this.setState(() => ({ tickets: response.data, originalTickets: response.data }))
            })
    }
    handleTicketSubmission = (ticket) => {
        this.setState(prevState => ({
            tickets: prevState.tickets.concat(ticket),
            originalTickets: prevState.originalTickets.concat(ticket)
        }))
    }
    handleSearch = (value) => {
        this.setState(prevState => ({
            tickets: prevState.originalTickets.filter(ticket => ticket.ticket_code.includes(value.toLowerCase()))
        }))
    }
    handlePriorityClick = (value) => {
        if (value !== 'all') {
            this.setState(prevState => ({
                tickets: prevState.originalTickets.filter(ticket => ticket.priority === value.toLowerCase())
            }))
        } else {
            this.setState(prevState => ({
                tickets: [].concat(prevState.originalTickets)
            }))
        }
    }
    handleRemove = (ticket_code) => {
        console.log(ticket_code)
        axios.delete(`https://cors-anywhere.herokuapp.com/http://dct-api-data.herokuapp.com/tickets/${ticket_code}?api_key=14ba4dca61c726c6`)
            .then(response => {
                this.setState((prevState) => ({
                    removeResponse: response.data.notice
                }))
                axios.get('http://dct-api-data.herokuapp.com/tickets?api_key=14ba4dca61c726c6')
                    .then(response => {
                        
                        this.setState(() => ({ tickets: response.data, originalTickets: response.data }))
                    })
            })
                
    }
    handleCheck = (ischeck, ticket_code) => {
        console.log(ischeck)
        const data = {
            "status": "close"
        }
        if (ischeck === true) {
            axios.put(`https://cors-anywhere.herokuapp.com/http://dct-api-data.herokuapp.com/tickets/${ticket_code}?api_key=14ba4dca61c726c6`, data)
                .then(response => {
                    const ticket = this.state.tickets.find(ticketItem => ticketItem.id === response.data.id)
                    ticket.status = response.data.status
                    this.setState(() => ({}))
                })
            console.log(this.state.tickets)
            }
           
        else {
            axios.put(`https://cors-anywhere.herokuapp.com/http://dct-api-data.herokuapp.com/tickets/${ticket_code}?api_key=14ba4dca61c726c6`, { "status": "open" })
                .then(response => {
                    const ticket = this.state.tickets.find(ticketItem => ticketItem.id === response.data.id)
                    ticket.status = response.data.status
                    this.setState(() => ({ticket}))
                })
        }
    }
    render() {
        const high = this.state.originalTickets.filter(ticket => ticket.priority === 'high')
        const medium = this.state.originalTickets.filter(ticket => ticket.priority === 'medium')
        const low = this.state.originalTickets.filter(ticket => ticket.priority === 'low')

        const technical = this.state.originalTickets.filter(ticket => ticket.department === 'technical')
        const sales = this.state.originalTickets.filter(ticket => ticket.department === 'sales')
        const hr = this.state.originalTickets.filter(ticket => ticket.department === 'hr')
        const service = this.state.originalTickets.filter(ticket => ticket.department === 'service')
        const delivery = this.state.originalTickets.filter(ticket => ticket.department === 'delivery')

        return (
            <div className="container">
                <br /> <br />
                        <div className="row">
                            <div className="col-md-8">
                                <h1 >Ticket Master </h1>
                                <div className='row'>
                                    <div className='col-sm-4.4'>
                                        <h2 width='10px'>Listing-Tickets - {this.state.tickets.length}</h2>
                                    </div>
                                    <div className="col-sm-7.6">
                                        <TicketSearch handleSearch={this.handleSearch} handlePriorityClick={this.handlePriorityClick} />
                                    </div>
                                </div>

                                <TicketTable tickets={this.state.tickets} handleCheck={this.handleCheck} handleRemove={this.handleRemove} isCheck={this.state.isCheck} />
                                {this.state.removeResponse && <div>{this.state.removeResponse}</div>}
                                <br />

                                <span><h3>progress of completed</h3></span>
                                <div className='progress'>
                                    <ProgressBar tickets={this.state.originalTickets} />
                                </div>
                            </div>

                            <div className='col-md-4 offeset-sm-left'>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <TicketForm handleTicketSubmission={this.handleTicketSubmission} />
                            </div>
                        </div><br /><br />
            <div className='row'>
                <div className='col-md-3 offset-sm-0'>
                <PieChart high={high.length} medium={medium.length} low={low.length} />
                </div>

                <div className='col-md-3 offset-sm-2'>
                    <BarChart tickets={this.state.tickets} technical={technical.length} service={service.length} hr={hr.length} sales={sales.length} delivery={delivery.length} />
                </div>
            </div>
        </div>
        )
    }
}

export default App