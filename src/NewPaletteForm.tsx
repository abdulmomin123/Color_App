import React, { Component } from 'react';
import { RouterProps } from 'react-router';
import clsx from 'clsx';
import arrayMove from 'array-move';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import * as Interfaces from './Interfaces';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';

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

class NewPaletteForm extends Component<Props, State> {
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

  handleDrawerOpen = () => this.setState({ open: true });

  handleDrawerClose = () => this.setState({ open: false });

  addColor = (color: Interfaces.NewColor) =>
    this.setState({ colors: [...this.state.colors, color] });

  addRandomColor = () => {
    const { palettes } = this.props;

    // Pick a random color from exisitng palettes
    const allColors = palettes.map(palette => palette.colors).flat();

    const color = allColors[Math.floor(Math.random() * allColors.length)];

    this.setState({ colors: [...this.state.colors, color] });
  };

  delteColorBox = (name: string) =>
    this.setState({
      colors: this.state.colors.filter(color => color.name !== name),
    });

  savePalette = (palette: Interfaces.NewPalette) => {
    const newPalette: Interfaces.StarterPalette = {
      paletteName: palette.paletteName,
      id: palette.paletteName.replace(/ /g, '-'),
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
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const isPaletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        {/* Paltete nav */}
        <PaletteFormNav
          open={open}
          palettes={palettes}
          savePalette={this.savePalette}
          handleDrawerOpen={this.handleDrawerOpen}
        />

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

          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearPalette}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={this.addRandomColor}
                disabled={isPaletteIsFull}
              >
                Random Color
              </Button>
            </div>

            {/* Color Picker form */}
            <ColorPickerForm
              colors={colors}
              addColor={this.addColor}
              isPaletteFull={isPaletteIsFull}
            />
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          {/* Draggable colors */}
          <DraggableColorList
            distance={10}
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

export default withStyles(styles as any, { withTheme: true })(NewPaletteForm);
