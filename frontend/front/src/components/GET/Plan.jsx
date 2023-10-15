import React from 'react'

const Plan = (data) => {
    return <div>
    プラン１
    <br/>
    {JSON.stringify(data.data.id)}
    プラン２
    <br/>
    {JSON.stringify(data.data.id)}
    プラン３
    <br/>
    {JSON.stringify(data.data.id)}</div>;
}

export default Plan