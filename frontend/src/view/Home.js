import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function Home() {

  const[Cdetails,setCdetails] = useState([]);



  return (
   
    <>

                   <button type="button" className='btn btn-primary'> Create Expences </button>
    
    {
                          Cdetails.map ( (bk) => { 
                             return( 


                        <div className="row">

                        <div className="col-3">

                        <div className="card">

                        <div className="card-body">
                        
                        </div>

                       <div className="card-footer"> </div>

                       </div>

                      </div>


                           </div>
                             )

                            
                            
                           }
                            
                            )
                            }

    
    
   
  
    </>
  )
}
