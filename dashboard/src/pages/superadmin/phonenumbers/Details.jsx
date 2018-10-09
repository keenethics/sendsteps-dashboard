import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchResult, updateAPI, setPhonenumberData, clearData } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import { Panel } from 'react-bootstrap';
import InputField from "../../../components/common/InputField";
import ButtonSwitch from "../../../components/common/ButtonSwitch";
import { toast } from 'react-toastify';

class PhonenumberDetails extends React.Component {
    componentDidMount() {
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult('phonenumbers', 'getDetails', apiParams));
        this.props.dispatch(fetchResult('phonenumbers', 'getKeywords', apiParams, true));
    }

    componentWillUnmount() {
        this.props.dispatch(clearData());
    }

    savePhonenumber() {
        const { data } = this.props;
        let apiParams = JSON.stringify({
            id: data.id,
            fields : data
        });
        this.props.dispatch(updateAPI('phonenumbers', 'updateDetails', apiParams));
    }

    setDisplayText(e) {
        this.props.dispatch(setPhonenumberData({displayText: e.target.value}))
    }

    setCountry(e) {
        this.props.dispatch(setPhonenumberData({countryIsoCode: e.target.value}));
    }

    setInternational(value) {
        this.props.dispatch(setPhonenumberData({foreignerCompatible: value}));
    }

    setPublic(value) {
        this.props.dispatch(setPhonenumberData({public: value}));
    }

    openToast() {
        toast("Phonenumber Updated!");
    }
    
    render() {

        let { data, additionalData } = this.props;

        console.log(additionalData);

        // Requires api adjustment, might be able to change later @TODO
        return data ? 
            <div>
                <Panel onClick={this.openToast.bind(this)}>
                    <Panel.Body>
                    <h1>Phonenumber ({data.displayText})</h1>   
                    </Panel.Body>
                </Panel>
                <BreadCrumbs urlList={this.props.match.url} />   
                <Panel>
                    <Panel.Body>
                        <div className="container-fluid">
                            <div className="row">
                                <input name='id' id='phonenumber-id' type='hidden' />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <InputField 
                                            onChange={this.setCountry.bind(this)}
                                            labelText={"Country"}
                                            value={data.countryIsoCode}
                                            leftFaIcon={"globe"}
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <InputField 
                                            onChange={this.setDisplayText.bind(this)}
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
                                            <ButtonSwitch onChange={this.setInternational.bind(this)} selected={data.foreignerCompatible} />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label">Public</label>
                                            <ButtonSwitch onChange={this.setPublic.bind(this)} selected={data.public} />
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
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <button onClick={this.savePhonenumber.bind(this)} type='button' id='save-btn' className='btn btn-success pull-right'><i className="fa fa-save"></i> Save
                                            </button>
                                            <Link to="/superadmin/phonenumbers">
                                                <button type='button' id='back-btn' className='btn btn-default'><i className="fa fa-chevron-left"></i> Back
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </Panel.Body>
            </Panel>
        </div> : null;
    }
} export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
            additionalData: state.apiReducer.additionalData
        }
    }
)(PhonenumberDetails);