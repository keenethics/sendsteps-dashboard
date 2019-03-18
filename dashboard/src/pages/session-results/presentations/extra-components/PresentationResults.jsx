import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import MessageResult from './result-types/MessageResult';
import VotesResult from './result-types/VotesResult';
import ResultsToolbar from './ResultsToolbar';
import { isValueInArray } from '../../../../scripts/arrayHelper';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { selectResult, clearSelects } from '../actions';
import { connect } from 'react-redux';

class PresentationResults extends Component {

    onToggleSelect = (id) => {
        this.props.dispatch(selectResult(id));
    }

    // Select all results on mounting
    componentDidMount() {
        this.props.dispatch(clearSelects());
        if(this.props.data) {
            const { data } = this.props;
            const { rounds } = data;
            rounds && rounds.forEach(round => {
                this.props.dispatch(selectResult(round.id));
            })
        }
    }

    render() {
        const { data, selectedResultIds } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <h3 className="question-title mt-2">Questions </h3>
                    </div>
                    <div className="col-md-9">
                        {data && <ResultsToolbar data={data} />}
                    </div>
                </div>
                {data.rounds && data.rounds.map((round, roundIndex) => {
                    return (
                        <div className="card mt-3" key={roundIndex} >
                            <div className="card-header">
                                <TooltipNotification title={1} tooltip={"Select Result"} placement="top">
                                    <input 
                                        className="select-result"
                                        checked={isValueInArray(round.id, selectedResultIds)} 
                                        type="checkbox"
                                        onChange={() => this.onToggleSelect(round.id)} 
                                    /> 
                                </TooltipNotification>
                                <strong className="ml-2 mr-2">{round.title}</strong>
                                <span className="pull-right">
                                    <i className="fa fa-chevron-down"></i>
                                </span>
                            </div>
                            <Collapse in={roundIndex === 0}>
                                <div className="card-body">
                                    {round.type === "messages" && <MessageResult messageRound={round} />}
                                    {round.type === "votes" && <VotesResult messageRound={round} />}
                                </div>
                            </Collapse>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedResultIds: state.sessionResultsReducer.selectedResultIds
        }
    }
) (PresentationResults);