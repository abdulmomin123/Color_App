import React, { Component } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import * as Interfaces from './Interfaces';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

interface Props {
  isPaletteFull: boolean;
  colors: Interfaces.NewColor[];
  addColor: (color: Interfaces.NewColor) => void;
  classes: Record<any, any>;
}

interface State {
  currentColor: string;
  colorName: string;
}

class ColorPickerForm extends Component<Props, State> {
  state = {
    currentColor: '#ff0000',
    colorName: '',
  };

  componentDidMount = () => {
    // Rule for color name
    ValidatorForm.addValidationRule('isColorNameUnique', (colorName: string) =>
      this.props.colors.every(
        color => color.name.toLowerCase() !== colorName.toLowerCase()
      )
    );

    // Rule for the color iteself
    ValidatorForm.addValidationRule('isColorUnique', _ =>
      this.props.colors.every(color => color.color !== this.state.currentColor)
    );
  };

  handleColorChange = (newColor: ColorResult) =>
    this.setState({ currentColor: newColor.hex });

  handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    this.setState({ colorName: target.value });
  };

  addColor = () => {
    const color: Interfaces.NewColor = {
      color: this.state.currentColor,
      name: this.state.colorName,
    };

    this.props.addColor(color);
  };

  render() {
    const { isPaletteFull, classes } = this.props;
    const { currentColor, colorName } = this.state;

    return (
      <div>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChange={this.handleColorChange}
        />
        <ValidatorForm onSubmit={this.addColor}>
          <TextValidator
            className={classes.colorNameInput}
            placeholder="Color Name"
            variant="filled"
            margin="normal"
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
            className={classes.addColor}
            disabled={isPaletteFull}
            variant="contained"
            color="primary"
            style={{ background: isPaletteFull ? 'grey' : 'primary' }}
            type="submit"
          >
            {isPaletteFull ? 'Palette is Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
