import React, { useState } from "react";
import './form.css';
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';

interface details {
    id : number,
    date : string,
    product : string,
    price : string,
    payee : string
}

const NewRowForm = () => {

    const [date, setDate] = useState("");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");
    const [payee, setPayee] = useState("");
    const today : any = new Date();
    console.log(today);

    const uniqueId = () =>{
        return Math.floor((Math.random()*10000)/4);
    }

    // const isDisabled = (date: { getDate: () => number; }) => date.getDate() % 2 !== 0;

    // <DatePicker
    // selected={state.startDate}
    // onChange={handleChange}
    // isDisabled={isDisabled}
    // />

    const addRow = async () => {
        const addingRow = {
            "id" : uniqueId(),
            "date" : date,
            "product" : product,
            "price" : price,
            "payee" : payee
            }
        await axios.post<details[]>('http://localhost:3030/details', addingRow);
        alert("New Row Added to the List");
        window.location.replace("http://localhost:3000/");
    }

    return(
        <>
            <div className="new-form">  
                <Form onSubmit={addRow} >
                    <div className="form-header">
                        <h3>Add new Item</h3>
                        <span className="rules">Read the below instructions before proceeding:</span><br></br>
                        <span>Make sure you fill all the fields where * is provided</span>
                    </div>
                    <div className="form-group">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label className="required-field"><b>Name</b></Form.Label><br></br>
                            <Form.Select aria-label="Default select example" required={true} onChange={(e) => setPayee(e.target.value)}>
                                <option defaultValue={"Choose"}>Choose</option>
                                <option value="Ramesh">Ramesh</option>
                                <option value="Rahul">Rahul</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label className="required-field"><b>Product</b></Form.Label><br></br>
                            <Form.Control required={true} className="input" type="text" onChange={(e) => setProduct(e.target.value)}/>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="required-field"><b>Price</b></Form.Label><br></br>
                            <Form.Control required={true} className="input" type="number" onChange={(e) => setPrice(e.target.value)} defaultValue={0}/>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label className="required-field"><b>Date</b></Form.Label><br></br>
                            <Form.Control required={true} className="input" type="date" min={today} onChange={(e) => setDate(e.target.value)}/>
                        </Form.Group>
                        
                    </div>
                    <div className="buttons">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Button variant="secondary" type="submit">Submit</Button>
                            <Button variant="secondary" type="reset">Close</Button>
                        </Form.Group>
                    </div>
                </Form>
                
            </div>
        </>
    )
};


export default NewRowForm;