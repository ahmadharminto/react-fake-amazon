import React from 'react'
import { Link } from 'react-router-dom';
import './Page404.scss';

function Page404() {
    return (
        <div className="mainbox">
            <div className="err">404</div>
            <img src="/logo512.png" alt=""/>
            <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <Link to="/">home</Link> and try from there.</p></div>
        </div>
    )
}

export default Page404
