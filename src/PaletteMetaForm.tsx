import { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import * as Interfaces from './Interfaces';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  palettes: Interfaces.StarterPalette[];
  savePalette: (paletteName: string) => void;
}

interface State {
  open: boolean;
  paletteName: string;
}

export default class PaletteMetaForm extends Component<Props, State> {
  state = {
    open: false,
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

  handleClickOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open, paletteName } = this.state;

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <ValidatorForm onSubmit={() => this.props.savePalette(paletteName)}>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
