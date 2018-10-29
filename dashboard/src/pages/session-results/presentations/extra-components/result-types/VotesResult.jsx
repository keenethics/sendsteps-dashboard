import React, { Component } from 'react';

class VotesResult extends Component {
    render() {

        const { messageRound } = this.props;

        return (
            <div>
                <table className="table message-result" key={messageRound.id}>
                <thead>
                    <tr>
                        {messageRound.labels && messageRound.labels.map(label => {
                            return <th key={label} className="table-header" >{label}</th>
                        })}
                    </tr>
                </thead>
                </table>
            </div>
        );
    }
}

export default VotesResult;