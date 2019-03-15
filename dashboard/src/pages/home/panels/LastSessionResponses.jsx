import React, { Component } from 'react';
import { ListGroup, Panel } from 'react-bootstrap';
import moment from 'moment';
import LoadingPlaceholder from '../../base/LoadingPlaceholder';

class LastSessionResponses extends Component {

    formatResponses = responses => {
        const { messages, survey, upvotes, votes} = responses;
        return [
            ...this.formatMessages(messages),
            ...this.formatSurvey(survey),
            ...this.formatUpvotes(upvotes),
            ...this.formatVotes(votes)
        ]
    }

    formatVotes = votes => {
        return votes.map(vote => {
            return {
                id: vote.id,
                type: 'Vote Response',
                text: <span className="label label-success">{vote.text}</span>,
                faIcon: 'fa-check-square-o',
                timestamp: vote.timestamp
            }
        })
    }

    formatMessages = messages => {
        return messages.map(message => {
            return {
                id: message.id,
                type: 'Message Response',
                text: <strong>{message.text}</strong>,
                faIcon: 'fa-commenting-o',
                timestamp: message.timestamp
            }
        })
    }

    formatSurvey = surveyAnswers => {
        return surveyAnswers.map(answer => {
            return {
                id: answer.survey_question_answer_id,
                type: 'Survey Answer',
                text: answer.answer,
                faIcon: 'fa-question-circle',
                timestamp: answer.answered_date_time
            }
        })
    }

    formatUpvotes = upvotes => {
        return upvotes.map(upvote => {
            return {
                id: upvote.id,
                type: 'Message Upvoted',
                text: <span className="upvoted-msg">{upvote.text}</span>,
                faIcon: 'fa-heart',
                timestamp: upvote.timestamp
            }
        })
    }

    sortByDate = items => {
        return items.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        })
    }

    formatTime(time) {
        const dateFormat = 'YYYY-MM-DD HH:mm:ss';
        const stringFormat = "dddd, MMMM Do YYYY, h:mm:ss A";

        const momented = moment(time, stringFormat);
        const stringed = momented.format(dateFormat);
        return moment(time, dateFormat).format(stringFormat);
    }

    render() {

        const { lastResponses } = this.props;

        return (
            <div className="card">
                <div className="card-header">
                    <h5>
                        Last Session Activity
                        <button className="view-result pull-right btn btn-primary">View Results</button>
                    </h5>
                    
                </div>
                <div className="card-body">
                    <ListGroup >
                        {!lastResponses && <LoadingPlaceholder />}
                        {lastResponses && 
                        <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">
                                        Response
                                    </th>
                                    <th className="text-center">
                                        Type
                                    </th>
                                    <th className="text-center">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.sortByDate(this.formatResponses(lastResponses)).map((response, index) => {
                                return (
                                    <tr className="table-hover" key={index}>
                                        <td className="text-center">
                                            {response.text}
                                        </td>
                                        <td>
                                            <i className={"recent-activity fa " + response.faIcon}></i> {response.type}
                                        </td>
                                        <td className="text-center">
                                            {this.formatTime(response.timestamp)}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        </>}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default LastSessionResponses;