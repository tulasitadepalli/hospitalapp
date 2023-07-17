import axios from "axios";
import React from "react";

class Patientportal extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            patientID:'',
            errorMessage:'',
            appointment:[] ,
            deletedFail:'',
            deleteSuccess:''
        };
    
    }
   
    change=(event)=>{
        this.setState({
            patientID: event.target.value
        })
    }
    // componentDidMount(){
    //     this.fetchDetails()
    // }
    
    fetchDetails=(e)=>{
        e.preventDefault()
        axios.get('http://localhost:4000/data')
        .then(res=>{
            const b= res.data.filter(ab=> (ab.id==this.state.patientID))
            console.log(b.length)
            if(b.length!=0 ){
              this.setState({
                  appointment:b
              })
            }
            else{
                this.setState({
                    errorMessage:'Patient Id:'+this.state.patientID + ' is not found',
                    deletedFail:'',
                    deleteSuccess:''
                })
            }
            // this.setState({
            //     appointment:[]
            // })
        })
        .catch(error=>{
            this.setState({
                errorMessage:'Something went wrong',
                deleteSuccess:'',
                deletedFail:''
            })
        })    
        
    }

    cancel=(id)=>{
        let url='http://localhost:4000/data/'+id.target.value
        axios.delete(url)
        .then(a=>{
            this.setState({
                deleteSuccess:'Deleted succesfully refresh the page',
                deletedFail:'',
                errorMessage:''
            })
        })
        .catch(error=>{
            this.setState({
                deletedFail:'something went wrong',
                deleteSuccess:'',
                errorMessage:''
            })
        })
        }
    render(){
        // console.log(b)
        return(
            <React.Fragment>
                <form onSubmit={this.fetchDetails}>
                    Patient ID:<input type="number" name="pid" value={this.state.patientID} onChange={this.change}></input>
                    <button type='submit' name='submit'>Submit</button><br/>
                    <p className="msg" id="errMsg">{this.state.errorMessage!='' && this.state.errorMessage}</p>
                   { this.state.appointment.length!=0 && 
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Phone No</th>
                                <th>Location</th>
                                <th>Department</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                      
                        {
                            
                            this.state.appointment.map(a=>{
                                return(
                                    <tbody key={a.id}>
                                    <tr>
                                            <td>{a.email}</td>
                                            <td>{a.phone}</td>
                                            <td>{a.department}</td>
                                            <td>{a.location}</td>
                                            <td>{a.date}</td>
                                            <td><button onClick={this.cancel} value={a.id}>Delete</button></td>
                                    </tr></tbody>
                                );
                                }
                            )
                            
                         }
                        
                    </table>} <br/>
                      
                    <p className="msg" id="deleteSuccessMsg">{this.state.deleteSuccess}</p>
                    <p className="msg" id="deleteFailMsg">{this.state.deletedFail}</p>
                </form>
            </React.Fragment>
        );
    }
}
export default Patientportal