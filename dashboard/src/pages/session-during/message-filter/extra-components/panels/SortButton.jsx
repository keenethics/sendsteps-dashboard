import React, { Component } from 'react';
import { sortTypes } from '../../../../../scripts/messageSorter';
import { Dropdown } from 'react-bootstrap';

class SortToggle extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }

    render() {
        return (
          <a className="msgfilter-sort mr-3" onClick={this.handleClick}>
            {this.props.children}
          </a>
        );
      }
}

class SortButton extends Component {

    render() {

        const { sortBy } = this.props;

        return (
            <>
                <span>
                <Dropdown className="sort-dropdown">
                    <Dropdown.Toggle as={SortToggle}>
                        <i className="fa fa-sort-amount-desc"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-left">
                        <h6 className="dropdown-header">Sort By</h6>

                        <Dropdown.Item 
                            onClick={() => this.props.setSortType(sortTypes.NEWEST)} 
                            active={sortBy === sortTypes.NEWEST} 
                            eventKey="1">
                            <i className="fa fa-sort-numeric-asc mr-2"></i> {sortTypes.NEWEST}
                        </Dropdown.Item>

                        <Dropdown.Item 
                            onClick={() => this.props.setSortType(sortTypes.OLDEST)} 
                            active={sortBy === sortTypes.OLDEST} 
                            eventKey="2">
                            <i className="fa fa-sort-numeric-desc mr-2"></i> {sortTypes.OLDEST}
                        </Dropdown.Item>

                        <Dropdown.Item 
                            onClick={() => this.props.setSortType(sortTypes.UPVOTES)} 
                            active={sortBy === sortTypes.UPVOTES} 
                            eventKey="3"><i className="fa fa-heart-o mr-2"></i> {sortTypes.UPVOTES}
                        </Dropdown.Item>

                        <Dropdown.Item 
                            onClick={() => this.props.setSortType(sortTypes.STARRED)} 
                            active={sortBy === sortTypes.STARRED} 
                            eventKey="4">
                            <i className="fa fa-star-o mr-2"></i> {sortTypes.STARRED}
                        </Dropdown.Item>

                        <Dropdown.Item 
                            onClick={() => this.props.setSortType(sortTypes.GROUPS)} 
                            active={sortBy === sortTypes.GROUPS} 
                            eventKey="5">
                            <i className="fa fa-paint-brush mr-2"></i> {sortTypes.GROUPS}
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                </span>
            </>
        );
    }
}

export default SortButton;