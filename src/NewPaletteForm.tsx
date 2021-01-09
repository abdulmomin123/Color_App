import React, { Component } from 'react';
import { RouterProps } from 'react-router';
import clsx from 'clsx';
import { ChromePicker, ColorResult } from 'react-color';
import arrayMove from 'array-move';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as Interfaces from './Interfaces';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';

const drawerWidth = 400;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      height: 'calc(100vh - 64px)',
      flexGrow: 1,
      padding: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });

interface Props {
  palettes: Interfaces.StarterPalette[];
  rProps: RouterProps;
  savePalette: (newPalette: Interfaces.StarterPalette) => void;
  maxColors: number;
  classes: {
    [key: string]: string;
  };
}

interface State {
  open: boolean;
  currentColor: string;
  colors: Interfaces.NewColor[];
  colorName: string;
  paletteName: string;
}

class NewColorPalette extends Component<Props, State> {
  static defaultProps = {
    maxColors: 20,
  };

  state: State = {
    open: true,
    colors: this.props.palettes[0].colors,
    currentColor: '#ff0000',
    colorName: '',
    paletteName: '',
  };

  componentDidMount = () => {
    // Rule for color name
    ValidatorForm.addValidationRule('isColorNameUnique', (colorName: string) =>
      this.state.colors.every(
        color => color.name.toLowerCase() !== colorName.toLowerCase()
      )
    );

    // Rule for the color iteself
    ValidatorForm.addValidationRule('isColorUnique', _ =>
      this.state.colors.every(color => color.color !== this.state.currentColor)
    );

    // Rule for the palette name
    ValidatorForm.addValidationRule('isPaletteNameUnique', paletteName =>
      this.props.palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== paletteName.toLowerCase()
      )
    );
  };

  handleDrawerOpen = () => this.setState({ open: true });

  handleDrawerClose = () => this.setState({ open: false });

  handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.name === 'colorName') this.setState({ colorName: target.value });
    if (target.name === 'paletteName')
      this.setState({ paletteName: target.value });
  };

  handleColorChange = (newColor: ColorResult) =>
    this.setState({ currentColor: newColor.hex });

  addColor = () =>
    this.setState(st => {
      return {
        colors: [
          ...st.colors,
          { color: this.state.currentColor, name: this.state.colorName },
        ],
      };
    });

  addRandomColor = () => {
    // Pick a random color from exisitng palettes
    const allColors = this.props.palettes.map(palette => palette.colors).flat();

    const color = allColors[Math.floor(Math.random() * allColors.length)];

    this.setState({ colors: [...this.state.colors, color] });
  };

  delteColorBox = (name: string) =>
    this.setState({
      colors: this.state.colors.filter(color => color.name !== name),
    });

  savePalette = () => {
    const paletteName = this.state.paletteName;

    const newPalette: Interfaces.StarterPalette = {
      paletteName,
      id: paletteName.replace(/ /g, '-'),
      emoji: 'test',
      colors: this.state.colors,
    };

    this.props.savePalette(newPalette);

    this.props.rProps.history.push('/');
  };

  clearPalette = () => this.setState({ colors: [] });

  onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render = () => {
    const { classes, maxColors } = this.props;
    const { open, currentColor, colors, colorName, paletteName } = this.state;
    const isPaletteFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>

            <ValidatorForm onSubmit={this.savePalette}>
              <TextValidator
                name="paletteName"
                value={paletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'Enter Palette Name',
                  'Palette name must be unique!',
                ]}
              />

              {/* Save Button */}
              <Button type="submit" variant="contained" color="secondary">
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              onClick={this.clearPalette}
              variant="contained"
              color="secondary"
            >
              Clear Palette
            </Button>
            <Button
              disabled={isPaletteFull}
              onClick={this.addRandomColor}
              variant="contained"
              color="primary"
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={currentColor}
            onChange={this.handleColorChange}
          />
          <ValidatorForm onSubmit={this.addColor}>
            <TextValidator
              name="colorName"
              value={colorName}
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={[
                'Each color must have a name!',
                'Color Name must be unique',
                'Color already used!',
              ]}
            />

            <Button
              disabled={isPaletteFull}
              variant="contained"
              color="primary"
              style={{ background: isPaletteFull ? 'grey' : 'primary' }}
              type="submit"
            >
              {isPaletteFull ? 'Palette is Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          {/* Draggable colors */}
          <DraggableColorList
            onSortEnd={this.onSortEnd}
            colors={colors}
            delteColorBox={this.delteColorBox}
            axis="xy"
          />
        </main>
      </div>
    );
  };
}

export default withStyles(styles as any, { withTheme: true })(NewColorPalette);
