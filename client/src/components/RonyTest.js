import React, { useState, useEffect } from 'react';

function RonyTest() {
    const [featured, setFeatured] = useState([]);
    const [onSale, setOnSale] = useState([])

    useEffect(() => {
    fetch('/homePage')
        .then(res => res.json())
        .then(data => {
            const {sale, feature} = data;
            setOnSale(sale);
            setFeatured(feature);
        });
    }, []);

    // return <div>hi</div>

    return <>
    <div>On Sale : {onSale.map(item => {
        return <div key={Math.random() * 1000000000}> {item.name} </div>
    })}
    </div>
    <br />
    Featured : {featured.map(item => {
        return <div key={Math.random() * 1000000000}> {item.name} </div>
    })}</>
}

export default RonyTest;