import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../../../../components/common/InputField';
import ColorPickerField from '../../../../../components/common/ColorPickerField';
import { toggleGroupsModal, setGroupDetails } from '../../actions';

import { connect } from 'react-redux';

class GroupModal extends Component {

    showNewGroupModal = value => {
        this.props.dispatch(toggleGroupsModal(value));
    }

    setGroupName(e) {
        this.props.dispatch(setGroupDetails('groupName', e.target.value));
    }

    setGroupColor(e) {
        this.props.dispatch(setGroupDetails('groupColor', e.target.value));
    }

    render() {

        const { groupModalOpen, messageGroups, newMessageGroup } = this.props;

        return (
            <Modal show={groupModalOpen} onHide={() => this.showNewGroupModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage Groups</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <InputField 
                                value={newMessageGroup && newMessageGroup.groupName}
                                labelText="Group name"
                                leftFaIcon=""
                                placeholder="New group name..."
                                clearButton={true}
                                onChange={this.setGroupName.bind(this)}
                            />
                            <button onClick={() => this.addGroup()} className="btn btn-success"><i className="fa fa-plus"></i> Add group</button>

                        </div>
                        <div className="col-md-6">
                            <ColorPickerField 
                                color={newMessageGroup && newMessageGroup.groupColor}
                                labelText="Group color"
                                onChange={this.setGroupColor.bind(this)}
                            />
                        </div>
                    </div>
                    {messageGroups && messageGroups.length > 0 && 
                    <span>
                        <hr/>
                        <div className="form-group">
                            <label className="control-label">Groups</label>
                            <ul className="list-group">
                                {messageGroups.map((group, index) => {
                                    return (
                                        <span key={index}>
                                            <li className="list-group-item message-group">
                                                <span className="group-opts">
                                                    <i style={{color: group.hexColor}} className="fa fa-circle"></i>
                                                </span>
                                                <span className="group-name">
                                                    <p>{group.groupName}</p>
                                                </span>
                                                <button onClick={() => this.deleteGroup(index)} className="btn btn-xs btn-default delete-icon"><i className="fa fa-trash"></i></button>
                                            </li>
                                        </span>
                                    )
                                })}
                            </ul> 
                        </div>
                    </span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.showNewGroupModal(false)}><i className="fa fa-times"></i> Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    (state) => {
        return {
            groupModalOpen: state.messageFilterReducer.groupModalOpen,
            messageGroups: state.messageFilterReducer.messageGroups,
            newMessageGroup: state.messageFilterReducer.newMessageGroup
        }
    }
) (GroupModal);