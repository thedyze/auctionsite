import React, { Component } from "react";

const inputStyle = `w-full px-2 py-2 mb-8 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out `

class RegOrg extends Component {
  constructor(props) {

    super(props);
    this.state = {
      toggle: false
    };

    this.toggleState = this.toggleState.bind(this);

  }

  toggleState() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render() {
    const { toggle } = this.state;

    return (
      <> <div className={`flex justify-evenly w-full px-16 mt-8 my-8`}>
        <label>Private </label>
        <input type="radio" name="private" checked={!this.state.toggle} onChange={this.toggleState} />
        <label>Organization </label>
        <input type="radio" name="organization" checked={this.state.toggle} onChange={this.toggleState} />
      </div>
        { toggle && this.OrgInput() }
      </>
    );
  }

  OrgInput = function () {
    return <>
      <div className={`w-full`}>
        <label>Organization name</label>
        <input className={inputStyle} type="org-name" placeholder="Organization name" required></input>
      </div>
      <div className={`w-full`}>
        <label>Organization number</label>
        <input className={inputStyle} type="org-nr" placeholder="Organization number" required></input>
      </div>
    </>
  }


}

export default RegOrg;