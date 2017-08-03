import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const style = {
  chips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '2px',
  },
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

const styleSheet = createStyleSheet('projects', style);

const ProjectList = ({ projects = [], classes }) => (
  <List>
    {projects.map(project => (
      <ListItem key={project.id}>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <Typography type="subheading">
              {project.name}
            </Typography>
            <Divider className={classes.divider} />
            <div className={classes.chips}>
              {project.required.map(tech => (
                <Chip
                  className={classes.chip}
                  key={tech.id}
                  label={tech.name}
                  avatar={<Avatar src={tech.logo} />}
                />
              ))}
            </div>
            <Divider className={classes.divider} />
            <div className={classes.chips}>
              {project.inthere.map(emp => (
                <Chip
                  className={classes.chip}
                  key={emp.id}
                  label={emp.name}
                />
              ))}
            </div>
            <Divider className={classes.divider} />
            <Typography type="subheading">
              Coverage <strong>{project.coverage} %</strong>
            </Typography>
          </CardContent>
        </Card>
      </ListItem>
    ))}
  </List>
);

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styleSheet)(ProjectList);
