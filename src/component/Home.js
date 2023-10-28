import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
    var [pname, setPn] = useState();
    var [n,setN]=useState();
    var [e,setE]=useState();
    var [msg, setMsg] = useState();
    var [totalvote,setTotalvote]=useState([]);

    var countVote= async() =>{
        var tv=[]
        var res1= await axios.get(" http://localhost:3000/votenow")
        
let maxVote=Math.max(...res1)   
console.log(maxVote)     
        
        var res2=await axios.get("http://localhost:3000/party")
         
        res2.data.forEach(party=>{
            var dt=res1.data.filter(item=>item.party==party.pname)
                var d={"party":party.pname,"vote":dt.length}
                tv.push(d)

        });
        setTotalvote(tv)
        console.log(totalvote)
    }
    useEffect(()=>{
        countVote();
    })

    var addParty = async () => {
        var res = await axios.get("http://localhost:3000/party")
        var dt = res.data.filter(item => item.pname == pname)
        if (dt.length > 0)
            setMsg(pname + "already Exites")
        else {
            var data = { "pname": pname }
            var res = await axios.post("http://localhost:3000/party", data)

            setMsg(pname + "party  add successfully")
        }


    }

    var removeParty = async () => {
        var res = await axios.get("http://localhost:3000/party")
        var dt = res.data.filter(item => item.pname == pname)
        if (dt.length > 0) {
            var id = dt[0].id
            await axios.delete(`http://localhost:3000/party/${id}`, dt)
            setMsg(pname + "party removed successfully")
        }
        else {
            setMsg(pname + "party does not exists")
        }
    }


    var addvoter =async()=>{
        var res =await axios.get("http://localhost:3000/voter")
        var dt= res.data.filter(item=> item.name==n && item.email==e)

        if(dt.length >0){
            setMsg(e+  " name voter Already Exits")
        }
        else
        {
            
           var ps=Math.floor(Math.random()*(9999 - 1000)+1000);
           var data={"name":n,"email":e,"pass":ps}
           var res=await axios.post("http://localhost:3000/voter",data)  
           setMsg(e+ " add succefully with password"+ps) 

        }
    }

    var removevoter = async () => {
        var res = await axios.get("http://localhost:3000/voter")
        var dt = res.data.filter(item => item.email== e)
        if (dt.length > 0) {
            var id = dt[0].id
            await axios.delete(`http://localhost:3000/voter/${id}`, )
            setMsg(e+ " removed successfully")
        }
        else {
            setMsg(e+ " no such votor  exists")
        }
    }






    return (
        <div>
            <div className="row">
                <marquee><h2>Leading party with vote</h2></marquee>
                <div className="col-md-10">
                 <center><h6>Every Vote Is valuable, So Give Your Vote</h6></center>
                 <Link className="btn btn-danger" to="/Login">Login</Link>
                    </div>
               
            </div>
            <div className="row" style={{ "backgroundColor": "#40E0D0	" }}>
                <div className="col-md-3" style={{"border":"4px solid black"}}>
                    <center><h4>Party Wise Vote</h4></center><hr/>
                    <div className="container">
                        <table>
                            <tr>
                                <td><b>party</b></td> &emsp;
                                <td><b>vote</b></td>&emsp;
                            </tr>

                            {
                                totalvote.map(row =>
                                    <tr>
                                        <td>{row.party}</td>&emsp;
                                        <td>{row.vote}</td>
                                    </tr>
                                    )}

     
                        </table>


                    </div>
                </div>
                <div className="col-md-4" style={{"border":"4px solid black"}}>
                    <h4>Add/Remove Party</h4><hr/>
                   <b>Enter Party Name</b> 
                    <input type="text" className="form-control" onInput={(e) => setPn(e.target.value)} /><br />
                    <button className="btn btn-warning" onClick={() => addParty()}>Add</button>
                    &emsp; &emsp;
                    <button className="btn btn-danger" onClick={() => removeParty()}>Remove</button>
                </div>
                &emsp;
                <div className="col-md-4" style={{"border":"4px solid black"}}>
                    <h4>Add/Remove Voter</h4><hr />
                   <b> Enter Name</b>
                    <input type="text" className="form-control" onInput={(e)=> setN(e.target.value)}/><br />
                   <b> Enter Email</b>
                    <input type="text" className="form-control"onInput={(e)=> setE(e.target.value)} /><br />
                    <button className="btn btn-danger" onClick={()=>addvoter()}>Add</button>
                    &emsp; 
                    <button className="btn btn-warning" onClick={()=>removevoter()}>Remove</button>
                </div>
                <h3>{msg}</h3>
            </div>
            <br/><br/><br/><br/><br/><br/>
            <footer>
                <small>Design By<b>Garry</b></small>
            </footer>
        </div>
    )

}
export default Home;
