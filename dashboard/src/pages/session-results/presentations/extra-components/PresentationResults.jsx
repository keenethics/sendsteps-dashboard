import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
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
                        <h3 className="question-title">Questions </h3>
                    </div>
                    <div className="col-md-9">
                        <ResultsToolbar />
                    </div>
                </div>
                {data.rounds && data.rounds.map((round, roundIndex) => {
                    return (
                        <Panel key={roundIndex} defaultExpanded={roundIndex === 0}>
                            <Panel.Heading>
                                <span>
                                    <TooltipNotification title={1} tooltip={"Select Result"} placement="top">
                                        <input 
                                            className="select-result"
                                            checked={isValueInArray(round.id, selectedResultIds)} 
                                            type="checkbox"
                                            onChange={() => this.onToggleSelect(round.id)} 
                                        /> 
                                    </TooltipNotification>
                                </span>
                                <Panel.Title toggle>
                                    <strong>{round.title}</strong>
                                    <span className="pull-right">
                                        <i className="fa fa-chevron-down"></i>
                                    </span>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body>
                                    {round.type === "messages" && <MessageResult messageRound={round} />}
                                    {round.type === "votes" && <VotesResult messageRound={round} />}
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
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