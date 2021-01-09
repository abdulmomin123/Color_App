import { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import * as Interfaces from './Interfaces';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

interface Props {
  palettes: Interfaces.StarterPalette[];
  isFormShowing: boolean;
  savePalette: (paletteName: string) => void;
  toggleForm: () => void;
}

interface State {
  paletteName: string;
}

export default class PaletteMetaForm extends Component<Props, State> {
  state = {
    paletteName: '',
  };

  componentDidMount = () => {
    // Rule for the palette name
    ValidatorForm.addValidationRule('isPaletteNameUnique', paletteName =>
      this.props.palettes.every(
        palette =>
          palette.paletteName.toLowerCase() !== paletteName.toLowerCase()
      )
    );
  };

  handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    this.setState({ paletteName: target.value });
  };

  render() {
    const { paletteName } = this.state;
    const { isFormShowing, toggleForm } = this.props;

    return (
      <div>
        <Dialog
          open={isFormShowing}
          onClose={toggleForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose You Palette Name
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please enter an unique palette name
            </DialogContentText>

            <Picker />

            <ValidatorForm onSubmit={() => this.props.savePalette(paletteName)}>
              <TextValidator
                name="paletteName"
                value={paletteName}
                fullWidth
                margin="normal"
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'Enter Palette Name',
                  'Palette name must be unique!',
                ]}
              />

              <DialogActions>
                {/* Cancle button */}
                <Button onClick={toggleForm} color="primary">
                  Cancel
                </Button>
                {/* Save Button */}
                <Button type="submit" variant="contained" color="secondary">
                  Save Palette
                </Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
