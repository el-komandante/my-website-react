import React, { Component } from 'react'

export default class ResumeSection extends Component {
  render() {
    const { items, leftTitle, rightTitle, years } = this.props
    return (
      <div className='resume-section'>
        <div className='left-block'>
          <div className='left-block-title'><b>{ leftTitle }</b></div>
          <div className='years'>{ years }</div>
        </div>
        <div className='right-block'>
          <div className='right-block-title'><b>{ rightTitle }</b></div>
          <div className='right-block-description'>
            <ul className='details'>
              {
                items.map((item) => {
                  return <li key={ item }>{ item }</li>
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
