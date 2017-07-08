(function () {
    const sceneUrl = 'demos/reduced-basemap.yaml';
    const zoom = 10;
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
        const tileUrl = 'https://cartocdn-ashbu_b.global.ssl.fastly.net/delfrrr/api/v1/map/delfrrr@3a8feb4b@e68654b9d76308e16e7770645b74e9e7:1499180180411/1/{z}/{x}/{y}.mvt'
        layer.scene.config.sources.carto = {
            type: 'MVT',
            url: tileUrl,
            url_subdomains: ['a', 'b', 'c'],
            transform: (function (data) {
                const result = {
                    heatmap: data['644146be-8e24-4b77-93b6-820cf85aa4b2']
                }
                console.log(result);
                return result;
            }).toString()
        };
        layer.scene.updateConfig();
    }});
    window.addEventListener('load', function () {
        layer.addTo(map);
        // cartodb.Tiles.getTiles({
        //     user_name: 'delfrrr',
        //     sublayers: [{
        //         sql: `
        //             SELECT
        //             FLOOR(((ST_X(activities_small.the_geom_webmercator) + 20037508.3427892)/ 40075016.68557849) * (256 * POWER(2, ${zoom}))) as x,
        //             FLOOR(((20037508.3427892 - ST_Y(activities_small.the_geom_webmercator))/ 40075016.68557849) * (256 * POWER(2, ${zoom}))) as y,
        //             ST_Centroid(ST_Collect(activities_small.the_geom_webmercator)) as the_geom_webmercator,
        //             COUNT(activities_small.cartodb_id)
        //             FROM activities_small
        //             GROUP BY x, y
        //         `,
        //         cartocss: '#layer { marker-fill: red;} '
        //     }]
        // }, (res, err) => {
        //     if (err) {
        //         throw err;
        //     }
        //     const tileUrl = res.tiles[0].replace(/\.png/, '.mvt');
        //     layer.scene.config.sources.carto = {
        //         type: 'MVT',
        //         url: tileUrl,
        //         url_subdomains: ['a', 'b', 'c']
        //     };
        //     layer.scene.updateConfig();
        // });
    });

}());
