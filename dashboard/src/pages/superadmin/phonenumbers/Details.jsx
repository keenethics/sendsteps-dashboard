import React from "react";
import { connect } from 'react-redux';
import { setField } from '../../../actions/app';
import { setPhonenumber, setKeywords } from './actions';
import BottomSaveBar from '../../../components/common/BottomSaveBar';
import { Panel } from 'react-bootstrap';
import InputField from "../../../components/common/InputField";
import ButtonSwitch from "../../../components/common/ButtonSwitch";
import { toast } from 'react-toastify';
import HeaderPanel from "../../../components/common/HeaderPanel";
import { post } from "../../../scripts/api";

class PhonenumberDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            newKeyword: null
        }
    }

    addKeyword = () => {
        toast('not implemented yet');
    }

    setKeyword = () => {
        toast('not implemented yet');
    }

    componentDidMount() {
        post(
            'phonenumbers', 
            'getDetails',
            {
                id: this.props.match.params.id
            },
            result => this.props.dispatch(setPhonenumber(result.content))
        )

        post(
            'phonenumbers', 
            'getKeywords',
            JSON.stringify({
                id: this.props.match.params.id
            }),
            result => this.props.dispatch(setKeywords(result.content))
        )
    }

    savePhonenumber() {
        const { selectedPhonenumber } = this.props;

        toast("This doesn't work yet.")
    }

    openToast() {
        toast("Phonenumber Updated!");
    }
    
    render() {

        const { selectedPhonenumber, phonenumberKeywords } = this.props;
        const { newKeyword } = this.state;

        console.log(newKeyword);

        // Requires api adjustment, might be able to change later @TODO
        return (
            <div>
                <HeaderPanel title={"Phonenumber (" + (selectedPhonenumber && selectedPhonenumber.displayText) + ")"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            <div className="row">
                                <div className="col-sm-6">
                                    <InputField 
                                        onChange={setField.bind(this, 'countryIsoCode')}
                                        labelText={"Country"}
                                        value={selectedPhonenumber && selectedPhonenumber.countryIsoCode}
                                        leftFaIcon={"globe"}
                                    />
                                </div>

                                <div className="col-sm-6">
                                    <InputField 
                                        onChange={setField.bind(this, 'displayText')}
                                        labelText={"Phonenumber"}
                                        value={selectedPhonenumber && selectedPhonenumber.displayText}
                                        leftFaIcon={"sort-numeric-up"}
                                    />
                                </div>   
                            </div>       
                            
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">International</label>
                                        <ButtonSwitch onChange={setField.bind(this, 'foreignerCompatible')} selected={selectedPhonenumber && selectedPhonenumber.foreignerCompatible} />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Public</label>
                                        <ButtonSwitch onChange={setField.bind(this, 'public')} selected={selectedPhonenumber && selectedPhonenumber.public} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label"> Keyword(s) </label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-key"></i></span>
                                            <input value={newKeyword} onChange={this.setKeyword.bind(this)} className="form-control" id='new-keyword' />
                                            <div className="input-group-btn">
                                                <button type='button' id='add-keyword' onClick={this.addKeyword.bind(this)} className='btn btn-success btn-group-addon'><i className="fa fa-plus"></i> Add</button>
                                            </div> 
                                        </div>
                                    </div>
                                    {phonenumberKeywords && 
                                    <div className="form-group">
                                        <ul className="list-group keyword-list">
                                            {phonenumberKeywords.map(keyword => {
                                                return (<p>
                                                    <li className="list-group-item">
                                                        <strong>{keyword.keyword}</strong>
                                                        <span className="pull-right">
                                                            <i className="text-danger fa fa-times"></i>
                                                        </span>
                                                    </li>
                                                </p>)
                                            })}
                                        </ul>
                                    </div>}
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
                        </Panel.Body>
                    </Panel>
                    <BottomSaveBar onSave={this.savePhonenumber.bind(this)}/>
                </div>
            </div>
        )
    }
} 
export default connect(
    (state) => {
        return {
            selectedPhonenumber: state.phonenumberReducer.selectedPhonenumber,
            phonenumberKeywords: state.phonenumberReducer.phonenumberKeywords
        }
    }
)(PhonenumberDetails);