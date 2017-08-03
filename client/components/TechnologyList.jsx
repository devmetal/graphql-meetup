import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';

class TechnologyList extends Component {
  constructor(props) {
    super(props);
    this.handleDrag = this.handleDrag.bind(this);
  }

  // eslint-disable-next-line 
  handleDrag(e, techId) {
    const type = 'application/json';
    const data = JSON.stringify({ techId });
    e.dataTransfer.setData(type, data);
  }

  render() {
    const {
      technologies = [],
      assignable,
      removable,
      onRemoveTechnology,
    } = this.props;

    return (
      <List>
        {technologies.map(tech => (
          <ListItem
            key={tech.id}
          >
            <Avatar
              onDragStart={assignable && (e => this.handleDrag(e, tech.id))}
              draggable={assignable}
              alt={tech.name}
              src={tech.logo}
            />

            {removable &&
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <DeleteIcon onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemoveTechnology(tech.id);
                  }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            }

            <ListItemText
              primary={tech.name}
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

TechnologyList.propTypes = {
  assignable: PropTypes.bool,
  removable: PropTypes.bool,
  onRemoveTechnology: PropTypes.func,
  technologies: PropTypes.arrayOf(PropTypes.any).isRequired,
};

TechnologyList.defaultProps = {
  assignable: false,
  removable: false,
  onRemoveTechnology: () => { },
};

export default TechnologyList;
