import React from 'react'
import { Offline } from 'react-detect-offline'

const NetworkDetector = () => (
  <div>
    {/*<Online>Only shown when you're online</Online>*/}
    <Offline>Only shown offline (surprise!)</Offline>
  </div>
)

export default NetworkDetector
