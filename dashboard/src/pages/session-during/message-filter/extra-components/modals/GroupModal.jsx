import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../../../../components/common/InputField';
import ColorPickerField from '../../../../../components/common/ColorPickerField';
import { toggleGroupsModal, updateGroups, addNewGroup } from '../../actions';
import { isValidHexColor } from '../../../../../scripts/colorHelper'; 
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

class GroupModal extends Component {

    state = {
        newGroupName: '',
        newGroupColor: '',
    }

    hideGroupModal = () => {
        this.props.dispatch(toggleGroupsModal(false));
    }

    deleteGroup(index) {
        let groups = [ ...this.props.messageGroups ];
        if(index !== -1) {
            groups.splice(index, 1);
            this.props.dispatch(updateGroups(groups));
        }
    }

    setGroupName(e) {
        this.setState({newGroupName: e.target.value});
    }

    setGroupColor(color) {
        // console.log(color)
        this.setState({newGroupColor: color});
    }

    addGroup = () => {
        toast("Inserting doesn't work yet")
        // const newGroup = {
        //     // @TODO get the ID from database after creating it (Livemessageroundmessagegroups)
        //     id: Math.floor(Math.random() * 1337),
        //     groupName: this.state.newGroupName,
        //     groupColor: this.state.newGroupColor
        // } 
        // this.props.dispatch(addNewGroup(newGroup));
    }

    render() {

        const { groupModalOpen, messageGroups } = this.props;
        const { newGroupName, newGroupColor } = this.state;

        return (
            <Modal show={groupModalOpen} onHide={() => this.hideGroupModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage Groups</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <InputField 
                                value={newGroupName}
                                labelText="Group name"
                                leftFaIcon=""
                                placeholder="New group name..."
                                clearButton={true}
                                onChange={this.setGroupName.bind(this)}
                            />
                        </div>
                        <div className="col-md-6">
                            <ColorPickerField 
                                color={newGroupColor}
                                labelText="Group color"
                                disabled={true}
                                onChange={this.setGroupColor.bind(this)}
                            />
                            <Button disabled={newGroupName.length < 1 || !isValidHexColor(newGroupColor)} onClick={() => this.addGroup()} className="btn-success"><i className="fa fa-plus"></i> Add group</Button>
                        </div>
                    </div>
                    {messageGroups &&
                    <span>
                        <hr/>
                        <div className="form-group">
                            <label className="control-label">Groups</label>
                            <ul className="list-group">
                                {Object.keys(messageGroups).map(group => {
                                    return (
                                        <span key={group}>
                                            <li className="list-group-item message-group">
                                                <span className="group-opts">
                                                    <i style={{color: messageGroups[group].color}} className="fa fa-circle"></i>
                                                </span>
                                                <span className="group-name">
                                                    <p>{messageGroups[group].name}</p>
                                                </span>
                                                <button onClick={() => this.deleteGroup(group)} className="btn btn-xs btn-default delete-icon"><i className="fa fa-trash"></i></button>
                                            </li>
                                        </span>
                                    )
                                })}
                            </ul> 
                        </div>
                    </span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.hideGroupModal(false)}><i className="fa fa-times"></i> Close</Button>
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