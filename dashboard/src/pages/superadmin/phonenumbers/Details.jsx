import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';

class PhonenumberDetails extends React.Component {
    componentWillMount() {
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult('phonenumbers', 'getDetails', apiParams));
    }
    
    render() {

        let { data } = this.props;

        // Get rid of this soon

        // Requires api adjustment, might be able to change later @TODO
        return data ? 
            <div>
                <div className="panel panel-default header-panel">  
                    <div className="panel-body">
                        <h1>Phonenumber ({data.displayText})</h1>   
                    </div>
                </div>
                <BreadCrumbs urlList={this.props.match.url} />   
                <div className="panel panel-default">  
                    <div className="panel-body">
                        <div className="container-fluid">
                            <div className="row">
                                <input name='id' id='phonenumber-id' type='hidden' />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label">Country</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.countryIsoCode} className="form-control" disabled="disabled" name='country' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label> Phonenumber </label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-sort-numeric-up"></i></span>
                                                <input value={data.displayText} disabled="disabled" className="form-control" name='number' />
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
                                                <input disabled="disabled" value={data.foreignerCompatible} className="form-control" name='international' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label"> Public </label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-users"></i></span>
                                                <input disabled="disabled" value={data.public} className="form-control" name='public' />
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
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <button type='button' id='save-btn' className='btn btn-success pull-right'><i className="fa fa-floppy-o"></i> Save
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
                    </div>
                </div>            
            </div> : null;
    }
} export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(PhonenumberDetails);