"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

class ToggleSwitchCardSettings extends FormattingSettingsCard {

    activeColor = new formattingSettings.ColorPicker({
        name: "activeColor",
        displayName: "Track Color (ON)",
        value: { value: "#4CD964" }
    });

    inactiveColor = new formattingSettings.ColorPicker({
        name: "inactiveColor",
        displayName: "Track Color (OFF)",
        value: { value: "#cccccc" }
    });

    trackWidth = new formattingSettings.NumUpDown({
        name: "trackWidth",
        displayName: "Track Width (px)",
        value: 70
    });

    trackHeight = new formattingSettings.NumUpDown({
        name: "trackHeight",
        displayName: "Track Height (px)",
        value: 40
    });

    thumbSize = new formattingSettings.NumUpDown({
        name: "thumbSize",
        displayName: "Thumb Size (px)",
        value: 38
    });

    thumbColor = new formattingSettings.ColorPicker({
        name: "thumbColor",
        displayName: "Thumb Color",
        value: { value: "#ffffff" }
    });

    thumbGradient = new formattingSettings.ToggleSwitch({
        name: "thumbGradient",
        displayName: "Thumb Gradient Effect",
        value: true
    });

    thumbShadow = new formattingSettings.ToggleSwitch({
        name: "thumbShadow",
        displayName: "Thumb Shadow Effect",
        value: true
    });

    labelFontSize = new formattingSettings.NumUpDown({
        name: "labelFontSize",
        displayName: "Label Font Size (px)",
        value: 13
    });

    labelColorActive = new formattingSettings.ColorPicker({
        name: "labelColorActive",
        displayName: "Label Color (active)",
        value: { value: "#333333" }
    });

    labelColorInactive = new formattingSettings.ColorPicker({
        name: "labelColorInactive",
        displayName: "Label Color (inactive)",
        value: { value: "#aaaaaa" }
    });

    showLabels = new formattingSettings.ToggleSwitch({
        name: "showLabels",
        displayName: "Show ON/OFF Labels",
        value: true
    });

    isOn = new formattingSettings.ToggleSwitch({
        name: "isOn",
        displayName: "Is On",
        value: false
    });

    name: string = "toggleSettings";
    displayName: string = "Toggle Switch";
    slices: Array<FormattingSettingsSlice> = [
        this.activeColor,
        this.inactiveColor,
        this.trackWidth,
        this.trackHeight,
        this.thumbSize,
        this.thumbColor,
        this.thumbGradient,
        this.thumbShadow,
        this.labelFontSize,
        this.labelColorActive,
        this.labelColorInactive,
        this.showLabels,
    ];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    toggleCard = new ToggleSwitchCardSettings();
    cards = [this.toggleCard];
}