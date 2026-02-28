import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var buttontogglepbiviz935E9BFC6E944E2FA13376EFAA3FD4EB: IVisualPlugin = {
    name: 'buttontogglepbiviz935E9BFC6E944E2FA13376EFAA3FD4EB',
    displayName: 'Button Toggle',
    class: 'Visual',
    apiVersion: '5.3.0',
    create: (options?: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = (<any>globalThis).dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["buttontogglepbiviz935E9BFC6E944E2FA13376EFAA3FD4EB"] = buttontogglepbiviz935E9BFC6E944E2FA13376EFAA3FD4EB;
}
export default buttontogglepbiviz935E9BFC6E944E2FA13376EFAA3FD4EB;