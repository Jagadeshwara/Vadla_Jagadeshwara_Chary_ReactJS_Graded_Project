import React, { useEffect, useState } from "react";
import {useTable} from 'react-table';
import axios from "axios";
import './BComponent.css';
import { useParams } from "react-router";

type RouteParams = {
    id : string
}

interface details {
    id : number,
    date : string,
    product : string,
    price : string,
    payee : string
}

type Details = {
    id : number,
    date : string,
    product : string,
    price : string,
    payee : string
}

// Table - Colums, data

const BodyComponent : React.FC = () => {
    
    const [posts, setPosts] = useState<details[]>([]);
    const [details, setDetails] = useState<Details>();
    //const {id} = useParams<RouteParams>();
    const [id, setId] = useState(2);
    const [date, setDate] = useState("");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");
    const [payee, setPayee] = useState("");

    const fetchData = async () => {
        const response = await axios.get<details[]>('http://localhost:3030/details');
        console.log(response.data);
        setPosts(response.data);
        
        
    }
    const fetchColumn = async () => {
        const response = await axios.get("http://localhost:3030/details/" + id);

        // document.querySelector("td")?.addEventListener("click", function(){
        //     var columnIndex = Event.AT_TARGET.toString();
        // })
        setDetails(response.data);
        setDate(response.data.date);
        setProduct(response.data.product);
        setPrice(response.data.price);
        setPayee(response.data.payee);
    }
    const columns : any = React.useMemo(
        () => [
            {
                Header : "Id",
                accessor : 'id'
            },
            {
                Header : "Date",
                accessor : 'date'
            },
            {
                Header : "Product purchased",
                accessor : 'product'
            },
            {
                Header : "Price",
                accessor : 'price'
            },
            {
                Header : "Payee",
                accessor : 'payee'
            }
        ], []
    );

    useEffect(() => {
        fetchData();
    }
    ,[]);
    const {headerGroups, rows, prepareRow} = useTable({columns, data:posts});

    return(
        <>
            
            <div id="header">
                <h2>Expense Tracker</h2>
            </div>
            <div id="table">
                <div>
                    <table>
                        <thead id="thead">
                            {
                                headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getFooterGroupProps()}>
                                        {
                                            headerGroup.headers.map(columns => (
                                            <th id="theader" {...columns.getHeaderProps}>{columns.render('Header')}</th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        
                        <tbody>
                            {
                                rows.map(row => {
                                    prepareRow(row);
                                    return(
                                        <tr {...row.getRowProps()}>
                                            {
                                                row.cells.map(cell => (
                                                    <td {...cell.getCellProps} onClick={fetchColumn}>{cell.render('Cell')}</td>
                                                ))
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    
                </div>
                <div id="button">                    
                    <a href="/add">Add</a>
                </div>
            </div>
            
            <hr />
            
            <div className="section">
                <p>Total : {details?.price}</p>
                <p>{details?.payee} paid : </p>
                <p>{details?.payee} paid : </p>
                <p>Pay {details?.payee}</p>
            </div>
        </>
    )
};


export default BodyComponent;

