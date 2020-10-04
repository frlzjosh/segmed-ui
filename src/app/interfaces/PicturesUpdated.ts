import { Pictures } from "./Pictures";

export interface PicturesUpdated extends Pictures{
    custom_time_decimal: number;
    ui_flagged: string;
}