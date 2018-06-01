import React from "react";

class Components extends React.Component {

    render() {
        let pctColor;
        this.props.crypto_change*1 >= 0 ? pctColor = 'green' : pctColor = 'red';
        return (
            <div id="crypto-container" key={this.props.crypto_key}>
                <span className="left">{this.props.crypto_name}</span>
                <span
                    className="right">{this.props.crypto_price} (<span
                    class={pctColor}>{this.props.crypto_change}%</span>)</span>
            </div>
        )
    }
}

export default Components;
