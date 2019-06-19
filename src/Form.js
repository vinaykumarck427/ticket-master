import React from 'react'
import axios from 'axios'

class TicketForm extends React.Component{
    constructor(){
        super()
        this.state ={
            name: '',
            department:'',
            priority: '',
            message:'',
            departmentOption:[
                {id:1, name:'technical'},
                {id:2, name:'sales'},
                {id:3, name:'service'},
                {id:4, name:'hr'},
                {id:5, name:'delivery'}
            ],
            priorityOption:[
                {id:1, name:'low'},
                { id: 2, name: 'medium' },
                { id: 3, name: 'high' }
            ],
            errors:''
        }
        this.handleDepartment=this.handleDepartment.bind(this)
        this.handlePriority = this.handlePriority.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleReset=this.handleReset.bind(this)
    }
    hanldeName = (e) => {
        const name = e.target.value
        this.setState(() =>({name}))
    }
    handleDepartment(e){
        const department = e.target.value
        this.setState(() =>({department}))
    }
    handlePriority(e){
        const priority=e.target.value
        this.setState(() => ({priority}))
    }
    handleMessage(e){
        const message=e.target.value
        this.setState(()=>({message}))
    }
   
    handleSubmit(e){
        e.preventDefault()
        const formData = {
            name:this.state.name,
            department:this.state.department,
            priority:this.state.priority,
            message:this.state.message
        }
        console.log(formData)
        
        axios.post('http://dct-api-data.herokuapp.com/tickets?api_key=14ba4dca61c726c6',formData)
        .then(response => {
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                const errors = response.data.errors
                this.setState(() => ({errors}))
                console.log(this.state.errors)
            }else{
            this.props.handleTicketSubmission(response.data)
            this.setState(() => ({
                name:'',
                department:'',
                priority:'',
                message:''
            }))
        }
        })
    }
    // resetForm(){
        
    // }
    handleReset(e) {
        e.preventDefault()
        // this.resetForm()
        this.setState(() => ({
            name: '',
            department: '',
            priority: '',
            message: ''
        }))
    }
    
    render(){
        return(
                <form className='form-row'>
                    <fieldset>
                        <div className='form-group row'>
                        <legend>Add Ticket</legend>
                            <label className='col-sm-4 col-form-label'>name</label>
                            <div className='col-sm-8'>
                                <input className='form-control form-control-sm col-sm-10' type="text" value={this.state.name} onChange={this.hanldeName} />

                                {this.state.errors.name && <small>{this.state.errors.name.join(', ')}</small>}
                            </div>
                            <br />

                            <label className='col-sm-4 col-form-label'>department</label>
                            <div className='col-sm-8'>
                                <select className='form-control form-control-sm col-sm-7' value={this.state.department} onChange={this.handleDepartment}>
                                    <option value="">select</option>
                                    {this.state.departmentOption.map(dept => <option key={dept.id} value={dept.name}>{dept.name}</option>)}
                                </select>

                                {this.state.errors.department && <small>{this.state.errors.department.join(', ')}</small>}
                            </div>
                            <br />

                            <label className='col-sm-4 col-form-label'>priority</label>
                            <div className='col-sm-8'>
                                <select className='form-control form-control-sm col-sm-6' value={this.state.priority} onChange={this.handlePriority}>
                                    <option value=''>select</option>
                                    {this.state.priorityOption.map(pr => <option key={pr.id} value={pr.name}>{pr.name}</option>)}
                                </select>

                                {this.state.errors.priority && <small>{this.state.errors.priority.join(', ')}</small>}
                            </div>
                            <br />

                            <label className='col-sm-4 col-form-label'>Message:</label>
                            <div className='col-sm-8'>
                                <textarea className='form-control form-control-sm col-sm-12' value={this.state.message} onChange={this.handleMessage.bind(this)}>
                                </textarea>

                                {this.state.errors.message && <small>{this.state.errors.message.join(', ')}</small>}
                            </div><br />

                            <input className='btn btn-primary' type='submit' onClick={this.handleSubmit} />
                            <input className='btn btn-primary' type='reset' onClick={this.handleReset} />

                        </div>
                    </fieldset>
                </form>
        )
    }
}
export default TicketForm