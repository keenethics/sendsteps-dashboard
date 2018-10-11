import React from "react";
import { connect } from 'react-redux';
import { fetchResult, updateAPI, setPhonenumberData } from '../../../actions/api';
import BottomSaveBar from '../../../components/common/BottomSaveBar';
import { Panel } from 'react-bootstrap';
import InputField from "../../../components/common/InputField";
import ButtonSwitch from "../../../components/common/ButtonSwitch";
import { toast } from 'react-toastify';
import HeaderPanel from "../../../components/common/HeaderPanel";

class PhonenumberDetails extends React.Component {
    componentDidMount() {
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult('phonenumbers', 'getDetails', apiParams));
        this.props.dispatch(fetchResult('phonenumbers', 'getKeywords', apiParams, true));
    }

    savePhonenumber() {
        const { data } = this.props;
        
        let apiParams = JSON.stringify({
            id: data.id,
            fields : data
        });
        this.props.dispatch(updateAPI('phonenumbers', 'updateDetails', apiParams));
    }
    
    setField(fieldName, event) {
        if(event.target && event.target.value){
            this.props.dispatch(setPhonenumberData({[fieldName]: event.target.value}));
        } else {
            this.props.dispatch(setPhonenumberData({[fieldName]: event}));
        }
    }

    openToast() {
        toast("Phonenumber Updated!");
    }
    
    render() {

        let { data, additionalData } = this.props;

        console.log(additionalData);

        // Requires api adjustment, might be able to change later @TODO
        return data &&
            <div>
                <HeaderPanel title={"Phonenumber (" + data.displayText + ")"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            <div className="row">
                                <div className="col-sm-6">
                                    <InputField 
                                        onChange={this.setField.bind(this, 'countryIsoCode')}
                                        labelText={"Country"}
                                        value={data.countryIsoCode}
                                        leftFaIcon={"globe"}
                                    />
                                </div>

                                <div className="col-sm-6">
                                    <InputField 
                                        onChange={this.setField.bind(this, 'displayText')}
                                        labelText={"Phonenumber"}
                                        value={data.displayText}
                                        leftFaIcon={"sort-numeric-up"}
                                    />
                                </div>   
                            </div>       
                            
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">International</label>
                                        <ButtonSwitch onChange={this.setField.bind(this, 'foreignerCompatible')} selected={data.foreignerCompatible} />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Public</label>
                                        <ButtonSwitch onChange={this.setField.bind(this, 'public')} selected={data.public} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label"> Keyword(s) </label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-key"></i></span>
                                            <input className="form-control" id='new-keyword' value='' />
                                            <div className="input-group-btn">
                                                <button type='button' id='add-keyword' className='btn btn-success btn-group-addon'><i className="fa fa-plus"></i> Add</button>
                                            </div> 
                                        </div>
                                    </div>
                                    {additionalData && 
                                    <div className="form-group">
                                        <ul className="list-group keyword-list">
                                            {additionalData.map(keyword => {
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
    }
} 
export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
            additionalData: state.apiReducer.additionalData
        }
    }
)(PhonenumberDetails);