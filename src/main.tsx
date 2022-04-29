import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import App from './App'
import { RecoilRoot } from 'recoil'

const root = ReactDOMClient.createRoot(document.getElementById('root')!)

root.render(
    <RecoilRoot>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </RecoilRoot>,
)
