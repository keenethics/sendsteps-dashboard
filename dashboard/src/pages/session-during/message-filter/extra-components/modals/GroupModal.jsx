import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../../../../components/common/InputField';
import ColorPickerField from '../../../../../components/common/ColorPickerField';
import { toggleGroupsModal, removeGroup, addNewGroup } from '../../actions';
import { post } from '../../../../../scripts/api';
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
        const { messageGroups, currentUser } = this.props;

        const group = messageGroups[index];
        const userId = currentUser.userId;

        if(group) {
            post(
                // Controller
                'messagefilter',
                // Function
                'removeFromGroup',
                // Params
                JSON.stringify({userId, groupId: index}),
                // OnSuccess
                groupId => {
                    this.props.dispatch(removeGroup(groupId))
                    toast('Group removed!');
                },
                // OnFail
                error => toast(`Unable to remove group: [${error}]`)
            )
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
        const { currentUser } = this.props;
        
        const newGroup = {
            userId: currentUser.userId,
            groupName: this.state.newGroupName,
            groupColor: this.state.newGroupColor
        } 
        post(
            // Controller
            'messagefilter',
            // Function
            'addMessageGroup',
            // Params
            JSON.stringify(newGroup),
            // OnSuccess
            group => {
                this.props.dispatch(addNewGroup(group))
                toast(`Group added!`);
                this.setState({newGroupName: '', newGroupColor: ''})
            },
            // OnFail
            error => toast(`Unable to add group: [${error}]`)
        )
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
                        </div>
                        <div className="col-md-6">
                            <Button disabled={newGroupName.length < 1 || !isValidHexColor(newGroupColor)} onClick={() => this.addGroup()} className="btn-success"><i className="fa fa-plus"></i> Add group</Button>
                        </div>
                    </div>
                    {messageGroups && Object.keys(messageGroups).length > 0 &&
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
            newMessageGroup: state.messageFilterReducer.newMessageGroup,
            currentUser: state.authReducer.currentUser
        }
    }
) (GroupModal);