import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/api';
import BreadCrumbs from '../../pages/base/BreadCrumbs';

class PhonenumberDetails extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchResult('users', 'getSelf'));
    }
    
    render() {

        let { data } = this.props;
        console.log(data);
        // Get rid of this soon

        // Requires api adjustment, might be able to change later @TODO
        return data ? 
            <div>
                <div className="panel panel-default header-panel">  
                    <div className="panel-body">
                        <h1>Your Profile</h1>   
                    </div>
                </div>
                <BreadCrumbs urlList={this.props.match.url} />   
                <div className="panel panel-default">  
                    <div className="panel-body">
                        <div className="container-fluid">
                            <div className="row">
                                <input name='id' id='phonenumber-id' type='hidden' />
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">First Name</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.firstName} className="form-control" name='firstName' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">Last Name</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.lastName} className="form-control" name='lastName' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">Organisation</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.organisation} className="form-control" name='organisation' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">Department</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.departmentName} className="form-control" name='department' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">Role</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.role} className="form-control" disabled="disabled" name='role' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">Email</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.email} className="form-control" name='email' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">Phonenumber</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.phonenumber} className="form-control" name='phonenumber' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                Email Settings
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">Language</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.language} className="form-control" name='language' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="form-group">
                                            <label className="control-label">Timezone</label>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                                <input value={data.timezone} className="form-control" name='timezone' />
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
                                            <Link to="/">
                                                <button type='button' id='back-btn' className='btn btn-default'><i className="fa fa-chevron-left"></i> Home
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