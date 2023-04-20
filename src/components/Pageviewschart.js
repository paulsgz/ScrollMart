import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { google } from 'googleapis';

const PageviewsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = 'AIzaSyBh-MN2DtEGdPliMgapgLj-xPqW0Yy_IdE';
      const VIEW_ID = '369311995'; // Replace with your actual view ID

      const jwtClient = new google.auth.JWT({
        email: 'scrollmart@alien-bricolage-384220.iam.gserviceaccount.com',
        key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDO1vfuXMa5aDgG\n1q8D7ngx+q8Yh+NRQg/V1A+WyfoWWCBTGns6EHqhMlztZfZ7mYxlBMy25Q186mEz\nZ6u6/a91I9ViBTaT6vC/hfMzXIYxmH8WusViVEaZ5yIqHIgE2ItC2d1+5celVNRP\nmafHd1AoBBJNx87AbpQ018qIUmA96lHf60aV+7wgF273cILKjP+jEYewJBenzhlV\nm32kMYmVpuR5iupp1TIDCzAJ9WcYQxJZ+9ctJlsXVglASJx4Yn+BQcwr6qRRDXFe\nHYdFnjZz8rWOBpxpcaeHrBxuSKWcDYKgHS0KbntvyGaXTDDyZh3fhCQBdMgIRKML\nI0K29LE5AgMBAAECggEALkvlkL/JZ0SRjc5NvDaLRrySpo377ns36ieeGaU5yfiN\nu6woutVnbV9Fd4mkAwRabV4GqEVaoIQhn4zr3l3cAP81SsxZ6//hRS0pQ2zJSJ6W\ni7LgbWLprpcSiZR7SYJioWL8dePerP3wy6Rb7oShN2O56Rj5CQ93MuC+H4c4rYK3\nKYIhxt8RqHXKxHW1VjU2ADR+pDRN8hfe0up7sD2gJYaHa51XBk3VydGs+PgcxNvw\nEctRvDhGfp/6/Hj9lD/t+dDpGuqZ5VLDvGkMUuxYe6JnwUQeb766F9DjyE3/5Fhq\nratkq+ucrMpv1iS4+Dgxf3LorCE8ZYt6BRrXRH0+EQKBgQDrKDoZaaz7l+7qPNVx\nrcJFLHFhl6uUMB5myE0CoBqgRpYUJ2cL5/NgiEzRGv1tyu3w5TAiLxMr6j3yTvAZ\nlw/iHbKjHWn0UR2iO7a7vmGg0xm7UkQjiIDWE67++UZWgv/VEJalCoO2HzHwhJQQ\nScvf+mI8b2uMvXR4lvhV0KKyHQKBgQDhLDZhflDxF0W6kDCLd+Ft8pOsaN87ZviB\n+FDBlAstUNV/ArQvJAdoZBVIxqLZQtlhpgU4As3e70WKcrdTaDvEOTkkWQJo5w50\nEWhD/5KHAQst7mpl9pzps5nJXv0a29PFyD4VP7LGbLfRbEoXmiZMEncMtQdJB9Xh\nUhqwUZ9QzQKBgQCMkOxB2phrgENxQ1H3dP1mqg1QYABRQX46xEq8YgXofqkhfPgs\n9sbVkkQQzshkw+P9lpJyLJ+SJaBH4oXFVjZJXKU2udNnFsHXA0jU6xWis+1yutc+\nQk95KCT4BvvTpNTWgOb72tAmonkQo796CRLUXPAx3gx1AZ7Ior3pViCaxQKBgQCm\nd+xASYWHp7/qPF1XTqp/gV4BkYqvvOGuHKl/Y3ab6u3bt2EElOtRFuTRZ+DPJGfX\nlEi5bwFKdrR/tW2pIR9GY1PGdnOcoG2EC7Z8xv5KBtCABYntldPNxvTD9hDDAY/f\n4blcNjpyDcAb+KYSKulzRhdzcoZPTJanvO50OfPBZQKBgCTo0laEsEl4jbrZNvqZ\ntGp4E+GPMfD7z2gH2r9EXe8muqZqJy18379B1DUmzkQUdcMErgIXsrGO2uGgQQGv\n93xt2fIUDsEmamgpyVmxZ8LHGtGWo4v0ZcGocJXPjQK1I321fuNgoFXrYEb7dp5b\nI/vgWVRQPJWjkQ3RX+c8Mrfm\n-----END PRIVATE KEY-----\n', // Replace with your actual private key
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      });

      await jwtClient.authorize();

      const analytics = google.analytics({ version: 'v3', auth: jwtClient });

      const response = await analytics.data.ga.get({
        'ids': 'ga:' + VIEW_ID,
        'start-date': '30daysAgo',
        'end-date': 'today',
        'metrics': 'ga:pageviews',
      });

      const chartData = [['Date', 'Pageviews']];
      response.data.rows.forEach((row) => {
        chartData.push([new Date(row[0]), parseInt(row[1])]);
      });
      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart...</div>}
        data={data}
        options={{
          title: 'Pageviews in the last 30 days',
          curveType: 'function',
          legend: { position: 'bottom' },
        }}
      />
    </div>
  );
};

export default PageviewsChart;
