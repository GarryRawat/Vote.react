import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(){
    
    var [e,setE]=useState();
    var [p,setP]=useState();
    var [msg, setMsg] = useState();
    var navigate=useNavigate()

    var Log = async () =>{
        var res= await axios.get("http://localhost:3000/voter") 

        var dt=res.data.filter(item=>item.email==e && item.pass==p)
        if(dt.length>0){
            var d={"email":e}
            res= await axios.post("http://localhost:3000/vinfo",d) 
        navigate("/votenow")
        }
    else
    {
        setMsg("invalid Email and password")
    }
    }

   var checkLogin = async ()=>{
        var res=await axios.get("http://localhost:3000/vinfo")
        if(res.data.length>0){
        navigate("/votenow")
        }
     
       
     }
     checkLogin()
    

    
    

    
    return(
        <div>
           <center> <h1 style={{"backgroundColor":"black","color":"wheat"}}>Login component</h1></center><hr/>
           <h2>{msg}</h2>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-5" style={{"border":"2px solid black","borderRadius":"15px 20px 20px 15px","backgroundColor":"violet","padding":"100px"}}>

                    <b>Enter email</b>
                    <input type="text"  className="form-control"  onInput={(e)=>setE(e.target.value)}/>

                    <b>Enter password</b>
                    <input type="text" className="form-control" onInput={(e)=>setP(e.target.value)}/><br/>

                    <center><button className="btn-md btn-success" onClick={()=>Log()}>Login</button></center>
                </div>
            </div>
            </div>
          


            

      
    )
    
}export default Login;
