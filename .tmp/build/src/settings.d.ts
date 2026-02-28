import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
declare class ToggleSwitchCardSettings extends FormattingSettingsCard {
    activeColor: formattingSettings.ColorPicker;
    inactiveColor: formattingSettings.ColorPicker;
    trackWidth: formattingSettings.NumUpDown;
    trackHeight: formattingSettings.NumUpDown;
    thumbSize: formattingSettings.NumUpDown;
    thumbColor: formattingSettings.ColorPicker;
    thumbGradient: formattingSettings.ToggleSwitch;
    thumbShadow: formattingSettings.ToggleSwitch;
    labelFontSize: formattingSettings.NumUpDown;
    labelColorActive: formattingSettings.ColorPicker;
    labelColorInactive: formattingSettings.ColorPicker;
    showLabels: formattingSettings.ToggleSwitch;
    isOn: formattingSettings.ToggleSwitch;
    name: string;
    displayName: string;
    slices: Array<FormattingSettingsSlice>;
}
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    toggleCard: ToggleSwitchCardSettings;
    cards: ToggleSwitchCardSettings[];
}
export {};
