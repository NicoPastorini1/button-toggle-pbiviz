import powerbi from "powerbi-visuals-api";
import { IBasicFilter, FilterType } from "powerbi-models";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

export class Visual implements IVisual {
    private target: HTMLElement;
    private host: powerbi.extensibility.visual.IVisualHost;
    private container: HTMLDivElement;
    private isOn: boolean = false;
    private lastOptions: VisualUpdateOptions | null = null;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private hasInitialized: boolean = false;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.host = options.host;
        this.formattingSettingsService = new FormattingSettingsService();

        this.container = document.createElement("div");
        this.container.style.cssText = [
            "display: flex",
            "align-items: center",
            "justify-content: center",
            "box-sizing: border-box",
            "font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            "width: 100%",
            "height: 100%",
            "padding: 10px",
        ].join(";");

        this.target.appendChild(this.container);
    }

    private applyFilter(value: "ON" | "OFF"): void {
        const filter: IBasicFilter = {
            $schema: "https://powerbi.com/product/schema#basic",
            target: {
                table: "SemaforoSwitch",
                column: "Estado"
            },
            filterType: FilterType.Basic,
            operator: "In",
            values: [value],
            requireSingleSelection: true
        };

        this.host.applyJsonFilter(
            filter,
            "general",
            "filter",
            powerbi.FilterAction.merge
        );
    }

    private persistState(value: boolean): void {
        this.host.persistProperties({
            merge: [
                {
                    objectName: "toggleSettings",
                    selector: null,
                    properties: {
                        isOn: value
                    }
                }
            ]
        });
    }

    public update(options: VisualUpdateOptions) {
        this.host.eventService.renderingStarted(options);

        try {
            this.lastOptions = options;
            this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
                VisualFormattingSettingsModel,
                options.dataViews[0]
            );

            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }

            const dataView = options.dataViews?.[0];
            if (!dataView?.categorical?.categories?.[0]) {
                this.host.eventService.renderingFinished(options);
                return;
            }

            const categories = dataView.categorical.categories[0];
            const values = categories.values;

            const onIdx = values.findIndex(v => String(v).toUpperCase() === "ON");
            const offIdx = values.findIndex(v => String(v).toUpperCase() === "OFF");

            if (onIdx === -1 || offIdx === -1) {
                this.host.eventService.renderingFinished(options);
                return;
            }

            const s = this.formattingSettings.toggleCard;
            if (!this.hasInitialized) {
                this.isOn = s.isOn.value ?? false;
                this.hasInitialized = true;
                this.applyFilter(this.isOn ? "ON" : "OFF");
            }

            const activeColor   = s.activeColor.value.value       || "#4CD964";
            const inactiveColor = s.inactiveColor.value.value     || "#cccccc";
            const trackWidth    = s.trackWidth.value               ?? 70;
            const trackHeight   = s.trackHeight.value              ?? 40;
            const thumbSize     = s.thumbSize.value                ?? 38;
            const thumbColor    = s.thumbColor.value.value        || "#ffffff";
            const thumbGradient = s.thumbGradient.value            ?? true;
            const thumbShadow   = s.thumbShadow.value              ?? true;
            const fontSize      = s.labelFontSize.value            ?? 13;
            const labelActive   = s.labelColorActive.value.value   || "#333333";
            const labelInactive = s.labelColorInactive.value.value || "#aaaaaa";
            const showLabels    = s.showLabels.value               ?? true;
            const thumbOffset   = trackWidth - thumbSize - 4;

            if (showLabels) {
                const labelOff = document.createElement("span");
                labelOff.textContent = "OFF";
                labelOff.style.cssText = [
                    `font-size: ${fontSize}px`,
                    "font-weight: 600",
                    `color: ${!this.isOn ? labelActive : labelInactive}`,
                    "transition: color 0.3s ease",
                    "user-select: none",
                    "margin-right: 12px",
                ].join(";");
                this.container.appendChild(labelOff);
            }

            const track = document.createElement("div");
            track.style.cssText = [
                "position: relative",
                `width: ${trackWidth}px`,
                `height: ${trackHeight}px`,
                `border-radius: ${trackHeight}px`,
                `background: ${this.isOn ? activeColor : inactiveColor}`,
                "transition: background 0.3s ease",
                "cursor: pointer",
                "flex-shrink: 0",
            ].join(";");

            const thumb = document.createElement("div");
            thumb.style.cssText = [
                "position: absolute",
                "top: 50%",
                `transform: translateY(-50%) ${this.isOn ? `translateX(${thumbOffset}px)` : "translateX(4px)"}`,
                `width: ${thumbSize}px`,
                `height: ${thumbSize}px`,
                "border-radius: 50%",
                `background: ${thumbGradient
                    ? `radial-gradient(circle at 35% 35%, ${thumbColor}, #d0d0d0)`
                    : thumbColor
                }`,
                `box-shadow: ${thumbShadow
                    ? "0 4px 10px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.8)"
                    : "none"
                }`,
                "transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            ].join(";");

            track.appendChild(thumb);
            this.container.appendChild(track);

            if (showLabels) {
                const labelOn = document.createElement("span");
                labelOn.textContent = "ON";
                labelOn.style.cssText = [
                    `font-size: ${fontSize}px`,
                    "font-weight: 600",
                    `color: ${this.isOn ? labelActive : labelInactive}`,
                    "transition: color 0.3s ease",
                    "user-select: none",
                    "margin-left: 12px",
                ].join(";");
                this.container.appendChild(labelOn);
            }
            track.addEventListener("click", () => {
                this.isOn = !this.isOn;

                this.persistState(this.isOn);

                this.applyFilter(this.isOn ? "ON" : "OFF");

                if (this.lastOptions) {
                    this.update(this.lastOptions);
                }
            });

            this.host.eventService.renderingFinished(options);

        } catch (e) {
            this.host.eventService.renderingFailed(options);
        }
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }

    public destroy(): void {
        if (this.container && this.target.contains(this.container)) {
            this.target.removeChild(this.container);
        }
    }
}