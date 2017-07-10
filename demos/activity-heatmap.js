(function () {
    const sceneUrl = 'demos/reduced-basemap.yaml';
    const zoom = 15;
    const map = L.map('map', {
        maxZoom: 20,
        zoomSnap: 0,
        trackResize: true,
        keyboard: false
    });

    map.setView([52.518528, 13.405057], zoom);

    const layer = Tangram.leafletLayer({
        scene: sceneUrl,
        logLevel: 'debug'
    });

    layer.scene.subscribe({load() {
        layer.scene.config.sources.mapbox = {
            type: 'MVT',
            url: 'https://api.mapbox.com/v4/delfrrr.cj4vfqdtf0o4q32s02oh71i2h-6f60n/{z}/{x}/{y}.mvt',
            url_params: {access_token: 'pk.eyJ1IjoiZGVsZnJyciIsImEiOiJjaWkyYWRmdncwMG1sdG9rZmozdGZ3bnFoIn0.ARqPIvrkYl2hIXauNK3PLA'}//,
            // transform: (function (data) {
            //     console.log(data);
            //     return data;
            // }).toString()
        }
        layer.scene.updateConfig();
        // const tileUrl = 'https://cartocdn-ashbu_b.global.ssl.fastly.net/delfrrr/api/v1/map/delfrrr@3a8feb4b@e68654b9d76308e16e7770645b74e9e7:1499180180411/1/{z}/{x}/{y}.mvt'
        // cartodb.Tiles.getTiles({
        //     user_name: 'delfrrr',
        //     sublayers: [{
        //         sql: `SELECT * FROM activities_small where (cartodb_id % 5) = 0`,
        //         cartocss: '#layer { marker-width: 1;}'
        //     }]
        // }, (res, err) => {
        //     if (err) {
        //         throw err;
        //     }
        //     const tileUrl = res.tiles[0].replace(/\.png/, '.mvt');
        //     layer.scene.config.sources.carto = {
        //         type: 'MVT',
        //         url: tileUrl,
        //         url_subdomains: ['a', 'b', 'c'],
        //         // transform: (function (data) {
        //         //     console.log(data);
        //         //     return data;
        //         // }).toString()
        //     };
        //     layer.scene.updateConfig();
        // });
    }});
    window.addEventListener('load', function () {
        layer.addTo(map);
    });

}());
