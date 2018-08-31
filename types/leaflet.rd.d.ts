declare module 'leaflet-rd' {
    import { CRS, Projection } from "leaflet";

    interface RDProjection extends Projection {
        proj4def: string;
    }

    interface RDCRS extends CRS {
        projection: RDProjection;
    }

    const rd: RDCRS;
    export = rd;
}