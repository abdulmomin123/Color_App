import { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import * as Interfacaes from './Interfaces';
import styles from './styles/PaletteListStyles';
import MiniPalette from './MiniPalette';

interface Props {
  palettes: Interfacaes.StarterPalette[];
  deletePalette: (id: string) => void;
  classes: Record<string, string>;
}

interface State {
  openDeleteDialog: boolean;
  paletteToDelete: string;
}

class PaletteList extends Component<Props, State> {
  state = {
    openDeleteDialog: false,
    paletteToDelete: '',
  };

  openDialog = () => this.setState({ openDeleteDialog: true });
  CloseDialog = () => this.setState({ openDeleteDialog: false });
  paletteToDelete = (id: string) => this.setState({ paletteToDelete: id });

  handleDelete = () => {
    this.setState({ openDeleteDialog: false });
    this.props.deletePalette(this.state.paletteToDelete);
  };

  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link className={classes.newPalette} to="palette/new">
              Create Palette
            </Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette, i) => (
              <CSSTransition timeout={500} classNames="fades" key={i}>
                <MiniPalette
                  openDialog={this.openDialog}
                  paletteToDelete={this.paletteToDelete}
                  palette={palette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog open={openDeleteDialog} onClose={this.CloseDialog}>
          <DialogTitle>Delete this Palette?</DialogTitle>

          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ background: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.CloseDialog}>
              <ListItemAvatar>
                <Avatar style={{ background: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
