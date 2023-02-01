import { Button, Col, Container, Row, Form } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import useTotalShares from "../hooks/useTotalShares";
import useAddPayee from '../hooks/useAddPayee';
import useBunzz from '../hooks/useBunzz';
import { bnToDec, isAddress } from '../utils';
import {getPaymentSplitterContract, removePayee, releaseEth, releaseERC20, updatePayeeShares} from '../contracts/utils'
import { useWeb3React } from "@web3-react/core";
import BigNumber from 'bignumber.js';
import usePayees from '../hooks/usePayees';
import Table from 'react-bootstrap/Table';
const Creator = () => {
    const bunzz = useBunzz();
    const { account} = useWeb3React();
    const paymentSplitterContract = getPaymentSplitterContract(bunzz);
    const [shares, setShares] = useState(0);
    const [newShares, setNewShares] = useState(0);


    const totalShares = useTotalShares(paymentSplitterContract);
   
    const [tokenAddress, setTokenAddress] = useState("");
    const [payeeAddress, setPayeeAddress ] = useState("");
    
    const { onAddPayee } = useAddPayee(paymentSplitterContract, payeeAddress, shares);

    const {payees, payeeCount, payeeMaxCounter} = usePayees(paymentSplitterContract);
    console.log("1payees = ", payees);
   

    const handleAddPayee = useCallback(async () => {
        try { 
            const txHash = await onAddPayee();
            if (!txHash) {
            }
        } catch (e) {
            console.log(e);
        }
    }, [onAddPayee]);
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input Shares</Form.Label>
                            <Form.Control type="email" placeholder="Enter Value" value={shares} onChange={(val) => setShares(val.target.value)} />

                            <Form.Label>Input Payee Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Payee Address" value={payeeAddress} onChange={(val) => setPayeeAddress(val.target.value)} />
                            <Button className="mx-3 mt-2" variant="dark"  onClick={handleAddPayee} >Add Payee</Button>
                         
                            <div>Total Shares:{ totalShares }</div>
                            <div>Total Number of Current Payees:{payeeCount}</div>
                            <div>Max Payee Counter: { payeeMaxCounter }</div>
                        </Form.Group>
                        
                     
                    </Form>
                    <Button className="mx-3 mt-2" variant="dark" onClick={async () => {
                                                    try {
                                                        let txHash;
                                                        
                                                        txHash = await releaseEth(
                                                            paymentSplitterContract,
                                                         
                                                            account,
                                                        );
                                                    
                                                        console.log(txHash);
                                                        
                                                    } catch (e) {
                                                        console.log(e);
                                                        
                                                    }
                                                }}> ReleaseEth
                    </Button>
                    <Button className="mx-3 mt-2"variant="dark" onClick={async () => {
                                                    try {
                                                        let txHash;
                                                        
                                                        txHash = await releaseERC20(
                                                            paymentSplitterContract,
                                                            tokenAddress,
                                                            account,
                                                        );
                                                    
                                                        console.log(txHash);
                                                        
                                                    } catch (e) {
                                                        console.log(e);
                                                        
                                                    }
                                                }}> ReleaseERC20
                    </Button>
                    <Form.Label>Input ERC20 Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter ERC20 Address" value={tokenAddress} onChange={(val) => setTokenAddress(val.target.value)} />

                    <Table className="mt-2" stripped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Payee Adress</th>
                                    <th>Shares</th>
                                    <th>   </th>
                                    <th> Update Shares  </th>
                                </tr>
                            </thead>
                            <tbody>
                                {payees.map((payee, key)=> (
                                     <tr>
                                        <td>{key}</td>
                                        <td>{payee.address}</td>
                                       
                                        <td>{payee.shares}</td>
                                        <td>
                                            <Button variant="dark" onClick={async () => {
                                                    try {
                                                        let txHash;
                                                        
                                                        txHash = await removePayee(
                                                            paymentSplitterContract,
                                                            payee.address,
                                                            account,
                                                        );
                                                    
                                                        console.log(txHash);
                                                        
                                                    } catch (e) {
                                                        console.log(e);
                                                        
                                                    }
                                                }}> Remove
                                            </Button>
                                        </td>
                                        <td>
                                            <Form.Control type="email" placeholder="Enter New Shares" value={newShares} onChange={(val) => setNewShares(val.target.value)} />
                                            <Button variant="dark" onClick={async () => {
                                                    try {
                                                        let txHash;
                                                        
                                                        txHash = await updatePayeeShares(
                                                            paymentSplitterContract,
                                                            payee.address,
                                                            newShares,
                                                            account,
                                                        );
                                                    
                                                        console.log(txHash);
                                                        
                                                    } catch (e) {
                                                        console.log(e);
                                                        
                                                    }
                                                }}> Update
                                            </Button>
                                        </td>
                                    </tr>

                                    ))}
                               
                            </tbody>
                        </Table>                    

         

                  
                </Col>
            </Row>
        </Container>
    )
}

export default Creator;