import React from "react";
import { connect } from 'react-redux';
import { post } from '../../../scripts/api';
import { setTranslationDetails } from './actions';
import { Panel } from 'react-bootstrap';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";

class TranslationDetails extends React.Component {
    componentDidMount() {
        post(
            'phonenumbers', 
            'getDetails', 
            JSON.stringify({
                id: this.props.match.params.id
            }),
            result => this.props.dispatch(setTranslationDetails(result.content)),
            error => console.log(error)
        );
    }
    
    render() {

        const { translationDetails } = this.props;

        return (
            <div>
                <HeaderPanel 
                    title={"Phonenumber (" + (translationDetails && translationDetails.displayText) + ")"}
                />
                <Panel>
                    <Panel.Body>
                        <div className="container-fluid">
                            <div className="row">
                                <input name='id' id='phonenumber-id' type='hidden' />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label">Country</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={translationDetails && translationDetails.countryIsoCode} className="form-control" disabled="disabled" name='country' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label> Phonenumber </label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-sort-numeric-up"></i></span>
                                                <input value={translationDetails && translationDetails.displayText} disabled="disabled" className="form-control" name='number' />
                                            </div>
                                        </div>
                                    </div>   
                                </div>       
                                
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label"> International </label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input disabled="disabled" value={translationDetails && translationDetails.foreignerCompatible} className="form-control" name='international' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label"> Public </label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-users"></i></span>
                                                <input disabled="disabled" value={translationDetails && translationDetails.public} className="form-control" name='public' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label className="control-label"> Keyword </label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-key"></i></span>
                                                <input className="form-control" id='new-keyword' value='' />
                                                <div className="input-group-btn">
                                                    <button type='button' id='add-keyword' className='btn btn-success btn-group-addon'><i className="fa fa-plus"></i> Add</button>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group keyword-items">
                                            <ul className="list-group">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
            <BottomSaveBar />
        </div>)
    }
} export default connect(
    (state) => {
        return {
            translationDetails: state.translationReducer.translationDetails
        }
    }
)(TranslationDetails);