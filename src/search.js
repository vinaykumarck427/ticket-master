import React from 'react'


class TicketSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search:''
        }
        this.handleSearchChange=this.handleSearchChange.bind(this)
    }
    handleSearchChange(e){
        const search = e.target.value
        this.setState(() => ({search}))
        this.props.handleSearch(search)
    }
    render(){
        return(
            <div>
                <form class="form-inline" onSubmit={(e) => {
                        e.preventDefault()
                }}>
                {/* <form className='form-group'> */}
                <div className='form-group'>
                        <label className='form-control-label col-sm-4'>search:</label>
                            <input className='form-control-input col-sm-6' placeholder='search by code' type='text' value={this.state.search} onChange={this.handleSearchChange} />      
                </div>
                
                <div className='form-group btn-group btn-group-toggle'>
                    <button className='btn btn-primary col-sm-2' onClick={() => {
                    this.props.handlePriorityClick('all')
                    }}>All</button>
                    <button className='btn btn-primary col-sm-3' onClick={() => {
                        this.props.handlePriorityClick('high')
                    }}>High</button>
                    <button className='btn btn-primary col-sm-4' onClick={() => {
                        this.props.handlePriorityClick('medium')
                    }}>Meduim</button>
                    <button className='btn btn-primary col-sm-3' onClick={() => {
                        this.props.handlePriorityClick('low')
                    }}>Low</button>
                </div>
                </form>
            </div>
        )
    }
}
export default TicketSearch