import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
export declare class Visual implements IVisual {
    private target;
    private host;
    private container;
    private isOn;
    private lastOptions;
    private formattingSettings;
    private formattingSettingsService;
    private hasInitialized;
    constructor(options: VisualConstructorOptions);
    private applyFilter;
    private persistState;
    update(options: VisualUpdateOptions): void;
    getFormattingModel(): powerbi.visuals.FormattingModel;
    destroy(): void;
}
