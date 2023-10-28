import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
   


function VoteNow() {

    var navigate = useNavigate()
    var [uname, setUname] = useState()
    var [mydata,setmydata]=useState([])
    var[pn,setPn]=useState()
    var[msg,setMsg]=useState()
    
    
    var checkLogin = async () => {
        var res = await axios.get("http://localhost:3000/vinfo")
        if (res.data.length > 0) {
            setUname(res.data[0].email)
            var res =await axios.get(`http://localhost:3000/party`,)
            setmydata(res.data)
        }
        else
            navigate("/login")
    }
   
    

    var lout = async () => {
        var res = await axios.get("http://localhost:3000/vinfo")
        var id = res.data[0].id
        res = await axios.delete(`http://localhost:3000/vinfo/${id}`)
        navigate("/Login")

    }

    useEffect(()=>{
        checkLogin()
    },[])

    function getparty(str)
    {
        setPn(str)
       
    }

    var getVote = async()=>{
        var currentdate = new Date();
var datetime =  currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + "  : " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
         var data={"email":uname,"party":pn,"dt": datetime}
         var res=await axios.get("http://localhost:3000/votenow",data)
         var dt=res.data.filter(item=> item.email==uname)
         if(dt.length>0)
         setMsg(uname+ "ALready Voted vote only Once")
   else{
         var res=await axios.post("http://localhost:3000/votenow",data)

         setMsg("Thanks for vote your vote is valuable")
   }
    }

    return (
        <div>
            <div className="row" style={{ "backgroundColor": "violet", "height": "50px" }}>
                <div className="col-md-12">
                    <h3 style={{ "color": "black" }}></h3>
                    Welcome &emsp;  &emsp;  &emsp;  &emsp;
                    {uname}
                    &emsp;  &emsp;  &emsp;
                    <button className="btn btn-warning" onClick={() => lout()}>Logout</button>
                </div>
            </div>
            <center> <h1>Welcome to votenow component</h1></center>
            <center><h3 style={{"color":"blue","backgroundColor":"black"}}>{msg}</h3></center>
            
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-5" style={{"border":"2px solid yellow","padding":"30px"}}>
                    {
                        mydata.map(row =>
                          <div style={{"border":"1px solid black","padding":"4px"}}>
                           <input type="radio" name="n" className="form-check-input" onChange={()=>getparty(row.pname)}/>&emsp; &emsp;{row.pname}
                          
                            
                          </div>    
                            )
                    }
                    <br/> <button className="btn btn-warning" onClick={()=>getVote()}>votenow</button>


                </div>
               
            </div>

        </div>
    )
} export default VoteNow;

