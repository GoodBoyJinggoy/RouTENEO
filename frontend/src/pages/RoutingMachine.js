import "leaflet-routing-machine";
import "lrm-graphhopper";
import { useEffect , useRef } from "react";
import { useMap } from "react-leaflet";

var myApi = 'e7700786-6275-423d-ac8a-f47c8a3e56d9';

const RoutingMachine = ({coords}) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        if(!map || !coords[0] || !coords[1]) return;

        const instance = L.Routing.control({
            waypoints: [
                L.latLng(coords[0][0], coords[0][1]),
                L.latLng(coords[1][0], coords[1][1])
            ],
            lineOptions: {
                styles: [{ color: "#6FA1EC", weight: 4 }]
            },
            /*router: L.Routing.osrmv1({
                serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
                profile: 'foot',
                urlParameters: {
                    weighting: 'shortest'
                }
            }), */
            router: L.Routing.graphHopper(myApi, {
                urlParameters:{
                    vehicle: 'foot'
                }
            }),
            show: false,
            addWaypoints: false,
            routeWhileDragging: true,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
        }).addTo(map);

        routingControlRef.current = instance;

        return () => {
            if (map && routingControlRef.current){
                try{
                    map.removeControl(routingControlRef.current);
                } catch (e){
                    console.warn("Error", e);
                }
            }
        }
    }, [map]);
    
    useEffect(() => {
        if (routingControlRef.current && coords[0] && coords[1]){
            routingControlRef.current.setWaypoints([
                L.latLng(coords[0][0], coords[0][1]),
                L.latLng(coords[1][0], coords[1][1])
            ]);
        }
    }, [coords]);

    return null;
}

export default RoutingMachine;

