declare module 'leaflet-rd' {
    import { CRS, Projection } from "leaflet";

    export interface RDProjection extends Projection {
        proj4def: string;
    }

    export interface RDCRS extends CRS {
        projection: RDProjection;
    }

    const rd: RDCRS;
    export default rd;
}