import { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import * as Interfaces from './Interfaces';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker, EmojiData, BaseEmoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

interface Props {
  palettes: Interfaces.StarterPalette[];
  stage: string;
  savePalette: (palette: Interfaces.NewPalette) => void;
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

  savePalette = (e: EmojiData) => {
    const emoji = (e as BaseEmoji).native;

    const newPalette: Interfaces.NewPalette = {
      paletteName: this.state.paletteName,
      emoji,
    };

    this.props.savePalette(newPalette);
  };

  render() {
    const { paletteName } = this.state;
    const { toggleForm, stage } = this.props;

    return (
      <div>
        {/* Emoji picker */}
        <Dialog
          open={stage === 'emoji'}
          onClose={toggleForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">
            Choose a emoji
          </DialogTitle>

          {/* Emoji picker */}
          <Picker onSelect={this.savePalette} />
        </Dialog>

        <Dialog
          open={stage === 'form'}
          onClose={toggleForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">
            Choose You Palette Name
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please enter an unique palette name
            </DialogContentText>

            <ValidatorForm onSubmit={toggleForm}>
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
