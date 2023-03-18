import React, { useState, useEffect } from 'react';

export default function WalgreensAPI() {
  const [data, setData] = useState({});
  const [html, setHtml] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/walgreens/');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching Walgreens data:', error);
      }
    }
    fetchData();
  }, []);

  // console.log(data)
  useEffect(() => {
    const openLandingUrl = async () => {
      if (data.landingUrl){
        try {
          const response = await fetch(data.landingUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              affId: 'rxapi',
              token: data.token,
              lat: '35.9218452',
              lng: '-86.7942764',
              rxNo: '0459772-59382',
              trackingId: '123456789',
              appId: 'refillByScan',
              act: 'chkExpRx'
            })
          });
          const htmlResponse = await response.text();
          setHtml(htmlResponse);
        } catch (error) {
          console.error(error);
        }
      }
    }
      openLandingUrl();
    }, [data]);

    return (
      html 
    );
}