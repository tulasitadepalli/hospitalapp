import React from "react";
import axios from "axios";

class Appointment extends React.Component{

    constructor(){
        super();
        this.state={
            details:{email:'',phone:'', date:'', department:'',location:''},
            errmsg:'',
            successmsg:'',
            // appoint:[]
        }
    }


handlesubmit=(event)=>{
   const url="http://localhost:4000/data"
   axios.post(url, this.state.details)
   .then(responds=>{
    //  this.setState({appoint:responds.data})
     this.setState({
             successmsg:'Appointment details will be sent to Phone number.Appointment id is:'+responds.data.id,
             errmsg:''
            })
   })

   .catch(error=>{
       this.setState({errmsg:'Something went wrong'})
    
   })

}

change=(e)=>{
    this.setState({
        details:{...this.state.details,[e.target.name]:e.target.value}  //important
    })
}

validate=(e)=>{
    e.preventDefault()
    const validateemail=(email)=>{
        var reg= /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        return reg.test(email);
    }

    const validatephone=(phone)=>{
        var r=/^[1-9]{1}[0-9]{9}$/i;
        return r.test(phone);
    }

    const validatedate=(date)=>{
        var todaydate=new Date();
        var formdate=new Date(date);
        return (todaydate <= formdate)
        
    }
    console.log(validatedate(this.state.details.date))
    if(this.state.details.email!=='' && this.state.details.phone!=='' && this.state.details.date!=='' && 
    this.state.details.department!=='' && this.state.detailslocation!==''){
        if(!validateemail(this.state.details.email)){
        this.setState({
            errmsg:"Not a valid Email!",
            successmsg:''
        })
        }
        else if(!validatephone(this.state.details.phone)){
            this.setState({
                errmsg:"Please check Phone number",
                successmsg:''
            })
        }
        else if(!validatedate(this.state.details.date)){
            this.setState({
                errmsg:"Date should be greater than today's date", 
                successmsg:''
            })
        }
        else{
           
            this.handlesubmit()
        }
    }
    else{
        alert("All fileds are required!S")
    }
}
render(){
    return(

        <React.Fragment>
            <form onSubmit={this.validate}>
           Email: <input type="email" name="email" value={this.state.details.email} onChange={this.change}></input><br/>
           Phone: <input type="Phone" name="phone" value={this.state.details.phone} onChange={this.change}></input><br/>
           Date: <input type="date" name="date" value={this.state.details.date} onChange={this.change}></input><br/>
           Location:<select name="location" value={this.state.details.location} onChange={this.change}>
                        <option>Hyd</option>
                        <option>Delhi</option>
                        <option>Banglore</option>
                    </select><br/>
           Department:<select name="department" value={this.state.details.department} onChange={this.change}>
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        <option>Opthamology</option>
                    </select><br/>
            <button type="submit">Submit</button><br/>
            {this.state.errmsg}<br/>
            {this.state.successmsg}<br/>
            </form>
        </React.Fragment>
    );
}
}

export default Appointment;