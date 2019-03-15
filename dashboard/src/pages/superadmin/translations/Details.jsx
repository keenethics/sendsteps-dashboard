import React from "react";
import { connect } from 'react-redux';
import { post } from '../../../scripts/api';
import { setTranslationDetails } from './actions';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";

class TranslationDetails extends React.Component {
    componentDidMount() {
        post(
            'phonenumbers', 
            'getDetails', 
            { id: this.props.match.params.id },
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
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <input name='id' id='phonenumber-id' type='hidden' />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="col-form-label">Country</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-globe"></i>
                                                    </span>
                                                </div>
                                                <input value={translationDetails && translationDetails.countryIsoCode} className="form-control" disabled="disabled" name='country' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label> Phonenumber </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-sort-numeric-up"></i>
                                                    </span>
                                                </div>
                                                <input value={translationDetails && translationDetails.displayText} disabled="disabled" className="form-control" name='number' />
                                            </div>
                                        </div>
                                    </div>   
                                </div>       
                                
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="col-form-label"> International </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-globe"></i>
                                                    </span>
                                                </div>
                                                <input disabled="disabled" value={translationDetails && translationDetails.foreignerCompatible} className="form-control" name='international' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="col-form-label"> Public </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-users"></i>
                                                    </span>
                                                </div>
                                                <input disabled="disabled" value={translationDetails && translationDetails.public} className="form-control" name='public' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label className="col-form-label"> Keyword </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-key"></i>
                                                    </span>
                                                </div>
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
                    </div>
                </div>
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